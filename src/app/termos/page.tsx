import type { Metadata } from "next";
import SitePage from "@/components/SitePage";

export const metadata: Metadata = {
  title: "Termos de Uso | pldbr.tech",
  description: "Condições de uso do site institucional e do dashboard de demonstração do motor PLD/AML BeansTech.",
};

export default function TermosPage() {
  return (
    <SitePage
      kicker="Termos"
      title="Termos de Uso"
      lede="Condições simples e claras para o uso deste site público. Última atualização: agosto de 2026."
    >
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Natureza do conteúdo
      </h2>
      <p>
        Este site é institucional e informativo. Descreve a tecnologia do
        motor PLD/AML da BeansTech com base em sua configuração real de
        produção; indicações de desempenho referem-se a medições internas e
        não constituem garantia contratual.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Dashboard de demonstração
      </h2>
      <p>
        A rota <code>/dashboard</code> é um ambiente de demonstração cujos
        dados são <strong>inteiramente fictícios</strong> e assim identificados
        em tela. Nomes, valores, endereços de blockchain e alertas não
        correspondem a pessoas, empresas ou operações reais. O conteúdo das
        análises geradas por inteligência artificial é sugestivo e didático,
        não constituindo parecer, laudo ou recomendação jurídica.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Propriedade intelectual
      </h2>
      <p>
        Os conteúdos públicos deste repositório são divulgados para
        conhecimento da tecnologia. O código-fonte do motor, as tipologias e os
        ambientes de produção permanecem propriedade da Beans Tech Inova
        Simples (I.S.), sob acesso controlado. Marcas de terceiros citadas
        pertencem a seus titulares.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Responsabilidade
      </h2>
      <p>
        As informações são fornecidas “no estado em que se encontram”. O uso
        profissional da tecnologia para fins de compliance ou investigação dá-se
        por contratação ou cessão formal, com termos próprios.
      </p>
      <h2 className="dossier-title text-xl text-[var(--color-text-primary)] pt-4">
        Contato
      </h2>
      <p>
        Dúvidas sobre estes termos:{" "}
        <a href="mailto:contato@beanstech.com.br" className="text-[var(--color-accent)]">
          contato@beanstech.com.br
        </a>
        .
      </p>
    </SitePage>
  );
}
