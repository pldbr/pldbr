"use client";

import EcosystemDiagram from "@/components/EcosystemDiagram";
import PlatformsGrid from "@/components/PlatformsGrid";

export default function EcossistemaPanel() {
  return (
    <div>
      <div className="section-padding pb-0">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ecossistema Fintech Integrado
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-3xl">
            O motor PLD opera como núcleo central. 12+ plataformas compartilham
            dados via BigQuery e usam o motor PLD como base de detecção.
          </p>
        </div>
      </div>
      <EcosystemDiagram />
      <PlatformsGrid />
    </div>
  );
}
