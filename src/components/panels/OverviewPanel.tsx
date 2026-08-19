"use client";

// OverviewPanel — Visão Geral em formato editorial: lede corrida à esquerda,
// "razão" de indicadores à direita (rótulo · valor · nota) com réguas finas.
// Sem grade de cards idênticos, sem ícone-em-caixinha: hierarquia de
// relatório institucional.

import { motion } from "framer-motion";

const ledger = [
  { label: "Transações examinadas", value: "10 mi/mês", note: "em produção, GCP southamerica-east1" },
  { label: "Tipologias em operação", value: "25", note: "Carta-Circular BACEN 4.001/2020" },
  { label: "Recall de detecção", value: "≥ 0,90", note: "medido contra casos confirmados" },
  { label: "Latência por transação", value: "< 5 s", note: "p95, incluindo enriquecimento" },
  { label: "Cadeias de cripto rastreadas", value: "4", note: "Bitcoin, Ethereum, Tron, Solana" },
  { label: "Plataformas conectadas", value: "12+", note: "BigQuery como barramento de dados" },
  { label: "Normativos endereçados", value: "11", note: "da Lei 9.613/98 à Circular BACEN 3.978/2020" },
  { label: "Guarda de auditoria", value: "10 anos", note: "WORM — imutável por construção" },
];

export default function OverviewPanel() {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20">
          {/* Coluna narrativa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="kicker mb-3">Visão geral</p>
            <h2 className="dossier-title text-3xl md:text-[2.6rem] mb-6">
              Uma infraestrutura de detecção financeira, operando em produção
            </h2>
            <div className="space-y-4 text-[var(--color-text-secondary)] leading-[1.75] max-w-[58ch]">
              <p>
                O pldbr.tech é o motor de prevenção à lavagem de dinheiro da
                BeansTech: um sistema em operação real no Google Cloud — região
                São Paulo, dados soberanos no Brasil — que examina cada
                transação das plataformas conectadas e produz alertas, casos e
                comunicações ao COAF com validade jurídica.
              </p>
              <p>
                A detecção roda em três camadas independentes — regras escritas
                por especialistas, aprendizado de máquina supervisionado
                (treinado em casos confirmados) e não supervisionado (que
                aprende o padrão próprio de cada cliente) —, com rastreio
                integrado de criptomoedas e assinatura digital ICP-Brasil.
              </p>
              <p>
                A mesma tecnologia está disponível aos órgãos de investigação
                em cessão on-premise ou Government Cloud, com cadeia de
                custódia da prova digital pronta para instruir inquéritos.
              </p>
            </div>
          </motion.div>

          {/* Coluna razão de indicadores */}
          <motion.dl
            aria-label="Indicadores do sistema"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {ledger.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-t border-[var(--color-border)] py-4 last:border-b"
              >
                <dt className="text-sm text-[var(--color-text-secondary)]">
                  {item.label}
                  <span className="block text-xs opacity-60 mt-0.5">{item.note}</span>
                </dt>
                <dd className="dossier-title text-2xl whitespace-nowrap">{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </div>
  );
}
