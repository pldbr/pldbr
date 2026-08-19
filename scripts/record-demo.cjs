// Grava vídeo real do site pldbr.tech funcionando (Playwright screencast)
// Uso: node scripts/record-demo.cjs   (requer servidor em http://localhost:3100)
const path = require('path');
const fs = require('fs');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  ({ chromium } = require('/run/media/matheus/ARQUIVOS/Projetos/Projetos Ativos/legaltech/1.RagJUR/node_modules/playwright'));
}

const BASE = process.env.BASE_URL || 'http://localhost:3100';
const OUT_DIR = path.resolve(__dirname, '../public/demo');
const SHOTS = path.join(OUT_DIR, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: OUT_DIR, size: { width: 1920, height: 1080 } },
  });
  const page = await context.newPage();

  console.log('[1/5] abrindo', BASE);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await sleep(3500); // hero + animações de entrada + CountUp
  await page.screenshot({ path: path.join(SHOTS, '01-hero.png') });

  console.log('[2/5] rolagem inicial (métricas e arquitetura)');
  for (const d of [400, 400, 400, 400, 400]) {
    await page.mouse.wheel(0, d);
    await sleep(1100);
  }
  await sleep(1200);
  await page.screenshot({ path: path.join(SHOTS, '02-conteudo.png') });

  const abas = ['Motor PLD', 'Crypto Intel', 'Compliance', 'Governo', 'Ecossistema', 'Visão Geral'];
  console.log('[3/5] navegando abas:', abas.join(' | '));
  let i = 0;
  for (const aba of abas) {
    i += 1;
    await page.evaluate(() => window.scrollTo({ top: 560, behavior: 'instant' }));
    await page.click(`button:has-text("${aba}")`);
    await sleep(2600); // animação de troca de painel
    for (const d of [420, 420]) {
      await page.mouse.wheel(0, d);
      await sleep(850);
    }
    await page.screenshot({ path: path.join(SHOTS, `1${i}-aba-${aba.toLowerCase().replace(/\s+/g, '-')}.png`) });
    await sleep(900);
  }

  console.log('[4/5] topo e CTA final');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await sleep(1800);
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
  await sleep(2200);
  await page.screenshot({ path: path.join(SHOTS, '03-final-cta.png') });

  console.log('[5/5] encerrando e salvando vídeo');
  await page.close(); // finaliza o arquivo de vídeo
  const video = await context.close().then(() => null).catch(() => null);
  const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.webm'));
  const src = path.join(OUT_DIR, files[0]);
  const dst = path.join(OUT_DIR, 'pldbr-demo.webm');
  if (src && src !== dst) fs.renameSync(src, dst);
  await browser.close();
  console.log('OK vídeo:', dst);
  console.log('OK screenshots:', fs.readdirSync(SHOTS).join(', '));
})();
