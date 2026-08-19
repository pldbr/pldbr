"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const metrics = [
  { value: 10, suffix: "M+", label: "Volume processado", unit: "transações/mês" },
  { value: 25, suffix: "", label: "Carta-Circular 4.001/2020", unit: "tipologias" },
  { value: 90, suffix: "%", label: "RIFs históricos detectados", unit: "recall" },
  { value: 5, suffix: "s", label: "Evento → alerta", unit: "p95" },
  { value: 100, suffix: "ms", label: "Sanções/PEP", unit: "screening p95" },
  { value: 0.002, suffix: "", label: "Por transação monitorada", unit: "custo R$/tx", display: "R$ 0,002" },
];

function AnimatedNumber({ value, suffix, display }: { value: number; suffix: string; display?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated.current) return;
    if (display) {
      setCount(1);
      return;
    }
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 1000) / 1000);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, display]);

  return (
    <span ref={ref}>
      {display
        ? hasAnimated.current ? display : "—"
        : `${count.toLocaleString("pt-BR", { maximumFractionDigits: 3 })}${suffix}`}
    </span>
  );
}

export default function MetricsGrid() {
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
          <span className="badge mb-4">Performance</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Métricas de produção
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="glass-card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-accent)] mb-2">
                <AnimatedNumber
                  value={m.value}
                  suffix={m.suffix}
                  display={m.display}
                />
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                {m.label}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] opacity-60 mt-1">
                {m.unit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
