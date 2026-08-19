"use client";

import GovernmentModule from "@/components/GovernmentModule";

export default function GovernoPanel() {
  return (
    <div>
      <div className="section-padding pb-0">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cessão de Tecnologia ao Governo
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-3xl">
            Disponível para MPF, Polícia Federal, COAF, Bacen e demais órgãos.
            Deploy on-premise ou GCP Government Cloud com soberania total.
          </p>
        </div>
      </div>
      <GovernmentModule />
    </div>
  );
}
