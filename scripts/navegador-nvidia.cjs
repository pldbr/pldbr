// Navegador real (headed) para o portal NVIDIA — o usuário faz login uma vez; depois a automação segue.
const { chromium } = require('/run/media/matheus/ARQUIVOS/Projetos/Projetos Ativos/legaltech/1.RagJUR/node_modules/playwright');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PERFIL = path.join(process.env.HOME, '.nvidia-portal-perfil');
fs.mkdirSync(PERFIL, { recursive: true });

// Sinalização de estado via arquivo
const ESTADO = '/tmp/nvidia-portal-estado.txt';
fs.writeFileSync(ESTADO, 'iniciando\n');

(async () => {
  const browser = await chromium.launchPersistentContext(PERFIL, {
    headless: false,
    viewport: { width: 1440, height: 900 },
    args: ['--start-maximized'],
  });
  const page = browser.pages()[0] || (await browser.newPage());
  await page.goto('https://programs.nvidia.com/phoenix/products/add-product');
  fs.writeFileSync(ESTADO, 'aberto: ' + page.url() + '\n');

  // Loop de vida: escreve a URL atual a cada 3s; encerra quando o arquivo pedir
  const encerrar = path.join('/tmp', 'nvidia-portal-fechar');
  let t = 0;
  while (t < 3600) {
    await page.waitForTimeout(3000);
    fs.writeFileSync(ESTADO, 'url: ' + page.url() + '\n');
    if (fs.existsSync(encerrar)) { fs.unlinkSync(encerrar); break; }
    t += 3;
  }
  await browser.close();
  fs.writeFileSync(ESTADO, 'fechado\n');
})().catch(e => { fs.writeFileSync(ESTADO, 'erro: ' + String(e).slice(0, 200) + '\n'); });
