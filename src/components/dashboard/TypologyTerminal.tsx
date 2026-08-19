"use client";

// TypologyTerminal — janela de terminal exibindo o YAML de uma tipologia
// (mesmo padrão do TerminalCode do site: revelação linha a linha + cursor),
// finalizando com um evento de hot-reload aplicado sem downtime.

import { useEffect, useState } from "react";
import { typologyYaml } from "@/lib/demoData";

export default function TypologyTerminal() {
  const [visible, setVisible] = useState(0);
  const [reloaded, setReloaded] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= typologyYaml.length) {
        clearInterval(t);
        setTimeout(() => setReloaded(true), 900);
      }
    }, 65);
    return () => clearInterval(t);
  }, []);

  const lines = typologyYaml.slice(0, visible);

  return (
    <div className="max-w-4xl mx-auto space-y-5" data-tour="typology-terminal">
      <div>
        <h2 className="text-xl font-bold">Tipologias YAML — versionadas em Git</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          25 arquivos production-ready · hot-reload sem downtime · Carta-Circular BACEN 4.001/2020
        </p>
      </div>

      <div className="glass-card !p-0 overflow-hidden font-mono text-[13px]">
        {/* barra da janela */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/60">
          <span className="h-3 w-3 rounded-full bg-[var(--color-danger)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--color-warning)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--color-success)]" />
          <span className="ml-3 text-xs text-[var(--color-text-secondary)]">
            tipologias/TIP-013.yaml — Crypto Mixing Detection
          </span>
        </div>

        <div className="p-5 min-h-[420px]">
          {lines.map((line, i) => {
            const isKey = /^[a-z_]+:$/.test(line.trim());
            const isItem = line.trim().startsWith("- ");
            return (
              <div key={i} className="flex gap-3 leading-6">
                <span className="w-7 text-right text-[var(--color-text-secondary)] opacity-50 select-none">
                  {i + 1}
                </span>
                <span
                  className={
                    isKey
                      ? "text-[var(--color-accent)]"
                      : isItem
                        ? "text-[var(--color-success)]"
                        : "text-[var(--color-text-primary)]/90"
                  }
                  style={{ paddingLeft: (line.length - line.trimStart().length) * 6 }}
                >
                  {line.trim() || " "}
                </span>
              </div>
            );
          })}
          {visible < typologyYaml.length && (
            <span className="inline-block w-2 h-5 bg-[var(--color-accent)] animate-pulse ml-10" />
          )}
          {reloaded && (
            <p className="mt-4 text-[var(--color-success)]">
              ✓ git pull origin tipologias → v3.4.1 · hot-reload aplicado sem
              downtime · auditoria WORM registrada
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[var(--color-border)]">
          <span className="badge badge-accent">25 arquivos YAML</span>
          <span className="badge badge-success">hot-reload sem downtime</span>
          <span className="badge">versionadas em Git</span>
        </div>
      </div>
    </div>
  );
}
