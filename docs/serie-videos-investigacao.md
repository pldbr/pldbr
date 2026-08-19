# Série didática — "Uma investigação em 20 minutos"

> 20 episódios de ~1 minuto, usando o dashboard de demonstração como se
> fosse uma investigação real. **Todos os dados são fictícios** (ambiente de
> demonstração identificado em tela). Roteiros prontos para narração; os
> vídeos saem sem áudio pelo pipeline atual, com legendas queimadas.

## O caso

**Caso Maré (fictício).** O motor detecta fracionamento na *Comércio Fictício
Alfa Ltda.* (ALT-2026-4100 · TIP-001). A investigação revela sócio PEP na
*Importadora Demo Beta S.A.*, passagem por mixer (ChipMixer, cluster CL-88) e
termina com RIF assinado e dossiê pronto para o MPF.

---

## Episódios

**EP 01 — O que é lavagem de dinheiro** · `site /#walkthrough`
As três fases: colocar, ocultar, integrar. Apresenta o motor como o olho que
enxerga o ciclo onde ele tenta ser invisível.
*Narração:* "Lavagem de dinheiro tem três atos: o dinheiro sujo entra no sistema, é movimentado para perder o rastro, e volta 'limpo' como se legítimo fosse. O papel do motor é enxergar esse ciclo onde ele tenta ser invisível. Nesta série, você acompanha uma investigação inteira — passo a passo — em um minuto por episódio."

**EP 02 — O sistema em um relance** · `dashboard · Command Center`
KPIs traduzidos: 10 mi de movimentações/mês, recall 0,94 ("de cada 100 casos reais, 94 apanhados"), resposta em segundos.
*Narração:* "Este é o centro de comando. Dez milhões de movimentações por mês são examinadas automaticamente. O número mais importante é o recall: de cada cem casos reais de lavagem, o motor detecta noventa e quatro. Nenhum sistema é perfeito — este é honesto sobre o que pega."

**EP 03 — Uma movimentação entra** · `Command Center`
O gráfico 24h: cada pico de transações, alertas e bloqueios na mesma tela.
*Narração:* "Cada ponto deste gráfico é uma hora do dia de ontem. As transações chegam em ondas — o pico comercial da manhã, o fechamento da tarde. E repare: onde há volume, surgem alertas. É a primeira lei da detecção: dinheiro suspeito se esconde em movimento comum."

**EP 04 — O motor levanta a suspeita** · `Alertas`
A fila: score 0–100, severidade, camadas de detecção.
*Narração:* "Quando algo não bate, o motor levanta a mão: é um alerta. A pontuação de zero a cem mede a probabilidade de lavagem — é indício, não prova. Vermelho exige ação hoje; amarelo, em vinte e quatro horas. Ordenados por urgência, o mais grave está sempre no topo."

**EP 05 — Lendo um alerta** · `Alertas · linha ALT-2026-4100`
Clicar no alerta do caso: TIP-001, valor, entidades.
*Narração:* "Este é o nosso caso. Comércio Fictício Alfa: fracionamento — a tipologia um. Valor envolvido, quase dois milhões. Três entidades vinculadas. A coluna 'camada' diz quem detectou: regra escrita, modelo treinado, ou desvio do padrão do cliente. Aqui, uma regra clássica."

**EP 06 — A regra que a máquina executa** · `Tipologias · YAML ⇄ Tradução`
TIP-001 explicada nas duas linguagens.
*Narração:* "Toda suspeita nasce de uma regra documentada — auditável em fiscalização. À esquerda, a regra como a máquina lê. À direita, a mesma regra em português: o que vigia, quando dispara, até onde persegue. Promotor pode conferir linha a linha."

**EP 07 — A trilha de um fracionador** · `Tipologias · TIP-013`
Troca para a tipologia de crypto mixing.
*Narração:* "Outra tipologia: mixing de criptomoedas. A regra persegue até seis saltos entre origem e destino, com confiança mínima de sessenta e dois por cento. Em uma frase: se o valor passou por um serviço de ocultação e reapareceu com vínculo confiável, o motor levanta a mão."

**EP 08 — Quem é o cliente** · `KYC / KYB`
Score de risco, PEP, documentos.
*Narração:* "Antes de investigar o dinheiro, o rosto: quem é o cliente, de onde vem a renda, quem são os sócios. Pontuação oitenta e dois — risco alto. E um detalhe que muda o caso: sócio é PEP, pessoa politicamente exposta. Cargo público exige atenção redobrada por lei."

**EP 09 — A rede de sócios** · `KYC · bloco KYB`
Empresas vinculadas, jurisdições, alerta de sócio comum.
*Narração:* "Ninguém lava sozinho. O KYB mapeia a rede: seis empresas vinculadas, três jurisdições — e o alerta que conecta tudo: um sócio comum com duas empresas já citadas em outro caso. É assim que ilhas viram continente."

**EP 10 — Consultando as listas** · `Screening`
OFAC, ONU, UE, CEAF; match 96%.
*Narração:* "Antes de qualquer conclusão, as listas restritivas: OFAC dos Estados Unidos, ONU, União Europeia, e o CEAF nacional. Ivan Demo Petrov: noventa e seis por cento de correspondência com a lista OFAC. Acima de oitenta e cinco, bloqueio preventivo e comunicação ao COAF."

**EP 11 — A trilha cripto começa** · `Crypto · grafo`
Origem → mixer → exchange.
*Narração:* "Parte do dinheiro foi para cripto. O gráfico conta o caminho: sai da carteira de origem, entra num mixer — o serviço que embaralha fundos de vários usuários para esconder de onde vieram — e reaparece. Onde? Numa exchange, com identificação de cliente. O rastro não acabou: virou nome."

**EP 12 — Mixers: onde o dinheiro se esconde** · `Crypto · chips`
Os 8 mixers monitorados.
*Narração:* "Estes são os oito serviços de embaralhamento sob vigilância: Tornado Cash, Blender, Sinbad, Samourai, Wasabi, ChipMixer, Bitcoin Fog e Helix. Usar mixer não é crime em si — mas é o principal sinal de ocultação em cripto. Vários deles já foram desativados em ações internacionais."

**EP 13 — Um investigado, muitas carteiras** · `Crypto · tabela clusters`
CL-88 com 27 endereços.
*Narração:* "Cluster é a palavra-chave da investigação cripto: grupo de carteiras de um mesmo controlador — descoberto por heurísticas públicas, não por palpite. O cluster 88 reúne vinte e sete endereços. Para o inquérito, não são vinte e sete suspeitos: é um."

**EP 14 — Endereços sancionados** · `Crypto · linha OFAC`
0xDemo…9c2E sancionado.
*Narração:* "E há o agravante: este endereço está na lista OFAC — dinheiro que por aqui passou toca sanções internacionais. A consequência prática: qualquer resgate ou devolução dependerá de cooperação, e a exposição precisa constar no relatório."

**EP 15 — O caso se abre** · `Casos & RIF`
CAS-2026-0112, status investigação.
*Narração:* "Alerta confirmado vira caso. Este é o caso do mixer: vinculado ao alerta original, em investigação, com linha do tempo de cada ação. Tudo datado, tudo assinado — porque relatório sem trilha é opinião."

**EP 16 — A IA propõe, o humano decide** · `Analista IA · Qwen`
Analisar com qwen3.7-flash.
*Narração:* "Chega o assistente: a inteligência artificial lê o alerta e propõe a minuta — fundamentos, tipologia, recomendações. Em segundos. Mas note a posição correta: a IA propõe; quem decide comunicar, aprofundar ou arquivar é o analista humano."

**EP 17 — Trocando o modelo** · `Analista IA · GLM`
Selecionar glm-5.2-fast-preview e reanalisar.
*Narração:* "A mesma pergunta a outro modelo: GLM, da Zhipu. Redação diferente, conclusão equivalente. É o princípio do sistema: sem dependência de fornecedor único — e com failover automático de cota entre provedores."

**EP 18 — Bloqueio preventivo** · `Blocking`
OPA, motivos, dupla aprovação.
*Narração:* "Enquanto o analista decide, o valor perigoso fica retido: bloqueio automático em milissegundos, sempre citando a regra e o motivo. Nada é definitivo — a liberação exige dupla aprovação humana, registrada na trilha de auditoria."

**EP 19 — O RIF é assinado** · `Casos & RIF · protocolo`
RIF-2026-88214, ICP-Brasil, WORM.
*Narração:* "Suspeita confirmada: nasce o RIF, a comunicação formal ao COAF — prazo de vinte e quatro horas úteis. Assinado com certificado digital de validade de cartório, e guardado de forma imutável por dez anos. Nem o próprio sistema pode alterá-lo depois."

**EP 20 — O dossiê final** · `Command Center` (fechamento)
Síntese da investigação; convite à cessão.
*Narração:* "Do dado bruto ao dossiê: fracionamento detectado, PEP revelado, cripto rastreada até exchange, sanções mapeadas, RIF assinado — tudo com cadeia de custódia da prova digital, pronta para instruir inquérito. Esta tecnologia está disponível, em cessão, ao Ministério Público. O próximo caso pode ser o seu."

---

## Produção

```bash
# servidor em :3100 (produção standalone)
npm run build && node scripts/start-prod.cjs &

# gravar um episódio (legendas queimadas, ~60s, 1080p):
node scripts/record-episodio.cjs --ep 1

# gravar todos (≈40 min):
for i in $(seq 1 20); do node scripts/record-episodio.cjs --ep $i; done
```

Saída: `public/demo/serie/ep-NN.mp4`. Narração dos roteiros acima pode ser
gravada como trilha em pós-produção (os vídeos saem sem áudio do pipeline).
