"use client";

// TypologyTerminal — a tipologia em duas linguagens: à esquerda o YAML real
// (a "letra da lei" que a máquina executa, com valor probatório de
// rastreabilidade), à direita a tradução do analista — linha a linha, o que
// cada parâmetro significa em linguagem de investigação. O promotor vê o
// comando e o significado juntos.

import { useEffect, useState } from "react";
import { typologyYaml } from "@/lib/demoData";
import ModuleIntro from "./ModuleIntro";

// Tradução linha a linha (mesma ordem do YAML, agrupada por bloco temático)
const translation: { label: string; text: string }[] = [
  {
    label: "O que vigia",
    text: "Esta regra observa o mundo das criptomoedas: detecta uso de serviços de embaralhamento (mixers) — o estágio clássico de ocultação da lavagem.",
  },
  {
    label: "Por quanto tempo",
    text: "A janela é de 30 dias: o motor reexamina o histórico inteiro do mês a cada nova transação.",
  },
  {
    label: "Quando dispara",
    text: "Só gera alerta quando a confiança estatística passa de 62% (score mínimo) — abaixo disso, ruído não vira trabalho para o analista.",
  },
  {
    label: "Até onde persegue",
    text: "Segue até 6 saltos entre a carteira de origem e o destino — os “pulos” que o dinheiro dá para perder o rastro.",
  },
  {
    label: "Quem são os vigiados",
    text: "8 serviços de ocultação monitorados: Tornado Cash, Blender, Sinbad, Samourai, Wasabi, ChipMixer, Bitcoin Fog e Helix — os mesmos citados em ações internacionais de desativamento.",
  },
  {
    label: "Como a máquina sabe",
    text: "Camada não supervisionada: nenhum humano escreveu esta regra caso a caso — o modelo aprendeu sozinho, com o comportamento confirmado de lavadores, o que distingue uma trilha de ocultação de uma movimentação comum.",
  },
];

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
    <div className="max-w-6xl mx-auto space-y-5">
      <ModuleIntro
        kicker="Tipologias"
        title="A regra que a máquina executa — e o que ela significa"
        lede="Uma tipologia é um padrão conhecido de lavagem, catalogado pelo BACEN (Carta-Circular 4.001/2020). À esquerda, a regra como existe no sistema — legível, versionada, auditável em fiscalização. À direita, a mesma regra em linguagem de investigação."
      />

      <div className="grid lg:grid-cols-2 gap-4">
        {/* YAML — a letra que a máquina executa */}
        <div className="glass-card !p-0 overflow-hidden font-mono text-[13px]" data-tour="typology-terminal">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/60">
            <span className="h-3 w-3 rounded-full bg-[var(--color-danger)]" />
            <span className="h-3 w-3 rounded-full bg-[var(--color-warning)]" />
            <span className="h-3 w-3 rounded-full bg-[var(--color-success)]" />
            <span className="ml-3 text-xs text-[var(--color-text-secondary)]">
              tipologias/TIP-013.yaml — evidência auditável
            </span>
          </div>

          <div className="p-5 min-h-[380px]">
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
                ✓ atualização aplicada sem interromper o sistema · auditoria registrada
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[var(--color-border)]">
            <span className="badge badge-accent">25 tipologias</span>
            <span className="badge badge-success">recarga sem parar o sistema</span>
            <span className="badge">versões guardadas para auditoria</span>
          </div>
        </div>

        {/* Tradução do analista — o que cada bloco significa */}
        <div className="glass-card !p-6" data-tour="typology-translation">
          <p className="kicker mb-4">Tradução do analista</p>
          <dl className="space-y-4">
            {translation.map((t) => (
              <div key={t.label}>
                <dt className="dossier-title text-[15px] mb-1">{t.label}</dt>
                <dd className="text-sm text-[var(--color-text-secondary)] leading-[1.65]">
                  {t.text}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
            <p className="text-sm leading-[1.65]">
              <span className="dossier-title">Em uma frase: </span>
              se um valor passou por um destes oito serviços de ocultação e
              reapareceu com vínculo estatisticamente confiável, o motor
              levanta a mão — e o analista decide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
