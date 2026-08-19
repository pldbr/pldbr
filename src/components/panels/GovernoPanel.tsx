"use client";

import GovernmentModule from "@/components/GovernmentModule";
import PanelHeader from "@/components/PanelHeader";

export default function GovernoPanel() {
  return (
    <div>
      <PanelHeader
        kicker="Cessão ao setor público"
        title="Tecnologia de investigação à disposição do Estado"
        lede="A cessão de tecnologia — modalidade prevista no Decreto 9.507/2018 — permite que MPF, Polícia Federal, COAF e Bacen recebam este motor sem custo de licitação: instalado na própria infraestrutura do órgão (on-premise) ou em nuvem governamental, com dados sob exclusivo controle do Estado. O órgão opera a detecção com a mesma stack de produção: rastreio cripto, geração de RIF e cadeia de custódia da prova digital nos termos dos arts. 158-A a 158-F do CPP."
      />
      <GovernmentModule />
    </div>
  );
}
