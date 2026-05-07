# CURRENT_STATUS.md — World Cup Games Today

**Última atualização:** 2026-05-07

---

## Status atual

**Fase concluída:** Fase 6A — Jogos de Hoje (pt-br)
**Próxima fase:** Fase 6B — Tabela da Copa 2026 (pt-br)
**Aguardando:** Autorização do usuário para iniciar Fase 6B

---

## O que foi feito

### Fase 0 ✅ — Meta / Setup do Processo
### Fase 1 ✅ — Bootstrap do Projeto Astro (Astro 5.18.1)
### Fase 2 ✅ — Camada de Dados (Mock)
### Fase 3 ✅ — Layout Base + CSS
### Fase 4 ✅ — Utilitários Principais

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
