"use client";

import CryptoIntelligence from "@/components/CryptoIntelligence";

export default function CryptoPanel() {
  return (
    <div>
      <div className="section-padding pb-0">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Inteligência de Criptomoedas
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-3xl">
            Módulo integrado ao motor PLD/AML para rastreio on-chain, detecção
            de mixers/tumblers, de-anonimização e geração de relatórios forenses
            com assinatura ICP-Brasil. Pronto para cessão ao MPF.
          </p>
        </div>
      </div>
      <CryptoIntelligence />
    </div>
  );
}
