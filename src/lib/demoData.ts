// demoData.ts — dados de demonstração do dashboard PLD/AML.
//
// AMBIENTE DE DEMONSTRAÇÃO: todos os dados são FICTÍCIOS e gerados de forma
// determinística (seed fixa via mulberry32) — os mesmos números em toda
// gravação, para vídeos reprodutíveis. Nenhum dado real de cliente.

// ---------------------------------------------------------------------------
// PRNG determinístico (mulberry32) — seed fixa
// ---------------------------------------------------------------------------
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260819);

const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];
const between = (min: number, max: number) => min + rand() * (max - min);

// ---------------------------------------------------------------------------
// Tipologias (amostra das 25 production-ready citadas no site)
// ---------------------------------------------------------------------------
export interface Typology {
  code: string;
  name: string;
  layer: "Regras" | "ML Supervisionado" | "ML Não Supervisionado";
}

export const typologies: Typology[] = [
  { code: "TIP-001", name: "Fracionamento (structuring) abaixo do limite de reporte", layer: "Regras" },
  { code: "TIP-004", name: "Pass-through: entrada e saída em menos de 24h", layer: "Regras" },
  { code: "TIP-007", name: "Agregação de frações de múltiplas origens", layer: "ML Não Supervisionado" },
  { code: "TIP-009", name: "Contraparte em jurisdição de alto risco (FATF)", layer: "Regras" },
  { code: "TIP-013", name: "Crypto mixing / tumbler detection", layer: "ML Não Supervisionado" },
  { code: "TIP-016", name: "Over/under-invoicing em comércio exterior", layer: "ML Supervisionado" },
  { code: "TIP-018", name: "PEP com movimentação incompatível com renda declarada", layer: "ML Supervisionado" },
  { code: "TIP-021", name: "Cash-intensivo com depósitos em padrão geográfico atípico", layer: "ML Não Supervisionado" },
  { code: "TIP-025", name: "Rede de shells com sócio comum e fluxo circular", layer: "ML Não Supervisionado" },
];

// ---------------------------------------------------------------------------
// Alertas
// ---------------------------------------------------------------------------
export type Severity = "critical" | "high" | "medium" | "low";
export type AlertStatus = "novo" | "em_analise" | "escalonado" | "fechado";

export interface Alert {
  id: string;
  typology: Typology;
  cliente: string;
  valor: number;
  severity: Severity;
  score: number;
  status: AlertStatus;
  idadeMin: number;
  entidades: number;
}

const CLIENTES = [
  "Comércio Fictício Alfa Ltda.",
  "Importadora Demo Beta S.A.",
  "João Ninguém Sobrenome",
  "Holding Gama Demonstração Eireli",
  "Tech Delta Fictícia Ltda.",
  "Maria Exemplo da Silva",
  "Distribuidora Épsilon Demo",
  "Consultoria Zeta Fictícia",
  "Ômega Demonstração ME",
  "Lambda Exemplo Ltda.",
  "Kappa Fictício Comércio",
  "Iota Demo Serviços",
  "Theta Demonstração Participações",
  "Eta Exemplo Logística",
];

export const alerts: Alert[] = CLIENTES.map((cliente, i) => {
  const score = Math.round(between(62, 99));
  // severidade coerente com o score (a fila é ordenada por score)
  const severity: Severity =
    score >= 90 ? "critical" : score >= 78 ? "high" : score >= 68 ? "medium" : "low";
  return {
    id: `ALT-2026-${4100 + i}`,
    typology: typologies[i % typologies.length],
    cliente,
    valor: Math.round(between(8_000, 4_800_000)),
    severity,
    score,
    status: pick<AlertStatus>(["novo", "novo", "em_analise", "escalonado"]),
    idadeMin: Math.round(between(3, 220)),
    entidades: Math.round(between(2, 14)),
  };
}).sort((a, b) => b.score - a.score);

// ---------------------------------------------------------------------------
// KPIs e série 24h
// ---------------------------------------------------------------------------
export const kpis = {
  transacoesMes: 10_000_000,
  alertasHoje: 1_284,
  casosAbertos: 47,
  recall: 0.94,
  p95Segundos: 3.8,
};

export interface FlowPoint {
  hora: string;
  transacoes: number;
  alertas: number;
  bloqueios: number;
}

export const flow24h: FlowPoint[] = Array.from({ length: 24 }, (_, h) => {
  const base = h >= 8 && h <= 18 ? between(380_000, 560_000) : between(90_000, 220_000);
  return {
    hora: `${String(h).padStart(2, "0")}h`,
    transacoes: Math.round(base),
    alertas: Math.round(base / between(380, 520)),
    bloqueios: Math.round(base / between(2_400, 3_800)),
  };
});

// ---------------------------------------------------------------------------
// Health (API + 3 sidecars Go citados no site)
// ---------------------------------------------------------------------------
export interface HealthService {
  nome: string;
  papel: string;
  status: "operational" | "degraded";
  p95: string;
}

export const health: HealthService[] = [
  { nome: "API FastAPI", papel: "7 módulos · /api/v1", status: "operational", p95: "182 ms" },
  { nome: "Screener FAISS", papel: "sidecar Go · busca vetorial sanções", status: "operational", p95: "41 ms" },
  { nome: "Blocker OPA", papel: "sidecar Go · policy engine bloqueios", status: "operational", p95: "9 ms" },
  { nome: "Rules Engine", papel: "sidecar Go · 25 tipologias YAML", status: "operational", p95: "23 ms" },
];

// ---------------------------------------------------------------------------
// Screening de sanções
// ---------------------------------------------------------------------------
export interface ScreeningHit {
  nome: string;
  tipo: "pessoa" | "empresa";
  listas: string[];
  match: number;
  acao: string;
}

export const screeningHits: ScreeningHit[] = [
  { nome: "IVAN DEMO PETROV*", tipo: "pessoa", listas: ["OFAC SDN"], match: 96.2, acao: "Bloqueio preventivo + RIF" },
  { nome: "ALPHA DEMO SHIPPING LCC", tipo: "empresa", listas: ["OFAC SDN", "UE"], match: 91.8, acao: "Caso aberto — COAF" },
  { nome: "MARIA EXEMPLO IVANOVA", tipo: "pessoa", listas: ["ONU"], match: 78.4, acao: "Análise manual (analista)" },
  { nome: "BETA DEMO TRADING FZE", tipo: "empresa", listas: ["UE", "CEAF"], match: 84.1, acao: "KYB reforçado" },
  { nome: "GAMA DEMO HOLDINGS S.A.", tipo: "empresa", listas: ["CEAF"], match: 71.9, acao: "Monitoramento contínuo" },
  { nome: "PEDRO FICTÍCIO SANTOS", tipo: "pessoa", listas: [], match: 12.3, acao: "Liberado (falso positivo)" },
];

// ---------------------------------------------------------------------------
// KYC / KYB
// ---------------------------------------------------------------------------
export const kycProfile = {
  cliente: "Importadora Demo Beta S.A.",
  scoreRisco: 82,
  pep: true,
  pepDetalhe: "Sócio minoritário: ex-deputado estadual (2028–2032, fictício)",
  fonteRenda: "Comércio exterior — faturamento declarado R$ 14,2 mi/ano",
  documentos: [
    { doc: "Contrato social", status: "validado", via: "Document AI" },
    { doc: "Procuração do representante", status: "validado", via: "Document AI" },
    { doc: "Comprovante de endereço", status: "pendente", via: "—" },
    { doc: "Certidão negativa criminal", status: "validado", via: "DLP + OCR" },
  ],
  kyb: {
    socios: 4,
    sociosPEP: 1,
    empresasVinculadas: 6,
    jurisdicoes: ["Brasil", "Uruguai (demo)", "Portugal (demo)"],
    alerta: "Sócio comum com 2 empresas já citadas em caso CAS-2026-0112",
  },
};

// ---------------------------------------------------------------------------
// Crypto Intelligence
// ---------------------------------------------------------------------------
export const MIXERS_CITADOS = [
  "Tornado Cash",
  "Blender",
  "Sinbad",
  "Samourai",
  "Wasabi",
  "ChipMixer",
  "Bitcoin Fog",
  "Helix",
] as const;

export interface CryptoAddress {
  endereco: string;
  chain: "BTC" | "ETH" | "TRON" | "SOL";
  risco: Severity;
  mixer: string | null;
  hops: number;
  volumeBRL: number;
  sancionado: boolean;
  cluster: string;
}

export const cryptoAddresses: CryptoAddress[] = [
  { endereco: "bc1qdemo0x7f…k9va", chain: "BTC", risco: "critical", mixer: "ChipMixer", hops: 6, volumeBRL: 2_940_000, sancionado: false, cluster: "CL-88 (27 endereços)" },
  { endereco: "0xDemo…9c2E", chain: "ETH", risco: "critical", mixer: "Tornado Cash", hops: 4, volumeBRL: 1_780_000, sancionado: true, cluster: "CL-12 (58 endereços)" },
  { endereco: "TDemo…xR4p", chain: "TRON", risco: "high", mixer: null, hops: 3, volumeBRL: 940_000, sancionado: false, cluster: "CL-104 (11 endereços)" },
  { endereco: "DemoBq…7Wz", chain: "SOL", risco: "medium", mixer: "Wasabi", hops: 2, volumeBRL: 310_000, sancionado: false, cluster: "CL-31 (7 endereços)" },
  { endereco: "bc1qdemo…p2mn", chain: "BTC", risco: "high", mixer: "Samourai", hops: 5, volumeBRL: 660_000, sancionado: false, cluster: "CL-88 (27 endereços)" },
  { endereco: "0xDemo…b4aA", chain: "ETH", risco: "low", mixer: null, hops: 1, volumeBRL: 48_000, sancionado: false, cluster: "—" },
];

// ---------------------------------------------------------------------------
// Casos + RIF/SISCOAF
// ---------------------------------------------------------------------------
export interface RifInfo {
  status: "assinado" | "pendente" | "não gerado";
  protocolo: string | null;
  assinaturaICP: boolean;
  worm: boolean;
}

export interface CaseItem {
  id: string;
  titulo: string;
  alertas: string[];
  status: "investigacao" | "aguardando_rif" | "reportado" | "arquivado";
  rif: RifInfo;
  atualizado: string;
}

export const cases: CaseItem[] = [
  {
    id: "CAS-2026-0117",
    titulo: "Rede de shells com fluxo circular (TIP-025)",
    alertas: ["ALT-2026-0410", "ALT-2026-0419"],
    status: "aguardando_rif",
    rif: { status: "assinado", protocolo: "RIF-2026-88214", assinaturaICP: true, worm: true },
    atualizado: "hoje, 09:42",
  },
  {
    id: "CAS-2026-0112",
    titulo: "Mixer Tornado Cash → exchange (TIP-013)",
    alertas: ["ALT-2026-0411"],
    status: "investigacao",
    rif: { status: "pendente", protocolo: null, assinaturaICP: false, worm: true },
    atualizado: "hoje, 08:15",
  },
  {
    id: "CAS-2026-0109",
    titulo: "Over-invoicing importadora (TIP-016)",
    alertas: ["ALT-2026-0416"],
    status: "reportado",
    rif: { status: "assinado", protocolo: "RIF-2026-87901", assinaturaICP: true, worm: true },
    atualizado: "ontem, 17:03",
  },
  {
    id: "CAS-2026-0104",
    titulo: "PEP movimentação incompatível (TIP-018)",
    alertas: ["ALT-2026-0417"],
    status: "investigacao",
    rif: { status: "não gerado", protocolo: null, assinaturaICP: false, worm: false },
    atualizado: "ontem, 11:27",
  },
  {
    id: "CAS-2026-0098",
    titulo: "Fracionamento em 41 agências (TIP-001)",
    alertas: ["ALT-2026-0413"],
    status: "reportado",
    rif: { status: "assinado", protocolo: "RIF-2026-87440", assinaturaICP: true, worm: true },
    atualizado: "12/08, 14:50",
  },
];

// ---------------------------------------------------------------------------
// Blocking (OPA)
// ---------------------------------------------------------------------------
export interface BlockingEntry {
  id: string;
  conta: string;
  regraOpa: string;
  motivo: string;
  valor: number;
  ha: string;
}

export const blockings: BlockingEntry[] = [
  { id: "BLQ-77812", conta: "Conta Demo ****4471", regraOpa: "sanctions/ofac_sdn", motivo: "Match OFAC SDN 96,2%", valor: 412_000, ha: "há 4 min" },
  { id: "BLQ-77810", conta: "Conta Demo ****2038", regraOpa: "crypto/mixer_deposit", motivo: "Depósito vinculado a ChipMixer", valor: 89_500, ha: "há 21 min" },
  { id: "BLQ-77805", conta: "Conta Demo ****9914", regraOpa: "aml/structuring_v2", motivo: "11 depósitos < R$ 50 mil em 6h", valor: 528_000, ha: "há 1 h" },
  { id: "BLQ-77798", conta: "Conta Demo ****3307", regraOpa: "geo/high_risk_jurisdiction", motivo: "Remessa para jurisdição FATF cinza", valor: 1_240_000, ha: "há 2 h" },
  { id: "BLQ-77791", conta: "Conta Demo ****8850", regraOpa: "pep/income_mismatch", motivo: "Movimentação 14× renda declarada", valor: 2_050_000, ha: "há 3 h" },
];

// ---------------------------------------------------------------------------
// Compliance + Ecossistema
// ---------------------------------------------------------------------------
export const compliance = [
  { norma: "Circular BACEN 3.978/2020", cobertura: 100 },
  { norma: "Carta-Circular 4.001/2020", cobertura: 100 },
  { norma: "Lei 9.613/98 · Lei 13.259/2016", cobertura: 100 },
  { norma: "LGPD", cobertura: 100 },
  { norma: "FATF R.15 (VASPs)", cobertura: 92 },
  { norma: "Sanctions OFAC · ONU · UE · CEAF", cobertura: 96 },
];

export const ecosystem = [
  "Beans Capital",
  "Beans Credit",
  "Moneyp.AI",
  "Tributo.tech",
  "Receber.tech",
  "BeansBank",
  "LegalBet.tech",
];

// ---------------------------------------------------------------------------
// YAML da tipologia (padrão do TerminalCode do site)
// ---------------------------------------------------------------------------
export const typologyYaml: string[] = [
  "tipologia:",
  "  id: TIP-013",
  "  nome: Crypto Mixing / Tumbler Detection",
  "  versao: 3.4.1",
  "  camada: nao_supervisionado",
  "  ativa: true",
  "  parametros:",
  "    janela_dias: 30",
  "    score_minimo: 0.62",
  "    saltos_maximos: 6",
  "  mixers_monitorados:",
  "    - tornado_cash",
  "    - blender",
  "    - sinbad",
  "    - samourai",
  "    - wasabi",
  "    - chipmixer",
  "    - bitcoin_fog",
  "    - helix",
  "  chains:",
  "    - bitcoin",
  "    - ethereum",
  "    - tron",
  "    - solana",
  "  acoes:",
  "    - alertar_analista",
  "    - vincular_caso",
  "    - sugerir_rif_se_score_acima_0.85",
];

// ---------------------------------------------------------------------------
// Eventos "ao vivo" do terminal (reproduzidos em loop com horário real)
// ---------------------------------------------------------------------------
export const liveEventTemplates: string[] = [
  "screening: {n} consultas OFAC/ONU/UE/CEAF · p95 41 ms",
  "alerts: TIP-{t} disparou para conta demo ****{c} · score {s}",
  "rules-engine: hot-reload TIP-013 v3.4.1 aplicado sem downtime",
  "crypto: cluster CL-{cl} expandido (+{n} endereços) via heurística de inputs",
  "blocking: OPA policy sanctions/ofac_sdn bloqueou R$ {v}",
  "kyc: Document AI validou contrato social (confiança 0,97)",
  "rif: RIF-{r} assinado via Cloud KMS (ICP-Brasil) · guarda WORM 10 anos",
  "dataflow: lote de {n} transações enriquecido no BigQuery",
  "ml: modelo supervisionado v7 recall 0,94 · drift 0,3%",
  "audit: trilha imutável gravada (audit_storage · WORM)",
];

export function makeLiveEvent(): string {
  const t = liveEventTemplates[Math.floor(rand() * liveEventTemplates.length)];
  return t
    .replace("{n}", String(Math.round(between(120, 4200))))
    .replace("{t}", String(Math.round(between(1, 25))).padStart(3, "0"))
    .replace("{c}", String(Math.round(between(1000, 9999))))
    .replace("{s}", (between(0.62, 0.99)).toFixed(2))
    .replace("{cl}", String(Math.round(between(10, 120))))
    .replace("{v}", Math.round(between(20_000, 900_000)).toLocaleString("pt-BR"))
    .replace("{r}", String(Math.round(between(87000, 89000))));
}

// ---------------------------------------------------------------------------
// Análise mock (fallback offline do Analista IA)
// ---------------------------------------------------------------------------
export function mockAnalysis(alert: Alert): string {
  const v = alert.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  return [
    `**Análise do alerta ${alert.id} — ${alert.typology.code} (${alert.typology.name})**`,
    "",
    `**Entidade:** ${alert.cliente} · ${alert.entidades} entidades vinculadas`,
    `**Valor envolvido:** ${v}`,
    `**Score de risco:** ${alert.score}/100 · severidade ${alert.severity.toUpperCase()}`,
    `**Camada de detecção:** ${alert.typology.layer}`,
    "",
    "**Fundamentos:**",
    `1. O padrão observado é consistente com a tipologia ${alert.typology.code} segundo a Carta-Circular BACEN 4.001/2020.`,
    `2. A rede de ${alert.entidades} entidades apresenta fluxo com características de ocultação (layering).`,
    "3. Cross-check automático: sem match direto em listas restritivas para os envolvidos principais.",
    "",
    "**Recomendações:**",
    `- ${alert.score >= 85 ? "Escalar para caso e avaliar RIF ao COAF/SISCOAF (prazo: 24h úteis)." : "Manter em análise ampliada por 5 dias úteis."}`,
    "- Revisar KYC/KYB dos sócios com controle comum.",
    "- Preservar evidências no audit trail WORM (10 anos).",
    "",
    "_Gerado em modo demonstração offline (sem chamada à API). Dados fictícios._",
  ].join("\n");
}
