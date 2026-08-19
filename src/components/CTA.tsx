"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, User } from "lucide-react";

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(37,99,235,0.05)] to-transparent" />

      <div className="container relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Compliance de verdade. Em produção.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Agende uma demonstração técnica do motor PLD/AML + módulo Crypto
            Intelligence. Veja como o sistema protege 12+ plataformas e está
            pronto para cessão ao Ministério Público Federal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:contato@beanstech.com.br?subject=Demo PLD/AML + Crypto Intelligence" className="cta-primary">
              <Mail size={16} />
              Agendar Demonstração
              <ArrowRight size={16} />
            </a>
            <a href="mailto:contato@beanstech.com.br?subject=Cessao de Tecnologia - Orgao Publico" className="cta-secondary">
              <User size={16} />
              Contato Institucional
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
