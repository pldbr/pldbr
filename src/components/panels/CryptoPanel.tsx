"use client";

import CryptoIntelligence from "@/components/CryptoIntelligence";
import PanelHeader from "@/components/PanelHeader";

export default function CryptoPanel() {
  return (
    <div>
      <PanelHeader
        kicker="Crypto Intelligence"
        title="O rastro que a blockchain não apaga"
        lede="A crença comum de que criptomoeda é anônima é, para fins investigativos, um equívoco útil: toda transação é registrada publicamente, para sempre. O módulo percorre esse registro — segue os saltos entre carteiras, identifica passagens por mixers (serviços que embaralham a origem dos fundos), agrupa carteiras de um mesmo controlador em clusters e mede o contato com endereços sancionados. O resultado é um relatório forense assinado com certificado ICP-Brasil, apto a instruir inquérito."
      />
      <CryptoIntelligence />
    </div>
  );
}
