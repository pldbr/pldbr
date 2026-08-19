// POST /api/ai/analyze — Analista IA do dashboard de demonstração.
//
// Body: { alertId: string, provider: "qwen"|"studio", model: string }
//
// Comportamento:
//   1. Tenta o provedor escolhido no seletor.
//   2. Se falhar por cota (429), chave (401/403) ou erro transitório, faz
//      FAILOVER automático para o outro provedor (a preocupação de cota da
//      chave STUDIO free é absorvida aqui).
//   3. Se tudo falhar, devolve a análise mock determinística — a gravação
//      do vídeo nunca quebra.
//
// A resposta informa quem atendeu (servedBy) para o selo do painel:
//   { analise, servedBy: { provider, model, failover }, offline }

import { NextRequest, NextResponse } from "next/server";
import {
  PROVIDERS,
  AiError,
  chatCompletion,
  type ProviderId,
} from "@/lib/aiProviders";
import { alerts, mockAnalysis } from "@/lib/demoData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = [
  "Você é um analista de PLD/AML sênior de instituição financeira brasileira.",
  "Analise o alerta fornecido e responda em português do Brasil, markdown,",
  "com no máximo 350 palavras, nesta estrutura:",
  "1. **Resumo do risco** (2 frases)",
  "2. **Fundamentos** (3 itens citando a tipologia e a Carta-Circular BACEN 4.001/2020)",
  "3. **Recomendações** (3 ações práticas: caso, RIF/SISCOAF, KYC/KYB)",
  "4. **Próximo passo** (1 frase decisiva)",
  "Contexto: ambiente de demonstração com dados fictícios. Nunca invente",
  "dados reais de pessoas ou empresas. Seja técnico e direto.",
].join(" ");

function userPrompt(alert: (typeof alerts)[number]): string {
  const valor = alert.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
  return [
    `Alerta ${alert.id} — severity ${alert.severity}, score ${alert.score}/100.`,
    `Tipologia: ${alert.typology.code} — ${alert.typology.name} (camada: ${alert.typology.layer}).`,
    `Entidade fictícia: ${alert.cliente}; ${alert.entidades} entidades vinculadas.`,
    `Valor envolvido: ${valor}. Idade do alerta: ${alert.idadeMin} min. Status: ${alert.status}.`,
  ].join("\n");
}

export async function POST(req: NextRequest) {
  const started = Date.now();
  let body: { alertId?: string; provider?: string; model?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "body inválido" }, { status: 400 });
  }

  const alert = alerts.find((a) => a.id === body.alertId) || alerts[0];
  const primary: ProviderId = body.provider === "studio" ? "studio" : "qwen";
  const secondary: ProviderId = primary === "qwen" ? "studio" : "qwen";
  const requestedModel = body.model || PROVIDERS[primary].defaultModel;

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: userPrompt(alert) },
  ];

  // 1) provedor escolhido → 2) failover → 3) mock offline
  for (const [i, provider] of [primary, secondary].entries()) {
    const model =
      i === 0 ? requestedModel : PROVIDERS[provider].defaultModel;
    // GLM (Zhipu) ignora enable_thinking: o raciocínio consome o orçamento
    // de tokens antes do content — por isso recebe verba maior.
    const maxTokens = /glm|ZHIPU/i.test(model) ? 2048 : 700;
    try {
      const analise = await chatCompletion({ provider, model, messages, maxTokens });
      return NextResponse.json({
        analise,
        alertId: alert.id,
        servedBy: { provider, model, failover: i === 1 },
        offline: false,
        elapsedMs: Date.now() - started,
      });
    } catch (e) {
      const status = e instanceof AiError ? e.status : 0;
      // 4xx de cota/chave → tenta o outro provedor. Outros erros (rede,
      // timeout) também seguem para o failover; se ambos falharem, mock.
      continue;
    }
  }

  return NextResponse.json({
    analise: mockAnalysis(alert),
    alertId: alert.id,
    servedBy: { provider: null, model: null, failover: false },
    offline: true,
    elapsedMs: Date.now() - started,
  });
}
