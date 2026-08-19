// Rasteriza logo.svg em PNGs alta resolução (quadrado 1024 e horizontal 1600x400)
const { chromium } = require('/run/media/matheus/ARQUIVOS/Projetos/Projetos Ativos/legaltech/1.RagJUR/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const DIR = __dirname;
const svg = 'file://' + path.join(DIR, 'logo.svg');

// Versão horizontal: SVG wrapper que reutiliza o tile ao lado do wordmark
const horizontal = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="400" viewBox="0 0 1600 400">
  <rect x="10" y="10" width="380" height="380" rx="72" fill="#0B1F3A"/>
  <g transform="translate(200 168) scale(0.72) rotate(-28)">
    <path d="M -150 0 C -150 -95, -75 -150, 25 -138 C 128 -126, 175 -60, 160 18 C 146 96, 78 148, -12 136 C -100 124, -150 78, -150 0 Z" fill="#C9A227"/>
    <path d="M -78 -18 C -28 -66, 48 -74, 96 -38 C 116 -22, 122 4, 112 24 C 60 6, -6 8, -58 34 C -80 44, -96 22, -78 -18 Z" fill="#0B1F3A" opacity="0.92"/>
  </g>
  <text x="450" y="205" font-family="Arial, Helvetica, sans-serif" font-size="120" font-weight="800" letter-spacing="12" fill="#0B1F3A">BEANSTECH</text>
  <text x="452" y="268" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="500" letter-spacing="18" fill="#C9A227">SOVEREIGN AI</text>
</svg>`;
fs.writeFileSync(path.join(DIR, 'logo-horizontal.svg'), horizontal);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 2 });

  await page.goto(svg, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(DIR, 'beanstech-logo-1024.png'), clip: { x: 0, y: 0, width: 1024, height: 1024 } });
  await page.setViewportSize({ width: 1600, height: 400 });
  await page.goto('file://' + path.join(DIR, 'logo-horizontal.svg'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(DIR, 'beanstech-logo-horizontal.png'), clip: { x: 0, y: 0, width: 1600, height: 400 } });

  await browser.close();
  console.log('OK: PNGs gerados em', DIR);
})();
