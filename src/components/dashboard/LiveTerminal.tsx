"use client";

// LiveTerminal — faixa inferior com stream de eventos "ao vivo" do motor.
// Mantém o vídeo em movimento constante; eventos gerados do dataset
// determinístico (fictício) com horário real de São Paulo.

import { useEffect, useRef, useState } from "react";
import { makeLiveEvent } from "@/lib/demoData";

interface Ev {
  id: number;
  hora: string;
  texto: string;
}

export default function LiveTerminal() {
  const [events, setEvents] = useState<Ev[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    const push = () => {
      idRef.current += 1;
      const ev: Ev = {
        id: idRef.current,
        hora: fmt.format(new Date()),
        texto: makeLiveEvent(),
      };
      setEvents((prev) => [...prev.slice(-2), ev]);
    };
    push();
    const t = setInterval(push, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      data-tour="live-terminal"
      className="h-[92px] shrink-0 border-t border-[var(--color-border)] bg-[#0d0d10] px-6 py-2 font-mono text-xs overflow-hidden"
      aria-live="polite"
      aria-label="Eventos ao vivo do motor"
    >
      {events.map((ev) => (
        <p key={ev.id} className="whitespace-nowrap overflow-hidden text-ellipsis leading-6">
          <span className="text-[var(--color-text-secondary)]">{ev.hora}</span>{" "}
          <span className="text-[var(--color-success)]">●</span>{" "}
          <span className="text-[var(--color-text-primary)]/90">{ev.texto}</span>
        </p>
      ))}
    </div>
  );
}
