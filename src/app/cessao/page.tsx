import type { Metadata } from "next";
import SitePage from "@/components/SitePage";

export const metadata: Metadata = {
  title: "Cessão de Tecnologia ao Setor Público | pldbr.tech",
  description:
    "Base legal (Decreto 9.507/2018), modalidades e destinatários da cessão do motor PLD/AML a órgãos de investigação.",
};

export default function CessaoPage() {
  return (
    <SitePage
      kicker="Setor público"
      title="Cessão de tecnologia: o que é e como funciona"
      lede="A legislação brasileira permite que a Administração Pública receba tecnologia de interesse nacional sem custo de licitação. Este documento explica a base legal e as condições da cessão do motor PLD/AML."
    >
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Base legal
      </h2>
      <p>
        O <strong>Decreto nº 9.507/2018</strong> disciplina a cessão de bens e
        direitos da União — modalidade também aplicável à entrega de tecnologia
        por particulares ao poder público, complementada pela{" "}
        <strong>IN SLTI nº 01/2019</strong> para bens imateriais. Na prática: o
        órgão recebe a tecnologia por termo próprio, sem ônus de aquisição.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Modalidades de entrega
      </h2>
      <p>
        <strong>On-premise:</strong> o motor é instalado na infraestrutura
        física do órgão — nada sai da rede institucional.{" "}
        <strong>Nuvem governamental:</strong> implantação em região restrita a
        órgãos públicos, com criptografia gerenciada pelo próprio Estado
        (CMEK) e controles de perímetro (VPC Service Controls). Em ambas, os
        dados ficam sob exclusivo controle do órgão.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Destinatários
      </h2>
      <p>
        Ministério Público Federal e Ministérios Públicos estaduais, Polícia
        Federal, COAF, Banco Central e demais órgãos com atribuição legal de
        prevenção e repressão à lavagem de dinheiro.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        O que o órgão recebe
      </h2>
      <p>
        Detecção em três camadas com 25 tipologias auditáveis; rastreamento de
        criptomoedas em quatro blockchains; geração e assinatura ICP-Brasil de
        comunicações ao COAF; trilha de auditoria imutável (WORM, 10 anos) e
        relatórios com cadeia de custódia da prova digital nos termos dos
        arts. 158-A a 158-F do Código de Processo Penal.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Manifestação de interesse
      </h2>
      <p>
        Órgãos interessados podem solicitar demonstração técnica e memorial
        descritivo pelo e-mail{" "}
        <a href="mailto:contato@beanstech.com.br" className="text-[var(--color-accent)]">
          contato@beanstech.com.br
        </a>
        .
      </p>
    </SitePage>
  );
}
