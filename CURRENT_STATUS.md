# CURRENT_STATUS.md — World Cup Games Today

**Última atualização:** 2026-05-07

---

## Status atual

**Fase concluída:** Fase 4 — Utilitários Principais
**Próxima fase:** Fase 5 — Home Page (pt-br)
**Aguardando:** Autorização do usuário para iniciar Fase 5

---

## O que foi feito

### Fase 0 ✅ — Meta / Setup do Processo
### Fase 1 ✅ — Bootstrap do Projeto Astro (Astro 5.18.1)
### Fase 2 ✅ — Camada de Dados (Mock)
### Fase 3 ✅ — Layout Base + CSS

### Fase 4 ✅ — Utilitários Principais

**Utilitários criados:**

**`src/utils/timezone.ts`**
- `isBrowser()` — detecta execução no navegador
- `isValidTimezone(tz)` — valida fuso IANA via Intl.DateTimeFormat
- `getBrowserTimezone()` — retorna fuso do navegador ou 'UTC' como fallback
- `getTimezoneLabel(tz)` — rótulo amigável com offset calculado via Intl (ex: "São Paulo (UTC-3)")
- `getPopularTimezones()` — lista de 70+ fusos agrupados por região (América do Sul, América do Norte, Europa, Ásia/Oceania, África, UTC)
- Interface `TimezoneOption` exportada
- Cobre múltiplos fusos para BR (9 fusos), US, MX, CA, AR, RU

**`src/utils/datetime.ts`**
- `utcToTimezone(utcDateString, timezone)` — converte UTC string para Date
- `formatDate(utcDateString, locale, timezone)` — data localizada via Intl.DateTimeFormat
- `formatTime(utcDateString, locale, timezone)` — hora localizada (24h para pt-br/es, 12h para en)
- `formatDateTime(utcDateString, locale, timezone)` — data e hora juntos ("11 jun. • 16:00")
- `formatWeekday(utcDateString, locale, timezone)` — dia da semana localizado
- `secondsUntil(utcDateString)` — segundos até a data alvo (negativo se passou)
- `formatCountdown(utcDateString, locale)` — contagem regressiva legível em pt-br/en/es
- `isToday(utcDateString, timezone)` — verifica se é hoje no fuso dado
- `isPast(utcDateString)` — verifica se a data já passou

**`src/utils/language.ts`**
- `detectBrowserLocale()` — detecta idioma do navegador (pt* → 'pt-br', es* → 'es', else → 'en')
- `isValidLocale(value)` — type guard para Locale
- `getLocaleName(locale)` — nome do idioma no próprio idioma
- `getHtmlLang(locale)` — código HTML lang (ex: 'pt-BR')
- `uiLabels` — labels de UI completos para pt-br/en/es (Header e Footer)

**`src/utils/storage.ts`**
- `savePreference(key, value)` — salva preferência específica
- `loadPreference(key)` — lê preferência específica (null se ausente/inválida)
- `savePreferences(prefs)` — salva várias preferências (merge)
- `loadPreferences()` — lê todas as preferências
- `clearPreferences()` — remove todas as preferências
- Interface `UserPreferences` exportada
- Chave localStorage: `'wcgt_prefs'`
- Sanitização e validação dos dados lidos (locale e timezone validados antes de retornar)

**`src/utils/matches.ts`**
- `getNextConfirmedMatch(matches, teamSlug)` — próximo jogo confirmado de uma seleção
- `getConfirmedMatchesByTeam(matches, teamSlug)` — todos os jogos confirmados de uma seleção
- `getTodaysMatches(matches, timezone)` — jogos de hoje (qualquer tipo)
- `getTodaysConfirmedMatches(matches, timezone)` — jogos confirmados de hoje
- `getTeamName(teams, teamSlug, locale)` — nome localizado de uma seleção
- `isMatchLive(matchId, liveStatuses)` — verifica se jogo está ao vivo via live-data
- `sortMatchesByDate(matches)` — ordena por data UTC (ascending, sem mutar original)
- `filterMatchesByPhase(matches, phase)` — filtra por fase

**`src/utils/analytics.ts`**
- `trackEvent(eventName, params?)` — evento genérico (no-op se gtag ausente ou ID vazio)
- `trackTimezoneChange(fromTz, toTz)` — troca de fuso
- `trackLocaleChange(fromLocale, toLocale)` — troca de idioma
- `trackTeamSelect(teamSlug)` — seleção de time favorito
- `trackShareClick(method)` — clique em compartilhamento
- `trackMatchView(matchId)` — visualização de partida
- Script GA não carregado ainda — será feito na Fase 12

**Validação:**
- `npm run build`: ✅ 4 páginas geradas sem erros, zero TypeScript errors

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

## Arquivos criados/alterados na Fase 2

| Arquivo | Ação |
|---------|------|
| `src/types/index.ts` | Criado (atualizado na Fase 3) |
| `src/data/teams.json` | Criado (atualizado na Fase 3) |
| `src/data/matches.json` | Criado (atualizado na Fase 3) |
| `src/data/groups.json` | Criado (atualizado na Fase 3) |
| `src/data/overrides.json` | Criado |
| `public/data/live-data.json` | Criado |
| `public/data/live-data.example.json` | Criado |

---

## Próximos passos (Fase 5)

Fase 5 — Home Page (pt-br):
1. `src/pages/pt-br/index.astro` — página home completa em português
2. `src/components/TimezoneSelector.astro` — exibir fuso + botão de troca manual
3. `src/components/TeamSelector.astro` — seleção favorita + busca
4. `src/components/NextMatchCard.astro` — próximo jogo confirmado + contagem regressiva
5. `src/components/MatchList.astro` — lista de jogos com horário convertido
6. `src/components/TodayMatches.astro` — seção de jogos do dia
7. `src/components/ShareButtons.astro` — WhatsApp, copiar link, calendário
8. `src/components/AdPlaceholder.astro` — placeholder de anúncio
9. Seção de texto/FAQ para SEO

---

## Riscos e pendências

| Item | Status |
|------|--------|
| Dados reais da Copa 2026 | Não inseridos — aguardar fase dedicada com fontes verificadas |
| Teams fictícios | Nomes claramente fictícios (Northland, Eastoria etc.) |
| Slugs i18n de grupos | Slug único `m`/`n` — URL prefixo tratado pela rota da página |
| Fallback de live-data.json | Estrutura pronta — lógica de fallback implementada na Fase 8 |
| Domínio definitivo | Não definido — placeholder `PUBLIC_SITE_URL` |
| Google Analytics ID | Não disponível — placeholder |
| AdSense | Não disponível — placeholders nas fases futuras |
| Simulador | Fora do MVP — MVP 1.5 |
| Nav links para páginas futuras | Apontam para paths esperados (ex: /pt-br/jogos-de-hoje-copa) — páginas criadas na Fase 5/6 |
| Script GA | Não carregado — analytics.ts tem stubs prontos, script será injetado na Fase 12 |

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
