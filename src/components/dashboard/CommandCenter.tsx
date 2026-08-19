"use client";

// CommandCenter — módulo inicial: KPIs ao vivo (CountUp + tick 3s), série 24h
// (Recharts, mesma lib testada no dashboard ITBI), saúde da API + 3 sidecars
// Go, conformidade e faixa do ecossistema alimentado pelo motor.

import { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Activity, ShieldCheck } from "lucide-react";
import { kpis, flow24h, health, compliance, ecosystem } from "@/lib/demoData";

// CountUp local — mesmo padrão do AnimatedNumber do site (IntersectionObserver
// disparando intervalo de 60 steps); aqui dispara na montagem do módulo.
function CountUp({
  to,
  decimals = 0,
  durationMs = 1800,
}: {
  to: number;
  decimals?: number;
  durationMs?: number;
}) {
  const [v, setV] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const steps = 60;
    const dt = durationMs / steps;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      const e = 1 - Math.pow(1 - i / steps, 3);
      setV(to * e);
      if (i >= steps) clearInterval(t);
    }, dt);
    return () => clearInterval(t);
  }, [to, durationMs]);
  return (
    <span className="tabular-nums">
      {v.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}

function Kpi({
  label,
  children,
  sub,
}: {
  label: string;
  children: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="glass-card !p-5 text-center">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
        {label}
      </p>
      <p className="text-3xl font-bold text-[var(--color-accent)] mt-1.5">{children}</p>
      <p className="text-xs text-[var(--color-text-secondary)] opacity-70 mt-1">{sub}</p>
    </div>
  );
}

export default function CommandCenter() {
  // tick 3s: pequena variação "tempo real" nos alertas de hoje
  const [alertasHoje, setAlertasHoje] = useState(kpis.alertasHoje);
  useEffect(() => {
    const t = setInterval(
      () => setAlertasHoje((n) => n + Math.floor(Math.random() * 3)),
      3000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* KPIs */}
      <div data-tour="kpi-row" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Kpi label="Transações/mês" sub="escala de produção">
          {(kpis.transacoesMes / 1e6).toFixed(0)} mi
        </Kpi>
        <Kpi label="Alertas hoje" sub="3 camadas de detecção">
          <CountUp to={alertasHoje} />
        </Kpi>
        <Kpi label="Casos abertos" sub="investigação ativa">
          <CountUp to={kpis.casosAbertos} />
        </Kpi>
        <Kpi label="Recall" sub="meta ≥ 0,90">
          <CountUp to={kpis.recall} decimals={2} />
        </Kpi>
        <Kpi label="Latência p95" sub="meta < 5 s">
          <CountUp to={kpis.p95Segundos} decimals={1} />s
        </Kpi>
      </div>

      {/* Série 24h */}
      <div data-tour="flow-chart" className="glass-card !p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-[var(--color-accent)]" />
          <h3 className="text-sm font-semibold">Fluxo nas últimas 24h — transações · alertas · bloqueios</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={flow24h} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="gTx" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.03} />
                </linearGradient>
                <linearGradient id="gAl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CA8A04" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#CA8A04" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gBl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="hora" stroke="var(--color-text-secondary)" fontSize={11} interval={3} />
              <YAxis stroke="var(--color-text-secondary)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(value, name) => [
                  Number(value).toLocaleString("pt-BR"),
                  String(name),
                ]}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="transacoes" name="Transações" stroke="#2563EB" fill="url(#gTx)" strokeWidth={2} />
              <Area type="monotone" dataKey="alertas" name="Alertas" stroke="#CA8A04" fill="url(#gAl)" strokeWidth={2} />
              <Area type="monotone" dataKey="bloqueios" name="Bloqueios" stroke="#DC2626" fill="url(#gBl)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Health + Compliance */}
      <div className="grid md:grid-cols-2 gap-4">
        <div data-tour="system-health" className="glass-card !p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-success)]" />
            </span>
            <h3 className="text-sm font-semibold">System Health — API + 3 sidecars Go</h3>
          </div>
          <ul className="space-y-2.5">
            {health.map((s) => (
              <li key={s.nome} className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)] shrink-0" />
                  <span className="font-medium truncate">{s.nome}</span>
                  <span className="text-xs text-[var(--color-text-secondary)] truncate hidden md:block">
                    · {s.papel}
                  </span>
                </div>
                <span className="font-mono text-xs text-[var(--color-text-secondary)] shrink-0">
                  p95 {s.p95}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card !p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={16} className="text-[var(--color-accent)]" />
            <h3 className="text-sm font-semibold">Conformidade — cobertura por norma</h3>
          </div>
          <ul className="space-y-3">
            {compliance.map((c) => (
              <li key={c.norma} className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-[var(--color-text-secondary)]">{c.norma}</span>
                  <span className="font-mono text-xs">{c.cobertura}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--color-surface-elevated)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-1000"
                    style={{ width: `${c.cobertura}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ecossistema */}
      <div className="glass-card !p-5">
        <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">
          Ecossistema alimentado pelo motor — 12+ plataformas
        </p>
        <div className="flex flex-wrap gap-2">
          {ecosystem.map((p) => (
            <span
              key={p}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
            >
              {p}
            </span>
          ))}
          <span className="text-xs font-medium px-3 py-1.5 rounded-full border border-dashed border-[var(--color-border)] text-[var(--color-text-secondary)]">
            +5 via API
          </span>
        </div>
      </div>
    </div>
  );
}
