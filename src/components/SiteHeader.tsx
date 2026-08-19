// SiteHeader — cabeçalho fixo do site: marca, navegação para a trilha
// didática, páginas institucionais e chamada para demonstração.

import Link from "next/link";
import { Shield } from "lucide-react";

const nav = [
  { href: "/#walkthrough", label: "Como funciona" },
  { href: "/sobre", label: "A BeansTech" },
  { href: "/cessao", label: "Cessão ao Governo" },
  { href: "/#glossario", label: "Glossário" },
];

export default function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--color-bg)]/85 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/12 flex items-center justify-center">
            <Shield size={16} className="text-[var(--color-accent)]" />
          </span>
          <span className="font-bold tracking-tight">
            pldb<span className="text-[var(--color-accent)]">r</span>.tech
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/dashboard" className="cta-primary !py-2 !px-4 text-sm">
          Ver demonstração
        </Link>
      </div>
    </header>
  );
}
