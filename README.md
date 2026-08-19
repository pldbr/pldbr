# pldbr.tech — Motor PLD/AML + Crypto Intelligence

> **Where Brazilian AML runs.** Infraestrutura de IA para prevenção à lavagem de dinheiro,
> rastreio de criptoativos e **cessão de tecnologia ao Ministério Público Federal** e demais
> órgãos de investigação.
>
> *Site institucional, documentação e playbook de investigação do motor PLD/AML da BeansTech.*

---

## O que é

O **pldbr.tech** é o motor de detecção de lavagem de dinheiro (PLD/AML) da BeansTech —
**deployado e operando em produção no Google Cloud Platform** (região `southamerica-east1`,
Brasil, dados soberanos). Ele alimenta o ecossistema fintech/compliance inteiro e é ofertado
em **cessão de tecnologia** ao MPF, PF, COAF, Bacen e órgãos de investigação — deploy
**on-premise** ou **GCP Government Cloud**.

Este repositório contém: **(1)** o site institucional (Next.js 15), **(2)** o playbook
público de investigação de criptoativos, **(3)** marca e materiais.

## O motor (produção)

| Componente | Detalhe |
|---|---|
| **API** | FastAPI (Python 3.11) + **3 sidecars Go**: Screener FAISS, Blocker OPA, Rules Engine |
| **Detecção** | **3 camadas**: regras + ML supervisionado + não supervisionado |
| **Tipologias** | **25 tipologias YAML production-ready** — hot-reload, versionadas em Git |
| **Escala** | **10M transações/mês** · recall ≥ 0,90 · p95 < 5s |
| **API real** | 7 módulos: `/api/v1/health`, `alerts`, `cases`, `screening`, `rif`, `kyc`, `blocking` |
| **RIF/SISCOAF** | automático, com **assinatura ICP-Brasil via Cloud KMS (HSM)** |
| **Infra** | **13 módulos Terraform prod**: networking, KMS, IAM, Pub/Sub, BigQuery, Spanner, Cloud Run, Dataflow, Vertex AI, Document AI, monitoring, audit_storage, DLP |
| **CI/CD** | Cloud Build (8 steps) + GitHub Actions |
| **Qualidade** | Cobertura de testes ≥ 85% |

### Crypto Intelligence (integrado)

- **Chain analysis multichain**: Bitcoin, Ethereum, Tron, Solana
- Detecção de **mixers/tumblers** (Tornado Cash, Blender, Sinbad, Samourai, Wasabi, ChipMixer, Bitcoin Fog, Helix)
- **Clustering e desanonimização**; monitoramento em tempo real
- Relatórios com **assinatura ICP-Brasil** e **guarda WORM (10 anos)**

## Conformidade

Circular BACEN 3.978/2020 (100%) · Carta-Circular 4.001/2020 (25 tipologias) · Lei 9.613/98 ·
Lei 13.259/2016 · LGPD · COAF/SISCOAF · FATF R.15 · OFAC SDN · ONU · UE · CEAF ·
Sanctions screening · KYC/KYB · Audit trail WORM · Decreto 9.507/2018 e IN 01/2019 SLTI
(cessão a órgãos públicos).

## Ecossistema alimentado pelo motor

12+ plataformas, entre elas: **Beans Capital** (dashboard RegTech Next.js 15 em produção,
41–55 agentes Gemini ADK: Monitor Normas BACEN, Analista PLD/FT, Gerador RIF, Screener de
Sanções, Case Manager, Auditor de Compliance), **Beans Credit** (score/Open Finance),
**Moneyp.AI** (passivo fiscal → red flag PLD), **Tributo.tech**, **Receber.tech**,
**BeansBank** (onboarding), **LegalBet.tech** (PLD para apostas).

Modelos: **JurGemma** (fundamentação regulatória), **FinGemma**, Claude Opus 4.6 ·
Stack adicional: PostgreSQL/AlloyDB, BigQuery Graph, Pub/Sub, Dataflow.

## Documentação neste repositório

- **[Playbook de Investigação de Criptoativos — Estado da Arte](docs/prompts-investigacao-cripto.md)**
  58 prompts/protocolos em 8 blocos (forense on-chain, clustering e atribuição, redes
  específicas, sanções/compliance, OSINT, análise financeira, providências jurídicas,
  automação e relatório), com padrão de saída evidencial: hash, método, grau de conclusão
  e reprodutibilidade.
- **[Pitch Deck — NVIDIA Inception](docs/Beanstech_Inception_Deck.pptx)** (10 slides, EN)
- **Marca**: `docs/brand/` (logo 1024/horizontal + SVGs; navy `#0B1F3A` · gold `#C9A227`)
- **Demo**: `public/demo/` — vídeo navegando as 6 seções + 8 screenshots
- `public/llms.txt` — descrição completa para agentes de IA

## O site (este projeto Next.js)

| | |
|---|---|
| Stack | Next.js 15 · React 19 · TypeScript 5.7 · Tailwind CSS 4 · Framer Motion |
| Build | 100% estático · first load 165 kB · zero erro TS |
| Seções | Visão Geral · Motor PLD · Crypto Intel · Ecossistema · Compliance · Governo |
| SEO | OpenGraph, Twitter Card, JSON-LD (Organization + SoftwareApplication), `llms.txt` |

```bash
npm install
npm run dev      # ambiente local
npm run build    # build de produção
npm start        # servir build
node scripts/record-demo.cjs   # gravar demo (requer servidor em :3100)
```

Deploy sugerido: Cloud Run (`gcloud run deploy`, região `southamerica-east1`) ou Vercel.

## Roadmap NVIDIA

Inferência de LLMs abertos (Qwen/GLM quantizados) já roda em GPUs NVIDIA (L4/A100, região
Brasil). Em avaliação: **TensorRT-LLM**, **vLLM**, **Triton Inference Server**,
**NVIDIA AI Enterprise**, **DGX Cloud** e **RAPIDS** para analítica AML — consolidando a
tese de **inferência soberana com zero telemetria**.

## Cessão de tecnologia (MPF, PF, COAF, Bacen)

Deploy on-premise ou GCP Government Cloud · soberania de dados (CMEK, VPC Service
Controls, região Brasil) · conformidade com Decreto 9.507/2018 e IN 01/2019 SLTI.

## Contato

**BeansTech** — Beans Tech Inova Simples (I.S.) · CNPJ 64.160.205/0001-17 · São Paulo, Brasil
Matheus Feijão — matheus@beanstech.com.br · (11) 96650-7100
GitHub: [beanstechhub](https://github.com/beanstechhub) · [beanstech.com.br](https://beanstech.com.br)

---
*Site institucional e documentação públicos. Código do motor e ambientes de produção sob
acesso controlado.*
