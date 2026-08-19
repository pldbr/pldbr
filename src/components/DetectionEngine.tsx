"use client";

import { motion } from "framer-motion";
import { Zap, Brain, Network, CheckCircle } from "lucide-react";

const layers = [
  {
    icon: Zap,
    title: "Camada 1: Regras Determinísticas",
    status: "DEPLOYADO",
    statusColor: "success" as const,
    items: [
      "25 tipologias em YAML production-ready (TIP-001 a TIP-025)",
      "Cada regra: ID, versão semântica, base normativa BACEN, severity (1-100)",
      "Conditions YAML parametrizáveis + reviewer guideline + false positive hints",
      "Hot-reload via watchdog sem downtime",
      "Backtesting em 90 dias históricos antes de promoção (shadow run)",
      "Carta-Circular 4.001/2020: 100% das tipologias cobertas",
    ],
  },
  {
    icon: Brain,
    title: "Camada 2: Machine Learning",
    status: "DEPLOYADO",
    statusColor: "success" as const,
    items: [
      "LightGBM binário (SAR / não-SAR) + XGBoost ensemble",
      "Features: agregações temporais, embeddings de grafo, velocity, entropia",
      "Calibração isotônica. Threshold ótimo por F-beta (beta=2, recall prioritário)",
      "Monitoramento de drift e fairness em produção",
    ],
  },
  {
    icon: Network,
    title: "Camada 3: Não-supervisionado",
    status: "DEPLOYADO",
    statusColor: "success" as const,
    items: [
      "Isolation Forest + Keras Autoencoder para outliers globais",
      "Comunidades suspeitas via Louvain/Leiden no grafo transacional",
      "Análise de motifs: triangulação, fan-in/fan-out",
      "Meta-modelo stacking com explicação por contribuição de camada",
    ],
  },
];

export default function DetectionEngine() {
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
          <span className="badge badge-accent mb-4">Motor de Detecção</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Três camadas. Zero cego.
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Regras determinísticas capturam padrões conhecidos. ML identifica
            SARs que escapam regras. Não-supervisionado descobre anomalias que
            ninguém definiu. O meta-modelo stacking funde as três camadas com
            explicação por contribuição.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.title}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                      <Icon size={20} className="text-[var(--color-accent)]" />
                    </div>
                    <h3 className="text-lg font-bold">{layer.title}</h3>
                  </div>
                </div>
                <span className={`badge badge-${layer.statusColor} mb-4`}>
                  <CheckCircle size={12} />
                  {layer.status}
                </span>
                <ul className="space-y-3 mt-4">
                  {layer.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="text-[var(--color-accent)] mt-0.5 shrink-0">
                        &bull;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
