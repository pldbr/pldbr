import { Shield } from "lucide-react";

// Links reais: normas apontam para as fontes oficiais (Planalto/BACEN/FATF),
// plataformas para os domínios do ecossistema, institucional para páginas
// deste site. Nenhuma credencial ou selo não verificável.
const footerLinks: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Normas",
    links: [
      { label: "Lei 9.613/98", href: "https://www.planalto.gov.br/ccivil_03/leis/l9613.htm", external: true },
      { label: "Lei 13.259/2016", href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13259.htm", external: true },
      { label: "Lei 13.709/2018 (LGPD)", href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm", external: true },
      { label: "Circular BACEN 3.978/2020", href: "https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Circular&numero=3978", external: true },
      { label: "FATF (padrões globais)", href: "https://www.fatf-gafi.org", external: true },
    ],
  },
  {
    title: "Plataformas",
    links: [
      { label: "beanstech.com.br", href: "https://beanstech.com.br", external: true },
      { label: "beans.capital", href: "https://beans.capital", external: true },
      { label: "ragjur.com.br", href: "https://ragjur.com.br", external: true },
      { label: "advogando.ai", href: "https://advogando.ai", external: true },
      { label: "dodr.ai", href: "https://dodr.ai", external: true },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre a BeansTech", href: "/sobre" },
      { label: "Cessão de Tecnologia", href: "/cessao" },
      { label: "Política de Privacidade", href: "/privacidade" },
      { label: "Termos de Uso", href: "/termos" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} className="text-[var(--color-accent)]" />
              <span className="font-bold text-lg">PLD/AML Engine</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 max-w-xs leading-relaxed">
              Motor de prevenção à lavagem de dinheiro e rastreio de
              criptomoedas. Infraestrutura de IA para os setores regulados
              do Brasil.
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Beans Tech Inova Simples (I.S.)
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              CNPJ 64.160.205/0001-17 · São Paulo, Brasil
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-bold text-sm mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[var(--color-text-secondary)] text-center md:text-left">
            &copy; 2026 Beans Tech Inova Simples (I.S.). Todos os direitos reservados.
            O dashboard de demonstração utiliza exclusivamente dados fictícios.
          </div>
          <div className="flex items-center gap-6 text-xs text-[var(--color-text-secondary)]">
            <span>contato@beanstech.com.br</span>
            <span>github.com/beanstechhub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
