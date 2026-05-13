# REAL_DATA_PROMOTION_PLAN.md - Fase 15G-0

**Microfase:** 15G-0 - Plano de Promocao Coordenada dos Dados Reais  
**Data:** 2026-05-13  
**Status:** criado, sem promocao executada  
**Escopo:** documentacao e estrategia. Nenhum JSON publico foi alterado.

---

## 1. Objetivo

Definir um plano seguro para promover os drafts reais para os JSONs publicos do app, sem executar a promocao nesta fase.

Esta microfase existe para evitar uma troca parcial de dados. `teams.json`, `groups.json`, `matches.json` e `public/data/live-data.json` formam um conjunto referencial e devem ser promovidos de forma coordenada, com backup, limpeza de campos internos, validacao de schema, build e QA antes de qualquer remocao de avisos MOCK.

Arquivos publicos que continuam intocados nesta fase:

- `src/data/teams.json`
- `src/data/groups.json`
- `src/data/matches.json`
- `public/data/live-data.json`

Regras mantidas:

- Nao importar `src/data/real` no app.
- Nao remover MOCK.
- Nao rodar build nesta microfase.
- Nao promover dados reais nesta microfase.
- Nao inserir Analytics.
- Nao inserir AdSense.

---

## 2. Drafts reais prontos para planejamento

### `src/data/real/teams.real.draft.json`

Status: pronto para planejamento de promocao, ainda em draft.

Resumo observado:

- 48 selecoes.
- 48 `id` unicos.
- 48 `slug` unicos.
- 12 grupos A-L com 4 selecoes por grupo.
- Campos por selecao: `id`, `name`, `slug`, `group`, `flag`, `confederation`.
- Metadados de draft no topo: `_source`, `_collected_at`, `_collected_by`, `_verified_against`, `_draft`, `_notes`.

### `src/data/real/groups.real.draft.json`

Status: pronto para planejamento de promocao, ainda em draft.

Resumo observado:

- 12 grupos A-L.
- Slugs `a` a `l`.
- 4 `team_ids` por grupo.
- Campos por grupo: `id`, `name`, `slug`, `team_ids`.
- Metadados de draft no topo: `_source`, `_collected_at`, `_collected_by`, `_verified_against`, `_draft`, `_notes`.

### `src/data/real/matches.real.draft.json`

Status: pronto para planejamento de promocao, ainda em draft e com campos internos a remover antes do arquivo publico final.

Resumo observado:

- 104 partidas.
- 72 partidas `confirmed` de fase de grupos.
- 32 partidas `partial` de mata-mata.
- Fases:
  - `group_stage`: 72
  - `round_of_32`: 16
  - `round_of_16`: 8
  - `quarterfinal`: 4
  - `semifinal`: 2
  - `third_place`: 1
  - `final`: 1
- Campos publicos por partida: `id`, `type`, `phase`, `group`, `match_number`, `datetime_utc`, `stadium`, `city`, `country`, `home_team_id`, `away_team_id`, `home_label`, `away_label`.
- Campo interno extra por partida: `conversion_audit`.
- Metadados de draft no topo: `_source`, `_collected_at`, `_collected_by`, `_verified_against`, `_draft`, `_notes`.

---

## 3. Comparacao de schema com os JSONs publicos atuais

### Team

Interface alvo em `src/types/index.ts`:

```ts
interface Team {
  id: string;
  name: LocalizedString;
  slug: string;
  group: string | null;
  flag: string;
  confederation: string;
}
```

Comparacao:

| Arquivo | Campos de item | Compatibilidade |
|---------|----------------|-----------------|
| `teams.real.draft.json` | `id`, `name`, `slug`, `group`, `flag`, `confederation` | Compativel com `Team` |
| `src/data/teams.json` | `id`, `name`, `slug`, `group`, `flag`, `confederation` | Compativel com `Team` |

Diferenca relevante: o draft tem metadados de auditoria no objeto raiz; o publico atual tem `_mock` e `_note`.

### Group

Interface alvo:

```ts
interface Group {
  id: string;
  name: LocalizedString;
  slug: string;
  team_ids: string[];
}
```

Comparacao:

| Arquivo | Campos de item | Compatibilidade |
|---------|----------------|-----------------|
| `groups.real.draft.json` | `id`, `name`, `slug`, `team_ids` | Compativel com `Group` |
| `src/data/groups.json` | `id`, `name`, `slug`, `team_ids` | Compativel com `Group` |

Diferenca relevante: o draft tem metadados de auditoria no objeto raiz; o publico atual tem `_mock` e `_note`.

### Match

Interface alvo:

```ts
interface Match {
  id: string;
  type: MatchType;
  phase: MatchPhase;
  group: string | null;
  match_number: number;
  datetime_utc: string;
  stadium: LocalizedString;
  city: LocalizedString;
  country: LocalizedString;
  home_team_id: string | null;
  away_team_id: string | null;
  home_label: LocalizedString | null;
  away_label: LocalizedString | null;
}
```

Comparacao:

| Arquivo | Campos de item | Compatibilidade |
|---------|----------------|-----------------|
| `matches.real.draft.json` | campos de `Match` + `conversion_audit` | Requer limpeza antes da promocao |
| `src/data/matches.json` | somente campos de `Match` | Compativel com `Match` |

Diferenca relevante: `conversion_audit` e metadados de raiz pertencem ao controle de draft, nao ao schema publico final.

### live-data

Interface alvo:

```ts
interface LiveData {
  last_updated: string;
  matches: Record<string, LiveMatchData>;
  standings: Record<string, StandingEntry[]>;
}
```

`public/data/live-data.json` atual:

- `_mock: true`
- `_note`
- `last_updated`
- `matches` com 11 IDs mockados
- `standings` com grupos mockados M e N
- alguns scores/status ficticios para demonstracao

Forma planejada para a promocao:

- 104 entradas em `matches`, uma por partida real `match-001` a `match-104`.
- Todas inicialmente com:
  - `status: "scheduled"`
  - `score_home: null`
  - `score_away: null`
  - `minute: null`
- `standings` para grupos A-L, com 4 selecoes por grupo e todos os campos numericos zerados.
- `last_updated` em UTC ISO-8601.
- Sem placares reais iniciais.

---

## 4. Campos de auditoria que nao devem ir para os JSONs publicos finais

Remover dos arquivos promovidos finais:

- `_draft`
- `_sample`
- `_notes` ou `_notes internas`
- `_source`
- `_collected_at`
- `_collected_by`
- `_verified_against`
- `conversion_audit`
- `original_date`
- `original_time_et`
- `conversion_timezone`
- `conversion_offset`
- `source_timezone_label`
- `source_reference`
- `extraction_note`
- `utc_date_shift`
- qualquer campo usado apenas para auditoria, fonte, amostra, coleta ou revisao

Observacao importante:

- `conversion_audit` existe dentro de cada partida no draft completo e deve ser removido antes de escrever `src/data/matches.json`.
- Os campos `_mock` e `_note` dos JSONs publicos atuais nao devem ser removidos nesta microfase. A decisao final de remocao pertence a 15I, depois de QA real aprovado.

---

## 5. Decisao de schema publico final

Recomendacao: os JSONs publicos finais devem conter apenas os campos consumidos pelo app e compativeis com `src/types/index.ts`, mais o minimo de marcacao temporaria definido para a etapa QA.

Para dados estruturais:

- `src/data/teams.json`: raiz com `teams` e, temporariamente se autorizado na 15G-1, `_mock`/`_note` ate a 15I.
- `src/data/groups.json`: raiz com `groups` e, temporariamente se autorizado na 15G-1, `_mock`/`_note` ate a 15I.
- `src/data/matches.json`: raiz com `matches` e, temporariamente se autorizado na 15G-1, `_mock`/`_note` ate a 15I.

Para itens de arrays:

- `teams[]`: somente campos `Team`.
- `groups[]`: somente campos `Group`.
- `matches[]`: somente campos `Match`.

Para live data:

- `public/data/live-data.json`: campos `last_updated`, `matches`, `standings` e, temporariamente se autorizado na 15G-1, `_mock`/`_note` ate a 15I.
- Entradas `matches[match_id]`: somente `status`, `score_home`, `score_away`, `minute`.
- Linhas de `standings`: somente campos `StandingEntry`.

---

## 6. Plano de promocao coordenada

A promocao futura deve acontecer em uma unica fase autorizada, preferencialmente 15G-1 ou fase equivalente, com commit separado.

Mapeamento:

- `src/data/real/teams.real.draft.json` -> `src/data/teams.json`
- `src/data/real/groups.real.draft.json` -> `src/data/groups.json`
- `src/data/real/matches.real.draft.json` -> `src/data/matches.json`
- criar/ajustar `public/data/live-data.json` com 104 partidas `scheduled`, sem placares reais

Transformacoes obrigatorias:

1. Ler os drafts reais como fonte.
2. Preservar apenas arrays publicos (`teams`, `groups`, `matches`).
3. Remover metadados de raiz dos drafts.
4. Remover `conversion_audit` de cada partida.
5. Manter `matches.json` sem `status`, `score_home`, `score_away` ou `minute`.
6. Gerar `live-data.json` a partir de `matches.real.draft.json` e `groups.real.draft.json`.
7. Inicializar live matches com `scheduled` e scores/minute `null`.
8. Inicializar standings dos grupos A-L com zeros para as 48 selecoes.
9. Manter avisos MOCK temporarios ate a fase correta, conforme decisao abaixo.

---

## 7. Como tratar `_mock`

Decisao recomendada:

- Durante a promocao coordenada para QA real, manter uma marcacao temporaria visivel de cautela.
- Nao remover avisos MOCK antes da fase correta.
- Nao publicar dados reais como definitivos enquanto o QA real nao estiver aprovado.

Opcao recomendada para 15G-1:

- Manter `_mock: true` e `_note` temporarios nos JSONs publicos durante o primeiro build/QA com dados reais.
- Ajustar o texto do `_note` para deixar claro que o arquivo esta em "QA de dados reais" apenas se essa mudanca for explicitamente autorizada.
- Nao remover textos visiveis de MOCK do UI/Footer ate a 15I.

Quando mudar para `_mock: false`:

- Somente depois da 15H aprovada e no momento controlado da 15I.
- Alternativamente, remover `_mock` por completo na 15I, como previsto no plano original, se o app nao depender deste campo.

Racional:

- Os componentes e o footer ainda exibem avisos MOCK como protecao contra publicacao prematura.
- A promocao dos JSONs e a remocao dos avisos sao riscos diferentes e devem ficar separadas.

---

## 8. Ordem segura da promocao futura

1. Criar backup dos JSONs publicos atuais:
   - `src/data/teams.json`
   - `src/data/groups.json`
   - `src/data/matches.json`
   - `public/data/live-data.json`
2. Confirmar que `src/data/real/*` continua sem imports no app.
3. Copiar dados dos drafts para arquivos publicos em conjunto.
4. Limpar campos internos e de auditoria.
5. Gerar `public/data/live-data.json` com 104 partidas `scheduled`, sem scores reais.
6. Validar schema contra `src/types/index.ts`.
7. Validar integridade referencial:
   - todo `team_id` em grupos existe em teams;
   - todo `home_team_id`/`away_team_id` confirmado existe em teams;
   - todo `group` de partidas existe em groups;
   - todo `match_id` de live-data existe em matches;
   - todo grupo de standings existe em groups.
8. Rodar build somente na fase autorizada, apos a promocao.
9. Testar rotas dinamicas principais em pt-br, en e es.
10. Auditar sitemap e canonical/hreflang.
11. Auditar SEO/JSON-LD:
    - `SportsEvent` apenas em partidas `confirmed`;
    - nenhum schema em `partial`;
    - nomes e URLs corretos.
12. Auditar timezone/localStorage em fusos alvo.
13. Auditar `live-data.json` client-side e fallback.
14. So depois de QA completo, executar 15I para remover/ajustar avisos MOCK.

---

## 9. Riscos principais

| Risco | Impacto | Mitigacao |
|-------|---------|-----------|
| Rotas antigas de times mockados deixam de existir | Links externos antigos como `/pt-br/selecoes/northland/` podem virar 404 | Aceitar como mudanca esperada ou planejar redirects se necessario |
| IDs/slugs novos | Componentes, links e localStorage podem apontar para slugs mockados antigos | Testar TeamSelector, paginas de selecao e fallback de preferencia salva |
| Paginas geradas aumentam muito | Build passa de 92 paginas para centenas | Rodar build na fase autorizada e conferir tempo/saida |
| Sitemap muda | Numero de URLs e rotas dinamicas aumenta | Auditar `dist/sitemap.xml` apos build autorizado |
| JSON-LD em 72 jogos confirmed | Aumento de schemas e risco de dados incorretos | Conferir que apenas `confirmed` com ambos os times emite `SportsEvent` |
| Partidas partial no mata-mata | Schema indevido ou UI sugerindo times definidos | Garantir `home_team_id`/`away_team_id: null`, labels corretos e sem JSON-LD |
| `conversion_audit` vazar | Campos internos ficariam publicados em `matches.json` | Limpeza obrigatoria antes da promocao |
| `live-data.json` com 104 jogos | Fetch client-side e fallback podem expor inconsistencias se IDs faltarem | Gerar programaticamente e validar todos os IDs |
| Timezone/localStorage | Preferencias antigas podem selecionar time mockado ou fuso inconsistente | Testar localStorage limpo e com valores antigos |
| `_mock` inconsistente | UI pode dizer MOCK enquanto dados sao reais, ou remover aviso cedo demais | Manter aviso ate QA final e documentar estado temporario |
| Standings reais iniciais | Standings com zeros podem parecer classificacao oficial | Manter aviso temporario e texto de QA ate 15I |

---

## 10. Checklist de aceite para futura 15G-1

- [ ] Backups dos 4 JSONs publicos atuais criados antes da promocao.
- [ ] `teams.json` promovido com 48 selecoes reais e somente campos `Team` nos itens.
- [ ] `groups.json` promovido com 12 grupos reais e somente campos `Group` nos itens.
- [ ] `matches.json` promovido com 104 partidas e somente campos `Match` nos itens.
- [ ] `conversion_audit` removido de todas as partidas publicas.
- [ ] Nenhum `original_date`, `original_time_et`, `_draft`, `_sample` ou campo interno nos JSONs publicos finais.
- [ ] `live-data.json` contem 104 partidas.
- [ ] Todas as partidas em `live-data.json` iniciam como `scheduled`, sem placares reais.
- [ ] Standings A-L existem e estao zerados para 48 selecoes.
- [ ] Build sem erro na fase autorizada.
- [ ] Rotas reais de partidas geradas.
- [ ] Rotas reais de selecoes geradas e funcionando.
- [ ] Rotas reais de grupos geradas e funcionando.
- [ ] Calendario real funcionando.
- [ ] Jogos `confirmed` e `partial` exibidos corretamente.
- [ ] JSON-LD apenas em `confirmed` com ambos os times.
- [ ] Nenhum JSON-LD emitido para `partial`.
- [ ] `live-data.json` valido no fetch client-side.
- [ ] Nenhum dado mockado visivel como se fosse real definitivo.
- [ ] Aviso temporario correto permanece ate 15I.
- [ ] Nenhum import de `src/data/real` foi criado no app.
- [ ] Nenhum Analytics ou AdSense foi inserido.

---

## 11. Auditoria somente-leitura recomendada antes de commit

Recomendacao: sim, executar uma auditoria somente-leitura antes de qualquer commit desta fase e antes da futura 15G-1.

Auditoria recomendada para esta 15G-0:

- `git diff -- REAL_DATA_PROMOTION_PLAN.md CURRENT_STATUS.md CODEX_CONTEXT.md`
- Confirmar que nenhum dos quatro JSONs publicos foi alterado.
- Confirmar que nenhum import de `src/data/real` foi criado.
- Confirmar que nenhum build foi executado.

Auditoria recomendada antes da futura promocao:

- Validar contagens e schemas dos drafts.
- Validar remocao de campos internos.
- Validar integridade referencial.
- Validar geracao de `live-data.json`.
- Somente entao rodar build na fase autorizada.

---

## 12. Criterios de conclusao da 15G-0

- Este documento criado.
- Drafts prontos documentados.
- Schemas comparados com os JSONs publicos atuais.
- Campos internos a remover identificados.
- Estrategia de `_mock` definida para QA real.
- Ordem segura de promocao registrada.
- Riscos principais registrados.
- Checklist de aceite da futura 15G-1 definido.
- `CURRENT_STATUS.md` atualizado.
- `CODEX_CONTEXT.md` atualizado.
- Nenhum JSON publico alterado.
- Nenhum build executado.
