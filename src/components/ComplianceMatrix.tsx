"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const regulations = [
  { norm: "Circular BACEN 3.978/2020", status: "100%", component: "21 artigos endereçados" },
  { norm: "Carta-Circular 4.001/2020", status: "25 tipologias", component: "TIP-001 a TIP-025" },
  { norm: "Lei 9.613/98 (Lavagem)", status: "Implementado", component: "Tipologias + reporte COAF" },
  { norm: "Lei 13.259/2016 (Ativos Virtuais)", status: "Implementado", component: "Crypto tracking + Travel Rule" },
  { norm: "LGPD + DPIA", status: "Assinada", component: "Cloud DLP + KMS + CMEK" },
  { norm: "RIF/SISCOAF", status: "Automático", component: "XML + ICP-Brasil (KMS HSM)" },
  { norm: "Sanções (OFAC/ONU/UE)", status: "Deployado", component: "FAISS + rapidfuzz + fuzzy" },
  { norm: "Bloqueio cautelar (OPA)", status: "Deployado", component: "Rego + circuit breaker + 4 olhos" },
  { norm: "Guarda 10 anos", status: "Deployado", component: "GCS Object Lock WORM + hash chain" },
  { norm: "KYC/KYB", status: "Deployado", component: "Document AI + RFB + QSA 4 níveis" },
  { norm: "Audit trail", status: "Deployado", component: "Hash chain Merkle + Cloud Logging" },
];

export default function ComplianceMatrix() {
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
          <span className="badge badge-accent mb-4">Compliance</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compliance regulatório total
          </h2>
        </motion.div>

        <motion.div
          className="glass-card max-w-5xl mx-auto p-0 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left p-4 text-[var(--color-text-secondary)] font-semibold">
                    Normativo
                  </th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)] font-semibold">
                    Status
                  </th>
                  <th className="text-left p-4 text-[var(--color-text-secondary)] font-semibold">
                    Componente
                  </th>
                </tr>
              </thead>
              <tbody>
                {regulations.map((r, i) => (
                  <tr
                    key={r.norm}
                    className={
                      i < regulations.length - 1
                        ? "border-b border-[var(--color-border)]"
                        : ""
                    }
                  >
                    <td className="p-4 font-medium">{r.norm}</td>
                    <td className="p-4 text-center">
                      <span className="badge badge-success">
                        <CheckCircle size={12} />
                        {r.status}
                      </span>
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)]">
                      {r.component}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
