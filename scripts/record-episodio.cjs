// record-episodio.cjs — grava um episódio da série didática "Uma investigação
// em 20 minutos" (docs/serie-videos-investigacao.md).
//
// Uso: node scripts/record-episodio.cjs --ep 5
// Requer servidor em http://localhost:3100 (produção standalone).
//
// Saída: public/demo/serie/ep-NN.mp4 — 1080p (DPR 2 → lanczos), ~60s,
// legendas queimadas (chip do episódio + legenda por cena), sem áudio.

const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  console.error('playwright não instalado: rode npm install antes.');
  process.exit(1);
}
const FFMPEG = require('ffmpeg-static');

const BASE = process.env.BASE_URL || 'http://localhost:3100';
const OUT_DIR = path.resolve(__dirname, '../public/demo/serie');
const DPR = 1;
const VP = { width: 1920, height: 1080 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Roteiros: cada cena = { cap: legenda, a: ações, ms: duração da cena }
// ---------------------------------------------------------------------------
const EP = [
  { n: 1, titulo: 'O que é lavagem de dinheiro', route: '/', scenes: [
    { cap: 'Lavagem: colocar, ocultar, integrar', a: [], ms: 18000 },
    { cap: 'O motor enxerga o ciclo onde ele tenta ser invisível', a: ['scroll:600'], ms: 16000 },
    { cap: 'Nesta série: uma investigação inteira, passo a passo', a: ['scroll:600'], ms: 16000 },
    { cap: 'Um minuto por episódio', a: [], ms: 8000 },
  ]},
  { n: 2, titulo: 'O sistema em um relance', route: '/dashboard', scenes: [
    { cap: 'Centro de comando: o motor em produção', a: [], ms: 14000 },
    { cap: '10 milhões de movimentações/mês examinadas', a: ['scroll:350'], ms: 14000 },
    { cap: 'Recall 0,94: de cada 100 casos reais, 94 apanhados', a: [], ms: 15000 },
    { cap: 'Resposta em segundos — sem fila, sem espera', a: ['scroll:400'], ms: 12000 },
  ]},
  { n: 3, titulo: 'Uma movimentação entra', route: '/dashboard', scenes: [
    { cap: '24 horas de ontem, hora a hora', a: ['nav:command', 'scroll:600'], ms: 16000 },
    { cap: 'Ondas de transações: o pico comercial da manhã', a: [], ms: 15000 },
    { cap: 'Onde há volume, surgem alertas', a: [], ms: 15000 },
    { cap: 'Dinheiro suspeito se esconde em movimento comum', a: [], ms: 10000 },
  ]},
  { n: 4, titulo: 'O motor levanta a suspeita', route: '/dashboard', scenes: [
    { cap: 'A fila de alertas: a mão levantada do motor', a: ['nav:alerts'], ms: 14000 },
    { cap: 'Score 0–100: probabilidade — indício, não prova', a: [], ms: 16000 },
    { cap: 'Vermelho: ação hoje · amarelo: 24 horas', a: ['scroll:300'], ms: 15000 },
    { cap: 'O mais grave está sempre no topo', a: ['scroll:-300'], ms: 10000 },
  ]},
  { n: 5, titulo: 'Lendo um alerta', route: '/dashboard', scenes: [
    { cap: 'O caso da série: ALT-2026-4100', a: ['nav:alerts'], ms: 14000 },
    { cap: 'Comércio Fictício Alfa · fracionamento (TIP-001)', a: ['clickrow'], ms: 16000 },
    { cap: 'Valor: quase R$ 2 milhões · 3 entidades', a: [], ms: 15000 },
    { cap: 'Camada: quem detectou — regra, modelo ou desvio', a: ['scroll:250'], ms: 11000 },
  ]},
  { n: 6, titulo: 'A regra que a máquina executa', route: '/dashboard', scenes: [
    { cap: 'Toda suspeita nasce de regra documentada', a: ['nav:typologies'], ms: 15000 },
    { cap: 'À esquerda: a regra que a máquina lê', a: [], ms: 15000 },
    { cap: 'À direita: a mesma regra em português', a: ['scroll:450'], ms: 15000 },
    { cap: 'Auditável linha a linha, em fiscalização', a: [], ms: 9000 },
  ]},
  { n: 7, titulo: 'A trilha de um fracionador', route: '/dashboard', scenes: [
    { cap: 'Outra tipologia: crypto mixing', a: ['nav:typologies'], ms: 15000 },
    { cap: 'Persegue até 6 saltos, confiança > 62%', a: [], ms: 15000 },
    { cap: '8 serviços de ocultação sob vigilância', a: [], ms: 15000 },
    { cap: 'Vínculo confiável: o motor levanta a mão', a: [], ms: 10000 },
  ]},
  { n: 8, titulo: 'Quem é o cliente', route: '/dashboard', scenes: [
    { cap: 'Antes do dinheiro, o rosto: KYC', a: ['nav:kyc'], ms: 14000 },
    { cap: 'Score 82 — risco alto', a: [], ms: 14000 },
    { cap: 'Sócio PEP: cargo público exige atenção redobrada', a: ['scroll:250'], ms: 16000 },
    { cap: 'Documentos validados automaticamente', a: [], ms: 10000 },
  ]},
  { n: 9, titulo: 'A rede de sócios', route: '/dashboard', scenes: [
    { cap: 'Ninguém lava sozinho: o KYB mapeia a rede', a: ['nav:kyc', 'scroll:600'], ms: 15000 },
    { cap: '6 empresas vinculadas · 3 jurisdições', a: [], ms: 15000 },
    { cap: 'Sócio comum com empresas já citadas noutro caso', a: [], ms: 16000 },
    { cap: 'É assim que ilhas viram continente', a: [], ms: 9000 },
  ]},
  { n: 10, titulo: 'Consultando as listas', route: '/dashboard', scenes: [
    { cap: 'Listas restritivas: OFAC, ONU, UE, CEAF', a: ['nav:screening'], ms: 14000 },
    { cap: 'Ivan Demo Petrov: match 96% com OFAC SDN', a: [], ms: 16000 },
    { cap: 'Acima de 85%: bloqueio preventivo + COAF', a: [], ms: 15000 },
    { cap: 'A mesma checagem dos bancos — em milissegundos', a: ['type:DEMO'], ms: 10000 },
  ]},
  { n: 11, titulo: 'A trilha cripto começa', route: '/dashboard', scenes: [
    { cap: 'Parte do dinheiro foi para cripto', a: ['nav:crypto'], ms: 14000 },
    { cap: 'Origem → mixer → reaparece numa exchange', a: [], ms: 16000 },
    { cap: 'Mixer: embaralha fundos para esconder a origem', a: [], ms: 15000 },
    { cap: 'O rastro não acabou: virou nome', a: [], ms: 10000 },
  ]},
  { n: 12, titulo: 'Mixers: onde o dinheiro se esconde', route: '/dashboard', scenes: [
    { cap: 'Os 8 mixers sob vigilância', a: ['nav:crypto', 'scroll:800'], ms: 15000 },
    { cap: 'Tornado Cash, ChipMixer, Wasabi, Samourai…', a: [], ms: 15000 },
    { cap: 'Usar mixer não é crime — mas é o sinal nº1', a: [], ms: 15000 },
    { cap: 'Vários já desativados em ações internacionais', a: [], ms: 10000 },
  ]},
  { n: 13, titulo: 'Um investigado, muitas carteiras', route: '/dashboard', scenes: [
    { cap: 'Cluster: carteiras de um mesmo controlador', a: ['nav:crypto', 'scroll:400'], ms: 15000 },
    { cap: 'CL-88: 27 endereços, descobertos por heurísticas', a: [], ms: 16000 },
    { cap: 'Público e verificável — não palpite', a: [], ms: 14000 },
    { cap: 'Não são 27 suspeitos: é um', a: [], ms: 9000 },
  ]},
  { n: 14, titulo: 'Endereços sancionados', route: '/dashboard', scenes: [
    { cap: 'O agravante: endereço na lista OFAC', a: ['nav:crypto', 'scroll:500'], ms: 15000 },
    { cap: 'Dinheiro que por aqui passou toca sanções', a: [], ms: 15000 },
    { cap: 'Resgate dependerá de cooperação internacional', a: [], ms: 15000 },
    { cap: 'A exposição constará no relatório', a: [], ms: 10000 },
  ]},
  { n: 15, titulo: 'O caso se abre', route: '/dashboard', scenes: [
    { cap: 'Alerta confirmado vira caso', a: ['nav:cases'], ms: 14000 },
    { cap: 'CAS-2026-0112: o caso do mixer', a: ['scroll:200'], ms: 15000 },
    { cap: 'Linha do tempo: tudo datado, tudo assinado', a: [], ms: 15000 },
    { cap: 'Relatório sem trilha é opinião', a: [], ms: 10000 },
  ]},
  { n: 16, titulo: 'A IA propõe, o humano decide', route: '/dashboard', scenes: [
    { cap: 'O assistente: IA lê o alerta e propõe a minuta', a: ['nav:ai'], ms: 13000 },
    { cap: 'Modelo: qwen3.7-flash (Qwen)', a: [], ms: 11000 },
    { cap: 'Analisando em tempo real…', a: ['analyze'], ms: 18000 },
    { cap: 'A IA propõe — quem decide é o analista humano', a: [], ms: 12000 },
  ]},
  { n: 17, titulo: 'Trocando o modelo', route: '/dashboard', scenes: [
    { cap: 'A mesma pergunta a outro modelo', a: ['nav:ai'], ms: 12000 },
    { cap: 'GLM-5.2-fast (Zhipu)', a: ['model:glm'], ms: 10000 },
    { cap: 'Redação diferente, conclusão equivalente', a: ['analyze'], ms: 22000 },
    { cap: 'Sem dependência de fornecedor único · failover de cota', a: [], ms: 12000 },
  ]},
  { n: 18, titulo: 'Bloqueio preventivo', route: '/dashboard', scenes: [
    { cap: 'Valor perigoso: retido em milissegundos', a: ['nav:blocking'], ms: 14000 },
    { cap: 'Sempre citando a regra e o motivo', a: ['scroll:200'], ms: 15000 },
    { cap: 'Nada é definitivo', a: [], ms: 13000 },
    { cap: 'Liberação exige dupla aprovação humana registrada', a: [], ms: 12000 },
  ]},
  { n: 19, titulo: 'O RIF é assinado', route: '/dashboard', scenes: [
    { cap: 'Suspeita confirmada: nasce o RIF ao COAF', a: ['nav:cases'], ms: 14000 },
    { cap: 'Prazo: 24 horas úteis', a: ['scroll:250'], ms: 13000 },
    { cap: 'Assinatura digital com validade de cartório', a: [], ms: 15000 },
    { cap: 'Guarda imutável por 10 anos — nem o sistema altera', a: [], ms: 13000 },
  ]},
  { n: 20, titulo: 'O dossiê final', route: '/dashboard', scenes: [
    { cap: 'Do dado bruto ao dossiê', a: ['nav:command'], ms: 14000 },
    { cap: 'Fracionamento · PEP · cripto · sanções · RIF', a: [], ms: 15000 },
    { cap: 'Cadeia de custódia pronta para instruir inquérito', a: [], ms: 15000 },
    { cap: 'Disponível em cessão ao Ministério Público', a: [], ms: 12000 },
  ]},
];

// ---------------------------------------------------------------------------
// Cursor + overlay de legenda (chip do episódio + legenda por cena)
// ---------------------------------------------------------------------------
async function addOverlays(page) {
  await page.addInitScript(() => {
    const dot = document.createElement('div');
    dot.id = 'vc-dot';
    dot.style.cssText =
      'position:fixed;left:0;top:0;width:16px;height:16px;border-radius:50%;' +
      'background:rgba(34,211,238,0.95);border:2px solid #fff;' +
      'box-shadow:0 0 14px rgba(34,211,238,0.8);pointer-events:none;z-index:999999;' +
      'transform:translate(-50%,-50%);transition:left 60ms linear,top 60ms linear;';
    const trail = document.createElement('div');
    trail.id = 'vc-trail';
    trail.style.cssText =
      'position:fixed;left:0;top:0;width:44px;height:44px;border-radius:50%;' +
      'background:radial-gradient(circle,rgba(34,211,238,0.22) 0%,rgba(34,211,238,0) 70%);' +
      'pointer-events:none;z-index:999998;transform:translate(-50%,-50%);';
    const chip = document.createElement('div');
    chip.id = 'ep-chip';
    chip.style.cssText =
      'position:fixed;top:22px;right:24px;z-index:999990;font:600 12px/1 system-ui;' +
      'letter-spacing:.12em;text-transform:uppercase;color:#93C5FD;' +
      'background:rgba(9,9,11,.82);border:1px solid rgba(63,63,70,.9);' +
      'border-radius:9999px;padding:8px 14px;pointer-events:none;';
    const cap = document.createElement('div');
    cap.id = 'ep-caption';
    cap.style.cssText =
      'position:fixed;left:50%;bottom:120px;transform:translateX(-50%);z-index:999990;' +
      'max-width:78%;text-align:center;font:600 21px/1.45 Georgia,serif;color:#FAFAFA;' +
      'background:rgba(9,9,11,.86);border:1px solid rgba(63,63,70,.9);' +
      'border-radius:12px;padding:12px 22px;pointer-events:none;' +
      'text-shadow:0 1px 2px rgba(0,0,0,.6);';
    document.documentElement.append(dot, trail, chip, cap);
  });
}

async function setOverlays(page, { chip, caption }) {
  await page.evaluate(
    ([c, t]) => {
      const chipEl = document.getElementById('ep-chip');
      const capEl = document.getElementById('ep-caption');
      if (chipEl && c !== undefined) chipEl.textContent = c;
      if (capEl && t !== undefined) capEl.textContent = t;
    },
    [chip, caption]
  );
}

async function moveCursor(page, x, y) {
  await page.evaluate(
    ([xx, yy]) => {
      const d = document.getElementById('vc-dot');
      const t = document.getElementById('vc-trail');
      if (d) { d.style.left = xx + 'px'; d.style.top = yy + 'px'; }
      if (t) { t.style.left = xx + 'px'; t.style.top = yy + 'px'; }
    },
    [x, y]
  );
}

async function glide(page, from, to, steps = 12, delay = 20) {
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const e = 1 - Math.pow(1 - t, 2);
    await moveCursor(page, from.x + (to.x - from.x) * e, from.y + (to.y - from.y) * e);
    await sleep(delay);
  }
}

// ---------------------------------------------------------------------------
// MP4 — argv literal, temporários de nome fixo
// ---------------------------------------------------------------------------
const TMP_IN = '/tmp/pldbr-ep-in.webm';
const TMP_OUT = '/tmp/pldbr-ep-out.mp4';

function toMp4(webmPath, mp4Path) {
  fs.copyFileSync(webmPath, TMP_IN);
  try {
    execFileSync(
      FFMPEG,
      ['-y', '-i', TMP_IN, '-c:v', 'libx264',
       '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '30',
       '-movflags', '+faststart', '-an', TMP_OUT],
      { stdio: 'pipe' }
    );
    fs.copyFileSync(TMP_OUT, mp4Path);
  } finally {
    for (const t of [TMP_IN, TMP_OUT]) {
      try { fs.unlinkSync(t); } catch { /* já removido */ }
    }
  }
}

// ---------------------------------------------------------------------------
async function runAction(page, pos, act) {
  const [verb, arg] = act.split(':');
  try {
    if (verb === 'nav') {
      const sel = `[data-tour="nav-${arg}"]`;
      const box = await page.locator(sel).boundingBox({ timeout: 3000 });
      if (box) {
        const target = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
        await glide(page, pos, target);
        pos.x = target.x; pos.y = target.y;
      }
      await page.click(sel, { timeout: 5000 });
      await sleep(1200);
    } else if (verb === 'scroll') {
      await page.mouse.wheel(0, parseInt(arg, 10));
      await sleep(500);
    } else if (verb === 'clickrow') {
      await page.click('tbody tr:first-child', { timeout: 4000 });
    } else if (verb === 'type') {
      const sel = '[data-tour="screening-search"]';
      await page.fill(sel, arg);
    } else if (verb === 'model') {
      const options = await page.locator('[data-tour="ai-model"] option').allTextContents();
      const chosen = options.find((o) => o.includes(arg)) || options[0];
      if (chosen) await page.selectOption('[data-tour="ai-model"]', { label: chosen });
      await sleep(600);
    } else if (verb === 'analyze') {
      await page.click('[data-tour="ai-analyze"]', { timeout: 5000 });
    }
  } catch (e) {
    // ação opcional: cena continua mesmo se elemento não estiver disponível
  }
  return pos;
}

(async () => {
  const epNum = parseInt(process.argv.includes('--ep')
    ? process.argv[process.argv.indexOf('--ep') + 1] : '1', 10);
  const ep = EP.find((e) => e.n === epNum);
  if (!ep) { console.error('episódio inválido (1–20)'); process.exit(1); }

  console.log(`🎬 EP ${String(ep.n).padStart(2, '0')}/20 — ${ep.titulo}`);
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: VP,
    deviceScaleFactor: DPR,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    recordVideo: { dir: OUT_DIR, size: { width: VP.width * DPR, height: VP.height * DPR } },
  });
  const page = await context.newPage();
  await addOverlays(page);

  let pos = { x: 960, y: 540 };
  await moveCursor(page, pos.x, pos.y);
  await setOverlays(page, { chip: `EP ${String(ep.n).padStart(2, '0')}/20 · ${ep.titulo}` });

  await page.goto(BASE + ep.route, { waitUntil: 'networkidle' });
  await sleep(2500);

  for (const scene of ep.scenes) {
    await setOverlays(page, { caption: scene.cap });
    for (const act of scene.a) pos = await runAction(page, pos, act);
    // cena de análise: espera a resposta real chegar antes de esgotar o tempo
    if (scene.a.includes('analyze')) {
      await page
        .waitForSelector('[data-tour="ai-result"] .badge-success, [data-tour="ai-result"] .badge-warning', { timeout: 40000 })
        .catch(() => {});
      await sleep(Math.max(4000, scene.ms - 14000));
    } else {
      await sleep(scene.ms);
    }
  }

  await setOverlays(page, { caption: 'pldbr.tech · ambiente de demonstração — dados fictícios' });
  await sleep(3000);

  await page.close();
  await context.close();
  await browser.close();

  const files = fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith('.webm'))
    .sort((a, b) => fs.statSync(path.join(OUT_DIR, b)).mtimeMs - fs.statSync(path.join(OUT_DIR, a)).mtimeMs);
  if (!files.length) throw new Error('nenhum webm gerado');
  const src = path.join(OUT_DIR, files[0]);
  const dstMp4 = path.join(OUT_DIR, `ep-${String(ep.n).padStart(2, '0')}.mp4`);
  const dstWebm = path.join(OUT_DIR, `ep-${String(ep.n).padStart(2, '0')}.webm`);
  if (src !== dstWebm) fs.renameSync(src, dstWebm);
  toMp4(dstWebm, dstMp4);
  fs.unlinkSync(dstWebm);
  const mb = (fs.statSync(dstMp4).size / (1024 * 1024)).toFixed(1);
  console.log(`✅ ${dstMp4} (${mb} MB)`);
})();
