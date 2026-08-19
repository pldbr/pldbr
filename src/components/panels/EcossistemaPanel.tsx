"use client";

import EcosystemDiagram from "@/components/EcosystemDiagram";
import PlatformsGrid from "@/components/PlatformsGrid";
import PanelHeader from "@/components/PanelHeader";

export default function EcossistemaPanel() {
  return (
    <div>
      <PanelHeader
        kicker="Ecossistema"
        title="Por que mais dados significa mais detecção"
        lede="A lavagem atravessa instituições: o dinheiro entra por um banco, passa por uma fintech, sai em cripto. Um motor que enxerga apenas uma fatia vê apenas um fragmento. Aqui, mais de doze plataformas — de crédito a tributos — compartilham sinais via BigQuery (sem expor dado pessoal desnecessário), e o motor cruza o conjunto: o padrão invisível isoladamente torna-se evidente no todo."
      />
      <EcosystemDiagram />
      <PlatformsGrid />
    </div>
  );
}
