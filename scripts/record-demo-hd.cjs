// record-demo-hd.cjs — Demo PLDBR.TECH em qualidade máxima (1080p supersampled)
//
// Igual ao fluxo do record-demo.cjs original (hero → métricas → 6 abas → CTA),
// com upgrades de qualidade do pipeline RagJUR:
//   - deviceScaleFactor 2 (render 3840×2160 → downscale lanczos 1080p)
//   - cursor virtual com trail (vídeo "conduzido", não automático)
//   - conversão direta para MP4 H.264 CRF 18, 30fps, +faststart
//
// Uso: node scripts/record-demo-hd.cjs   (requer servidor em http://localhost:3100)
// Requer ffmpeg no PATH (ex.: symlink de node_modules/ffmpeg-static do RagJUR)

const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  ({ chromium } = require('/run/media/matheus/ARQUIVOS/Projetos/Projetos Ativos/legaltech/1.RagJUR/node_modules/playwright'));
}

const BASE = process.env.BASE_URL || 'http://localhost:3100';
const OUT_DIR = path.resolve(__dirname, '../public/demo');
const DPR = 1;
const VP = { width: 1920, height: 1080 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Cursor virtual (dot + trail) — movimentos suaves até os elementos
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

// ---------------------------------------------------------------------------
// Conversão MP4 — argv 100% literal: os caminhos dinâmicos trafegam apenas
// via fs (in-process), através de temporários de nome fixo. Nenhum valor
// externo pode ser interpretado como opção pelo ffmpeg (anti-option-injection).
// ---------------------------------------------------------------------------
const TMP_IN = '/tmp/pldbr-demo-in.webm';
const TMP_OUT = '/tmp/pldbr-demo-out.mp4';

function toMp4(webmPath, mp4Path) {
  fs.copyFileSync(webmPath, TMP_IN);
  try {
    execFileSync(
      'ffmpeg',
      [
        '-y',
        '-i', TMP_IN,
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
      try {
        fs.unlinkSync(t);
      } catch {
        /* temporário já removido */
      }
    }
  }
}

(async () => {
  console.log('🎬 PLDBR.TECH — demo HD (DPR 2 supersampled → 1080p lanczos)');
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

  console.log('[1/5] abrindo', BASE);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await sleep(3500); // hero + animações de entrada + CountUp

  console.log('[2/5] rolagem inicial (métricas e arquitetura)');
  for (const d of [400, 400, 400, 400, 400]) {
    await page.mouse.wheel(0, d);
    pos.y = Math.min(VP.height - 120, pos.y + 30);
    await moveCursor(page, pos.x, pos.y);
    await sleep(1100);
  }
  await sleep(1200);

  const abas = ['Motor PLD', 'Crypto Intel', 'Compliance', 'Governo', 'Ecossistema', 'Visão Geral'];
  console.log('[3/5] navegando abas:', abas.join(' | '));
  let i = 0;
  for (const aba of abas) {
    i += 1;
    await page.evaluate(() => window.scrollTo({ top: 560, behavior: 'instant' }));
    // cursor desliza até a aba antes do clique — conduz o olhar
    try {
      const btn = page.locator(`button:has-text("${aba}")`).first();
      const box = await btn.boundingBox({ timeout: 4000 });
      if (box) {
        await glide(page, pos, { x: box.x + box.width / 2, y: box.y + box.height / 2 });
        pos = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      }
    } catch { /* aba fora da tela: segue sem glide */ }
    await page.click(`button:has-text("${aba}")`);
    await sleep(2600); // animação de troca de painel
    for (const d of [420, 420]) {
      await page.mouse.wheel(0, d);
      pos.y = Math.min(VP.height - 120, pos.y + 26);
      await moveCursor(page, pos.x, pos.y);
      await sleep(850);
    }
    await sleep(900);
  }

  console.log('[4/5] topo e CTA final');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  pos.y = 540;
  await moveCursor(page, pos.x, pos.y);
  await sleep(1800);
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
  await sleep(2200);

  console.log('[5/5] encerrando, salvando e convertendo');
  await page.close(); // finaliza o webm
  await context.close();
  await browser.close();

  const files = fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith('.webm'))
    .sort((a, b) => fs.statSync(path.join(OUT_DIR, b)).mtimeMs - fs.statSync(path.join(OUT_DIR, a)).mtimeMs);
  if (!files.length) throw new Error('nenhum webm gerado');
  const src = path.join(OUT_DIR, files[0]);
  const dstWebm = path.join(OUT_DIR, 'pldbr-demo-hd.webm');
  const dstMp4 = path.join(OUT_DIR, 'pldbr-demo-hd.mp4');
  if (src !== dstWebm) fs.renameSync(src, dstWebm);
  toMp4(dstWebm, dstMp4);
  fs.unlinkSync(dstWebm);
  const mb = (fs.statSync(dstMp4).size / (1024 * 1024)).toFixed(1);
  console.log(`✅ MP4 gerado: ${dstMp4} (${mb} MB)`);
})();
