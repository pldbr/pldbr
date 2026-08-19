// start-prod.cjs — sobe o servidor de produção standalone do Next.js na
// porta 3100 (para gravação de vídeo e testes locais). Não contém segredos:
// as chaves seguem vindo do Secret Manager/env em runtime.

const { spawn } = require("child_process");
const path = require("path");

const standaloneDir = path.resolve(__dirname, "../.next/standalone");

const child = spawn(process.execPath, ["server.js"], {
  cwd: standaloneDir,
  env: { ...process.env, PORT: "3100", HOSTNAME: "127.0.0.1" },
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 0));
