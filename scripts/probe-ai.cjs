// probe-ai.cjs — verifica quais modelos as chaves do Secret Manager (GCP projeto
// `beanstech`) conseguem listar no Alibaba Cloud Model Studio (endpoint
// OpenAI-compatível internacional).
//
// Segurança: a chave é lida em memória via `gcloud secrets versions access`
// e NUNCA é impressa, logada ou gravada em arquivo. Só nomes de modelos são
// exibidos. Nenhum literal de credencial vive neste script.
//
// Uso: node scripts/probe-ai.cjs

const { execFileSync } = require("child_process");

const PROJECT = process.env.GCP_PROJECT || "beanstech";
// Dois endpoints oficiais do Alibaba Cloud Model Studio (OpenAI-compatível):
// internacional (Singapore) e China (Beijing). A chave certa depende da
// conta/workspace de origem — testamos ambos.
const ENDPOINTS = [
  { rotulo: "intl (Singapore)", url: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1" },
  { rotulo: "china (Beijing)", url: "https://dashscope.aliyuncs.com/compatible-mode/v1" },
];

function readSecret(name) {
  if (process.env[name]) return process.env[name];
  try {
    return execFileSync(
      "gcloud",
      [
        "secrets",
        "versions",
        "access",
        "latest",
        `--secret=${name}`,
        `--project=${PROJECT}`,
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
  } catch {
    return null;
  }
}

async function listModels(key, base) {
  const res = await fetch(`${base}/models`, {
    headers: { Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    return { ok: false, status: res.status, body: await res.text().catch(() => "") };
  }
  const json = await res.json();
  const ids = (json.data || []).map((m) => m.id).sort();
  return { ok: true, count: ids.length, ids };
}

(async () => {
  for (const name of ["QWEN_API_KEY", "STUDIO_API_KEY"]) {
    process.stdout.write(`\n=== ${name} ===\n`);
    const key = readSecret(name);
    if (!key) {
      console.log("indisponível (sem env e sem acesso via gcloud)");
      continue;
    }
    console.log(`chave: presente (len ${key.length}, prefixo ${key.slice(0, 3)}***)`);
    for (const ep of ENDPOINTS) {
      try {
        const r = await listModels(key, ep.url);
        if (!r.ok) {
          console.log(`[${ep.rotulo}] GET /models → HTTP ${r.status} ${r.status === 401 ? "(chave inválida p/ esta região)" : ""}`);
          continue;
        }
        console.log(`[${ep.rotulo}] GET /models → ${r.count} modelos ✓`);
        const interesting = r.ids.filter((id) =>
          /^(qwen3\.[5-8]|glm|GLM|ZHIPU|deepseek|kimi)/i.test(id)
        );
        console.log("  relevantes:", interesting.slice(0, 12).join(", ") || "(nenhum)");
      } catch (e) {
        console.log(`[${ep.rotulo}] erro de rede:`, e.message);
      }
    }
  }
})();
