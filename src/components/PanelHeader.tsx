// PanelHeader — cabeçalho editorial padronizado dos painéis: kicker em
// versalete, título serifado e lede explicativa. Substitui o padrão
// "h2 genérico + parágrafo cinza" por hierarquia de relatório.

interface PanelHeaderProps {
  kicker: string;
  title: string;
  lede: string;
}

export default function PanelHeader({ kicker, title, lede }: PanelHeaderProps) {
  return (
    <div className="section-padding pb-0">
      <div className="container">
        <p className="kicker mb-3">{kicker}</p>
        <h2 className="dossier-title text-3xl md:text-[2.6rem] mb-5">{title}</h2>
        <p className="lede">{lede}</p>
      </div>
    </div>
  );
}
