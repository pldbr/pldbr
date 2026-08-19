"use client";

// DashboardApp — compositor do dashboard de demonstração.
// Estado central: módulo ativo (sidebar) e alerta selecionado (compartilhado
// entre a fila de alertas e o Analista IA).

import { useState } from "react";
import type { Alert } from "@/lib/demoData";
import { alerts } from "@/lib/demoData";
import DashboardShell, { type ModuleId } from "./DashboardShell";
import CommandCenter from "./CommandCenter";
import AlertsQueue from "./AlertsQueue";
import TypologyTerminal from "./TypologyTerminal";
import ScreeningPanel from "./ScreeningPanel";
import KycPanel from "./KycPanel";
import CryptoPanel from "./CryptoPanel";
import CasesRifPanel from "./CasesRifPanel";
import BlockingPanel from "./BlockingPanel";
import AiAnalystPanel from "./AiAnalystPanel";
import LiveTerminal from "./LiveTerminal";

export default function DashboardApp() {
  const [activeModule, setActiveModule] = useState<ModuleId>("command");
  const [selectedAlert, setSelectedAlert] = useState<Alert>(alerts[0]);

  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] overflow-hidden">
      <div className="flex flex-1 min-h-0">
        <DashboardShell activeModule={activeModule} onModuleChange={setActiveModule}>
          {activeModule === "command" && <CommandCenter />}
          {activeModule === "alerts" && (
            <AlertsQueue
              selectedId={selectedAlert.id}
              onSelect={setSelectedAlert}
              onAnalyze={(a) => {
                setSelectedAlert(a);
                setActiveModule("ai");
              }}
            />
          )}
          {activeModule === "typologies" && <TypologyTerminal />}
          {activeModule === "screening" && <ScreeningPanel />}
          {activeModule === "kyc" && <KycPanel />}
          {activeModule === "crypto" && <CryptoPanel />}
          {activeModule === "cases" && <CasesRifPanel />}
          {activeModule === "blocking" && <BlockingPanel />}
          {activeModule === "ai" && (
            <AiAnalystPanel alert={selectedAlert} onChangeAlert={setSelectedAlert} />
          )}
        </DashboardShell>
      </div>
      <LiveTerminal />
    </div>
  );
}
