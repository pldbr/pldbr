"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Shield } from "lucide-react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="gradient-mesh" />
      <div className="grid-pattern" />

      <div className="container relative z-10 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-accent mb-6">
            <Shield size={14} />
            Prevenção à Lavagem de Dinheiro · Infraestrutura FinTech BeansTech
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto mb-6 text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          O motor PLD/AML que protege 12+ plataformas do ecossistema
          BeansTech
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-10 text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Detecção em 3 camadas, 25 tipologias, 10M transações/mês.
          Rastreio de criptomoedas on-chain e cessão de tecnologia para o
          Ministério Público Federal. Deployado no Google Cloud.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="mailto:contato@beanstech.com.br" className="cta-primary">
            Agendar Demonstração
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { value: 25, label: "Tipologias" },
            { value: 3, label: "Camadas de detecção" },
            { value: 12, suffix: "+", label: "Plataformas alimentadas" },
            { value: 10, suffix: "M", label: "Transações/mês" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-accent)]">
                <CountUp target={stat.value} suffix={stat.suffix || ""} />
              </div>
              <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
