"use client";

import { motion } from "framer-motion";

const platforms = [
  {
    name: "Beans Credit",
    desc: "Score proprietário Open Finance",
    position: "top",
  },
  {
    name: "Receber.tech",
    desc: "Antecipação recebíveis PME",
    position: "left",
  },
  {
    name: "Tributo.tech",
    desc: "Compliance fiscal",
    position: "right",
  },
  {
    name: "Moneyp.AI",
    desc: "Passivo fiscal = red flag PLD",
    position: "left",
  },
  {
    name: "Beans Capital",
    desc: "RegTech enterprise · 41-55 agentes",
    position: "center-bottom",
  },
  {
    name: "BeansBank",
    desc: "Onboarding compliance",
    position: "right",
  },
  {
    name: "LegalBet.tech",
    desc: "PLD para apostas · Lei 14.790/23",
    position: "bottom",
  },
];

const platformNodes: Record<string, { cx: number; cy: number }> = {
  "Beans Credit": { cx: 320, cy: 40 },
  "Receber.tech": { cx: 80, cy: 160 },
  "Tributo.tech": { cx: 560, cy: 160 },
  "Moneyp.AI": { cx: 80, cy: 320 },
  "Beans Capital": { cx: 320, cy: 320 },
  "BeansBank": { cx: 560, cy: 320 },
  "LegalBet.tech": { cx: 320, cy: 480 },
};

const center = { cx: 320, cy: 260 };

export default function EcosystemDiagram() {
  const lines = platforms.map((p) => {
    const node = platformNodes[p.name];
    if (!node) return null;
    return (
      <line
        key={p.name}
        x1={center.cx}
        y1={center.cy}
        x2={node.cx}
        y2={node.cy}
        stroke="var(--color-border)"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />
    );
  });

  const nodes = platforms.map((p) => {
    const node = platformNodes[p.name];
    if (!node) return null;
    return (
      <g key={p.name}>
        <rect
          x={node.cx - 60}
          y={node.cy - 20}
          width="120"
          height="40"
          rx="8"
          fill="var(--color-surface)"
          stroke="var(--color-border)"
          strokeWidth="1"
        />
        <text
          x={node.cx}
          y={node.cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--color-text-primary)"
          fontSize="10"
          fontWeight="600"
        >
          {p.name}
        </text>
        <text
          x={node.cx}
          y={node.cy + 28}
          textAnchor="middle"
          fill="var(--color-text-secondary)"
          fontSize="8"
        >
          {p.desc}
        </text>
      </g>
    );
  });

  return (
    <section id="ecossistema" className="section-padding">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge mb-4">Ecossistema Fintech</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Uma base de detecção. Doze plataformas protegidas.
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            O motor PLD opera como núcleo central. Cada plataforma contribui
            dados e recebe alertas em tempo real via BigQuery.
          </p>
        </motion.div>

        <motion.div
          className="glass-card max-w-3xl mx-auto overflow-hidden p-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--color-danger)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--color-success)]" />
            </div>
            <span className="text-xs text-[var(--color-text-secondary)] font-mono">
              ecosystem-topology.svg
            </span>
            <div className="w-12" />
          </div>
          <svg
            viewBox="0 0 640 540"
            className="w-full"
            style={{ maxHeight: "400px" }}
          >
            {lines}
            <g>
              <circle
                cx={center.cx}
                cy={center.cy}
                r="44"
                fill="var(--color-accent)"
                opacity="0.15"
              />
              <circle
                cx={center.cx}
                cy={center.cy}
                r="38"
                fill="var(--color-surface-elevated)"
                stroke="var(--color-accent)"
                strokeWidth="2"
              />
              <text
                x={center.cx}
                y={center.cy - 6}
                textAnchor="middle"
                fill="var(--color-accent)"
                fontSize="11"
                fontWeight="700"
              >
                PLD/AML
              </text>
              <text
                x={center.cx}
                y={center.cy + 10}
                textAnchor="middle"
                fill="var(--color-text-secondary)"
                fontSize="8"
              >
                Motor Core
              </text>
            </g>
            {nodes}
          </svg>
          <div className="px-4 py-3 border-t border-[var(--color-border)] text-center">
            <span className="badge badge-success">
              12+ plataformas compartilham dados via BigQuery e motor PLD central
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
