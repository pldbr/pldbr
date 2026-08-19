"use client";

import TerminalCode from "@/components/TerminalCode";
import MetricsGrid from "@/components/MetricsGrid";
import DetectionEngine from "@/components/DetectionEngine";
import Architecture from "@/components/Architecture";

export default function MotorPanel() {
  return (
    <div>
      <div className="section-padding">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Motor de Detecção PLD/AML
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-3xl mb-2">
            FastAPI + 3 sidecars Go (Screener FAISS, Blocker OPA, Rules Engine)
            em Cloud Run. Deployado em produção no GCP (beanstech-pld-prod,
            southamerica-east1). 25 tipologias YAML production-ready com
            hot-reload, backtesting de 90 dias e CI/CD via Cloud Build.
          </p>
        </div>
      </div>
      <TerminalCode />
      <MetricsGrid />
      <DetectionEngine />
      <Architecture />
    </div>
  );
}
