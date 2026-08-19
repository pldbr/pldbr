import type { Metadata } from "next";
import DashboardApp from "@/components/dashboard/DashboardApp";

export const metadata: Metadata = {
  title: "Dashboard de Demonstração — PLD/AML | BeansTech",
  description:
    "Ambiente de demonstração com dados fictícios do motor PLD/AML BeansTech.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardApp />;
}
