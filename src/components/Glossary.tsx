// Glossary — glossário PLD/AML em linguagem de promotor: cada termo técnico
// usado no site, definido em uma frase útil. Estilo "notas de rodapé de
// relatório": termo em serifado, definição corrida, duas colunas no desktop.

const terms = [
  {
    term: "PLD / AML",
    def: "Prevenção à Lavagem de Dinheiro (pt) / Anti-Money Laundering (en). O conjunto de controles que instituições financeiras são obrigadas por lei a manter.",
  },
  {
    term: "Lavagem de dinheiro",
    def: "Disfarçar a origem ilícita de recursos para inseri-los na economia como se legítimos fossem. Crime tipificado na Lei 9.613/98, com pena de 4 a 16 anos.",
  },
  {
    term: "Colocação, ocultação, integração",
    def: "As três fases da lavagem: o dinheiro entra no sistema, é movimentado para perder o rastro e retorna “limpo” — muitas vezes via compra de ativos.",
  },
  {
    term: "Tipologia",
    def: "Um padrão conhecido e documentado de lavagem — por exemplo, fracionar depósitos abaixo do limite de reporte. O BACEN cataloga as tipologias na Carta-Circular 4.001/2020.",
  },
  {
    term: "COAF",
    def: "Conselho de Controle de Atividades Financeiras. O órgão que centraliza as comunicações de operações suspeitas e as redistribui às autoridades.",
  },
  {
    term: "SISCOAF",
    def: "O sistema eletrônico pelo qual instituições comunicam ao COAF as operações suspeitas. A comunicação em si é o RIF.",
  },
  {
    term: "RIF",
    def: "Relatório de Informações Suspeitas Financeiras. O documento formal da comunicação — com prazo de 24 horas úteis da confirmação da suspeita (Lei 9.613/98, art. 11-C).",
  },
  {
    term: "KYC / KYB",
    def: "“Conheça seu cliente” / “conheça seu negócio”: identificar e manter atualizado quem é o cliente, sua renda, seus sócios e seu risco — antes e durante a relação.",
  },
  {
    term: "Mixer (tumbler)",
    def: "Serviço que embaralha criptomoedas de vários usuários para obscurecer a origem. Usar mixer não é crime em si — mas é o principal sinal de ocultação em cripto.",
  },
  {
    term: "Cluster on-chain",
    def: "Grupo de carteiras de criptomoedas atribuíveis a um mesmo controlador, identificado por heurísticas de análise pública da blockchain.",
  },
  {
    term: "Sanções (OFAC, ONU, UE, CEAF)",
    def: "Listas internacionais e nacionais de pessoas e entidades com quem é vedado negociar. O CEAF é o cadastro nacional de condenados por lavagem.",
  },
  {
    term: "WORM",
    def: "Armazenamento “write once, read many”: gravado, não pode mais ser alterado nem apagado. É a base da trilha de auditoria inalterável de 10 anos.",
  },
  {
    term: "ICP-Brasil",
    def: "A infraestrutura nacional de certificação digital. Uma assinatura ICP-Brasil tem a mesma validade jurídica de uma assinatura de próprio punho com testemunhas.",
  },
  {
    term: "Cadeia de custódia (arts. 158-A a 158-F, CPP)",
    def: "O percurso documentado da prova digital — de sua coleta ao laudo — garantindo que não foi alterada. Sem ela, a prova pode ser desconsiderada.",
  },
  {
    term: "FATF",
    def: "O Financial Action Task Force, corpo intergovernamental que fixa padrões globais de PLD. A Recomendação 15 trata especificamente de ativos virtuais.",
  },
  {
    term: "Cessão de tecnologia",
    def: "Modalidade prevista no Decreto 9.507/2018 pela qual a Administração Pública recebe, sem licitação, tecnologia de interesse público — base legal da entrega ao MPF.",
  },
];

export default function Glossary() {
  return (
    <section className="section-padding" aria-labelledby="glossary-title">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <p className="kicker mb-3">Glossário</p>
          <h2 id="glossary-title" className="dossier-title text-3xl md:text-[2.6rem] mb-5">
            Os termos do ofício, sem mistério
          </h2>
          <p className="lede">
            Toda a terminologia usada neste site, definida em uma frase cada —
            para que nenhum ponto técnico fique entre o leitor e a avaliação
            da tecnologia.
          </p>
        </div>

        <dl className="grid md:grid-cols-2 gap-x-14">
          {terms.map((t) => (
            <div key={t.term} className="border-t border-[var(--color-border)] py-5">
              <dt className="dossier-title text-lg mb-1.5">{t.term}</dt>
              <dd className="text-sm text-[var(--color-text-secondary)] leading-[1.7]">
                {t.def}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
