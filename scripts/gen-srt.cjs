// gen-srt.cjs — gera legendas .srt da série a partir das mesmas cenas do
// gravador (record-episodio.cjs): intro 2,5s + cenas (ms) + fechamento 3s.
// Uso: node scripts/gen-srt.cjs  →  public/demo/serie/ep-NN.srt

const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '../public/demo/serie');

const EP = [
  { n: 1, titulo: 'O que é lavagem de dinheiro', scenes: [
    ['Lavagem: colocar, ocultar, integrar', 18000],
    ['O motor enxerga o ciclo onde ele tenta ser invisível', 16000],
    ['Nesta série: uma investigação inteira, passo a passo', 16000],
    ['Um minuto por episódio', 8000],
  ]},
  { n: 2, titulo: 'O sistema em um relance', scenes: [
    ['Centro de comando: o motor em produção', 14000],
    ['10 milhões de movimentações/mês examinadas', 14000],
    ['Recall 0,94: de cada 100 casos reais, 94 apanhados', 15000],
    ['Resposta em segundos — sem fila, sem espera', 12000],
  ]},
  { n: 3, titulo: 'Uma movimentação entra', scenes: [
    ['24 horas de ontem, hora a hora', 16000],
    ['Ondas de transações: o pico comercial da manhã', 15000],
    ['Onde há volume, surgem alertas', 15000],
    ['Dinheiro suspeito se esconde em movimento comum', 10000],
  ]},
  { n: 4, titulo: 'O motor levanta a suspeita', scenes: [
    ['A fila de alertas: a mão levantada do motor', 14000],
    ['Score 0–100: probabilidade — indício, não prova', 16000],
    ['Vermelho: ação hoje · amarelo: 24 horas', 15000],
    ['O mais grave está sempre no topo', 10000],
  ]},
  { n: 5, titulo: 'Lendo um alerta', scenes: [
    ['O caso da série: ALT-2026-4100', 14000],
    ['Comércio Fictício Alfa · fracionamento (TIP-001)', 16000],
    ['Valor: quase R$ 2 milhões · 3 entidades', 15000],
    ['Camada: quem detectou — regra, modelo ou desvio', 11000],
  ]},
  { n: 6, titulo: 'A regra que a máquina executa', scenes: [
    ['Toda suspeita nasce de regra documentada', 15000],
    ['À esquerda: a regra que a máquina lê', 15000],
    ['À direita: a mesma regra em português', 15000],
    ['Auditável linha a linha, em fiscalização', 9000],
  ]},
  { n: 7, titulo: 'A trilha de um fracionador', scenes: [
    ['Outra tipologia: crypto mixing', 15000],
    ['Persegue até 6 saltos, confiança > 62%', 15000],
    ['8 serviços de ocultação sob vigilância', 15000],
    ['Vínculo confiável: o motor levanta a mão', 10000],
  ]},
  { n: 8, titulo: 'Quem é o cliente', scenes: [
    ['Antes do dinheiro, o rosto: KYC', 14000],
    ['Score 82 — risco alto', 14000],
    ['Sócio PEP: cargo público exige atenção redobrada', 16000],
    ['Documentos validados automaticamente', 10000],
  ]},
  { n: 9, titulo: 'A rede de sócios', scenes: [
    ['Ninguém lava sozinho: o KYB mapeia a rede', 15000],
    ['6 empresas vinculadas · 3 jurisdições', 15000],
    ['Sócio comum com empresas já citadas noutro caso', 16000],
    ['É assim que ilhas viram continente', 9000],
  ]},
  { n: 10, titulo: 'Consultando as listas', scenes: [
    ['Listas restritivas: OFAC, ONU, UE, CEAF', 14000],
    ['Ivan Demo Petrov: match 96% com OFAC SDN', 16000],
    ['Acima de 85%: bloqueio preventivo + COAF', 15000],
    ['A mesma checagem dos bancos — em milissegundos', 10000],
  ]},
  { n: 11, titulo: 'A trilha cripto começa', scenes: [
    ['Parte do dinheiro foi para cripto', 14000],
    ['Origem → mixer → reaparece numa exchange', 16000],
    ['Mixer: embaralha fundos para esconder a origem', 15000],
    ['O rastro não acabou: virou nome', 10000],
  ]},
  { n: 12, titulo: 'Mixers: onde o dinheiro se esconde', scenes: [
    ['Os 8 mixers sob vigilância', 15000],
    ['Tornado Cash, ChipMixer, Wasabi, Samourai…', 15000],
    ['Usar mixer não é crime — mas é o sinal nº1', 15000],
    ['Vários já desativados em ações internacionais', 10000],
  ]},
  { n: 13, titulo: 'Um investigado, muitas carteiras', scenes: [
    ['Cluster: carteiras de um mesmo controlador', 15000],
    ['CL-88: 27 endereços, descobertos por heurísticas', 16000],
    ['Público e verificável — não palpite', 14000],
    ['Não são 27 suspeitos: é um', 9000],
  ]},
  { n: 14, titulo: 'Endereços sancionados', scenes: [
    ['O agravante: endereço na lista OFAC', 15000],
    ['Dinheiro que por aqui passou toca sanções', 15000],
    ['Resgate dependerá de cooperação internacional', 15000],
    ['A exposição constará no relatório', 10000],
  ]},
  { n: 15, titulo: 'O caso se abre', scenes: [
    ['Alerta confirmado vira caso', 14000],
    ['CAS-2026-0112: o caso do mixer', 15000],
    ['Linha do tempo: tudo datado, tudo assinado', 15000],
    ['Relatório sem trilha é opinião', 10000],
  ]},
  { n: 16, titulo: 'A IA propõe, o humano decide', scenes: [
    ['O assistente: IA lê o alerta e propõe a minuta', 13000],
    ['Modelo: qwen3.7-flash (Qwen)', 11000],
    ['Analisando em tempo real…', 18000],
    ['A IA propõe — quem decide é o analista humano', 12000],
  ]},
  { n: 17, titulo: 'Trocando o modelo', scenes: [
    ['A mesma pergunta a outro modelo', 12000],
    ['GLM-5.2-fast (Zhipu)', 10000],
    ['Redação diferente, conclusão equivalente', 22000],
    ['Sem dependência de fornecedor único · failover de cota', 12000],
  ]},
  { n: 18, titulo: 'Bloqueio preventivo', scenes: [
    ['Valor perigoso: retido em milissegundos', 14000],
    ['Sempre citando a regra e o motivo', 15000],
    ['Nada é definitivo', 13000],
    ['Liberação exige dupla aprovação humana registrada', 12000],
  ]},
  { n: 19, titulo: 'O RIF é assinado', scenes: [
    ['Suspeita confirmada: nasce o RIF ao COAF', 14000],
    ['Prazo: 24 horas úteis', 13000],
    ['Assinatura digital com validade de cartório', 15000],
    ['Guarda imutável por 10 anos — nem o sistema altera', 13000],
  ]},
  { n: 20, titulo: 'O dossiê final', scenes: [
    ['Do dado bruto ao dossiê', 14000],
    ['Fracionamento · PEP · cripto · sanções · RIF', 15000],
    ['Cadeia de custódia pronta para instruir inquérito', 15000],
    ['Disponível em cessão ao Ministério Público', 12000],
  ]},
];

const INTRO_MS = 2500;
const FINAL_MS = 3000;

function fmt(ms) {
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const mil = String(ms % 1000).padStart(3, '0');
  return `${h}:${m}:${s},${mil}`;
}

fs.mkdirSync(OUT, { recursive: true });
for (const ep of EP) {
  let t = 0, idx = 1, srt = '';
  const push = (start, end, text) => {
    srt += `${idx++}\n${fmt(start)} --> ${fmt(end)}\n${text}\n\n`;
  };
  push(t, t + INTRO_MS, `pldbr.tech — EP ${String(ep.n).padStart(2, '0')}: ${ep.titulo}`);
  t += INTRO_MS;
  for (const [cap, ms] of ep.scenes) {
    push(t, t + ms, cap);
    t += ms;
  }
  push(t, t + FINAL_MS, 'Ambiente de demonstração — dados fictícios · pldbr.tech');
  const file = path.join(OUT, `ep-${String(ep.n).padStart(2, '0')}.srt`);
  fs.writeFileSync(file, srt, 'utf8');
}
console.log(`✅ ${EP.length} legendas .srt geradas em ${OUT}`);
