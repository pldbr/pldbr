"use client";

// CryptoPanel — módulo Crypto Intelligence: grafo on-chain animado em SVG
// (origem → mixer → hops → exchange/sancionado) + tabela de endereços
// fictícios com risco, mixer vinculado e cluster, e os 8 mixers citados
// no site. Clustering/desanonimização representada pelo agrupamento CL-XX.

import { cryptoAddresses, MIXERS_CITADOS } from "@/lib/demoData";
import { ShieldAlert } from "lucide-react";
import ModuleIntro from "./ModuleIntro";

const riskBadge: Record<string, string> = {
  critical: "badge badge-danger",
  high: "badge badge-warning",
  medium: "badge badge-accent",
  low: "badge badge-success",
};
const riskLabel: Record<string, string> = {
  critical: "CRÍTICO",
  high: "ALTO",
  medium: "MÉDIO",
  low: "BAIXO",
};

function FlowGraph() {
  // arestas com dash animado — fluxo "andando" no vídeo
  return (
    <svg data-tour="crypto-graph" viewBox="0 0 640 300" className="w-full h-auto">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-text-secondary)" />
        </marker>
      </defs>
      <style jsx>{`
        .edge {
          stroke-dasharray: 6 6;
          animation: dashmove 1.2s linear infinite;
        }
        @keyframes dashmove {
          to { stroke-dashoffset: -12; }
        }
      `}</style>

      {/* arestas */}
      <line x1="90" y1="150" x2="255" y2="150" className="edge" stroke="#CA8A04" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="340" y1="120" x2="470" y2="70" className="edge" stroke="#DC2626" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="340" y1="180" x2="470" y2="230" className="edge" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* nó origem */}
      <g>
        <circle cx="70" cy="150" r="34" fill="#18181B" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="70" y="146" textAnchor="middle" fill="#FAFAFA" fontSize="11" fontFamily="monospace">bc1q…</text>
        <text x="70" y="162" textAnchor="middle" fill="#A1A1AA" fontSize="9">origem</text>
      </g>

      {/* nó mixer */}
      <g>
        <circle cx="300" cy="150" r="42" fill="#241416" stroke="#DC2626" strokeWidth="2" />
        <text x="300" y="146" textAnchor="middle" fill="#DC2626" fontSize="11" fontWeight="bold">MIXER</text>
        <text x="300" y="162" textAnchor="middle" fill="#A1A1AA" fontSize="9">ChipMixer</text>
      </g>

      {/* nó sancionado */}
      <g>
        <circle cx="510" cy="70" r="36" fill="#1c1216" stroke="#DC2626" strokeWidth="2" strokeDasharray="4 3" />
        <text x="510" y="66" textAnchor="middle" fill="#DC2626" fontSize="10" fontFamily="monospace">0xDemo…9c2E</text>
        <text x="510" y="80" textAnchor="middle" fill="#A1A1AA" fontSize="9">OFAC SDN ✓</text>
      </g>

      {/* nó exchange */}
      <g>
        <circle cx="510" cy="230" r="36" fill="#111827" stroke="#2563EB" strokeWidth="2" />
        <text x="510" y="226" textAnchor="middle" fill="#FAFAFA" fontSize="10" fontFamily="monospace">exchange</text>
        <text x="510" y="240" textAnchor="middle" fill="#A1A1AA" fontSize="9">KYC on-ramp</text>
      </g>

      {/* rótulos de hop */}
      <text x="172" y="138" textAnchor="middle" fill="#CA8A04" fontSize="10" fontFamily="monospace">4–6 hops</text>
      <text x="405" y="52" textAnchor="middle" fill="#DC2626" fontSize="10" fontFamily="monospace">cluster CL-12</text>
      <text x="405" y="266" textAnchor="middle" fill="#2563EB" fontSize="10" fontFamily="monospace">cluster CL-104</text>
    </svg>
  );
}

export default function CryptoPanel() {
  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <ModuleIntro
        kicker="Rastreamento de criptomoedas"
        title="O caminho do dinheiro na blockchain"
        lede="O gráfico conta uma trilha típica de ocultação: o valor sai da carteira de origem, passa por um mixer (serviço que embaralha fundos de vários usuários para esconder a origem) e reaparece — numa exchange, onde há identificação de cliente, ou num endereço sancionado. Os clusters agrupam carteiras de um mesmo controlador: um investigado, muitas carteiras."
      />

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="glass-card !p-6 lg:col-span-2">
          <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">
            Trilha do fluxo — TIP-013
          </p>
          <FlowGraph />
        </div>

        <div className="glass-card !p-0 overflow-hidden lg:col-span-3" data-tour="crypto-table">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
                <th className="px-4 py-3 font-medium">Endereço (fictício)</th>
                <th className="px-4 py-3 font-medium">Chain</th>
                <th className="px-4 py-3 font-medium">Mixer</th>
                <th className="px-4 py-3 font-medium text-right">Volume</th>
                <th className="px-4 py-3 font-medium">Risco</th>
              </tr>
            </thead>
            <tbody>
              {cryptoAddresses.map((a) => (
                <tr key={a.endereco} className="border-b border-[var(--color-border)]/50">
                  <td className="px-4 py-3 font-mono text-xs">
                    {a.endereco}
                    {a.sancionado && (
                      <span className="block text-[10px] text-[var(--color-danger)] flex items-center gap-1 mt-0.5">
                        <ShieldAlert size={10} /> OFAC SDN
                      </span>
                    )}
                    <span className="block text-[10px] text-[var(--color-text-secondary)]">{a.cluster}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">{a.chain}</td>
                  <td className="px-4 py-3 text-xs">{a.mixer ?? "—"}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs tabular-nums">
                    {a.volumeBRL.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={riskBadge[a.risco]}>{riskLabel[a.risco]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card !p-5">
        <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">
          Mixers monitorados
        </p>
        <div className="flex flex-wrap gap-2">
          {MIXERS_CITADOS.map((m) => (
            <span key={m} className="badge badge-danger">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
