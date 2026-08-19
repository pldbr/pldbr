// ModuleIntro — cabeçalho didático dos módulos do dashboard: o que o leitor
// (promotor/analista não técnico) está vendo e por que aquilo importa para a
// investigação. Mesma linguagem editorial do site (kicker + serifado + lede),
// adaptada à densidade de um painel operacional.

interface ModuleIntroProps {
  kicker: string;
  title: string;
  lede: string;
}

export default function ModuleIntro({ kicker, title, lede }: ModuleIntroProps) {
  return (
    <div className="mb-6 border-b border-[var(--color-border)] pb-5">
      <p className="kicker mb-1.5">{kicker}</p>
      <h2 className="dossier-title text-2xl md:text-[1.7rem] mb-2.5">{title}</h2>
      <p className="lede !text-[15px] !leading-[1.65]">{lede}</p>
    </div>
  );
}
