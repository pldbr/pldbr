"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import TabBar, { type TabId } from "@/components/TabBar";
import TabPanel from "@/components/TabPanel";
import OverviewPanel from "@/components/panels/OverviewPanel";
import MotorPanel from "@/components/panels/MotorPanel";
import CryptoPanel from "@/components/panels/CryptoPanel";
import EcossistemaPanel from "@/components/panels/EcossistemaPanel";
import CompliancePanel from "@/components/panels/CompliancePanel";
import GovernoPanel from "@/components/panels/GovernoPanel";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <main>
      <Hero />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <TabPanel id="overview" activeTab={activeTab}>
        <OverviewPanel />
      </TabPanel>

      <TabPanel id="motor" activeTab={activeTab}>
        <MotorPanel />
      </TabPanel>

      <TabPanel id="crypto" activeTab={activeTab}>
        <CryptoPanel />
      </TabPanel>

      <TabPanel id="ecossistema" activeTab={activeTab}>
        <EcossistemaPanel />
      </TabPanel>

      <TabPanel id="compliance" activeTab={activeTab}>
        <CompliancePanel />
      </TabPanel>

      <TabPanel id="governo" activeTab={activeTab}>
        <GovernoPanel />
      </TabPanel>

      <CTA />
      <Footer />
    </main>
  );
}
