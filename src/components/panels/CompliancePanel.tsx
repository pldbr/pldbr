"use client";

import ComplianceMatrix from "@/components/ComplianceMatrix";
import PanelHeader from "@/components/PanelHeader";

export default function CompliancePanel() {
  return (
    <div>
      <PanelHeader
        kicker="Conformidade"
        title="Cada norma, atendida e demonstrável"
        lede="Conformidade não é selo: é capacidade de provar. Onze normativos são endereçados — da Lei 9.613/98 (que define o crime e as obrigações) à Circular BACEN 3.978/2020 (que regulamenta o programa de PLD das instituições) e à Lei 13.259/2016 (ativos virtuais). Cada exigência tem controle correspondente, trilha de auditoria e guarda imutável WORM de 10 anos — verificável em fiscalização, não apenas declarada em papel."
      />
      <ComplianceMatrix />
    </div>
  );
}
