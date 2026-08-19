"use client";

import { motion } from "framer-motion";
import {
  Building,
  Shield,
  Server,
  Lock,
  FileCheck,
  Users,
  ArrowRight,
  CheckCircle,
  Scale,
  Database,
  Cpu,
  CloudUpload,
} from "lucide-react";

const features = [
  {
    icon: Server,
    title: "Cessão de Tecnologia (On-Premise ou GCP Gov)",
    desc: "O motor PLD/AML + módulo Crypto Intelligence pode ser cedido ao MPF e órgãos de investigação sob licença institucional. Deploy em infraestrutura do órgão (on-premise) ou GCP Government Cloud com isolamento total. Zero dependência de terceiros.",
  },
  {
    icon: Shield,
    title: "Soberania de Dados",
    desc: "Dados processados exclusivamente em território nacional (southamerica-east1). CMEK com chave gerida pelo próprio órgão. VPC Service Controls impedem exfiltração. Nenhum dado sai da jurisdição brasileira.",
  },
  {
    icon: Scale,
    title: "Relatórios para Judiciary",
    desc: "Geração automática de peças técnicas: laudos periciais de chain analysis, relatórios de vinculação on-chain/off-chain, pareceres investigativos. Narrativa gerada por Claude Opus 4.6 a partir dos dados brutos. Assinatura ICP-Brasil (Cloud KMS HSM).",
  },
  {
    icon: Database,
    title: "Integração com Bases de Dados do Governo",
    desc: "Conectores nativos para: Receita Federal (CNPJ/CPF, QSA, CND), COAF (comunicações), Bacen (SCD/SEP, transações PIX), Polícia Federal (identificação criminal), INSS/DATAPREV, SERASA/SPC. Enriquecimento automático de entidades investigadas.",
  },
  {
    icon: Cpu,
    title: "Agentes de Investigação IA",
    desc: "41-55 agentes Gemini especializados: Analista de Grafos On-chain, Investigador de Money Laundering Crypto, Gerador de Laudos Forenses, Monitor de Wallets Suspeitas, Correlacionador Off-chain/On-chain, Rastreador Cross-chain. Cada agente auditável e com fundamentação jurídica.",
  },
  {
    icon: Lock,
    title: "Audit Trail WORM e Hash Chain",
    desc: "Cada ação do sistema gera registro imutável: hash chain Merkle + GCS Object Lock (WORM, retenção 10 anos). Indisponibilidade de alteração garante valor probatório em processos judiciais. Conforme art. 8, Lei 9.613/98.",
  },
  {
    icon: Users,
    title: "Multi-Tenancy com Isolamento por Órgão",
    desc: "Cada órgão (MPF, PF, Receita Federal, COAF, Bacen) opera em tenant isolado com IAM dedicado, dados segregados e auditoria independente. Compartilhamento controlado de inteligência entre órgãos sob autorização judicial.",
  },
  {
    icon: FileCheck,
    title: "Conformidade Legal da Cessão",
    desc: "Contrato de cessão de tecnologia conforme Decreto 9.507/2018 (compras governamentais de TIC). Dispensa de licitação para credenciamento (IN 01/2019 SLTI). DPIA assinada. LGPD para dados governamentais. Parecer jurídico incluso.",
  },
];

const stats = [
  { value: "4+", label: "Chains monitoradas" },
  { value: "8+", label: "Mixers rastreados" },
  { value: "55+", label: "Agentes investigativos" },
  { value: "10 anos", label: "Guarda WORM" },
  { value: "ICP-Brasil", label: "Assinatura digital" },
  { value: "0", label: "Dados fora do Brasil" },
];

export default function GovernmentModule() {
  return (
    <section id="governo" className="section-padding">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-accent mb-4">
            <Building size={14} />
            Cessão de Tecnologia para Órgãos Públicos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Tecnologia de ponta. A serviço da investigação.
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-3xl mx-auto text-lg">
            O motor PLD/AML + módulo Crypto Intelligence da BeansTech está
            disponível para cessão ao Ministério Público Federal, Polícia Federal,
            COAF, Banco Central e demais órgãos de investigação e regulação.
            Deploy on-premise ou GCP Government Cloud com soberania total
            dos dados.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="glass-card py-3 px-5 text-center min-w-[120px]">
              <div className="text-xl font-bold text-[var(--color-accent)]">{s.value}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-2">{f.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="glass-card max-w-4xl mx-auto border-[var(--color-accent)]/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">
                Interessado em cessão de tecnologia?
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Entre em contato para agendar uma demonstração técnica
                reservada. Apresentação sob NDA institucional.
                Conformidade com Decreto 9.507/2018 e IN 01/2019 SLTI.
              </p>
            </div>
            <a
              href="mailto:contato@beanstech.com.br?subject=Cessao de Tecnologia - Orgao Publico"
              className="cta-primary shrink-0 whitespace-nowrap"
            >
              Contato Institucional
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
