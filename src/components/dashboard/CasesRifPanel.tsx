"use client";

// CasesRifPanel — módulo /cases + /rif: casos com status, timeline de
// investigação e o ciclo RIF/SISCOAF com assinatura ICP-Brasil via Cloud KMS
// (HSM) e guarda WORM de 10 anos.

import { cases } from "@/lib/demoData";
import { FileSignature, Archive } from "lucide-react";

const statusBadge: Record<string, { cls: string; label: string }> = {
  investigacao: { cls: "badge badge-accent", label: "INVESTIGAÇÃO" },
  aguardando_rif: { cls: "badge badge-warning", label: "AGUARDANDO RIF" },
  reportado: { cls: "badge badge-success", label: "REPORTADO AO COAF" },
  arquivado: { cls: "badge", label: "ARQUIVADO" },
};

export default function CasesRifPanel() {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold">Casos & RIF/SISCOAF</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Comunicação automática · assinatura ICP-Brasil (Cloud KMS · HSM) · guarda WORM 10 anos
        </p>
      </div>

      <div className="relative space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-[var(--color-border)]">
        {cases.map((c) => {
          const st = statusBadge[c.status];
          return (
            <div key={c.id} className="relative pl-8" data-tour={`case-${c.id}`}>
              <span
                className={`absolute left-0 top-6 h-[15px] w-[15px] rounded-full border-2 ${
                  c.status === "reportado"
                    ? "bg-[var(--color-success)] border-[var(--color-success)]"
                    : c.status === "aguardando_rif"
                      ? "bg-[var(--color-bg)] border-[var(--color-warning)]"
                      : "bg-[var(--color-bg)] border-[var(--color-accent)]"
                }`}
              />
              <div className="glass-card !p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-[var(--color-accent)]">{c.id}</span>
                  <span className="font-semibold text-sm flex-1 min-w-[200px]">{c.titulo}</span>
                  <span className={st.cls}>{st.label}</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-xs text-[var(--color-text-secondary)]">
                  <span>
                    alertas:{" "}
                    {c.alertas.map((a) => (
                      <code key={a} className="font-mono text-[var(--color-text-primary)]">{a} </code>
                    ))}
                  </span>
                  <span>atualizado {c.atualizado}</span>

                  {c.rif.status === "assinado" && (
                    <span className="badge badge-success items-center gap-1.5">
                      <FileSignature size={11} /> {c.rif.protocolo} · ICP-Brasil
                    </span>
                  )}
                  {c.rif.status === "pendente" && (
                    <span className="badge badge-warning">RIF em geração…</span>
                  )}
                  {c.rif.worm && (
                    <span className="badge flex items-center gap-1.5">
                      <Archive size={11} /> WORM 10 anos
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card !p-5 text-sm text-[var(--color-text-secondary)] flex flex-wrap gap-x-6 gap-y-2">
        <span>Lei 9.613/98 · Lei 13.259/2016</span>
        <span>COAF/SISCOAF — prazo de comunicação 24h úteis</span>
        <span>trilha de auditoria imutável</span>
      </div>
    </div>
  );
}
