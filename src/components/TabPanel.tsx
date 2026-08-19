"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface TabPanelProps {
  id: string;
  activeTab: string;
  children: ReactNode;
}

export default function TabPanel({ id, activeTab, children }: TabPanelProps) {
  if (activeTab !== id) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
