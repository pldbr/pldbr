// GET /api/ai/models?provider=qwen|studio — lista de modelos disponíveis
// para o seletor do Analista IA. Segue o formato {source: "api"|"fallback"}:
// quando a chave/endpoint não responde, devolve a lista estática pública.

import { NextRequest, NextResponse } from "next/server";
import { PROVIDERS, listModels, type ProviderId } from "@/lib/aiProviders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("provider") || "qwen";
  const provider: ProviderId = raw === "studio" ? "studio" : "qwen";

  const { source, models } = await listModels(provider);

  return NextResponse.json({
    provider,
    label: PROVIDERS[provider].label,
    quotaHint: PROVIDERS[provider].quotaHint,
    source,
    models,
  });
}
