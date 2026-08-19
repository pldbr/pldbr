"use client";

import ComplianceMatrix from "@/components/ComplianceMatrix";

export default function CompliancePanel() {
  return (
    <div>
      <div className="section-padding pb-0">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compliance Regulatório
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-3xl">
            11 normativos endereçados — da Circular BACEN 3.978/2020 à Lei
            13.259/2016 (Ativos Virtuais). Cada componente auditável com
            guarda WORM de 10 anos.
          </p>
        </div>
      </div>
      <ComplianceMatrix />
    </div>
  );
}
