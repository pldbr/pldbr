"use client";

// ScreeningPanel — módulo /screening: busca simulada contra listas
// restritivas (OFAC SDN, ONU, UE, CEAF) com percentual de match e ação
// recomendada. Dados fictícios; a busca filtra de verdade na lista demo.

import { useMemo, useState } from "react";
import { screeningHits } from "@/lib/demoData";

export default function ScreeningPanel() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return screeningHits;
    return screeningHits.filter((h) => h.nome.toLowerCase().includes(term));
  }, [q]);

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold">Screening de sanções</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          OFAC SDN · ONU · UE · CEAF — Screener FAISS (sidecar Go) · p95 41 ms (demo)
        </p>
      </div>

      <div className="relative">
        <input
          data-tour="screening-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar entidade fictícia… (ex.: DEMO, PETROV)"
          className="w-full glass-card !p-4 bg-transparent text-sm outline-none focus:border-[var(--color-accent)] placeholder:text-[var(--color-text-secondary)]/60"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-secondary)]">
          {filtered.length} resultados
        </span>
      </div>

      <div className="space-y-3" data-tour="screening-results">
        {filtered.map((h) => (
          <div
            key={h.nome}
            className="glass-card !p-5 flex flex-col md:flex-row md:items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold font-mono text-sm">{h.nome}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {h.listas.length ? (
                  h.listas.map((l) => (
                    <span key={l} className="badge badge-danger">{l}</span>
                  ))
                ) : (
                  <span className="badge badge-success">SEM MATCH</span>
                )}
                <span className="badge">{h.tipo === "pessoa" ? "PESSOA" : "EMPRESA"}</span>
              </div>
            </div>

            <div className="w-full md:w-48">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--color-text-secondary)]">match</span>
                <span className="font-mono tabular-nums">
                  {h.match.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--color-surface-elevated)] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    h.match >= 85
                      ? "bg-[var(--color-danger)]"
                      : h.match >= 60
                        ? "bg-[var(--color-warning)]"
                        : "bg-[var(--color-success)]"
                  }`}
                  style={{ width: `${h.match}%` }}
                />
              </div>
            </div>

            <div className="md:w-56">
              <span
                className={`text-xs font-medium ${
                  h.match >= 85
                    ? "text-[var(--color-danger)]"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {h.acao}
              </span>
            </div>
          </div>
        ))}
        {!filtered.length && (
          <p className="text-sm text-[var(--color-text-secondary)]">
            Nenhum resultado na lista de demonstração para “{q}”.
          </p>
        )}
      </div>
    </div>
  );
}
