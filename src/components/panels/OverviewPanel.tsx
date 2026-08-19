"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Network,
  CheckCircle,
  Building,
  Shield,
} from "lucide-react";

const cards = [
  {
    icon: Cpu,
    title: "Motor PLD/AML",
    desc: "25 tipologias YAML, 3 camadas de detecção (regras + ML + não-supervisionado), 10M transações/mês, recall ≥90%. API real com 7 módulos.",
    stat: "25 tipologias",
  },
  {
    icon: Shield,
    title: "Crypto Intelligence",
    desc: "Chain analysis multichain (Bitcoin, Ethereum, Tron, Solana), detecção de 8+ mixers, de-anonimização, relatórios forenses com ICP-Brasil.",
    stat: "4 chains",
  },
  {
    icon: Network,
    title: "Ecossistema Fintech",
    desc: "12+ plataformas integradas via BigQuery: Beans Capital, Moneyp.AI, Tributo.tech, Receber.tech, BeansBank, LegalBet.tech e mais.",
    stat: "12+ plataformas",
  },
  {
    icon: CheckCircle,
    title: "Compliance Total",
    desc: "Circular BACEN 3.978/2020, Lei 9.613/98, Lei 13.259/2016, LGPD, COAF/SISCOAF, FATF R.15, OFAC/ONU/UE, KYC/KYB.",
    stat: "11 normativos",
  },
  {
    icon: Building,
    title: "Cessão ao Governo",
    desc: "Disponível para MPF, PF, COAF, Bacen. Deploy on-premise ou GCP Gov. Soberania de dados, Decreto 9.507/2018, IN 01/2019 SLTI.",
    stat: "55+ agentes IA",
  },
  {
    icon: Zap,
    title: "Infraestrutura GCP",
    desc: "Cloud Run, BigQuery, Spanner (300 PU), Dataflow, Vertex AI, Cloud KMS HSM, Document AI, GCS WORM, 3 Go sidecars.",
    stat: "21 tecnologias",
  },
];

export default function OverviewPanel() {
  return (
    <div className="section-padding">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visão Geral do Sistema
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Motor PLD/AML deployado em produção no Google Cloud Platform
            (beanstech-pld-prod, southamerica-east1). Tudo integrado, tudo
            operando.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className="glass-card group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[var(--color-accent)]" />
                  </div>
                  <span className="text-xs font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2.5 py-1 rounded-full">
                    {card.stat}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
