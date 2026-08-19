// SitePage — layout das páginas institucionais estáticas: cabeçalho do site,
// miolo editorial (kicker + título serifado + lede + conteúdo) e rodapé.

import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";

interface SitePageProps {
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
}

export default function SitePage({ kicker, title, lede, children }: SitePageProps) {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 section-padding">
        <div className="container max-w-3xl">
          <p className="kicker mb-3">{kicker}</p>
          <h1 className="dossier-title text-3xl md:text-[2.6rem] mb-5">{title}</h1>
          <p className="lede mb-10">{lede}</p>
          <div className="space-y-5 text-[var(--color-text-secondary)] leading-[1.75]">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
