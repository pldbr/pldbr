// cf-worker-pldbr-proxy.js — Worker Cloudflare em produção na rota
// pldbr.tech/* (script "pldbr-proxy"). Faz proxy reverso para o serviço
// Cloud Run pldbr-tech (southamerica-east1), já que domain mappings não é
// suportado nessa região.
//
// Deploy (o valor da chave vem do Secret Manager, nunca fica no repo):
//   ver scripts de deploy — PUT /accounts/:acc/workers/scripts/pldbr-proxy
//   + rota pldbr.tech/* na zona fcd96aa0074972e8ff86be76a66088d5

addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  url.hostname = "pldbr-tech-662926580906.southamerica-east1.run.app";
  url.protocol = "https:";
  url.port = "";
  event.respondWith(fetch(new Request(url, event.request)));
});
