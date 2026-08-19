// Gera og.png (1200x630) a partir de og.html — arte de marca do pldbr.tech
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  const html = 'file://' + path.resolve(__dirname, 'og.html');
  await page.goto(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.resolve(__dirname, '../public/og.png'), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  console.log('OK: public/og.png (2400x1260 reais, exibida a 1200x630)');
})();
