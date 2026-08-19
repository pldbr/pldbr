"use client";

// InvestigationWalkthrough — a trilha didática central do site para o
// público Ministério Público: "Como uma investigação acontece", do dado
// bruto ao dossiê que instrui um inquérito. Seis passos numerados em
// linguagem de relatório — cada termo técnico explicado na primeira
// aparição, cada norma citada quando pertinente.

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "A movimentação entra no motor",
    body: "Cada transação das plataformas conectadas — cerca de 10 milhões por mês — é examinada em tempo real por três camadas independentes de detecção: regras escritas por especialistas, um modelo estatístico treinado em casos confirmados e um terceiro modelo que aprende sozinho o que é “normal” para cada perfil de cliente e sinaliza desvios.",
    note: "Latência mediana abaixo de 5 segundos por transação.",
  },
  {
    num: "02",
    title: "O motor levanta a suspeita",
    body: "Quando a movimentação coincide com um padrão conhecido de lavagem — uma tipologia, como fracionar valores para burlar limites de comunicação ou usar empresas-fantasma para circular recursos — o motor abre um alerta com pontuação de risco e a justificativa completa do disparo, conforme os padrões da Carta-Circular BACEN 4.001/2020.",
    note: "25 tipologias em operação, versionadas e auditáveis.",
  },
  {
    num: "03",
    title: "O analista investiga o caso",
    body: "O alerta vira um caso. O analista — humano, assistido por IA — revisa a rede de empresas e sócios envolvidos, jurisdições de origem e destino, compatibilidade com renda declarada e histórico. A IA sugere hipóteses e redige a minuta; a decisão permanece com o analista.",
    note: "Poder de síntese sem abrir mão do juízo humano.",
  },
  {
    num: "04",
    title: "A trilha cripto é aberta",
    body: "Se houver criptomoedas no caminho, o motor rastreia a blockchain pública: identifica passagens por mixers (serviços que embaralham a origem dos fundos), agrupa carteiras sob controle comum e mede a exposição a endereços sancionados. A blockchain é permanente — o rastro não desaparece.",
    note: "Bitcoin, Ethereum, Tron e Solana; 8 mixers monitorados.",
  },
  {
    num: "05",
    title: "A comunicação é assinada",
    body: "Confirmada a suspeita, a comunicação ao COAF (RIF, via SISCOAF) é gerada automaticamente e assinada com certificado digital ICP-Brasil — a mesma validade jurídica da assinatura de cartório. Toda a trilha de auditoria é gravada em armazenamento imutável (WORM) por 10 anos.",
    note: "Lei 9.613/98, art. 11-C: comunicação em 24 horas úteis.",
  },
  {
    num: "06",
    title: "O órgão de investigação recebe o dossiê",
    body: "O produto final é um dossiê estruturado para instruir inquérito: linha do tempo, grafos de vínculos, origem e destino dos recursos e a cadeia de custódia da prova digital — com hash e carimbo de tempo de cada artefato, nos termos dos arts. 158-A a 158-F do Código de Processo Penal.",
    note: "Formato pronto para MPF, PF e COAF.",
  },
];

export default function InvestigationWalkthrough() {
  return (
    <section id="walkthrough" className="section-padding scroll-mt-16" aria-labelledby="walkthrough-title">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <p className="kicker mb-3">Como uma investigação acontece</p>
          <h2 id="walkthrough-title" className="dossier-title text-3xl md:text-[2.6rem] mb-5">
            Do dado bruto ao dossiê que instrui um inquérito
          </h2>
          <p className="lede">
            A lavagem de dinheiro tem três fases clássicas — colocar o dinheiro
            sujo no sistema, movimentá-lo para esconder a origem e devolvê-lo
            “limpo”. O papel do motor é enxergar esse ciclo onde ele tenta ser
            invisível. A seguir, os seis passos, em ordem.
          </p>
        </div>

        <ol className="relative">
          {steps.map((s, i) => (
            <motion.li
              key={s.num}
              className="relative grid md:grid-cols-[88px_1fr] gap-4 md:gap-8 pb-12 last:pb-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
            >
              <div className="flex md:block items-baseline gap-4 md:gap-0">
                <span className="step-num">{s.num}</span>
              </div>
              <div className="md:border-l md:border-[var(--color-border)] md:pl-8">
                <h3 className="dossier-title text-xl md:text-2xl mb-3">{s.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-[1.75] max-w-[62ch] mb-3">
                  {s.body}
                </p>
                <p className="text-xs text-[var(--color-accent)] font-medium tracking-wide">
                  {s.note}
                </p>
              </div>
              {i < steps.length - 1 && (
                <hr className="rule md:hidden md:col-span-2 mb-2" />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
