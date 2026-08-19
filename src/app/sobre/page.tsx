import type { Metadata } from "next";
import SitePage from "@/components/SitePage";

export const metadata: Metadata = {
  title: "Sobre a BeansTech | pldbr.tech",
  description:
    "Beans Tech Inova Simples (I.S.) — CNPJ 64.160.205/0001-17, São Paulo. Criadora do motor PLD/AML pldbr.tech.",
};

export default function SobrePage() {
  return (
    <SitePage
      kicker="Institucional"
      title="Sobre a BeansTech"
      lede="Uma empresa de infraestrutura de inteligência artificial para o sistema financeiro brasileiro — nascida em São Paulo, operando em nuvem soberana."
    >
      <p>
        A Beans Tech Inova Simples (I.S.), CNPJ 64.160.205/0001-17, com sede em
        São Paulo, desenvolve o motor de prevenção à lavagem de dinheiro que
        opera este site: o pldbr.tech. O motor está em produção no Google Cloud
        Platform, região <code>southamerica-east1</code> (São Paulo) — dados
        processados e armazenados em território nacional.
      </p>
      <p>
        O que o motor faz, em uma frase: examina milhões de transações por mês
        em três camadas independentes de detecção, rastreia criptomoedas em
        blockchains públicas, gera e assina as comunicações ao COAF e preserva
        a cadeia de custódia da prova digital — com a tecnologia disponível,
        em cessão, aos órgãos de investigação.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Contato
      </h2>
      <p>
        Matheus Feijão —{" "}
        <a href="mailto:matheus@beanstech.com.br" className="text-[var(--color-accent)]">
          matheus@beanstech.com.br
        </a>
        <br />
        (11) 96650-7100 · São Paulo, Brasil
        <br />
        GitHub:{" "}
        <a
          href="https://github.com/beanstechhub"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)]"
        >
          github.com/beanstechhub
        </a>
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Este site
      </h2>
      <p>
        Este repositório público contém o site institucional, a documentação de
        referência (playbook de investigação de criptoativos, glossário e
        trilha didática) e o dashboard de demonstração — este último alimentado
        exclusivamente por dados fictícios, claramente identificados. O código
        do motor e os ambientes de produção permanecem sob acesso controlado.
      </p>
    </SitePage>
  );
}
