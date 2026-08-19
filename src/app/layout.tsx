import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PLD/AML — Motor de Detecção de Lavagem de Dinheiro | BeansTech",
  description:
    "Motor PLD/AML deployado em produção: 25 tipologias, 3 camadas de detecção, 10M transações/mês. Rastreio de criptomoedas, análise on-chain e cessão de tecnologia para órgãos públicos. Circular BACEN 3.978/2020, Lei 9.613/98, SISCOAF.",
  keywords: [
    "PLD",
    "AML",
    "lavagem de dinheiro",
    "compliance",
    "BACEN",
    "COAF",
    "SISCOAF",
    "criptomoedas",
    "chain analysis",
    "blockchain",
    "MPF",
    "Ministério Público",
    "RegTech",
    "KYC",
    "KYB",
    "sanctions",
    "screening",
  ],
  openGraph: {
    title: "PLD/AML — Motor de Detecção | BeansTech",
    description:
      "Detecção em 3 camadas, 25 tipologias, rastreio de criptomoedas. Motor que protege 12+ plataformas do ecossistema BeansTech.",
    url: "https://pldbr.tech",
    siteName: "BeansTech",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "PLD/AML — Motor de Detecção | BeansTech",
    description:
      "Detecção em 3 camadas, 25 tipologias, rastreio de criptomoedas.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="canonical" href="https://pldbr.tech" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BeansTech Tecnologia Ltda",
              url: "https://beanstech.com.br",
              logo: "https://beanstech.com.br/logo.svg",
              sameAs: ["https://github.com/beanstechhub"],
              contactPoint: {
                "@type": "ContactPoint",
                email: "contato@beanstech.com.br",
                contactType: "sales",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PLD/AML Engine",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Cloud",
              description: "Solução sob consulta para instituições financeiras e órgãos públicos.",
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
