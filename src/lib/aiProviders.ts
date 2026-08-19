// aiProviders.ts — integração com o Alibaba Cloud Model Studio (endpoint
// OpenAI-compatível) usando as chaves do Google Cloud Secret Manager.
//
// Dois provedores (chaves de workspaces/regiões diferentes):
//   - qwen   → QWEN_API_KEY  · endpoint internacional (Singapore) · cota maior
//   - studio → STUDIO_API_KEY · endpoint China (Beijing)          · cota free
//
// Segurança: as chaves são lidas APENAS em runtime no servidor — primeiro da
// variável de ambiente, depois do Secret Manager pelo cliente oficial
// in-process (@google-cloud/secret-manager, credenciais ADC), com cache em
// memória de 5 min. Nenhum literal de credencial em source, nenhum subprocess
// com argumentos dinâmicos, a chave nunca é logada, nunca vai ao client e
// nunca é commitada.

import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

export type ProviderId = "qwen" | "studio";

interface ProviderConfig {
  id: ProviderId;
  label: string;
  quotaHint: string;
  secretName: string;
  /**
   * Endpoints candidatos (OpenAI-compatível). Chaves do Model Studio são
   * regionais: nascem vinculadas ao workspace que as criou. O provedor
   * studio tenta o endpoint internacional (Singapura, onde fica a cota
   * free nova) e cai para Beijing se a chave for de lá — a resolução é
   * automática e cacheada.
   */
  baseUrls: string[];
  defaultModel: string;
}

const INTL_BASE =
  "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";
const CN_BASE = "https://dashscope.aliyuncs.com/compatible-mode/v1";

export const PROVIDERS: Record<ProviderId, ProviderConfig> = {
  qwen: {
    id: "qwen",
    label: "QWEN",
    quotaHint: "melhores modelos · cota maior",
    secretName: "QWEN_API_KEY",
    baseUrls: [process.env.QWEN_BASE_URL || INTL_BASE],
    defaultModel: "qwen3.7-flash",
  },
  studio: {
    id: "studio",
    label: "STUDIO",
    quotaHint: "tokens free · limitada",
    secretName: "STUDIO_API_KEY",
    baseUrls: process.env.STUDIO_BASE_URL
      ? [process.env.STUDIO_BASE_URL]
      : [INTL_BASE, CN_BASE],
    defaultModel: "qwen3.7-flash",
  },
};

// Lista estática usada quando /models não responde (offline, segredo
// indisponível). Apenas nomes públicos de modelos — sem credenciais.
const FALLBACK_MODELS: Record<ProviderId, string[]> = {
  qwen: [
    "qwen3.7-flash",
    "qwen3.7-plus",
    "qwen3.8-max",
    "glm-5.2-fast-preview",
    "glm-5.2",
    "ZHIPU/GLM-5.3",
    "deepseek-v4-pro-0813",
    "kimi-k2.7-code",
  ],
  studio: ["qwen-plus", "qwen-turbo", "qwen-max", "deepseek-v3.1", "deepseek-r1"],
};

const GCP_PROJECT = process.env.GCP_PROJECT || "beanstech";
const CACHE_TTL_MS = 5 * 60 * 1000;
const keyCache = new Map<string, { value: string; at: number }>();

// Allowlist de defesa em profundidade para os nomes que compõem o resource
// path do Secret Manager (a própria API do client também rejeita nomes
// malformados — aqui barramos antes de qualquer I/O).
const SECRET_NAME_RE = /^[A-Z][A-Z0-9_]{2,63}$/;
const GCP_PROJECT_RE = /^[a-z][a-z0-9-]{4,48}[a-z0-9]$/;

let smClient: SecretManagerServiceClient | null = null;
function getSecretManagerClient(): SecretManagerServiceClient {
  if (!smClient) smClient = new SecretManagerServiceClient();
  return smClient;
}

/**
 * Lê a chave do provedor: env primeiro (nome fixo do registro), depois do
 * Secret Manager via cliente in-process. Retorna null quando indisponível —
 * o chamador decide o fallback de exibição. A chave permanece em memória.
 */
export async function getApiKey(provider: ProviderId): Promise<string | null> {
  const cfg = PROVIDERS[provider];
  const cached = keyCache.get(cfg.secretName);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.value;

  let value: string | null = process.env[cfg.secretName] || null;
  if (!value) {
    if (!SECRET_NAME_RE.test(cfg.secretName) || !GCP_PROJECT_RE.test(GCP_PROJECT)) {
      return null;
    }
    try {
      const client = getSecretManagerClient();
      const [version] = await client.accessSecretVersion({
        name: `projects/${GCP_PROJECT}/secrets/${cfg.secretName}/versions/latest`,
      });
      const payload = version.payload?.data;
      value = payload ? Buffer.from(payload).toString("utf8").trim() : null;
    } catch {
      value = null; // sem ADC, sem permissão, sem rede → fallback do chamador
    }
  }
  if (value) keyCache.set(cfg.secretName, { value, at: Date.now() });
  return value;
}

/** Lista modelos do provedor. Cai na lista estática em caso de falha. */
export async function listModels(provider: ProviderId): Promise<{
  source: "api" | "fallback";
  models: string[];
}> {
  const key = await getApiKey(provider);
  if (!key) return { source: "fallback", models: FALLBACK_MODELS[provider] };
  const base = await resolveBaseUrl(provider);
  if (!base) return { source: "fallback", models: FALLBACK_MODELS[provider] };
  try {
    const res = await fetch(`${base}/models`, {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return { source: "fallback", models: FALLBACK_MODELS[provider] };
    const json = (await res.json()) as { data?: { id: string }[] };
    const ids = (json.data || []).map((m) => m.id).sort();
    if (!ids.length) return { source: "fallback", models: FALLBACK_MODELS[provider] };
    return { source: "api", models: ids };
  } catch {
    return { source: "fallback", models: FALLBACK_MODELS[provider] };
  }
}

// Resolução de endpoint: testa cada base candidata com GET /models e cacheia
// a que autenticar (chaves regionais devolvem 401 fora da região de origem).
const baseCache = new Map<ProviderId, { base: string | null; at: number }>();

export async function resolveBaseUrl(provider: ProviderId): Promise<string | null> {
  const cfg = PROVIDERS[provider];
  if (cfg.baseUrls.length === 1) return cfg.baseUrls[0];
  const cached = baseCache.get(provider);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.base;

  const key = await getApiKey(provider);
  if (!key) {
    baseCache.set(provider, { base: null, at: Date.now() });
    return null;
  }
  let found: string | null = null;
  for (const base of cfg.baseUrls) {
    try {
      const res = await fetch(`${base}/models`, {
        headers: { Authorization: `Bearer ${key}` },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        found = base;
        break;
      }
    } catch {
      /* tenta o próximo endpoint */
    }
  }
  baseCache.set(provider, { base: found, at: Date.now() });
  return found;
}

export class AiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Uma chamada de chat completion (formato OpenAI). Lança AiError com o
 * status HTTP para o chamador decidir failover.
 *
 * Modelos qwen3.* são híbridos "thinking": sem desabilitar o raciocínio, a
 * resposta vem precedida de um reasoning_content longo (30s+). Para a demo
 * ao vivo interessa a resposta direta — o campo enable_thinking só é enviado
 * a modelos qwen3 (GLM/DeepSeek/Kimi não o aceitam).
 */
export async function chatCompletion(opts: {
  provider: ProviderId;
  model: string;
  messages: { role: "system" | "user"; content: string }[];
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const cfg = PROVIDERS[opts.provider];
  const key = await getApiKey(opts.provider);
  if (!key) throw new AiError("chave indisponível", 401);
  const base = (await resolveBaseUrl(opts.provider)) || cfg.baseUrls[0];

  const isQwen3 = /^qwen3\./.test(opts.model);
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: opts.model,
      messages: opts.messages,
      max_tokens: opts.maxTokens ?? 600,
      temperature: opts.temperature ?? 0.4,
      ...(isQwen3 ? { enable_thinking: false } : {}),
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    // Mensagem genérica: o corpo da API nunca é repassado ao client.
    throw new AiError(`provedor respondeu ${res.status}`, res.status);
  }
  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = json.choices?.[0]?.message?.content?.trim();
  if (!content) throw new AiError("resposta vazia", 502);
  return content;
}
