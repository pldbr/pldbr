// record-dashboard.cjs — grava o vídeo de apresentação do dashboard de
// demonstração (rota /dashboard) em qualidade máxima.
//
// Pipeline herdado do record-demo-hd.cjs:
//   - Playwright Chromium, viewport 1920×1080 com deviceScaleFactor 2
//     (render 3840×2160 → downscale lanczos 1080p)
//   - cursor virtual com trail (dot ciano + glide ease-out até cada alvo)
//   - MP4 H.264 CRF 18, 30fps, +faststart, sem áudio (ffmpeg-static local)
//
// Roteiro (~100s): Command Center (KPIs/gráfico/health) → Alertas → clique
// "IA" no pior alerta → Analista IA responde com Qwen → troca para GLM →
// Tipologias (hot-reload) → Screening → KYC → Crypto → Casos & RIF →
// Blocking → volta ao Command Center.
//
// Uso: node scripts/record-dashboard.cjs   (requer servidor em :3100 com
// `npm run dev -- -p 3100`)

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
const OUT_DIR = path.resolve(__dirname, '../public/demo');
const DPR = 2;
const VP = { width: 1920, height: 1080 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Cursor virtual (dot + trail)
// ---------------------------------------------------------------------------
async function addCursor(page) {
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
    document.documentElement.appendChild(dot);
    document.documentElement.appendChild(trail);
  });
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

async function glide(page, from, to, steps = 14, delay = 22) {
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const e = 1 - Math.pow(1 - t, 2); // ease-out
    await moveCursor(page, from.x + (to.x - from.x) * e, from.y + (to.y - from.y) * e);
    await sleep(delay);
  }
}

// move o cursor até um seletor e clica
async function clickAt(page, selector, pos) {
  try {
    const el = page.locator(selector).first();
    const box = await el.boundingBox({ timeout: 4000 });
    if (box) {
      const target = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      await glide(page, pos, target);
      pos.x = target.x;
      pos.y = target.y;
    }
  } catch { /* fora da tela: clica sem glide */ }
  await page.click(selector, { timeout: 6000 });
  return pos;
}

// ---------------------------------------------------------------------------
// Conversão MP4 — argv 100% literal (anti-option-injection), temporários de
// nome fixo.
// ---------------------------------------------------------------------------
const TMP_IN = '/tmp/pldbr-dashboard-in.webm';
const TMP_OUT = '/tmp/pldbr-dashboard-out.mp4';

function toMp4(webmPath, mp4Path) {
  fs.copyFileSync(webmPath, TMP_IN);
  try {
    execFileSync(
      FFMPEG,
      [
        '-y',
        '-i', TMP_IN,
        '-vf', 'scale=1920:1080:flags=lanczos',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        '-r', '30',
        '-movflags', '+faststart',
        '-an',
        TMP_OUT,
      ],
      { stdio: 'pipe' }
    );
    fs.copyFileSync(TMP_OUT, mp4Path);
  } finally {
    for (const t of [TMP_IN, TMP_OUT]) {
      try { fs.unlinkSync(t); } catch { /* já removido */ }
    }
  }
}

(async () => {
  console.log('🎬 Dashboard demo HD — DPR 2 supersampled → 1080p lanczos');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: VP,
    deviceScaleFactor: DPR,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    recordVideo: { dir: OUT_DIR, size: { width: VP.width * DPR, height: VP.height * DPR } },
  });
  const page = await context.newPage();
  await addCursor(page);

  let pos = { x: 960, y: 540 };
  await moveCursor(page, pos.x, pos.y);

  console.log('[1/8] abrindo', BASE + '/dashboard');
  await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' });
  await sleep(4000); // CountUp dos KPIs + terminal ao vivo

  console.log('[2/8] Command Center — KPIs, gráfico 24h, health');
  for (const sel of ['[data-tour="kpi-row"]', '[data-tour="flow-chart"]', '[data-tour="system-health"]']) {
    try {
      const box = await page.locator(sel).boundingBox({ timeout: 3000 });
      if (box) {
        const target = { x: Math.min(VP.width - 80, box.x + 260), y: box.y + 40 };
        await glide(page, pos, target);
        pos = target;
      }
    } catch { /* segue */ }
    await sleep(2200);
  }

  console.log('[3/8] Alertas — fila + clique IA no pior alerta');
  pos = await clickAt(page, '[data-tour="nav-alerts"]', pos);
  await sleep(2600);
  pos = await clickAt(page, 'tr[data-tour]:first-child button[data-tour^="analyze-"]', pos);

  console.log('[4/8] Analista IA — Qwen responde ao vivo');
  await sleep(1500);
  pos = await clickAt(page, '[data-tour="ai-analyze"]', pos);
  // espera a resposta real (badge de servido/offline) + efeito digitação
  await page
    .waitForSelector('[data-tour="ai-result"] .badge-success, [data-tour="ai-result"] .badge-warning', { timeout: 50000 })
    .catch(() => {});
  await sleep(7000);

  console.log('[5/8] Analista IA — troca para GLM e repete');
  await page.selectOption('[data-tour="ai-model"]', { label: 'glm-5.2-fast-preview' }).catch(async () => {
    // se o id exato não estiver na lista, escolhe o primeiro glm disponível
    const options = await page.locator('[data-tour="ai-model"] option').allTextContents();
    const glm = options.find((o) => o.includes('glm'));
    if (glm) await page.selectOption('[data-tour="ai-model"]', { label: glm });
  });
  await sleep(800);
  pos = await clickAt(page, '[data-tour="ai-analyze"]', pos);
  await page
    .waitForSelector('[data-tour="ai-result"] .badge-success, [data-tour="ai-result"] .badge-warning', { timeout: 50000 })
    .catch(() => {});
  await sleep(7000);

  console.log('[6/8] Tipologias, Screening, KYC');
  pos = await clickAt(page, '[data-tour="nav-typologies"]', pos);
  await sleep(6000); // revelação do YAML + hot-reload
  pos = await clickAt(page, '[data-tour="nav-screening"]', pos);
  await sleep(2000);
  await page.fill('[data-tour="screening-search"]', 'DEMO');
  await sleep(2500);
  pos = await clickAt(page, '[data-tour="nav-kyc"]', pos);
  await sleep(3500);

  console.log('[7/8] Crypto, Casos & RIF, Blocking');
  pos = await clickAt(page, '[data-tour="nav-crypto"]', pos);
  await sleep(4500); // grafo animado
  pos = await clickAt(page, '[data-tour="nav-cases"]', pos);
  await sleep(4000);
  pos = await clickAt(page, '[data-tour="nav-blocking"]', pos);
  await sleep(3500);

  console.log('[8/8] volta ao Command Center e encerra');
  pos = await clickAt(page, '[data-tour="nav-command"]', pos);
  await sleep(3500);

  await page.close(); // finaliza o webm
  await context.close();
  await browser.close();

  const files = fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith('.webm'))
    .sort((a, b) => fs.statSync(path.join(OUT_DIR, b)).mtimeMs - fs.statSync(path.join(OUT_DIR, a)).mtimeMs);
  if (!files.length) throw new Error('nenhum webm gerado');
  const src = path.join(OUT_DIR, files[0]);
  const dstWebm = path.join(OUT_DIR, 'dashboard-demo-hd.webm');
  const dstMp4 = path.join(OUT_DIR, 'dashboard-demo-hd.mp4');
  if (src !== dstWebm) fs.renameSync(src, dstWebm);
  toMp4(dstWebm, dstMp4);
  fs.unlinkSync(dstWebm);
  const mb = (fs.statSync(dstMp4).size / (1024 * 1024)).toFixed(1);
  console.log(`✅ MP4 gerado: ${dstMp4} (${mb} MB)`);
})();
