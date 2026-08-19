import type { Metadata } from "next";
import SitePage from "@/components/SitePage";

export const metadata: Metadata = {
  title: "Política de Privacidade | pldbr.tech",
  description: "Como o site pldbr.tech trata dados pessoais, conforme a Lei 13.709/2018 (LGPD).",
};

export default function PrivacidadePage() {
  return (
    <SitePage
      kicker="Privacidade"
      title="Política de Privacidade"
      lede="Transparência sobre quais dados pessoais este site trata — e quais não trata. Última atualização: agosto de 2026."
    >
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Este site
      </h2>
      <p>
        O site institucional pldbr.tech não exige cadastro, não utiliza cookies
        de rastreamento e não coleta dados pessoais dos visitantes. O dashboard
        de demonstração acessível em <code>/dashboard</code> é alimentado{" "}
        <strong>exclusivamente por dados fictícios</strong>, gerados de forma
        determinística para fins de apresentação — nenhum dado real de cliente
        ou investigado é exibido.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        O motor em produção
      </h2>
      <p>
        O processamento de dados pessoais pelo motor PLD/AML ocorre sob a
        responsabilidade das instituições financeiras clientes (controladoras,
        nos termos da LGPD), com a BeansTech atuando como operadora. Esse
        tratamento decorre de obrigação legal e regulatória — em especial a Lei
        9.613/98, a Circular BACEN 3.978/2020 e as comunicações ao COAF — e é
        registrado em trilha de auditoria imutável (WORM), com guarda de 10
        anos, em região de nuvem no Brasil (southamerica-east1).
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Seus direitos
      </h2>
      <p>
        Titulares de dados tratados por instituições clientes devem exercer
        seus direitos (art. 18 da LGPD) diretamente perante a instituição
        controladora. Para questões sobre esta política ou o site, escreva para{" "}
        <a href="mailto:contato@beanstech.com.br" className="text-[var(--color-accent)]">
          contato@beanstech.com.br
        </a>
        .
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Comunicações
      </h2>
      <p>
        E-mails enviados pelos canais de contato são utilizados apenas para
        responder à solicitação — não há lista de marketing, e nenhuma
        divulgação a terceiros.
      </p>
    </SitePage>
  );
}
