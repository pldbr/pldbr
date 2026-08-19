import { Shield } from "lucide-react";

const footerLinks = [
  {
    title: "Compliance",
    links: [
      "Circular BACEN 3.978/2020",
      "Lei 9.613/98",
      "Lei 13.259/2016",
      "LGPD",
      "FATF Travel Rule",
    ],
  },
  {
    title: "Plataformas",
    links: [
      "beanstech.com.br",
      "beans.capital",
      "ragjur.com.br",
      "advogando.ai",
      "dodr.ai",
    ],
  },
  {
    title: "Institucional",
    links: [
      "Sobre a BeansTech",
      "Cessão de Tecnologia",
      "Política de Privacidade",
      "Termos de Uso",
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
              BeansTech Tecnologia Ltda.
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              CNPJ 64.160.205/0001-17
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-bold text-sm mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[var(--color-text-secondary)] text-center md:text-left">
            &copy; 2026 BeansTech Tecnologia Ltda. Todos os direitos reservados.
            IP: Protocolo Anti-Alucinação (INPI &middot; OpenTimestamps/Bitcoin).
            Compliance: Circular BACEN 3.978/2020 &middot; Lei 9.613/98 &middot; LGPD &middot; COAF &middot; FATF R.15.
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
