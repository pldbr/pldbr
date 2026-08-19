"use client";

// KycPanel — módulo /kyc: perfil de onboarding fictício com score de risco
// (gauge conic-gradient), bandeira PEP, validação documental (Document AI)
// e vínculos societários do KYB.

import { AlertTriangle, BadgeCheck, FileWarning } from "lucide-react";
import { kycProfile } from "@/lib/demoData";

function RiskGauge({ score }: { score: number }) {
  const color =
    score >= 75 ? "var(--color-danger)" : score >= 50 ? "var(--color-warning)" : "var(--color-success)";
  return (
    <div
      data-tour="kyc-gauge"
      className="relative h-36 w-36 rounded-full flex items-center justify-center"
      style={{
        background: `conic-gradient(${color} ${score * 3.6}deg, var(--color-surface-elevated) 0)`,
      }}
    >
      <div className="absolute inset-[10px] rounded-full bg-[var(--color-surface)] flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tabular-nums" style={{ color }}>{score}</span>
        <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)]">
          score risco
        </span>
      </div>
    </div>
  );
}

export default function KycPanel() {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold">KYC / KYB — <span className="text-[var(--color-text-secondary)] font-normal">{kycProfile.cliente}</span></h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Document AI + DLP · onboarding contínuo · dados fictícios
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card !p-6 flex flex-col items-center gap-4">
          <RiskGauge score={kycProfile.scoreRisco} />
          {kycProfile.pep && (
            <span className="badge badge-danger flex items-center gap-1.5">
              <AlertTriangle size={11} /> PEP
            </span>
          )}
        </div>

        <div className="glass-card !p-6 md:col-span-2 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
              Fonte de renda declarada
            </p>
            <p className="text-sm">{kycProfile.fonteRenda}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
              Alerta PEP
            </p>
            <p className="text-sm text-[var(--color-warning)]">{kycProfile.pepDetalhe}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
              Documentos
            </p>
            <ul className="space-y-2">
              {kycProfile.documentos.map((d) => (
                <li key={d.doc} className="flex items-center gap-2.5 text-sm">
                  {d.status === "validado" ? (
                    <BadgeCheck size={15} className="text-[var(--color-success)] shrink-0" />
                  ) : (
                    <FileWarning size={15} className="text-[var(--color-warning)] shrink-0" />
                  )}
                  <span className="flex-1">{d.doc}</span>
                  <span className="text-xs text-[var(--color-text-secondary)] font-mono">{d.via}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="glass-card !p-6" data-tour="kyc-kyb">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-2xl font-bold">{kycProfile.kyb.socios}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              sócios · {kycProfile.kyb.sociosPEP} PEP
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">{kycProfile.kyb.empresasVinculadas}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">empresas vinculadas</p>
          </div>
          <div>
            <p className="text-sm font-semibold leading-6 mt-1.5">
              {kycProfile.kyb.jurisdicoes.join(" · ")}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">jurisdições</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
              Alerta KYB
            </p>
            <p className="text-sm text-[var(--color-danger)]">{kycProfile.kyb.alerta}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
