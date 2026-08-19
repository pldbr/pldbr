"use client";

import { motion } from "framer-motion";
import {
  Bitcoin,
  GitBranch,
  ShieldAlert,
  Search,
  Fingerprint,
  AlertTriangle,
  CheckCircle,
  Link2,
  Eye,
  FileWarning,
  ArrowRightLeft,
  Globe,
} from "lucide-react";

const capabilities = [
  {
    icon: GitBranch,
    title: "Chain Analysis Multichain",
    items: [
      "Bitcoin (UTXO): rastreamento completo de transações, heurística de change address, grafos de inputs/outputs",
      "Ethereum/ERC-20: tracing de token transfers, smart contract interaction analysis, MEV detection",
      "Tron (USDT/TRC-20): maior volume de stablecoins no Brasil, rastreamento Tether em tempo real",
      "Solana: high-frequency tx analysis, SPL token tracing, program interaction graphs",
      "Cross-chain: pontes, wrapped tokens, atomic swaps — rastreamento sem perda de trilha",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Detecção de Mixers e Tumblers",
    items: [
      "Identificação automática de fundos que passaram por mixers conhecidos (Tornado Cash, Blender, Sinbad, Samourai, Wasabi)",
      "Detecção de peel chains e structuring on-chain (fragmentação de valores em múltiplos outputs sequenciais)",
      "Clustering heurístico: identificação de wallets que pertencem ao mesmo controlador (change address, time co-location, input co-spending)",
      "Risk scoring por proximidade: wallet a N hops de um mixer ou endereço sancionado",
      "False positive management: VASPs registrados com compliance KYC recebem score reduzido",
    ],
  },
  {
    icon: Fingerprint,
    title: "De-anonimização e Clustering",
    items: [
      "Cross-referenciamento on-chain/off-chain: wallet addresses ↔ dados KYC de exchanges, VASPs, Open Finance",
      "QSA recursivo on-chain: identificação de entidades por trás de múltiplos wallets em até 6 níveis de profundidade",
      "Heurísticas avançadas: round-robin payments, self-chaining, temporal co-location, value correlation",
      "Integração com OFAC SDN, ONU, UE, CEAF/COAF para matching em tempo real",
    ],
  },
  {
    icon: Search,
    title: "Monitoramento em Tempo Real",
    items: [
      "Watchlists personalizadas: monitoramento de endereços e contas por órgãos de investigação",
      "Alertas automáticos quando fundos monitorados se movem — threshold configurável por valor, chain e destino",
      "Dashboard de investigação: visualização de fluxos em grafos interativos, filtros por período, chain, counterparty",
      "Histórico de movimentação: reconstrução completa do caminho dos fundos desde a origem",
    ],
  },
  {
    icon: ArrowRightLeft,
    title: "FATF Travel Rule (Transferência Internacional)",
    items: [
      "Compliance com FATF Recommendation 15 e Lei 13.259/2016 (Ativos Virtuais)",
      "Transferências VASP-to-VASP com dados do originador e beneficiário",
      "Integração com Travel Rule protocols (TRISA, OpenVASP, Notabene)",
      "Auditoria de transações cross-border: origem, destino, VASP intermediário, valor",
    ],
  },
  {
    icon: FileWarning,
    title: "Geração de Relatórios para Investigação",
    items: [
      "Relatório de Chain Analysis: caminho completo dos fundos com timestamps, valores, hops e risk scores",
      "Evidência forense digital: hash chain de cada análise, assinatura ICP-Brasil, guarda 10 anos (GCS WORM)",
      "Exportação em formatos para Judiciary: PDF assinado, JSON estruturado, CSV para planilhas",
      "Timeline interativa: visualização cronológica de todas as movimentações relevantes",
      "Parecer técnico IA: Claude Opus 4.6 gera narrativa investigativa a partir dos dados on-chain",
    ],
  },
];

const supportedChains = [
  { name: "Bitcoin", icon: Bitcoin },
  { name: "Ethereum", icon: Globe },
  { name: "Tron (USDT)", icon: Link2 },
  { name: "Solana", icon: Globe },
];

const mixerPool = [
  "Tornado Cash",
  "Blender.io",
  "Sinbad",
  "Samourai Wallet",
  "Wasabi Wallet",
  "ChipMixer",
  "Bitcoin Fog",
  "Helix",
];

export default function CryptoIntelligence() {
  return (
    <section id="crypto" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(220,38,38,0.03)] to-transparent" />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-danger mb-4">
            <ShieldAlert size={14} />
            Crypto Intelligence
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Rastreio de criptomoedas. Detecção on-chain. Evidência forense.
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-3xl mx-auto text-lg">
            Módulo de inteligência de criptomoedas integrado ao motor PLD/AML.
            Chain analysis multichain, detecção de mixers/tumblers, de-anonimização
            e geração de relatórios com assinatura ICP-Brasil — pronto para cessão
            ao Ministério Público Federal e órgãos de investigação.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {supportedChains.map((chain) => {
            const Icon = chain.icon;
            return (
              <div key={chain.name} className="glass-card flex items-center gap-3 py-3 px-5">
                <Icon size={18} className="text-[var(--color-accent)]" />
                <span className="font-semibold text-sm">{chain.name}</span>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-danger)]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[var(--color-danger)]" />
                  </div>
                  <h3 className="text-lg font-bold">{cap.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {cap.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="text-[var(--color-danger)] mt-1 shrink-0">
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

        <motion.div
          className="glass-card max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={20} className="text-[var(--color-warning)]" />
            <h3 className="text-lg font-bold">Pool de Mixers e Tumblers Monitorados</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {mixerPool.map((mixer) => (
              <span
                key={mixer}
                className="badge badge-danger"
              >
                {mixer}
              </span>
            ))}
            <span className="badge badge-warning">+ atualização contínua</span>
          </div>
        </motion.div>

        <motion.div
          className="glass-card max-w-4xl mx-auto mt-6 border-[var(--color-danger)]/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-danger)]/10 flex items-center justify-center shrink-0">
              <Eye size={24} className="text-[var(--color-danger)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                Evidência forense digital para processos judiciais
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Cada análise de chain gera um relatório com hash chain Merkle,
                assinatura ICP-Brasil via Cloud KMS HSM e guarda em GCS Object
                Lock (WORM) por 10 anos. Os relatórios incluem: caminho completo
                dos fundos, timestamps, valores, hops, risk scores por transação,
                identificação de entidades e clusters, e narrativa investigativa
                gerada por Claude Opus 4.6. Formatos: PDF assinado, JSON estruturado,
                CSV, timeline interativa.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
