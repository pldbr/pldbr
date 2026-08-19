"use client";

// DashboardShell — sidebar de módulos + header com badge de demonstração
// e relógio pt-BR (montado só no client para evitar mismatch de hidratação).

import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  BellRing,
  FileCode2,
  ScanSearch,
  UserCheck,
  Bitcoin,
  FolderSearch,
  Lock,
  Sparkles,
} from "lucide-react";

export type ModuleId =
  | "command"
  | "alerts"
  | "typologies"
  | "screening"
  | "kyc"
  | "crypto"
  | "cases"
  | "blocking"
  | "ai";

const MODULES: { id: ModuleId; label: string; icon: typeof LayoutDashboard; hint: string }[] = [
  { id: "command", label: "Command Center", icon: LayoutDashboard, hint: "/api/v1/health" },
  { id: "alerts", label: "Alertas", icon: BellRing, hint: "/alerts" },
  { id: "typologies", label: "Tipologias", icon: FileCode2, hint: "25 YAML" },
  { id: "screening", label: "Screening", icon: ScanSearch, hint: "/screening" },
  { id: "kyc", label: "KYC / KYB", icon: UserCheck, hint: "/kyc" },
  { id: "crypto", label: "Crypto Intel", icon: Bitcoin, hint: "on-chain" },
  { id: "cases", label: "Casos & RIF", icon: FolderSearch, hint: "/cases · /rif" },
  { id: "blocking", label: "Blocking", icon: Lock, hint: "/blocking" },
  { id: "ai", label: "Analista IA", icon: Sparkles, hint: "multi-modelo" },
];

interface ShellProps {
  activeModule: ModuleId;
  onModuleChange: (id: ModuleId) => void;
  children: ReactNode;
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-xs text-[var(--color-text-secondary)] tabular-nums">
      {now ?? "--:--:--"} · GCP southamerica-east1
    </span>
  );
}

export default function DashboardShell({ activeModule, onModuleChange, children }: ShellProps) {
  return (
    <div className="flex flex-1 min-w-0">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)]/40 flex flex-col">
        <div className="px-4 py-4 border-b border-[var(--color-border)]">
          <p className="font-bold tracking-tight">pldbr<span className="text-[var(--color-accent)]">.tech</span></p>
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] mt-0.5">
            Motor PLD/AML
          </p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2" role="tablist" aria-label="Módulos do dashboard">
          {MODULES.map((m) => {
            const Icon = m.icon;
            const active = activeModule === m.id;
            return (
              <button
                key={m.id}
                data-tour={`nav-${m.id}`}
                role="tab"
                aria-selected={active}
                onClick={() => onModuleChange(m.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                  active
                    ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border-r-2 border-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className="flex-1 whitespace-nowrap">{m.label}</span>
                <span className="text-[9px] font-mono opacity-50 hidden xl:block">{m.hint}</span>
              </button>
            );
          })}
        </nav>
        <div className="px-4 py-3 border-t border-[var(--color-border)]">
          <span className="badge badge-warning">DEMO</span>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center justify-between gap-4 px-6 h-14 border-b border-[var(--color-border)] bg-[var(--color-surface)]/30">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">
              {MODULES.find((m) => m.id === activeModule)?.label}
            </span>
            <span className="badge badge-warning">AMBIENTE DE DEMONSTRAÇÃO — DADOS FICTÍCIOS</span>
          </div>
          <Clock />
        </header>
        <main data-tour="module-content" className="flex-1 overflow-y-auto section-padding !py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
