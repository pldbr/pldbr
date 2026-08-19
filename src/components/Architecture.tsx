"use client";

import { motion } from "framer-motion";

const techBadges = [
  "Python 3.11",
  "Go 1.22",
  "FastAPI",
  "Gunicorn",
  "Cloud Run",
  "BigQuery",
  "Spanner (300 PU)",
  "Dataflow",
  "Vertex AI",
  "FAISS",
  "OPA",
  "Temporal",
  "Pub/Sub",
  "Cloud KMS HSM",
  "Document AI",
  "GCS WORM",
  "Elastic (67M+ docs)",
  "Neo4j",
  "AlloyDB",
  "OpenTelemetry",
  "Prometheus",
];

const archBlocks = [
  { label: "Pub/Sub", x: 40, y: 20, w: 80, h: 30 },
  { label: "Dataflow Streaming", x: 40, y: 60, w: 120, h: 30 },
  { label: "Enrichment", x: 180, y: 60, w: 90, h: 30 },
  { label: "25 YAML Rules", x: 30, y: 130, w: 110, h: 36 },
  { label: "ML (3x)", x: 150, y: 130, w: 70, h: 36 },
  { label: "Graph (Louvain)", x: 230, y: 130, w: 120, h: 36 },
  { label: "Alerts API", x: 40, y: 200, w: 90, h: 30 },
  { label: "Case Mgmt", x: 140, y: 200, w: 90, h: 30 },
  { label: "Decision", x: 240, y: 200, w: 80, h: 30 },
  { label: "RIF/SISCOAF → COAF", x: 50, y: 260, w: 160, h: 30 },
  { label: "Sanctions/PEP FAISS", x: 40, y: 310, w: 140, h: 30 },
  { label: "KYC Doc AI + RFB", x: 200, y: 310, w: 130, h: 30 },
  { label: "Bloqueio OPA + 4 Olhos", x: 80, y: 360, w: 170, h: 30 },
];

export default function Architecture() {
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
          <span className="badge mb-4">Arquitetura</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Infraestrutura de produção
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            API FastAPI + 3 sidecars Go (Screener FAISS, Blocker OPA, Rules Engine)
            em Cloud Run. BigQuery para analytics, Spanner para estado, Dataflow para
            streaming, Vertex AI para ML. Cloud KMS HSM para assinatura ICP-Brasil.
          </p>
        </motion.div>

        <motion.div
          className="glass-card max-w-4xl mx-auto p-0 overflow-hidden"
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
              architecture.svg — GCP Production
            </span>
            <div className="w-12" />
          </div>

          <div className="p-6 flex justify-center">
            <svg viewBox="0 0 380 420" className="w-full max-w-lg">
              {archBlocks.map((block, i) => (
                <g key={i}>
                  <rect
                    x={block.x}
                    y={block.y}
                    width={block.w}
                    height={block.h}
                    rx="6"
                    fill={
                      block.y === 130
                        ? "var(--color-accent)"
                        : block.y === 360
                          ? "var(--color-danger)"
                          : "var(--color-surface-elevated)"
                    }
                    stroke="var(--color-border)"
                    strokeWidth="1"
                    opacity={block.y === 130 ? 0.2 : 1}
                  />
                  <rect
                    x={block.x}
                    y={block.y}
                    width={block.w}
                    height={block.h}
                    rx="6"
                    fill="none"
                    stroke={
                      block.y === 130
                        ? "var(--color-accent)"
                        : block.y === 360
                          ? "var(--color-danger)"
                          : "var(--color-border)"
                    }
                    strokeWidth="1"
                  />
                  <text
                    x={block.x + block.w / 2}
                    y={block.y + block.h / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={
                      block.y === 130
                        ? "var(--color-accent)"
                        : block.y === 360
                          ? "var(--color-danger)"
                          : "var(--color-text-primary)"
                    }
                    fontSize="10"
                    fontWeight="600"
                  >
                    {block.label}
                  </text>
                </g>
              ))}

              <line x1="80" y1="50" x2="80" y2="60" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="225" y1="90" x2="225" y2="120" stroke="var(--color-accent)" strokeWidth="1" opacity="0.5" />
              <line x1="85" y1="166" x2="85" y2="200" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="185" y1="166" x2="185" y2="200" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="280" y1="166" x2="280" y2="200" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="85" y1="230" x2="85" y2="260" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="280" y1="230" x2="280" y2="325" stroke="var(--color-border)" strokeWidth="1" />
              <line x1="265" y1="340" x2="265" y2="360" stroke="var(--color-danger)" strokeWidth="1" opacity="0.5" />

              <text x="190" y="112" textAnchor="middle" fill="var(--color-accent)" fontSize="9" opacity="0.7">
                Detection Engine
              </text>
            </svg>
          </div>

          <div className="px-4 py-3 border-t border-[var(--color-border)]">
            <div className="flex flex-wrap gap-2 justify-center">
              {techBadges.map((tech) => (
                <span key={tech} className="badge text-[10px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
