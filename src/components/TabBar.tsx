"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Cpu,
  Bitcoin,
  Network,
  FileCheck,
  Building,
  ChevronRight,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Visão Geral", icon: Shield },
  { id: "motor", label: "Motor PLD", icon: Cpu },
  { id: "crypto", label: "Crypto Intel", icon: Bitcoin },
  { id: "ecossistema", label: "Ecossistema", icon: Network },
  { id: "compliance", label: "Compliance", icon: FileCheck },
  { id: "governo", label: "Governo", icon: Building },
] as const;

export type TabId = (typeof tabs)[number]["id"];

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [shadowVisible, setShadowVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-[var(--color-border)] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3"
          onScroll={() => setShadowVisible(true)}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                  whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer
                  ${
                    isActive
                      ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                  }
                `}
              >
                <Icon
                  size={15}
                  className={
                    isActive ? "text-white" : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)]"
                  }
                />
                {tab.label}
                {isActive && <ChevronRight size={12} />}
              </button>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export { tabs };
export type { TabBarProps };
