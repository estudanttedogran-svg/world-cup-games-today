# REAL_DATA_MIGRATION_PLAN.md - Fase 15D-0

**Microfase:** 15D-0 - Estrategia Segura de Migracao dos Dados Mock para Dados Reais  
**Data:** 2026-05-12  
**Status:** criado para orientar as proximas subfases de dados reais  
**Escopo:** documentacao e estrategia. Nenhum JSON publico foi alterado.

---

## Objetivo

Definir uma migracao segura dos dados MOCK para dados reais da Copa do Mundo 2026 sem quebrar o build, sem publicar dados incompletos e sem misturar referencias mockadas com referencias reais.

Esta microfase existe porque a preparacao da 15D mostrou que `teams.json` nao pode ser substituido isoladamente. O site atual usa `teams.json`, `groups.json`, `matches.json` e `public/data/live-data.json` como um conjunto referencial.

---

## Por que `teams.json` nao deve ser substituido isoladamente

O estado mock atual tem dependencias cruzadas:

- `src/data/groups.json` contem `team_ids` como `northland`, `eastoria`, `westmark`, `southmore`, `highpeak`, `lowvale`, `bayshore`, `ridgemont`.
- `src/data/matches.json` usa esses mesmos ids em `home_team_id` e `away_team_id`.
- `public/data/live-data.json` usa ids de partidas e standings associados ao conjunto mock.
- Paginas dinamicas de selecao, grupo e jogo sao geradas a partir desses arquivos no build.

Se `teams.json` for trocado por selecoes reais antes de atualizar e validar os demais arquivos:

- grupos continuarao apontando para times inexistentes;
- partidas confirmadas continuarao referenciando ids mock removidos;
- paginas podem perder links cruzados, nomes de times, flags e standings;
- o build pode falhar ou gerar paginas incoerentes;
- dados reais podem aparecer ao lado de confrontos e grupos ficticios.

Portanto, a migracao final para os JSONs publicos deve ser coordenada: `teams.json`, `groups.json`, `matches.json` e, quando aplicavel, `live-data.json` precisam ser promovidos juntos apenas depois do QA completo.

---

## Estrategia de arquivos draft fora do build publico

Os dados reais devem ser coletados inicialmente em arquivos draft que nao sejam importados por paginas, componentes, sitemap, robots, schemas ou utilitarios de producao.

Arquivos propostos:

```text
src/data/real/teams.real.draft.json
src/data/real/groups.real.draft.json
src/data/real/matches.real.draft.json
src/data/real/sources.json
```

Regras para esses drafts:

- Nao criar imports desses arquivos em paginas ou componentes.
- Nao usar os drafts no sitemap.
- Nao copiar os drafts para `public/`.
- Nao usar os drafts no build de producao.
- Nao remover `_mock` dos JSONs publicos enquanto os drafts existirem.
- Validar os drafts com scripts/checklists antes de qualquer promocao.
- Tratar `sources.json` como o indice de origem e auditoria dos dados coletados.

Os JSONs publicos atuais continuam sendo a fonte do site ate a aprovacao da Fase 15H.

---

## Sequencia segura de execucao

### 15D-1 - Coleta/validacao das selecoes reais em draft

- Coletar somente selecoes classificadas em fonte primaria autorizada.
- Registrar fonte, URL, data de coleta, responsavel, fonte de verificacao e notas.
- Preencher apenas `teams.real.draft.json`.
- Nao tocar em `src/data/teams.json`.

### 15D-2 - Validacao de slugs, nomes, confederacoes e flags

- Validar unicidade de `id` e `slug`.
- Confirmar `name.pt-br`, `name.en`, `name.es`.
- Confirmar `confederation` com valores permitidos.
- Confirmar `flag` como string.
- Bloquear `flag: null`.

### 15E-1 - Grupos reais em draft

- Criar `groups.real.draft.json` apenas quando houver sorteio oficial.
- Usar grupos A-L.
- Preencher `team_ids` somente com ids existentes no draft de selecoes.
- Se o sorteio ainda nao ocorreu, nao promover grupos reais para JSON publico.

### 15F-1 - Calendario real em draft

- Criar `matches.real.draft.json` com partidas reais verificadas.
- Usar `confirmed` somente quando ambos os times estiverem definidos pela fonte oficial.
- Usar `partial` para partidas com data/local definidos e times pendentes.
- Nunca incluir placares em `matches.real.draft.json`.

### 15G - Validacao UTC

- Validar cada `datetime_utc` contra a base de horario declarada pela fonte oficial.
- Se a fonte oficial declarar uma timezone-base comum para o calendario, validar e converter a partir dessa timezone declarada, nao a partir do horario local da cidade-sede.
- Para o PDF oficial FIFA revisado na 15F-2, interpretar `Eastern Time (ET)` como `America/New_York` conforme a regra da 15F-3.
- Nao usar o horario local do estadio/cidade-sede como base de conversao quando a fonte declarar ET como base.
- A cidade-sede ainda deve ser validada para localizacao, estadio e pais, mas nao define a base de conversao de horario nesse caso.
- Registrar offset UTC, timezone tecnica usada e observacoes de DST quando aplicavel.
- Corrigir apenas os drafts ate a aprovacao.

### 15H - QA completo dos dados reais

- Validar integridade entre selecoes, grupos, partidas e live-data inicial.
- Confirmar ausencia de IDs mock em drafts finais.
- Confirmar fontes e datas de coleta.
- Confirmar que nenhuma partida `confirmed` tem time ausente.
- Rodar build apenas quando a promocao coordenada estiver autorizada.

### Promocao coordenada

Somente apos QA aprovado:

- Promover `teams.real.draft.json` para `src/data/teams.json`.
- Promover `groups.real.draft.json` para `src/data/groups.json`.
- Promover `matches.real.draft.json` para `src/data/matches.json`.
- Preparar `public/data/live-data.json` inicial coerente com os 104 jogos.
- Rodar build e validar sitemap, paginas dinamicas e schemas.

---

## Decisao sobre `Team.flag`

Decisao da 15D-0:

- Manter `Team.flag` como `string`.
- Nao usar `null` nesta fase.
- Aceitar string de emoji ou string de path.
- Preferir path quando houver arquivo real disponivel, por exemplo `flags/brazil.svg`.
- Usar emoji string apenas se essa for uma decisao explicita de produto e estiver consistente em todas as selecoes.

Motivo:

- `src/types/index.ts` define `flag: string`.
- Componentes e paginas atuais tratam `team.flag` como string.
- Permitir `null` exigiria alteracao de schema e revisao funcional, fora do escopo desta microfase.

---

## Registro de fonte

Cada arquivo draft deve conter metadados no topo:

```json
{
  "_source": "FIFA oficial - URL exata",
  "_collected_at": "YYYY-MM-DD",
  "_collected_by": "estudanttedogran-svg",
  "_verified_against": "Fonte secundaria permitida - URL exata",
  "_notes": "Divergencias, pendencias ou criterios aplicados"
}
```

`src/data/real/sources.json` deve listar cada coleta com:

- tipo de dado;
- campo afetado;
- URL primaria;
- URL de verificacao;
- data de acesso;
- responsavel;
- status (`draft`, `verified`, `blocked`, `promoted`);
- notas.

---

## Rollback

Pontos de retorno e recuperacao:

- Tag Git `v1.0-mock` como marco do MVP mockado aprovado.
- Backup local `dist_mock_backup/` como referencia do build mockado aprovado.
- Antes da promocao final, criar commit separado dos drafts aprovados.
- Em caso de erro antes da promocao, descartar ou corrigir apenas os drafts.
- Em caso de erro apos promocao autorizada, usar `git restore` ou checkout seletivo dos JSONs afetados somente com autorizacao explicita.
- Nunca usar reset destrutivo sem autorizacao.

---

## Criterios de aceite da 15D-0

- `REAL_DATA_MIGRATION_PLAN.md` criado.
- Plano deixa claro que `teams.json` nao deve ser substituido isoladamente.
- Estrategia de drafts definida.
- Drafts explicitamente fora do build publico ate QA.
- Sequencia 15D-1, 15D-2, 15E-1, 15F-1, 15G, 15H e promocao coordenada definida.
- Decisao de `flag` como string registrada.
- Formato de fontes registrado.
- Rollback registrado.
- Nenhum JSON publico alterado.
- Nenhum dado real importado.
- Nenhum build executado por se tratar apenas de documentacao.

---

## Proximo passo recomendado

Aguardar autorizacao explicita para a Fase 15D-1: criar os arquivos draft vazios/modelo e iniciar coleta manual de selecoes reais com fontes primarias verificadas.
