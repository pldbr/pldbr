"use client";

import { motion } from "framer-motion";
import { CheckCircle, Landmark, CreditCard, Wallet, Receipt, Building2, Gamepad2, Shield, ShieldCheck, Cpu, PiggyBank, Newspaper } from "lucide-react";

const platforms = [
  { name: "beans.capital", desc: "RegTech enterprise: 41-55 agentes Gemini + dashboard compliance. SSL ativo.", icon: Landmark },
  { name: "beans.credit", desc: "Score proprietário Open Finance. Input direto para o motor PLD.", icon: CreditCard },
  { name: "moneyp.ai", desc: "Monitor de passivo fiscal PGFN. Red flag automático para clientes PLD.", icon: Receipt },
  { name: "tributo.tech", desc: "12+ calculadoras reforma tributária. ADK agents. Compliance fiscal integrado.", icon: Wallet },
  { name: "receber.tech", desc: "Antecipação de recebíveis PME via Open Finance. Monitoramento PLD.", icon: CreditCard },
  { name: "beansbank.com.br", desc: "Conta PJ: PIX, boleto, CDI. Onboarding compliance via Beans Capital.", icon: Building2 },
  { name: "legalbet.tech", desc: "Compliance para apostas: Lei 14.790/2023, SPA/MF. PLD bets.", icon: Gamepad2 },
  { name: "defesa.tech", desc: "IA para Defesa nacional (STM). Compliance militar via Beans Capital.", icon: Shield },
  { name: "aceito.tech", desc: "LGPD/DPO as a Service. Dados LGPD alimentam análise PLD.", icon: ShieldCheck },
  { name: "beans.ia.br", desc: "Hub de agentes e calculadoras. Lead gen cross-vertical.", icon: Cpu },
  { name: "bufunfa.tech", desc: "Educação financeira gamificada. Topo de funil credit/fintech.", icon: PiggyBank },
  { name: "ouro.capital", desc: "Portal de notícias financeiras e fintechs. Conteúdo editorial GEO.", icon: Newspaper },
];

export default function PlatformsGrid() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge mb-4">Ecossistema</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plataformas do ecossistema
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            12+ plataformas deployadas compartilham dados via BigQuery e
            usam o motor PLD como base de detecção.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.name}
                className="glass-card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[var(--color-accent)]" />
                  </div>
                  <span className="badge badge-success text-[10px]">
                    <CheckCircle size={10} />
                    DEPLOYADO
                  </span>
                </div>
                <h3 className="font-bold text-base mb-1">{p.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] flex-1">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
