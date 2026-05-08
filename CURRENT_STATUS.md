# CURRENT_STATUS.md — World Cup Games Today

**Última atualização:** 2026-05-07

---

## Status atual

**Fase concluída:** Fase 6E1 — Páginas Individuais por Jogo (pt-br) — rota dinâmica SSG
**Próxima fase:** Fase 6E2 — Calendário da Copa 2026 (pt-br)
**Aguardando:** Autorização do usuário para iniciar Fase 6E2

---

## Fase 6E1 ✅ — Páginas Individuais por Jogo (pt-br) — rota dinâmica SSG

**Arquivo criado:**

**`src/pages/pt-br/jogos/[id].astro`**
- Rota dinâmica SSG com `getStaticPaths()` — terceiro uso no projeto (padrão já consolidado)
- Gera uma página estática por cada partida em `matches.json` (11 partidas = 11 páginas)
- Cast correto dos dados: `(matchesData as { matches: Match[] }).matches`
- `getStaticPaths()` retorna `{ params: { id: match.id }, props: { match } }` por partida
- Campo real de data/hora: `datetime_utc` (não `date_utc`) — confirmado antes de usar
- Times resolvidos via `allTeams.find(t => t.id === match.home_team_id)` — campo `home_team_id`/`away_team_id`
- Grupos resolvidos via `allGroups.find(g => g.id === match.group || g.slug === match.group.toLowerCase())`
- Estádio, cidade e país exibidos via `LocalizedString['pt-br']` com fallback `['en']`
- `phaseLabels` mapeamento completo dos valores reais do tipo `MatchPhase`: `group_stage`, `round_of_32`, `round_of_16`, `quarterfinal`, `semifinal`, `third_place`, `final`
- Tratamento diferenciado por tipo de partida:
  - `confirmed`: times reais, links para seleções, SEO contextualizado
  - `partial`: "A definir" nos dois lados, aviso `.partial-warning`
  - `simulation`: aviso `.simulation-warning`, rotulado como simulação
- `confirmed` nunca exibe como `partial` ou vice-versa — regras respeitadas
- `partial` exibe aviso azul (cor scheduled) — não vermelho nem verde
- `simulation` exibe aviso neutro (fundo alt, borda border)
- Card de detalhes com `<dl>/<dt>/<dd>` semântico: Fase, Data, Horário, Faltam, Estádio, Cidade, Jogo nº
- `countdownText` somente exibido se a partida NÃO passou ainda (`!isPast(match.datetime_utc)`)
- `AdPlaceholder` posicionado após o card de detalhes, nunca antes do conteúdo principal
- Links para seleções via `.team-links-grid` (grid 2col desktop, 1col mobile ≤480px)
- Links internos: Home, Tabela, Jogos de hoje, e link condicional para o grupo (se existir)
- CSS scoped: `.match-hero`, `.match-confronto`, `.team-name`, `.match-vs`, `.match-phase-label`, `.partial-warning`, `.simulation-warning`, `.match-detail-card`, `.match-info-list`, `.match-info-row`, `.match-team-links`, `.team-links-grid`, `.team-link-card`, `.internal-links`, `.share-section`
- Responsividade: breakpoints 480px (team-links-grid 1col, team-name xl), 768px (team-name 3xl, h2 maiores)
- Compatível com SSG: zero API de browser no frontmatter
- Build: 27 páginas geradas sem erros, zero TypeScript errors

**Páginas de jogo geradas (11):**
- `/pt-br/jogos/match-001/index.html` (Northland x Eastoria — Fase de Grupos)
- `/pt-br/jogos/match-002/index.html` (Westmark x Southmore — Fase de Grupos)
- `/pt-br/jogos/match-003/index.html` (Highpeak x Lowvale — Fase de Grupos)
- `/pt-br/jogos/match-004/index.html` (Bayshore x Ridgemont — Fase de Grupos)
- `/pt-br/jogos/match-005/index.html` (Northland x Westmark — Fase de Grupos)
- `/pt-br/jogos/match-006/index.html` (Eastoria x Southmore — Fase de Grupos)
- `/pt-br/jogos/match-007/index.html` (Highpeak x Bayshore — Fase de Grupos)
- `/pt-br/jogos/match-008/index.html` (Lowvale x Ridgemont — Fase de Grupos)
- `/pt-br/jogos/match-009/index.html` (Parcial — Rodada de 32)
- `/pt-br/jogos/match-010/index.html` (Parcial — Semifinal)
- `/pt-br/jogos/match-011/index.html` (Parcial — Final)

---

## Arquivos criados/alterados na Fase 6E1

| Arquivo | Ação |
|---------|------|
| `src/pages/pt-br/jogos/[id].astro` | Criado |

---

## Fase 6D ✅ — Página por Grupo (pt-br) — rota dinâmica SSG

**Arquivo criado:**

**`src/pages/pt-br/grupos/[grupo].astro`**
- Rota dinâmica SSG com `getStaticPaths()` — segundo uso no projeto (padrão já estabelecido na 6C)
- Gera uma página estática por cada grupo em `groups.json` (2 grupos = 2 páginas)
- Cast correto dos dados: `(groupsData as { groups: Group[] }).groups`
- `getStaticPaths()` retorna `{ params: { grupo: group.slug }, props: { group } }` por grupo
- Times do grupo resolvidos via `allTeams.filter(t => group.team_ids.includes(t.id))` — campo real é `team_ids`, não `teams`
- Jogos confirmados filtrados: `m.type === 'confirmed'` e `home_team_id` ou `away_team_id` no grupo
- Estrutura da página: hero do grupo → aviso MOCK → classificação (GroupTable) → seleções do grupo → jogos confirmados → AdPlaceholder → links internos → compartilhar → texto SEO
- `GroupTable.astro` reutilizado obrigatoriamente (criado na Fase 6B)
- Mock standings inline: mesmos valores usados em `tabela-copa-2026.astro` para consistência
- Jogos parciais: não exibidos (sem vínculo explícito de grupo nos parciais do mock) — consistente com decisão da Fase 6C
- `AdPlaceholder` posicionado após o conteúdo principal, nunca antes
- Lista de seleções com links para `/pt-br/selecoes/[slug]` — pill-style com flag + nome
- CSS scoped na página: `.group-table-section`, `.group-teams-section`, `.group-teams-list`, `.group-matches-section`, `.internal-links`
- Responsividade: breakpoints 480px (internal-links inline), 768px (h2 maiores)
- Compatível com SSG: zero API de browser no frontmatter
- Build: 16 páginas geradas sem erros, zero TypeScript errors

**Páginas de grupo geradas:**
- `/pt-br/grupos/m/index.html` (Grupo M — Northland, Eastoria, Westmark, Southmore)
- `/pt-br/grupos/n/index.html` (Grupo N — Highpeak, Lowvale, Bayshore, Ridgemont)

---

## Arquivos criados/alterados na Fase 6D

| Arquivo | Ação |
|---------|------|
| `src/pages/pt-br/grupos/[grupo].astro` | Criado |

---

---

## Correção aplicada em 2026-05-07 — Página de seleção: remoção de parciais genéricos

**Problema corrigido:** A seção "Fase Eliminatória — Vagas a Definir" exibia todos os jogos parciais
do mock (`match-009`, `match-010`, `match-011`) em todas as páginas de seleção, independentemente
de haver vínculo explícito entre o jogo parcial e aquela seleção.

**Regra adotada:** Jogos parciais genéricos (com `home_team_id: null` e `away_team_id: null`)
nunca devem ser exibidos na página de uma seleção específica. Apenas jogos com vínculo explícito
ao time poderiam ser exibidos — e, com dados mock genéricos, esse vínculo não existe.

**Solução implementada:**
- Removida a variável `partialMatches` do frontmatter
- Removida a importação de `sortMatchesByDate` (não mais utilizada)
- Removida a seção condicional `{partialMatches.length > 0 && (...)}` do template
- Substituída por bloco estático `.next-phases-info` com texto informativo apenas:
  "Os possíveis jogos das fases eliminatórias serão exibidos quando a classificação
  da fase de grupos estiver definida."
- Estilos `.partial-section` e `.partial-note` substituídos por `.next-phases-info` e `.next-phases-note`
- Referência a `.partial-section h2` no breakpoint `768px` atualizada para `.next-phases-info h2`

**Arquivos alterados:**

| Arquivo | Ação |
|---------|------|
| `src/pages/pt-br/selecoes/[slug].astro` | Corrigido — parciais removidos, bloco informativo inserido |
| `src/utils/matches.ts` | Adicionado comentário `// TODO` para função futura de parciais com vínculo explícito |

**Validação:**
- `npm run build`: 14 páginas geradas sem erros, zero TypeScript errors
- Nenhuma página de seleção lista jogos parciais genéricos
- Parcial nunca tratado como confirmado
- Nenhuma seleção sugerida como classificada para fase futura sem confirmação

---

## O que foi feito

### Fase 0 ✅ — Meta / Setup do Processo
### Fase 1 ✅ — Bootstrap do Projeto Astro (Astro 5.18.1)
### Fase 2 ✅ — Camada de Dados (Mock)
### Fase 3 ✅ — Layout Base + CSS

### Fase 6C ✅ — Página por Seleção (pt-br) — rota dinâmica SSG

**Arquivo criado:**

**`src/pages/pt-br/selecoes/[slug].astro`**
- Rota dinâmica SSG com `getStaticPaths()` — primeiro uso no projeto
- Gera uma página estática por cada time em `teams.json` (8 seleções = 8 páginas)
- Cast correto dos dados: `(teamsData as { teams: Team[] }).teams`
- `getStaticPaths()` retorna `{ params: { slug }, props: { team } }` por time
- Grupo da seleção resolvido via `allGroups.find(g => g.team_ids.includes(team.slug))`
- Nome do grupo e da seleção resolvidos no locale `pt-br` com fallback para `en`
- Estrutura da página: hero da seleção → aviso MOCK → próximo jogo → AdPlaceholder → todos os jogos confirmados → jogos parciais (se houver) → links internos → compartilhar → texto SEO
- `NextMatchCard` recebe `match={nextMatch}` (null seguro — trata o caso de sem próximo jogo)
- `MatchList` de confirmados usa `getConfirmedMatchesByTeam()` — nunca inclui `partial` ou `simulation`
- `MatchList` de parciais usa `allMatches.filter(m => m.type === 'partial')` — mostra todos os parciais com nota explicativa
- `partialMatches` só é renderizado se `partialMatches.length > 0`
- `AdPlaceholder` posicionado após o próximo jogo, nunca antes do conteúdo principal
- CSS scoped na página: `.team-hero`, `.team-group`, `.next-match-section`, `.team-matches-section`, `.partial-section`, `.partial-note`, `.internal-links`, `.share-section`
- Responsividade: breakpoints 480px (internal-links inline), 768px (h2 maior)
- Compatível com SSG: zero API de browser no frontmatter
- Build: 14 páginas geradas sem erros, zero TypeScript errors

**Páginas de seleção geradas:**
- `/pt-br/selecoes/northland/index.html`
- `/pt-br/selecoes/eastoria/index.html`
- `/pt-br/selecoes/westmark/index.html`
- `/pt-br/selecoes/southmore/index.html`
- `/pt-br/selecoes/highpeak/index.html`
- `/pt-br/selecoes/lowvale/index.html`
- `/pt-br/selecoes/bayshore/index.html`
- `/pt-br/selecoes/ridgemont/index.html`

---

## Arquivos criados/alterados na Fase 6C

| Arquivo | Ação |
|---------|------|
| `src/pages/pt-br/selecoes/[slug].astro` | Criado |

---
### Fase 4 ✅ — Utilitários Principais

### Fase 6B ✅ — Tabela da Copa 2026 (pt-br)

**Componente criado:**

**`src/components/GroupTable.astro`**
- Props: `group` (Group), `standings` (StandingEntry[]), `teams` (Team[]), `locale` (Locale)
- Tabela responsiva com scroll horizontal via `.table-wrapper { overflow-x: auto }`
- Colunas: # | Seleção | J | V | E | D | GP | GC | SG | Pts
- SG calculado no componente: `goals_for - goals_against`
- Ordenação: Pts desc > SG desc > GP desc
- Linha do líder destacada com fundo `#eff6ff`
- Badge "MOCK" discreto no cabeçalho do grupo
- Nome do time resolvido via `teams.find(t => t.id === entry.team_id)` + locale
- Flag emoji exibida à esquerda do nome
- min-width: 480px na tabela (evita esmagamento em mobile)
- CSS scoped no componente — sem dependências externas
- Compatível com SSG (zero lógica de browser no frontmatter)
- Será reutilizado obrigatoriamente na Fase 6D (página por grupo)

**Página criada:**

**`src/pages/pt-br/tabela-copa-2026.astro`**
- URL gerada: `/pt-br/tabela-copa-2026/index.html`
- Estrutura: hero, aviso MOCK, classificação por grupo, AdPlaceholder (após classificação), jogos confirmados da fase de grupos, jogos parcialmente definidos (seção separada com borda tracejada), links internos, ShareButtons, texto SEO
- Mock standings inline com tipo correto (snake_case: team_id, goals_for, goals_against, points)
- Separação estrita: `confirmed` e `partial` nunca misturados; `simulation` nunca exibido
- Fuso padrão: `America/Sao_Paulo`
- CSS scoped na página para: `.groups-section`, `.group-block`, `.schedule-section`, `.partial-section`, `.partial-note`, `.internal-links`

**`src/styles/global.css`** — não alterado (estilos de página foram feitos com CSS scoped na própria página)

**Validação:**
- `npm run build`: 6 páginas geradas sem erros, zero TypeScript errors
- `dist/pt-br/tabela-copa-2026/index.html`: gerado corretamente
- Páginas totais: `/index.html`, `/pt-br/index.html`, `/en/index.html`, `/es/index.html`, `/pt-br/jogos-de-hoje-copa/index.html`, `/pt-br/tabela-copa-2026/index.html`

---

## Arquivos criados/alterados na Fase 6B

| Arquivo | Ação |
|---------|------|
| `src/components/GroupTable.astro` | Criado |
| `src/pages/pt-br/tabela-copa-2026.astro` | Criado |

---

### Fase 6A ✅ — Jogos de Hoje (pt-br)

**Página criada:**

**`src/pages/pt-br/jogos-de-hoje-copa.astro`**
- URL gerada: `/pt-br/jogos-de-hoje-copa/index.html`
- Estrutura: hero com h1 SEO, aviso MOCK, TimezoneSelector, resumo do dia, TodayMatches, AdPlaceholder (após conteúdo), ShareButtons, texto SEO
- Fuso padrão: `America/Sao_Paulo` (sobrescrito pelo cliente via localStorage)
- Nenhum componente novo criado — usa exclusivamente componentes existentes
- Cast dos dados: `(matchesData as { matches: Match[] }).matches` (consistente com home)

**`src/styles/global.css`** (atualizado)
- `.page-hero`: hero para páginas internas (sem height mínima obrigatória), responsivo
- `.timezone-row`: margem inferior para separação visual
- `.day-summary`: caixa com fundo `--color-bg-alt`, texto médio com peso semibold
- `.today-section`: espaçamento de seção
- `.share-section`: mesma estrutura da classe `.share` da home, com h2 responsivo

**Validação:**
- `npm run build`: 5 páginas geradas sem erros, zero TypeScript errors
- `dist/pt-br/jogos-de-hoje-copa/index.html`: gerado corretamente

---

## Arquivos criados/alterados na Fase 6A

| Arquivo | Ação |
|---------|------|
| `src/pages/pt-br/jogos-de-hoje-copa.astro` | Criado |
| `src/styles/global.css` | Atualizado (estilos `.page-hero`, `.timezone-row`, `.day-summary`, `.today-section`, `.share-section`) |

---

### Fase 5 ✅ — Home Page (pt-br)

**Componentes criados:**

**`src/components/AdPlaceholder.astro`**
- Props: `slot` ('top' | 'middle' | 'bottom' | 'sidebar'), `label`
- Visual: caixa com borda tracejada, fundo cinzento claro
- Min-height: 90px mobile, 250px para sidebar
- Nunca aparece antes do conteúdo principal
- Usa `aria-hidden="true"` e `role="presentation"` (não é conteúdo)

**`src/components/TimezoneSelector.astro`**
- Props: `currentTimezone`, `locale`, `displayLabel`
- Exibe fuso atual com label amigável via `getTimezoneLabel()`
- Select com todos os fusos de `getPopularTimezones()`
- Botão "Trocar fuso" salva no localStorage (`wcgt_prefs.timezone`) e recarrega
- Lê preferência salva ao carregar para manter seleção do usuário
- Toda lógica de window/localStorage em `<script>` com guard `typeof window`

**`src/components/TeamSelector.astro`**
- Props: `teams`, `selectedTeamSlug`, `locale`
- Dropdown com todos os times + emoji de flag
- Botão "Aplicar" salva no localStorage (`wcgt_prefs.team`) e recarrega
- Lê preferência salva ao carregar
- Toda lógica de window/localStorage em `<script>` com guard

**`src/components/NextMatchCard.astro`**
- Props: `match` (Match | null), `teams`, `timezone`, `locale`
- Quando match existe: times, data/hora no fuso, estádio/cidade, fase, contagem regressiva
- Contagem regressiva calculada em build time (string estática)
- Badge "MOCK DATA" discreto
- Borda lateral colorida com `var(--color-accent)`
- Quando null: mensagem "Nenhum jogo confirmado disponível."

**`src/components/MatchList.astro`**
- Props: `matches`, `teams`, `timezone`, `locale`, `title`, `emptyMessage`
- Filtra partidas do tipo `simulation` (nunca exibe)
- `confirmed`: times reais, data/hora, estádio, fase, badge MOCK
- `partial`: labels de vaga, badge "Vaga não definida" + MOCK
- Exibe fase e grupo na header de cada item

**`src/components/TodayMatches.astro`**
- Props: `matches`, `teams`, `timezone`, `locale`
- Filtra internamente com `getTodaysConfirmedMatches()`
- Delega renderização para `MatchList`

**`src/components/ShareButtons.astro`**
- Props: `matchId`, `matchTitle`, `locale`
- WhatsApp: link `wa.me/?text=` com texto pré-formatado, target="_blank" rel="noopener noreferrer"
- Copiar link: Clipboard API com fallback para input temporário + feedback visual "Copiado!"
- Google Calendar: link base para eventedit
- URL do WhatsApp atualizada no cliente para refletir a URL real da página

**`src/pages/pt-br/index.astro`** (reescrita completa)
- Importa dados de `src/data/matches.json` e `src/data/teams.json`
- Usa `getNextConfirmedMatch`, `getTodaysConfirmedMatches`, `getConfirmedMatchesByTeam`
- Fuso padrão: `America/Sao_Paulo` (sobrescrito pelo cliente via localStorage)
- Seleção padrão: `northland`
- Estrutura: hero → aviso mock → seletores → próximo jogo → anúncio → jogos de hoje → jogos da seleção → compartilhar → texto SEO

**`src/styles/global.css`** (atualizado)
- `.mock-warning`: fundo amarelo claro, borda amarela
- `.hero h1`: responsivo (2xl mobile, 3xl desktop)
- `.selectors`: column em mobile, row em desktop
- `.next-match`, `.today-matches`, `.team-matches`, `.share`, `.seo-text`: margin e espaçamento

**Validação:**
- `npm run build`: ✅ 4 páginas geradas sem erros, zero TypeScript errors
- `dist/index.html` ✅
- `dist/pt-br/index.html` ✅
- `dist/en/index.html` ✅
- `dist/es/index.html` ✅

---

## Arquivos criados/alterados na Fase 5

| Arquivo | Ação |
|---------|------|
| `src/components/AdPlaceholder.astro` | Criado |
| `src/components/TimezoneSelector.astro` | Criado |
| `src/components/TeamSelector.astro` | Criado |
| `src/components/NextMatchCard.astro` | Criado |
| `src/components/MatchList.astro` | Criado |
| `src/components/TodayMatches.astro` | Criado |
| `src/components/ShareButtons.astro` | Criado |
| `src/pages/pt-br/index.astro` | Reescrito (fase 5 completa) |
| `src/styles/global.css` | Atualizado (estilos home page) |

---

## Arquivos criados na Fase 4

| Arquivo | Ação |
|---------|------|
| `src/utils/timezone.ts` | Criado |
| `src/utils/datetime.ts` | Criado |
| `src/utils/language.ts` | Criado |
| `src/utils/storage.ts` | Criado |
| `src/utils/matches.ts` | Criado |
| `src/utils/analytics.ts` | Criado |

---

## Arquivos criados/alterados na Fase 3

| Arquivo | Ação |
|---------|------|
| `src/types/index.ts` | Alterado — Locale: 'pt-br', LocalizedString: campo 'pt-br' |
| `src/data/teams.json` | Alterado — chave 'pt' → 'pt-br' em todos os name |
| `src/data/matches.json` | Alterado — chave 'pt' → 'pt-br' em stadium/city/country/labels |
| `src/data/groups.json` | Alterado — chave 'pt' → 'pt-br' em name |
| `src/styles/reset.css` | Criado |
| `src/styles/variables.css` | Criado |
| `src/styles/global.css` | Criado |
| `src/layouts/BaseLayout.astro` | Criado |
| `src/components/Header.astro` | Criado |
| `src/components/Footer.astro` | Criado |
| `src/pages/index.astro` | Alterado — usa BaseLayout |
| `src/pages/pt-br/index.astro` | Alterado — usa BaseLayout |
| `src/pages/en/index.astro` | Alterado — usa BaseLayout |
| `src/pages/es/index.astro` | Alterado — usa BaseLayout |

---

## Planejamento da Fase 6 — Subdivisão em subfases (concluído em 2026-05-07)

A Fase 6 original foi subdividida em 5 subfases sequenciais para reduzir risco por sessão
e tornar cada unidade de trabalho executável por um agente em uma única sessão.

### Fase 6A — Jogos de Hoje
- Página: `src/pages/pt-br/jogos-de-hoje-copa.astro`
- Componentes novos: nenhum
- Reutiliza: TodayMatches, MatchList, TimezoneSelector, ShareButtons, AdPlaceholder
- Complexidade: baixa

### Fase 6B — Tabela da Copa 2026
- Página: `src/pages/pt-br/tabela-copa-2026.astro`
- Componentes novos: `GroupTable.astro` (tabela de classificação por grupo)
- Reutiliza: AdPlaceholder, ShareButtons
- Complexidade: média
- Nota: `GroupTable.astro` gerado aqui é pré-requisito para Fase 6D

### Fase 6C — Página por Seleção
- Página: `src/pages/pt-br/selecoes/[slug].astro` (rota dinâmica SSG)
- Componentes novos: `TeamHeader.astro`
- Reutiliza: MatchList, NextMatchCard, ShareButtons, AdPlaceholder
- Complexidade: média-alta (primeira rota dinâmica do projeto)
- Não depende de 6A nem 6B

### Fase 6D — Página por Grupo
- Página: `src/pages/pt-br/grupos/[grupo].astro` (rota dinâmica SSG)
- Componentes novos: nenhum
- Reutiliza: GroupTable (DE 6B), MatchList, AdPlaceholder, ShareButtons
- Complexidade: média
- DEPENDE DA FASE 6B (GroupTable.astro obrigatório)

### Fase 6E — Página por Jogo + Calendário
- Páginas: `src/pages/pt-br/jogo/[id].astro` + `src/pages/pt-br/calendario-copa-2026.astro`
- Componentes novos: `MatchDetail.astro` (inclui SportsEvent JSON-LD)
- Reutiliza: ShareButtons, MatchList, AdPlaceholder, TimezoneSelector
- Complexidade: alta (página mais rica do projeto — schema, placar ao vivo, links cruzados)
- Recomenda-se executar após 6C e 6D

Ordem obrigatória: 6A → 6B → 6C → 6D → 6E

---

## Próximos passos (Fase 6A)

1. Criar `src/pages/pt-br/jogos-de-hoje-copa.astro`
2. Estrutura: hero com h1 específico para SEO, seletor de fuso, `TodayMatches`, anúncio, FAQ/texto SEO
3. Aguardar autorização antes de iniciar

---

## Riscos e pendências

| Item | Status |
|------|--------|
| Dados reais da Copa 2026 | Não inseridos — aguardar fase dedicada com fontes verificadas |
| Teams fictícios | Nomes claramente fictícios (Northland, Eastoria etc.) |
| Fuso detectado no cliente | Build estático usa `America/Sao_Paulo` — JS do cliente lê localStorage e pode sobrescrever visualmente (requer reload) |
| Contagem regressiva em tempo real | Estática no build (aceitável no MVP) — JS dinâmico em fase futura |
| Fallback de live-data.json | Estrutura pronta — lógica de fallback implementada na Fase 8 |
| Domínio definitivo | Não definido — placeholder `PUBLIC_SITE_URL` |
| Google Analytics ID | Não disponível — placeholder |
| AdSense | Não disponível — placeholders nas fases futuras |
| Simulador | Fora do MVP — MVP 1.5 |
| Nav links para páginas futuras | Apontam para paths esperados (ex: /pt-br/jogos-de-hoje-copa) — páginas criadas nas subfases 6A–6E |
| Script GA | Não carregado — analytics.ts tem stubs prontos, script será injetado na Fase 12 |
| GroupTable.astro | Componente pendente — criar na Fase 6B (pré-requisito para Fase 6D) |
| Rotas dinâmicas SSG | Primeiro uso de getStaticPaths() ocorrerá na Fase 6C — risco gerenciado por ser a terceira subfase |

---

## Decisões técnicas registradas

| Decisão | Escolha |
|---------|---------|
| Framework | Astro 5.18.1 |
| CSS | CSS puro / CSS Modules — reset + variables + global |
| Hospedagem | Hostinger via `dist/` |
| Dados estruturais | `src/data/` (build time) |
| Dados vivos | `public/data/live-data.json` (fetch client-side, Fase 8) |
| Horários | UTC em todos os arquivos de dados |
| Tipo de partida | `confirmed`, `partial`, `simulation` |
| Locale | `'pt-br' | 'en' | 'es'` (consistente com rotas) |
| LocalizedString | Campo `pt-br` (não `pt`) para consistência com locale |
| Identificadores | IDs: `match-001`; slugs: `northland`, `m` etc. |
| Nav mobile | Links em linha abaixo do header, sem hamburger (suficiente para MVP) |
| localStorage key | `'wcgt_prefs'` (objeto JSON unificado) |
| Fusos BR | 9 fusos cobertos: SP, Manaus, Fortaleza, Recife, Belém, Porto Velho, Boa Vista, Rio Branco, Noronha |
| Contagem regressiva | Calculada em build time — string estática (sem setInterval no MVP) |
| Scripts client-side | Sempre em `<script>` com guard `typeof window !== 'undefined'` |
