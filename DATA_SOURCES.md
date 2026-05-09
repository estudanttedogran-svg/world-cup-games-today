# DATA_SOURCES.md — World Cup Games Today

**Versão:** 1.0  
**Criado em:** 2026-05-09  
**Objetivo:** protocolo obrigatório de coleta, validação e registro de dados reais da Copa do Mundo 2026.

Nenhum dado real entra no projeto sem passar por este protocolo.

---

## 1. Objetivo do documento

Este documento define:

- quais fontes são autorizadas para cada tipo de dado;
- como coletar, verificar e registrar cada informação antes de editar os arquivos JSON;
- como mapear os dados coletados para a estrutura interna do projeto (`src/types/index.ts`);
- como lidar com dados ausentes, parciais ou conflitantes;
- os checklists de validação que devem ser aprovados antes do build, antes de remover avisos MOCK e antes de subir para produção.

**Princípio geral:** em caso de dúvida, não inserir o dado. Prefira `partial` a `confirmed` sem certeza.

---

## 2. Fontes primárias (obrigatórias)

As fontes abaixo são as únicas autorizadas para inserir dados como `confirmed`.

| Prioridade | Fonte | URL de referência | Dados cobertos |
|-----------|-------|-------------------|----------------|
| 1 | Site oficial FIFA | `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026` | Calendário, grupos, seleções classificadas, estádios, horários oficiais |
| 2 | FIFA Media (press releases) | `https://www.fifa.com/en/media-releases` | Alterações de data/local, confirmações tardias |
| 3 | Perfil oficial FIFA no X / Twitter | `@FIFAWorldCup` | Confirmações em tempo real (somente para `live-data.json`) |

**Regra:** se a informação não estiver disponível em pelo menos uma fonte primária, ela não pode ser marcada como `confirmed`.

---

## 3. Fontes secundárias permitidas (conferência cruzada)

Usadas apenas para **verificar** informações já encontradas na fonte primária. Nunca para preencher lacunas que a fonte primária não cobriu.

| Fonte | Uso autorizado |
|-------|---------------|
| Wikipedia — Copa do Mundo FIFA 2026 | Conferir lista de seleções classificadas, nomes de estádios |
| Transfermarkt (transfermarkt.com) | Conferir nomes oficiais das seleções em inglês |
| BBC Sport / ESPN / Goal.com | Conferir horários — somente se coincidirem com fonte primária |
| Confederation websites (UEFA, CONMEBOL, CAF, AFC, CONCACAF, OFC) | Confirmar seleções classificadas por confederação |

**Regra:** se fonte secundária divergir da fonte primária, prevalece a fonte primária. Registrar a divergência em comentário no JSON.

---

## 4. Fontes proibidas ou não confiáveis

Os dados abaixo **nunca** podem ser usados como base para inserir dados `confirmed`:

| Fonte | Motivo da proibição |
|-------|---------------------|
| Memória do modelo de IA (Claude, ChatGPT, etc.) | Pode conter informações desatualizadas, inventadas ou alucinadas |
| Previsões de classificação | Nenhum classificado presumido — só real |
| Fórmulas de simulação de chaveamento | Confrontos de mata-mata só entram após apuração oficial |
| Sites de apostas / odds | Não são fontes de fatos — são probabilidades |
| Redes sociais não oficiais | Rumores e especulações |

---

## 5. Protocolo de coleta

Seguir esta sequência para cada dado que for inserido:

### 5.1 Antes de coletar

- [ ] Identificar o dado necessário (seleção, grupo, partida, horário, estádio).
- [ ] Identificar a fonte primária aplicável (ver Seção 2).
- [ ] Anotar a URL exata da página onde o dado será coletado.
- [ ] Anotar a data e hora de acesso (formato: `YYYY-MM-DD`).

### 5.2 Durante a coleta

- [ ] Copiar o dado diretamente da fonte — não resumir, não interpretar.
- [ ] Para horários: anotar o horário **local** da cidade-sede e o **offset UTC** naquela data (verificar DST).
- [ ] Para nomes de seleções: usar o nome oficial em inglês como base; traduzir apenas para pt-br e es se necessário.
- [ ] Para estádios: usar o nome oficial publicado pela FIFA; incluir cidade e país corretos.

### 5.3 Após a coleta

- [ ] Conferir com ao menos uma fonte secundária (ver Seção 3).
- [ ] Se houver divergência: anotar qual fonte prevalece e por quê.
- [ ] Registrar no topo do arquivo JSON editado: fonte, URL e data de coleta (ver Seção 16).

---

## 6. Protocolo de validação

Antes de marcar qualquer dado como `confirmed`, validar todos os campos:

| Campo | Critério de confirmação |
|-------|------------------------|
| `home_team_id` e `away_team_id` | Ambos os times publicados pela fonte oficial, identificados por slug |
| `datetime_utc` | Horário local da cidade-sede convertido para UTC com verificação de DST |
| `stadium` | Nome oficial FIFA, não apelido popular |
| `city` | Cidade oficial — não inferir a partir do estádio |
| `country` | País-sede do jogo (EUA, Canadá ou México) |
| `phase` | Fase correta: `group_stage`, `round_of_32`, `round_of_16`, `quarterfinal`, `semifinal`, `third_place`, `final` |
| `group` | Letra do grupo (A–L), somente para `phase: "group_stage"` |

Se qualquer campo obrigatório não estiver confirmado pela fonte, usar `partial` em vez de `confirmed`.

---

## 7. Mapeamento para `src/data/teams.json`

**Interface alvo:** `Team` em `src/types/index.ts`

```
id            — slug único em inglês, sem acentos, sem espaços (ex: "saudi-arabia", "united-states")
name          — LocalizedString: { 'pt-br': '...', en: '...', es: '...' }
slug          — igual ao id; usado nas rotas /pt-br/selecoes/[slug]
group         — letra do grupo ("A"–"L"), ou null se sorteio ainda não ocorreu
flag          — caminho relativo: "flags/[slug].svg" (ou null temporariamente)
confederation — "CONMEBOL" | "UEFA" | "CAF" | "AFC" | "CONCACAF" | "OFC"
```

**Fontes autorizadas por campo:**

| Campo | Fonte primária | Fonte de conferência |
|-------|---------------|---------------------|
| `name.en` | FIFA oficial | Transfermarkt |
| `name.pt-br` | FIFA em português (se disponível) | Wikipedia PT |
| `name.es` | FIFA em espanhol (se disponível) | Wikipedia ES |
| `group` | FIFA (após sorteio oficial) | Wikipedia Copa 2026 |
| `confederation` | Site da confederação ou FIFA | Wikipedia |

**Regras:**
- Nenhuma seleção entra sem classificação confirmada pela fonte oficial.
- `group` só recebe valor após sorteio oficial publicado pela FIFA.
- `flag` pode ser `null` até que as imagens estejam disponíveis em `public/images/flags/`.
- Slugs derivados do nome em inglês: minúsculas, hífens no lugar de espaços, sem acentos.

**Impacto no build:** 48 seleções × 3 idiomas = 144 páginas de seleção.

---

## 8. Mapeamento para `src/data/groups.json`

**Interface alvo:** `Group` em `src/types/index.ts`

```
id        — letra do grupo: "A", "B", ..., "L"
slug      — minúsculo: "a", "b", ..., "l"; usado na rota /pt-br/grupos/[slug]
name      — LocalizedString: { 'pt-br': 'Grupo A', en: 'Group A', es: 'Grupo A' }
team_ids  — array de 4 strings (ids das seleções do grupo), ou [] se sorteio pendente
```

**Regras:**
- 12 grupos no total: A, B, C, D, E, F, G, H, I, J, K, L.
- Cada grupo deve ter exatamente 4 `team_ids` após o sorteio — todos presentes em `teams.json`.
- Se o sorteio não tiver ocorrido, manter `team_ids: []`.
- Não criar grupos além de A–L.
- Não atribuir seleções a grupos antes do sorteio oficial FIFA.

**Impacto no build:** 12 grupos × 3 idiomas = 36 páginas de grupo.

---

## 9. Mapeamento para `src/data/matches.json`

**Interface alvo:** `Match` em `src/types/index.ts`

```
id           — "match-001" a "match-104" (sequência atual mantida)
type         — "confirmed" | "partial"  (nunca "simulation" neste arquivo)
phase        — "group_stage" | "round_of_32" | "round_of_16" | "quarterfinal" | "semifinal" | "third_place" | "final"
group        — letra ("A"–"L") somente para phase: "group_stage", caso contrário null
match_number — número inteiro sequencial
datetime_utc — ISO-8601 com Z: "2026-06-11T18:00:00Z"
stadium      — LocalizedString: { 'pt-br': '...', en: '...', es: '...' }
city         — LocalizedString: { 'pt-br': '...', en: '...', es: '...' }
country      — LocalizedString: { 'pt-br': 'Estados Unidos', en: 'United States', es: 'Estados Unidos' }
home_team_id — team.id ou null (se partial)
away_team_id — team.id ou null (se partial)
home_label   — LocalizedString ou null (ex: { 'pt-br': 'Vencedor Jogo 49', en: 'Winner Match 49', es: 'Ganador Partido 49' })
away_label   — LocalizedString ou null
```

**Estrutura esperada dos 104 jogos:**

| Fase | Jogos |
|------|-------|
| Fase de grupos (`group_stage`) | 72 jogos (12 grupos × 6 jogos por grupo) |
| Round of 32 (`round_of_32`) | 16 jogos |
| Round of 16 (`round_of_16`) | 8 jogos |
| Quartas de final (`quarterfinal`) | 4 jogos |
| Semifinais (`semifinal`) | 2 jogos |
| Terceiro lugar (`third_place`) | 1 jogo |
| Final (`final`) | 1 jogo |
| **Total** | **104 jogos** |

**Regras de tipo por partida:**

| Condição | Tipo |
|----------|------|
| Data, hora, estádio, cidade e **ambos os times** confirmados pela FIFA | `confirmed` |
| Data, hora, estádio e cidade confirmados, mas times dependem de classificação | `partial` |
| Nenhum dado real confirmado | Não inserir — manter MOCK |

**O que nunca entra em `matches.json`:**
- Placares (ficam exclusivamente em `live-data.json`)
- Times presumidos por simulação ou probabilidade
- Confrontos de mata-mata antes da apuração oficial
- Partidas marcadas como `simulation`

**Impacto no build:** 104 jogos × 3 idiomas = 312 páginas de jogo.

---

## 10. Mapeamento para `public/data/live-data.json`

**Interface alvo:** `LiveData` em `src/types/index.ts`

Este arquivo é o único lugar onde placares, status ao vivo e classificação entram no projeto. Ele **não requer rebuild** — pode ser editado e publicado diretamente na Hostinger.

```json
{
  "last_updated": "2026-06-12T20:30:00Z",
  "matches": {
    "match-001": {
      "status": "scheduled" | "live" | "finished" | "postponed" | "cancelled",
      "score_home": null | número inteiro,
      "score_away": null | número inteiro,
      "minute": null | número inteiro
    }
  },
  "standings": {
    "A": [
      {
        "team_id": "brazil",
        "played": 0,
        "won": 0,
        "drawn": 0,
        "lost": 0,
        "goals_for": 0,
        "goals_against": 0,
        "points": 0
      }
    ]
  }
}
```

**Regras:**
- `last_updated` em UTC ISO-8601 — atualizar a cada edição.
- `score_home` e `score_away`: `null` se partida ainda não iniciou; número inteiro se em andamento ou encerrada.
- `minute`: `null` se não ao vivo; inteiro (ex: 67) se em andamento.
- `status`: iniciar todas as partidas como `"scheduled"`; atualizar para `"live"` durante a partida e `"finished"` ao encerrar.
- `standings`: inicializar com zeros para todos os times; atualizar após cada rodada.
- Nunca inserir `score_home`/`score_away` em `matches.json` — somente aqui.
- Fazer backup antes de editar (o arquivo não é reconstruído pelo Astro).

**Frequência de atualização sugerida durante a Copa:**
- Antes de cada jogo: atualizar `status` para `"live"` no minuto exato.
- Durante o jogo: atualizar `score_home`, `score_away`, `minute` a cada gol ou intervalo conveniente.
- Após o jogo: `status: "finished"`, `minute: null`, placar final.
- Após cada rodada: atualizar `standings` de todos os grupos envolvidos.

---

## 11. Como lidar com dados ausentes

| Situação | Ação |
|----------|------|
| Sorteio de grupos ainda não realizado | Manter `team_ids: []` em `groups.json`; manter `group: null` nas seleções |
| Times de mata-mata ainda indefinidos | Usar `type: "partial"`, `home_team_id: null`, `away_team_id: null`; preencher `home_label`/`away_label` com descritor (ex: "Vencedor Jogo 49") |
| Horário divulgado mas aguardando confirmação final | Não inserir como `confirmed` — aguardar publicação oficial |
| Estádio anunciado mas cidade ou país em dúvida | Não inserir como `confirmed` — verificar na fonte primária |
| Seleção classificada mas grupo não sorteado | Inserir a seleção em `teams.json` com `group: null` |
| Nome da seleção em idioma sem tradução oficial | Usar o nome em inglês também para pt-br e es até obter tradução confirmada |

---

## 12. Como lidar com conflitos entre fontes

| Conflito | Resolução |
|----------|-----------|
| Fonte secundária diverge da FIFA | Prevalecer a FIFA; anotar divergência em comentário no JSON |
| Duas fontes primárias divergem | Aguardar confirmação adicional da FIFA; não inserir como `confirmed` |
| Horário publicado em fuso local diverge da conversão UTC esperada | Recalcular manualmente com offset correto + verificação de DST; anotar cálculo em comentário |
| Nome da seleção difere entre idiomas | Usar nome oficial da confederação como base; manter consistência com `slug` (inglês) |
| Match ID ou número de jogo inconsistente entre fontes | Usar numeração da FIFA como referência; não renumerar sem autorização |

---

## 13. Checklist antes do build

Executar antes de rodar `npm run build` após qualquer edição de dados:

- [ ] Todos os `home_team_id` e `away_team_id` em `matches.json` existem como `id` em `teams.json`
- [ ] Todos os `team_ids` em `groups.json` existem como `id` em `teams.json`
- [ ] Todos os `group` referenciados em `matches.json` existem como `id` em `groups.json`
- [ ] Nenhuma partida `confirmed` com `home_team_id: null` ou `away_team_id: null`
- [ ] Nenhuma partida com `type: "simulation"` em `matches.json`
- [ ] Nenhum placar em `matches.json` (campos `score_home`, `score_away` não existem na interface `Match`)
- [ ] Todos os `datetime_utc` no formato ISO-8601 com sufixo `Z`
- [ ] Todos os `LocalizedString` têm as três chaves: `'pt-br'`, `en`, `es`
- [ ] Slugs de seleções são únicos, sem colisão de rotas
- [ ] Slugs de grupos são únicos (`"a"` a `"l"`)
- [ ] Nenhum campo `_mock: true` removido antes da 15I

---

## 14. Checklist antes de remover avisos MOCK (Fase 15I)

Só avançar para esta etapa após o QA da Fase 15H estar 100% aprovado.

- [ ] `teams.json`: 48 seleções reais, nenhuma fictícia, nenhum `_mock: true`
- [ ] `groups.json`: 12 grupos (A–L), 4 seleções por grupo, nenhum `_mock: true`
- [ ] `matches.json`: 104 partidas reais, sem `simulation`, sem placares, nenhum `_mock: true`
- [ ] `live-data.json`: scores zerados, todos com `status: "scheduled"`, nenhum `_mock: true`
- [ ] Footer (3 idiomas): aviso "Dados de exemplo" removido; aviso FIFA mantido
- [ ] `npm run build` passou com número correto de páginas (estimativa: ~560+)
- [ ] `sitemap.xml` reflete número correto de URLs
- [ ] FINAL_QA_REPORT.md atualizado com resultados da Fase 15H

---

## 15. Checklist antes de subir produção (Fase 15J)

- [ ] `.env` com `PUBLIC_SITE_URL` real (ex: `https://worldcupgamestoday.com`)
- [ ] `npm run build` executado com URL real
- [ ] `canonical` e hreflang usam domínio correto em todas as páginas
- [ ] `sitemap.xml` gerado com URL real
- [ ] `dist/` sem arquivos sensíveis: sem `.env`, sem `node_modules`, sem `src/`
- [ ] `robots.txt` permite rastreamento (Googlebot, Bingbot)
- [ ] Upload para Hostinger: conteúdo de `dist/` em `public_html/`
- [ ] Todos os testes do CHECKLIST_LANCAMENTO.md concluídos
- [ ] Aviso de independência da FIFA presente no footer em pt-br, en e es
- [ ] Nenhum aviso "MOCK" visível para o usuário final
- [ ] `live-data.json` com dados reais iniciais carregado em `public_html/data/`

---

## 16. Registro de data, autor e fonte

### Formato de cabeçalho nos arquivos JSON

Adicionar os campos de controle no topo de cada arquivo JSON editado, dentro do próprio JSON:

```json
{
  "_source": "FIFA oficial — https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026",
  "_collected_at": "2026-MM-DD",
  "_collected_by": "estudanttedogran-svg",
  "_verified_against": "Wikipedia Copa do Mundo FIFA 2026 — https://...",
  "_notes": "Qualquer divergência encontrada ou dado ainda pendente de confirmação"
}
```

### Formato de registro em commits

Cada commit que altere dados reais deve ter mensagem no formato:

```
dados: [tipo] — [descrição] — fonte: FIFA [data]

Exemplos:
dados: teams — 48 seleções reais importadas — fonte: FIFA 2026-06-01
dados: matches — grupo_stage match-001 a match-072 — fonte: FIFA 2026-05-15
dados: live-data — placar match-001 (2-1), match-002 (0-0) — atualizado 2026-06-12
```

### Log de coletas (registrar aqui)

| Data | Tipo de dado | Fonte | URL | Responsável | Notas |
|------|-------------|-------|-----|-------------|-------|
| — | — | — | — | — | — aguardando início da coleta — |

---

## Apêndice A — Campos proibidos por arquivo

| Arquivo | Campos que nunca devem aparecer |
|---------|-------------------------------|
| `matches.json` | `score_home`, `score_away`, `minute`, `status` |
| `teams.json` | Dados de desempenho (gols, vitórias, etc.) |
| `groups.json` | Standings (ficam em `live-data.json`) |

## Apêndice B — Valores válidos por campo (referência rápida)

| Campo | Valores válidos |
|-------|----------------|
| `Match.type` | `"confirmed"`, `"partial"`, `"simulation"` (simulation: somente simulador, nunca em matches.json real) |
| `Match.phase` | `"group_stage"`, `"round_of_32"`, `"round_of_16"`, `"quarterfinal"`, `"semifinal"`, `"third_place"`, `"final"` |
| `Match.status` (live-data.json) | `"scheduled"`, `"live"`, `"finished"`, `"postponed"`, `"cancelled"` |
| `Team.confederation` | `"CONMEBOL"`, `"UEFA"`, `"CAF"`, `"AFC"`, `"CONCACAF"`, `"OFC"` |
| `Locale` (chaves LocalizedString) | `"pt-br"`, `"en"`, `"es"` |
