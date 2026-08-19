"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const yamlContent = [
  "tipologia:",
  "  id: TIP-013",
  "  nome: Crypto Mixing / Tumbler Detection",
  "  versao: 2.1.0",
  "  base_normativa:",
  "    - Lei 13.259/2016 (Virtual Assets)",
  "    - Circular BACEN 3.978/2020 art. 4-VII",
  "    - FATF Recommendation 15 (Travel Rule)",
  "  severity: 92",
  "  conditions:",
  "    - entity.has_crypto_exposure: true",
  "    - tx.counterparty.in_mixer_pool: true",
  "    - chain.hops_to_known_mixer <= 3",
  "    - or:",
  "        - wallet.cluster_size >= 50",
  "        - tx.volume_usd > risk_threshold_high",
  "    - not:",
  "        - entity.is_registered_vasp: true",
  "        - entity.has_travel_rule_compliance: true",
  "  ml_indicators:",
  "    - type: volume_burst",
  "      window: 24h",
  "      threshold_usd: 50000",
  "    - type: temporal_pattern",
  "      pattern: rapid_succession",
  "      max_interval_min: 5",
  "    - type: chain_hop",
  "      max_hops: 3",
  "      chains: [bitcoin, ethereum, tron, solana]",
  "  false_positive_hints:",
  "    - entity is regulated VASP with compliance",
  "    - tx is institutional OTC with KYT report",
  "  auto_actions:",
  "    - freeze_if_unregistered: true",
  "    - alert_coaf: true",
  "    - flag_for_investigation: true",
  "    - generate_chain_report: true",
];

export default function TerminalCode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const inView = useRef(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView.current && !hasAnimated) {
          inView.current = true;
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!inView.current) return;
    if (visibleLines < yamlContent.length) {
      const timer = setTimeout(
        () => setVisibleLines((v) => v + 1),
        60
      );
      return () => clearTimeout(timer);
    }
  }, [visibleLines, hasAnimated]);

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
          <span className="badge badge-accent mb-4">Proof of Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tipologias production-ready
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            TIP-013 — detecção de criptomoedas via mixers/tumblers. Cada regra tem
            ID versionado, base normativa BACEN, severity score, conditions YAML
            e auto-actions.
          </p>
        </motion.div>

        <div ref={containerRef} className="glass-card max-w-4xl mx-auto p-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--color-danger)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--color-success)]" />
            </div>
            <span className="text-xs text-[var(--color-text-secondary)] font-mono">
              TIP-013.yaml — Crypto Mixing Detection
            </span>
            <div className="w-12" />
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
            {yamlContent.slice(0, visibleLines).map((line, i) => {
              const isKey = line.endsWith(":") && !line.startsWith(" ");
              const isComment = line.trimStart().startsWith("-");
              const indent = line.length - line.trimStart().length;
              return (
                <div
                  key={i}
                  className="flex"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.15s ease ${i * 0.04}s forwards`,
                  }}
                >
                  <span className="text-[var(--color-text-secondary)] opacity-50 w-8 shrink-0 text-right mr-4 select-none">
                    {i + 1}
                  </span>
                  <span
                    style={{
                      color: isKey
                        ? "var(--color-accent)"
                        : isComment
                          ? "var(--color-success)"
                          : "var(--color-text-primary)",
                      paddingLeft: `${indent * 8}px`,
                    }}
                  >
                    {line.trimStart()}
                  </span>
                </div>
              );
            })}
            {visibleLines < yamlContent.length && (
              <div className="flex items-center mt-1">
                <span className="w-8 shrink-0 mr-4" />
                <span className="inline-block w-2 h-5 bg-[var(--color-accent)] animate-pulse" />
              </div>
            )}
          </div>
          <div className="px-4 py-3 border-t border-[var(--color-border)] flex items-center justify-between">
            <span className="badge badge-success">25 arquivos YAML production-ready</span>
            <span className="badge">Hot-reload sem downtime</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
