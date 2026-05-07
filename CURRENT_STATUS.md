# CURRENT_STATUS.md — World Cup Games Today

**Última atualização:** 2026-05-07

---

## Status atual

**Fase concluída:** Fase 2 — Camada de Dados (Mock)
**Próxima fase:** Fase 3 — Layout Base + CSS
**Aguardando:** Autorização do usuário para iniciar Fase 3

---

## O que foi feito

### Fase 0 ✅ — Meta / Setup do Processo
### Fase 1 ✅ — Bootstrap do Projeto Astro (Astro 5.18.1)

### Fase 2 ✅ — Camada de Dados (Mock)

**Tipos TypeScript:**
- `src/types/index.ts` criado com interfaces completas:
  - `Locale`, `LocalizedString`
  - `MatchType` (`confirmed | partial | simulation`)
  - `MatchPhase` (7 fases: group_stage → final)
  - `MatchStatus` (5 estados: scheduled → cancelled)
  - `Team`, `Match`, `Group`, `StandingEntry`
  - `OverrideMatchEntry`, `Overrides`
  - `LiveMatchData`, `LiveData`

**Dados estruturais (build time — `src/data/`):**
- `src/data/teams.json` — 8 seleções mock em 2 grupos (Grupo M e Grupo N)
- `src/data/matches.json` — 11 partidas mock:
  - 8 confirmadas (fase de grupos, rounds 1 e 2)
  - 3 parcialmente definidas (Round of 32, Semifinal, Final)
- `src/data/groups.json` — 2 grupos mock com slugs
- `src/data/overrides.json` — estrutura vazia pronta para uso emergencial

**Dados vivos (runtime — `public/data/`):**
- `public/data/live-data.json` — estrutura mínima com:
  - Status mock: match-001 e 002 finalizados, match-003 ao vivo (min 67), demais agendados
  - Classificação mock dos Grupos M e N
- `public/data/live-data.example.json` — modelo documentado com todos os estados possíveis

**Validação:**
- Todos os 6 arquivos JSON: ✅ válidos
- `npm run build`: ✅ 4 páginas geradas sem erros

---

## Arquivos criados/alterados na Fase 2

| Arquivo | Ação |
|---------|------|
| `src/types/index.ts` | Criado |
| `src/data/teams.json` | Criado |
| `src/data/matches.json` | Criado |
| `src/data/groups.json` | Criado |
| `src/data/overrides.json` | Criado |
| `public/data/live-data.json` | Criado |
| `public/data/live-data.example.json` | Criado |

---

## Estrutura de dados (resumo)

### Tipos de partida implementados
| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `confirmed` | Times, data, hora, estádio definidos | match-001 a match-008 |
| `partial` | Data/hora definidos, times a definir | match-009 a match-011 |
| `simulation` | Estrutura compatível — implementar em MVP 1.5 | — |

### Grupos mock
| Grupo | Times |
|-------|-------|
| M | northland, eastoria, westmark, southmore |
| N | highpeak, lowvale, bayshore, ridgemont |

### live-data.json — estados de exemplo
| Match | Status |
|-------|--------|
| match-001 | finished (2-1) |
| match-002 | finished (0-0) |
| match-003 | live (1-0, min 67) |
| match-004 a 011 | scheduled |

---

## Próximos passos (Fase 3)

Fase 3 — Layout Base + CSS:
1. `src/layouts/BaseLayout.astro` — HTML base, head, slots, meta
2. `src/components/Header.astro` — logo, nav, seletor de idioma
3. `src/components/Footer.astro` — links + aviso legal obrigatório
4. `src/styles/reset.css`
5. `src/styles/variables.css` — design tokens (cores, tipografia, espaçamento)
6. `src/styles/global.css` — estilos base mobile-first
7. Atualizar as 4 páginas stub para usar BaseLayout

---

## Riscos e pendências

| Item | Status |
|------|--------|
| Dados reais da Copa 2026 | Não inseridos — aguardar fase dedicada com fontes verificadas |
| Teams fictícios | Nomes claramente fictícios (Northland, Eastoria etc.) para evitar confusão |
| Slugs i18n de grupos | Slug único `m`/`n` — URL prefixo tratado pela rota da página |
| Fallback de live-data.json | Estrutura pronta — lógica de fallback implementada na Fase 8 |
| Domínio definitivo | Não definido — placeholder `PUBLIC_SITE_URL` |
| Google Analytics ID | Não disponível — placeholder |
| AdSense | Não disponível — placeholders nas fases futuras |
| Simulador | Fora do MVP — MVP 1.5 |

---

## Decisões técnicas registradas

| Decisão | Escolha |
|---------|---------|
| Framework | Astro 5.18.1 |
| CSS | CSS puro / CSS Modules |
| Hospedagem | Hostinger via `dist/` |
| Dados estruturais | `src/data/` (build time) |
| Dados vivos | `public/data/live-data.json` (fetch client-side, Fase 8) |
| Horários | UTC em todos os arquivos de dados |
| Tipo de partida | `confirmed`, `partial`, `simulation` |
| Identificadores | IDs: `match-001`; slugs: `northland`, `m` etc. |
| Strings localizadas | `LocalizedString { pt, en, es }` em todos os campos de texto |
