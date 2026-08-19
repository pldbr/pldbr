"use client";

// BlockingPanel — módulo /blocking: bloqueios preventivos decididos pelo
// sidecar Go Blocker OPA, com a policy que disparou e o motivo.

import { blockings } from "@/lib/demoData";
import { Lock } from "lucide-react";

const totalHoje = blockings.reduce((s, b) => s + b.valor, 0);

export default function BlockingPanel() {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Blocking — policy engine OPA</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Bloqueios preventivos em tempo real · sidecar Go · p95 9 ms (demo)
          </p>
        </div>
        <div className="text-right" data-tour="blocking-total">
          <p className="text-2xl font-bold text-[var(--color-danger)] tabular-nums">
            {totalHoje.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            bloqueados nas últimas horas (fictício)
          </p>
        </div>
      </div>

      <div className="glass-card !p-0 overflow-hidden" data-tour="blocking-table">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Conta</th>
              <th className="px-4 py-3 font-medium">Policy OPA</th>
              <th className="px-4 py-3 font-medium">Motivo</th>
              <th className="px-4 py-3 font-medium text-right">Valor</th>
              <th className="px-4 py-3 font-medium">Quando</th>
            </tr>
          </thead>
          <tbody>
            {blockings.map((b) => (
              <tr key={b.id} className="border-b border-[var(--color-border)]/50">
                <td className="px-4 py-3 font-mono text-xs">
                  <span className="flex items-center gap-1.5">
                    <Lock size={11} className="text-[var(--color-danger)]" />
                    {b.id}
                  </span>
                </td>
                <td className="px-4 py-3">{b.conta}</td>
                <td className="px-4 py-3">
                  <code className="font-mono text-xs px-2 py-1 rounded bg-[var(--color-surface-elevated)] text-[var(--color-accent)]">
                    {b.regraOpa}
                  </code>
                </td>
                <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)]">{b.motivo}</td>
                <td className="px-4 py-3 text-right font-mono text-xs tabular-nums">
                  {b.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                </td>
                <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)]">{b.ha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--color-text-secondary)] opacity-70">
        Desbloqueio requer dupla aprovação (quatro olhos) registrada no audit trail WORM.
      </p>
    </div>
  );
}
