"use client";

// AlertsQueue — fila de alertas (módulo /alerts). Cada linha mostra a
// tipologia (das 25 YAML), severidade, score e a camada de detecção que
// gerou o alerta (regras · ML supervisionado · ML não supervisionado).

import type { Alert } from "@/lib/demoData";
import { alerts } from "@/lib/demoData";
import { Sparkles } from "lucide-react";

const sevBadge: Record<Alert["severity"], string> = {
  critical: "badge badge-danger",
  high: "badge badge-warning",
  medium: "badge badge-accent",
  low: "badge badge-success",
};

const sevLabel: Record<Alert["severity"], string> = {
  critical: "CRÍTICO",
  high: "ALTO",
  medium: "MÉDIO",
  low: "BAIXO",
};

interface Props {
  selectedId: string;
  onSelect: (a: Alert) => void;
  onAnalyze: (a: Alert) => void;
}

export default function AlertsQueue({ selectedId, onSelect, onAnalyze }: Props) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Fila de alertas</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {alerts.length} alertas · ordenados por score · 3 camadas de detecção ativas
          </p>
        </div>
        <span className="badge badge-success">TEMPO REAL</span>
      </div>

      <div className="glass-card !p-0 overflow-hidden" data-tour="alerts-table">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
              <th className="px-4 py-3 font-medium">Alerta</th>
              <th className="px-4 py-3 font-medium">Tipologia</th>
              <th className="px-4 py-3 font-medium">Entidade (fictícia)</th>
              <th className="px-4 py-3 font-medium text-right">Valor</th>
              <th className="px-4 py-3 font-medium">Camada</th>
              <th className="px-4 py-3 font-medium">Severidade</th>
              <th className="px-4 py-3 font-medium w-28">Score</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => {
              const selected = a.id === selectedId;
              return (
                <tr
                  key={a.id}
                  data-tour={`alert-${a.id}`}
                  onClick={() => onSelect(a)}
                  className={`border-b border-[var(--color-border)]/50 cursor-pointer transition-colors ${
                    selected
                      ? "bg-[var(--color-accent)]/10"
                      : "hover:bg-[var(--color-surface)]"
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-xs">{a.id}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-[var(--color-accent)]">{a.typology.code}</span>
                    <span className="block text-xs text-[var(--color-text-secondary)] max-w-[220px] truncate">
                      {a.typology.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-[180px] truncate">{a.cliente}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs tabular-nums">
                    {a.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-[var(--color-text-secondary)] whitespace-nowrap">
                      {a.typology.layer}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={sevBadge[a.severity]}>{sevLabel[a.severity]}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-[var(--color-surface-elevated)] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            a.score >= 85
                              ? "bg-[var(--color-danger)]"
                              : a.score >= 70
                                ? "bg-[var(--color-warning)]"
                                : "bg-[var(--color-accent)]"
                          }`}
                          style={{ width: `${a.score}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs tabular-nums w-7 text-right">{a.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      data-tour={`analyze-${a.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAnalyze(a);
                      }}
                      className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Sparkles size={12} />
                      IA
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[var(--color-text-secondary)] opacity-70 mt-3">
        Clique em uma linha para selecionar · “IA” envia o alerta ao Analista IA (multi-modelo)
      </p>
    </div>
  );
}
