# Playbook de Investigação de Criptoativos — Estado da Arte

> Biblioteca de prompts e protocolos para investigação financeira de criptoativos,
> com fins **exclusivamente institucionais e legais** (órgãos de persecução, regulação,
> recuperação judicial e due diligence autorizada).
>
> **Princípios inegociáveis:** (i) legalidade — toda medida sujeita à autorização
> competente; (ii) cadeia de custódia da prova digital (arts. 158-A a 158-F, CPP);
> (iii) registrabilidade — todo achado produz hash, carimbo de tempo e responsável;
> (iv) proporcionalidade e contraditório.

Os placeholders `[ ]` devem ser preenchidos com os dados do caso concreto.
Nenhuma referência a casos reais deve constar de artefatos públicos.

---

## Bloco 1 — Forense on-chain (1–12)

1. "Analise o endereço `[ENDERECO]` e identifique todas as transações superiores a `[VALOR]` nos últimos `[N]` meses, mapeando contrapartes e classificando-as por risco de mixer/tumbler."
2. "Rastreie o fluxo de `[TOKEN]` do endereço `[ORIGEM]` até exchanges conhecidas, identificando cada salto, o tempo entre transações e os pontos de convergência."
3. "Identifique padrões de *layering* no conjunto `[LISTA_TX]`, marcando estruturas típicas de colocada, ocultação e integração (modelos de três estágios)."
4. "Compare os padrões de transação dos endereços `[A]`, `[B]`, `[C]` e estime probabilidade de controle comum por *timing*, valores e reutilização de inputs."
5. "Analise o contrato `[ENDERECO]` e identifique todas as interações com stablecoins, mapeando os principais detentores e fluxos de tesouraria."
6. "Rastreie a origem dos fundos recebidos por `[DESTINO]` até `[N]` níveis de profundidade, apontando a fonte primária e eventuais contaminações por endereços sancionados."
7. "Identifique transferências de NFTs realizadas por `[ENDERECO]`, valor de mercado à época e indícios de autoavaliação inflada (*wash trading*)."
8. "Analise rotas cross-chain via bridges, correlacionando identificadores de mensagem entre redes e detectando tentativas de fuga para cadeias de privacidade."
9. "Mapeie interações do `[ENDERECO]` com protocolos DeFi (DEX, empréstimos, colateralização) e calcule o resultado financeiro realizado."
10. "Detecte cadeias de *peeling* (saques sucessivos de valores decrescentes) a partir de `[ENDERECO]` e estime o total dissociado da origem."
11. "Identifique consolidamentos: endereços que agregaram frações de múltiplas origens comuns e as reenviaram em transação única."
12. "Gere grafo de transações (nós = endereços; arestas = fluxos ponderados por valor) do conjunto `[CONJUNTO]`, com comunidades detectadas por modularidade."

## Bloco 2 — Heurísticas de clustering e atribuição (13–18)

13. "Aplique a heurística de propriedade comum de inputs às transações `[LISTA]` e produza clusters com grau de confiança por aresta."
14. "Detecte endereços de *troco* (*change address*) nas transações de `[ENDERECO]` e reconsolide o cluster real do investigado."
15. "Analise correlação temporal entre transações on-chain e eventos off-chain (`[EVENTOS]`) — horários, padrões de sleep, janelas de escritório."
16. "Identifique reutilização de *nonce*, assinaturas e erros de derivacão de chaves que permitam vincular carteiras a uma mesma fonte."
17. "Correlacione *dust deposits* recebidos por `[ENDERECO]` com campanhas conhecidas de *dusting* e endereços sancionados."
18. "Produza dossiê de atribuição para `[ENDERECO]`: evidências diretas (KYC, ordens), indiciárias (heurísticas) e grau de certeza, distinguindo-as."

## Bloco 3 — Redes e ativos específicos (19–26)

19. "TRON/TRC-20: mapeie emissões e resgates de USDT, identifique uso da autoridade de *freeze*/*blacklist* da emissora e endpoints envolvidos."
20. "Bitcoin: aplique rastreamento UTXO e identifique *coinjoins*, identificando participantes conhecidos e peers incomuns."
21. "Ethereum: analise interações com contratos de *mixers* sancionados e determie valores entrados/saídos e comissionamentos."
22. "Cadeias de privacidade: use apenas heurísticas licitas e declaradas — correlação temporal/valor com fluxos adjacentes — e registre explicitamente os limites probabilísticos."
23. "Lightning/layer-2: identifique aberturas/fechamentos de canais on-chain e estime rota e volume por evidências públicas."
24. "Ordinals/BRC-20 e ativos exóticos: rastreie transferências e valorações por mercados conhecidos."
25. "Staking, restaking e *liquid staking tokens*: decomponha a posição real subjacente ao derivado e sua liquidez efetiva."
26. "Identifique carteiras quentes/frias de exchange por assinaturas de estrutura de transação (*consolidation patterns*, *peeling* de pagamentos, horários de processamento)."

## Bloco 4 — Sanções e compliance (27–31)

27. "Rastreie exposição da carteira `[ENDERECO]` às listas OFAC SDN, UE e ONU, por grau (direto: 1 salto; indireto: 2–3 saltos), com datas de inclusão."
28. "Classifique as tipologias FATF e Circular BACEN 3.978/2020 presentes no conjunto `[CONJUNTO]`, citando a tipologia exata para cada cadeia de evidência."
29. "Avalie obrigações de comunicação ao COAF/SISCOAF decorrentes dos achados, com base legal e prazo."
30. "Elabore matriz de risco de jurisdicão dos pontos de contato identificados (exchanges, pontes, emissoras), para fins de priorização de cooperação."
31. "Detecte indícios de estruturação (*structuring*) abaixo de limites de reporte em série temporal de transações `[SÉRIE]`."

## Bloco 5 — Investigação OSINT (32–38)

32. "Busque menções públicas a `[ALVO]` em redes sociais, fóruns de cripto, repositórios e bases de vazamentos, com registro de fonte, data e cópia autenticada."
33. "Correlacione perfis profissionais, participações societárias e eventos do `[NOME]` com exchanges, projetos DeFi e empresas de cripto."
34. "Pesquise registros corporativos em jurisdições offshore relevantes (`[JURISDIÇÕES]`) para empresas do grupo, identificando beneficiários finais."
35. "Mapeie processos judiciais de `[NOME/EMPRESA]` em todas as jurisdições brasileiras (DataJud e consultas locais), classificando por relevância."
36. "Identifique domínios, subdomínios, certificados SSL e infraestrutura técnica ligados ao grupo investigado."
37. "Correlacione aquisições patrimoniais (imóveis, veículos, aeronaves) publicamente registáveis com períodos de movimentação cripto suspeita."
38. "Produza grafo de relacionamentos do `[NOME]` (societário, familiar, profissional) com pesos por força de vínculo documental."

## Bloco 6 — Análise financeira e contábil (39–44)

39. "Reconcilie demonstrações financeiras de `[ENTIDADE]` com declarações regulatórias e fluxos on-chain conhecidos, apontando discrepâncias por exercício."
40. "Identifique transações entre partes relacionadas e fluxos sem contrapartida documental clara no período `[PERÍODO]`."
41. "Calcule valor de recuperação esperada dos ativos cripto identificados, considerando liquidez, custódia, jurisdicão e volatilidade (cenários otimista/base/pessimista)."
42. "Aplique metodologia de perda esperada (IFRS 9) às carteiras contaminadas por fraude, com premissas declaradas."
43. "Mapeie estrutura de garantias, subordinações e duplicidades de colateral nas operações `[OPERAÇÕES]`."
44. "Elabore matriz de dissipação: ativos por risco de dissipação (alto/médio/baixo), medida urgente cabível e fundamento legal."

## Bloco 7 — Providências jurídicas (45–52)

45. "Pesquise na base `[RAGJUR/OUTRA]` precedentes de bloqueio e perdimento de criptoativos, ordenando por tribunal, valor e tese."
46. "Elabore minuta de requisição a exchange (nacional ou internacional) solicitando KYC, logs de acesso (IP/device-id), extratos e carteiras vinculadas, com fundamento legal."
47. "Elabore minuta de pedido de cooperação internacional (MLAT/carta rogatória) para obtenção de registros de custodiante em `[JURISDIÇÃO]`."
48. "Fundamente pedido de bloqueio cautelar de criptoativos com base na Lei 9.613/98, Lei 14.478/2022 e jurisprudência aplicável, indicando o custodiante correto."
49. "Analise a responsabilidade de prestadores de serviços de ativos virtuais (VASP) por saques após ordem judicial, no regime da Lei 14.478/2022."
50. "Estruture estratégia de leilão/liquidação de criptoativos apreendidos com maximização de valor e publicidade adequada."
51. "Elabore roadmap de desbloqueio e conversão em juízo dos ativos recuperados, com triboos, custos e riscos cambiais."
52. "Produza síntese de teses defensas previsíveis (devolutivas) e respostas processuais antecipadas, com precedentes."

## Bloco 8 — Automação, monitoramento e relatório (53–58)

53. "Configure vigilância em tempo real dos endereços `[LISTA]` com alertas por valor, destino (exchange/mixer/bridge) e hora."
54. "Elabore playbook de resposta rápida para movimentação detectada em exchange ou bridge (passos, responsáveis, prazos, minutas prontas)."
55. "Produza dashboard executivo de recuperação: ativos identificados, bloqueados, convertidos, em disputa; e KPIs por custodiante/jurisdição."
56. "Gere relatório pericial-padrão do caso: contexto, metodologia, achados (com hash e data de cada evidência), limitações, conclusões e anexos verificáveis."
57. "Converta o relatório em peça de comunicação institucional (1 página) para autoridade competente, preservando sigilo de dados sensíveis."
58. "Elabore registro de cadeia de custódia digital do inquérito/procedimento: coleta, hash SHA-256, carimbo de tempo, custódio, transferências — apto ao contraditório."

---

## Padrão de saída exigido de todo prompt

1. **Evidência**: sempre com hash da fonte e data/hora da extração.
2. **Método**: heurística/consulta declarada, com limites probabilísticos.
3. **Conclusão**: separada por grau — *demonstrado / indiciário / hipótese*.
4. **Reprodutibilidade**: qualquer analista deve conseguir repetir o passo a passo.

## Conformidade

Uso vinculado a procedimento legal legítimo. Dados pessoais tratados sob LGPD
(hipóteses legais de tratamento por órgão de persecução/regulação). Guarda de
relatórios em repositório WORM com assinatura ICP-Brasil.

*BeansTech — motor PLD/AML + Crypto Intelligence. Documentação pública do projeto (pldbr.tech).*
