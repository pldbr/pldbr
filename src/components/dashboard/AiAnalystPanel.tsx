"use client";

// AiAnalystPanel — Analista IA do dashboard de demonstração.
//
// Multi-provedor (QWEN cota maior / STUDIO cota free) e multi-modelo (Qwen,
// GLM, DeepSeek, Kimi…): os modelos são descobertos em runtime via
// /api/ai/models (GET /models do Model Studio), com lista estática de
// fallback. A análise sai de /api/ai/analyze, que faz failover automático de
// cota entre provedores — o selo "servedBy" mostra quem atendeu. Sem rede ou
// sem chave, cai na análise mock determinística: a demo nunca quebra.

import { useCallback, useEffect, useRef, useState } from "react";
import type { Alert } from "@/lib/demoData";
import { alerts } from "@/lib/demoData";
import { Sparkles, RefreshCw } from "lucide-react";

interface ServedBy {
  provider: string | null;
  model: string | null;
  failover: boolean;
}

interface AnalyzeResult {
  analise: string;
  servedBy: ServedBy;
  offline: boolean;
  elapsedMs: number;
}

const PROVIDER_OPTIONS = [
  { id: "qwen", label: "QWEN — melhores modelos · cota maior" },
  { id: "studio", label: "STUDIO — tokens free · limitada" },
] as const;

type ProviderId = (typeof PROVIDER_OPTIONS)[number]["id"];

// Lista estática imediata: o painel é utilizável no instante em que abre,
// sem esperar a descoberta ao vivo (que pode levar segundos na 1ª chamada).
const STATIC_MODELS: Record<ProviderId, string[]> = {
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
  studio: ["qwen3.7-flash", "qwen-plus", "qwen-turbo", "qwen-max", "deepseek-v3.1", "deepseek-r1"],
};

function preferredModel(list: string[]): string {
  return (
    list.find((m) => m === "qwen3.7-flash") ||
    list.find((m) => m.startsWith("qwen")) ||
    list[0] ||
    ""
  );
}

// markdown-lite: **negrito** → <strong>, linha a linha
function renderInline(text: string, keyBase: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyBase}-${i}`} className="text-[var(--color-accent)]">{p}</strong>
    ) : (
      <span key={`${keyBase}-${i}`}>{p}</span>
    )
  );
}

export default function AiAnalystPanel({
  alert,
  onChangeAlert,
}: {
  alert: Alert;
  onChangeAlert: (a: Alert) => void;
}) {
  const [provider, setProvider] = useState<ProviderId>("qwen");
  const [models, setModels] = useState<string[]>(STATIC_MODELS.qwen);
  const [model, setModel] = useState(preferredModel(STATIC_MODELS.qwen));
  const [modelsSource, setModelsSource] = useState<"api" | "fallback" | "loading">("loading");

  // Descobre a lista ao vivo com retry — o painel já está funcional com a
  // lista estática enquanto isso; ao chegar, a lista é trocada mantendo a
  // seleção atual quando possível.
  useEffect(() => {
    let alive = true;
    setModelsSource("loading");
    let attempt = 0;
    const fetchModels = async (): Promise<{ source: "api" | "fallback"; models: string[] } | null> => {
      try {
        const r = await fetch(`/api/ai/models?provider=${provider}`);
        if (!r.ok) return null;
        return await r.json();
      } catch {
        return null;
      }
    };
    const run = async () => {
      const j = await fetchModels();
      if (!alive) return;
      if (j && j.source === "api" && j.models.length) {
        setModels(j.models);
        setModelsSource("api");
        setModel((cur) => (j.models.includes(cur) ? cur : preferredModel(j.models)));
        return;
      }
      attempt += 1;
      if (attempt < 3) {
        setTimeout(run, 1500);
      } else if (j && j.models?.length) {
        setModels(j.models);
        setModelsSource("fallback");
      } else {
        // mantém a lista estática já exibida
        setModelsSource("fallback");
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [provider]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [typed, setTyped] = useState("");
  const typerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTyper = useCallback(() => {
    if (typerRef.current) {
      clearInterval(typerRef.current);
      typerRef.current = null;
    }
  }, []);

  useEffect(() => stopTyper, [stopTyper]);

  const analyze = useCallback(async () => {
    stopTyper();
    setTyped("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId: alert.id, provider, model }),
      });
      const j: AnalyzeResult = await res.json();
      setResult(j);
      // efeito digitação para o vídeo
      let i = 0;
      typerRef.current = setInterval(() => {
        i += 3;
        setTyped(j.analise.slice(0, i));
        if (i >= j.analise.length) stopTyper();
      }, 10);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [alert.id, provider, model, stopTyper]);

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles size={18} className="text-[var(--color-accent)]" />
          Analista IA — multi-provedor · multi-modelo
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Alibaba Cloud Model Studio · failover automático de cota · Qwen / GLM / DeepSeek / Kimi
        </p>
      </div>

      {/* alerta em análise */}
      <div className="glass-card !p-5">
        <div className="flex flex-wrap items-center gap-4">
          <label className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
            Alerta
          </label>
          <select
            data-tour="ai-alert"
            value={alert.id}
            onChange={(e) => {
              const a = alerts.find((x) => x.id === e.target.value);
              if (a) onChangeAlert(a);
            }}
            className="glass-card !p-2.5 !py-2 bg-[var(--color-surface-elevated)] text-sm outline-none cursor-pointer"
          >
            {alerts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} · {a.typology.code} · score {a.score}
              </option>
            ))}
          </select>
          <div className="flex-1 min-w-[220px] text-sm">
            <span className="text-[var(--color-text-secondary)] text-xs">{alert.typology.name}</span>
            <span className="block font-mono text-xs mt-0.5">
              {alert.cliente} ·{" "}
              {alert.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>

      {/* controles */}
      <div className="glass-card !p-5 flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5">
            Provedor (chave do Secret Manager)
          </label>
          <select
            data-tour="ai-provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value as ProviderId)}
            className="glass-card !p-2.5 !py-2 bg-[var(--color-surface-elevated)] text-sm outline-none cursor-pointer min-w-[200px]"
          >
            {PROVIDER_OPTIONS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>

        <div className="min-w-[220px]">
          <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5">
            Modelo{" "}
            {modelsSource === "api" && (
              <span className="badge badge-success ml-1">{models.length} ao vivo</span>
            )}
            {modelsSource === "fallback" && <span className="badge ml-1">lista estática</span>}
            {modelsSource === "loading" && <span className="badge ml-1">lista estática · buscando ao vivo…</span>}
          </label>
          <select
            data-tour="ai-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="glass-card !p-2.5 !py-2 bg-[var(--color-surface-elevated)] text-sm outline-none cursor-pointer w-full font-mono"
          >
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <button
          data-tour="ai-analyze"
          onClick={analyze}
          disabled={loading || !model}
          className="cta-primary flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
          {loading ? "Analisando…" : "Analisar com IA"}
        </button>
      </div>

      {/* resultado */}
      <div className="glass-card !p-6 min-h-[280px]" data-tour="ai-result">
        {!result && !loading && (
          <p className="text-sm text-[var(--color-text-secondary)]">
            Selecione provedor e modelo e clique em <strong>Analisar com IA</strong>. A resposta
            vem do Model Studio em tempo real; sem rede, entra a análise determinística de demo.
          </p>
        )}
        {loading && (
          <p className="text-sm text-[var(--color-text-secondary)] animate-pulse">
            Consultando {model || "modelo"} via {provider.toUpperCase()}…
          </p>
        )}
        {result && (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.offline ? (
                <span className="badge badge-warning">MODO OFFLINE — análise determinística</span>
              ) : (
                <span className="badge badge-success">
                  servido por {result.servedBy.provider?.toUpperCase()} · {result.servedBy.model}
                </span>
              )}
              {result.servedBy.failover && (
                <span className="badge badge-danger">FAILOVER DE COTA → {result.servedBy.provider?.toUpperCase()}</span>
              )}
              <span className="badge">{result.elapsedMs.toLocaleString("pt-BR")} ms</span>
            </div>
            <div className="text-sm leading-7 space-y-1">
              {typed.split("\n").map((line, i) => (
                <p key={i}>
                  {line.trim() === "" ? "\u00A0" : renderInline(line, `l${i}`)}
                </p>
              ))}
              {typed.length < result.analise.length && (
                <span className="inline-block w-2 h-4 bg-[var(--color-accent)] animate-pulse" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
