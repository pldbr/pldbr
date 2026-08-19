"use client";

import TerminalCode from "@/components/TerminalCode";
import MetricsGrid from "@/components/MetricsGrid";
import DetectionEngine from "@/components/DetectionEngine";
import Architecture from "@/components/Architecture";
import PanelHeader from "@/components/PanelHeader";

export default function MotorPanel() {
  return (
    <div>
      <PanelHeader
        kicker="O motor"
        title="Como o dinheiro suspeito é detectado"
        lede="Cada transação passa por três camadas independentes de análise. A primeira são regras escritas por especialistas — as tipologias, padrões documentados de lavagem. A segunda é um modelo estatístico treinado em casos já confirmados. A terceira aprende sozinha o que é normal para cada cliente e sinaliza o desvio. Abaixo, uma tipologia real em produção: legível, versionada em Git e recarregável sem interromper o sistema."
      />
      <TerminalCode />
      <MetricsGrid />
      <DetectionEngine />
      <Architecture />
    </div>
  );
}
