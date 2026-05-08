# CURRENT_STATUS.md — World Cup Games Today

**Última atualização:** 2026-05-08

---

## Status atual

**Fase concluída:** Fase 8 — live-data fetch client-side + fallback CONCLUIDA ✅
**Próxima fase:** Fase 9 — Internacionalização (en + es)
**Aguardando:** Autorização do usuário para iniciar Fase 9

---

## Fase 8 — live-data fetch client-side + fallback ✅

### Arquivos criados/alterados

| Arquivo | Ação |
|---------|------|
| `src/utils/liveData.ts` | Criado — utilitário de fetch, validação e acesso ao live-data.json |
| `src/components/LiveMatchStatus.astro` | Criado — componente Island para status e placar ao vivo |
| `src/pages/pt-br/jogos/[id].astro` | Atualizado — integra LiveMatchStatus na seção "Status da Partida" |
| `src/components/MatchList.astro` | Atualizado — exibe badge de status ao vivo em cada item da lista |

### O que foi implementado

**`src/utils/liveData.ts`** (novo)
- Interface `LiveMatchData` e `LiveData` já existiam em `src/types/index.ts` — reutilizadas sem duplicação
- Função `fetchLiveData(): Promise<LiveData | null>` — fetch com timeout (8s) via AbortController; retorna null em qualquer falha (404, JSON malformado, rede offline, timeout)
- `isValidLiveData()` (privada) — valida estrutura mínima: objeto, campo `matches` é Record não-array, cada entrada tem `status` string
- Guard `typeof window === 'undefined'` — nunca executa fora do browser
- Guard `navigator.onLine === false` — fallback imediato quando offline
- Cache: `cache: 'no-cache'` no fetch — respeita recomendação de curta duração
- Função `getLiveMatchData(liveData, matchId)` — busca entrada por matchId, valida antes de retornar
- Função `getStatusLabel(status, locale)` — retorna rótulo localizado para pt-br / en / es

**`src/components/LiveMatchStatus.astro`** (novo)
- Props: `matchId: string`, `matchType?: 'confirmed' | 'partial' | 'simulation'`, `defaultStatus?: string`, `locale?: string`
- Renderização server-side: placeholder estático (`defaultStatus` → label localizado)
- Atributos `data-*` no container: `data-match-id`, `data-match-type`, `data-locale`, `data-can-show-score`, `data-is-simulation`
- `simulation` renderiza badge estático "Simulação" sem script de atualização
- `<script>` global (sem `define:vars`) — descobre todos os containers `[data-match-id]` na página
- Cache em memória (`liveDataCache`) — fetch feito uma única vez por página, mesmo com múltiplos componentes
- Timeout 8s via `AbortController` + `setTimeout`; fallback silencioso em qualquer erro
- `updateContainer()` — atualiza classe CSS, texto do badge, minuto (para `live`), placar (somente `confirmed` + `live`/`finished`)
- Badge pulsante para `live`: `.live-status__dot` com animação `live-pulse`
- Placar (`data-score-display`) — oculto por padrão (`display:none`); exibido apenas quando há scores
- CSS scoped: badges por status (scheduled azul, live verde, finished cinza, postponed amarelo, cancelled vermelho, simulation neutro)

**Integração em `src/pages/pt-br/jogos/[id].astro`**
- Importa `LiveMatchStatus`
- Seção `<!-- STATUS AO VIVO -->` renderizada apenas se `match.type !== 'simulation'`
- `LiveMatchStatus` recebe `matchId={match.id}`, `matchType`, `defaultStatus="scheduled"`, `locale="pt-br"`
- CSS scoped adicionado: `.live-status-section`, `.live-status-row`

**Integração em `src/components/MatchList.astro`**
- Importa `LiveMatchStatus`
- Badge `LiveMatchStatus` adicionado ao bloco `.match-item__badges` — apenas para `confirmed` e `partial`
- Placar não exibido na lista (somente na página individual de jogo)
- `simulation` já filtrado por `displayMatches` — nunca chega ao badge

### Regras respeitadas
- `simulation` nunca recebe dados vivos — verificado via `data-is-simulation` no script
- `partial` não exibe placar — `data-can-show-score=false`
- `confirmed` pode exibir placar quando `live` ou `finished` com scores válidos
- Fallback silencioso em 100% dos cenários de falha (404, JSON inválido, timeout, offline)
- Nenhuma página quebra por erro no live-data
- SEO estático não alterado (meta tags, title, description, schema intactos)
- Build estático independente do live-data.json — nenhuma página depende do fetch para renderização
- Guards obrigatórios: `typeof window`, `typeof fetch`, `navigator.onLine`
- Zero dependências novas (sem npm install)
- `npm run build` passa sem erros: 29 páginas geradas

### Documentação de cache (live-data.json)
O arquivo `public/data/live-data.json` deve ter cache de curta duração para evitar dados desatualizados:
- **Recomendação:** `Cache-Control: no-cache` ou `Cache-Control: max-age=60`
- **Hostinger:** configurar via `.htaccess` com `<Files "live-data.json">` + `Header set Cache-Control "no-cache, must-revalidate"`
- **Cloudflare (se ativado):** criar regra de Page Rule para `*/data/live-data.json` com "Cache Level: Bypass" ou TTL de 60s
- **NÃO configurar agora** — pendência para fase de infraestrutura / pre-launch checklist
- O fetch no cliente já usa `cache: 'no-cache'` para evitar cache do browser

### Validação
- `npm run build`: 29 páginas geradas sem erros ✅
- Zero erros TypeScript ✅
- Nenhuma página nova gerada (Fase 8 é integração em páginas existentes) ✅
- Total de páginas: 29 (sem alteração)

---

## Fase 7B — Google Calendar + download `.ics` ✅

### Arquivos criados/alterados

| Arquivo | Ação |
|---------|------|
| `src/utils/calendar.ts` | Criado — utilitários de integração com Google Calendar e geração de .ics |
| `src/components/CalendarButtons.astro` | Criado — botões de Google Calendar e download .ics |
| `src/pages/pt-br/jogos/[id].astro` | Atualizado — integra CalendarButtons na seção "Adicionar ao calendário" |

### O que foi feito

**`src/utils/calendar.ts`** (novo)
- Interface `CalendarEventData` com `id`, `matchType`, `summary`, `description`, `location`, `dtstart`, `durationMinutes`, `pageUrl`
- `toGoogleCalendarDate()` — converte ISO UTC para `YYYYMMDDTHHMMSSZ` (formato Google Calendar)
- `buildGoogleCalendarUrl()` — gera link `https://calendar.google.com/calendar/r/eventedit` com parâmetros `text`, `dates`, `details`, `location`; calcula DTEND = DTSTART + 120 min; seguro para Node (build time)
- `toICSDate()` — converte ISO UTC para formato ICS (`YYYYMMDDTHHMMSSZ`)
- `nowICSDate()` — gera DTSTAMP atual no formato ICS
- `buildICSContent()` — gera conteúdo completo `.ics` (RFC 5545): VCALENDAR, VEVENT com UID estável (`{id}@worldcupgamestoday.com`), DTSTAMP, DTSTART, DTEND, SUMMARY, DESCRIPTION, LOCATION; linhas separadas por `\r\n`
- `escapeICS()` (privada) — escapa `\`, `;`, `,`, `\n` e remove `\r` conforme RFC 5545
- `downloadICS()` — download no browser via `Blob` + `URL.createObjectURL`; guard `typeof window`/`typeof document`; retorna `false` se fora do browser
- `buildCalendarEventData()` — constrói `CalendarEventData` a partir dos dados da página de jogo:
  - `confirmed`: título "HomeTeam x AwayTeam — Copa 2026", descrição com nomes reais
  - `partial`: título "Partida a definir — Copa 2026", descrição sem inventar seleções
  - `simulation`/outros: título genérico "Copa do Mundo 2026"

**`src/components/CalendarButtons.astro`** (novo)
- Props: `matchId`, `matchType`, `homeTeamName?`, `awayTeamName?`, `datetimeUtc`, `locationStr?`, `pageUrl?`, `locale?`
- Regra crítica: `simulation` nunca renderiza calendário (`shouldRender = matchType !== 'simulation'`)
- Server-side: pré-gera `googleCalUrl` via `buildGoogleCalendarUrl()` — seguro para build estático
- Botão Google Calendar: link `<a>` com `target="_blank" rel="noopener noreferrer"`, ícone SVG inline, cor `#1a73e8`
- Botão download .ics: `<button type="button">` com atributos `data-*` para passar dados ao script client-side
- `<script>` client-side: guard `typeof window !== 'undefined'`, gera ICS inline (sem importar módulos TypeScript), faz download via Blob
- Textos localizados: pt-br, en, es (labels `googleCal`, `downloadICS`)
- CSS scoped: `.calendar-buttons`, `.cal-btn`, `.cal-btn--google` (azul Google), `.cal-btn--ics` (neutro)
- Zero acesso a window no frontmatter — todo guard no `<script>`

**`src/pages/pt-br/jogos/[id].astro`** (atualizado)
- Importa `CalendarButtons from '../../../components/CalendarButtons.astro'`
- Calcula `locationStr` no frontmatter: `[stadiumName, cityName, countryName].filter(Boolean).join(', ')`
- Seção `<!-- ADICIONAR AO CALENDÁRIO -->` renderizada apenas se `match.type !== 'simulation'`
- `CalendarButtons` recebe `matchId`, `matchType` (cast para `'confirmed' | 'partial'`), `homeTeamName?`, `awayTeamName?`, `datetimeUtc`, `locationStr`, `pageUrl` canônica
- CSS scoped `.calendar-section` adicionado: mesmo visual do `.share-section`

### Regras respeitadas
- `simulation` — nunca exibe botões de calendário
- `partial` — exibe calendário com título "Partida a definir", sem inventar seleções
- `confirmed` — exibe com "HomeTeam x AwayTeam — Copa 2026"
- UID estável por `match.id` — não usa timestamp nem random
- Duração padrão: 120 min
- Formato UTC em todas as datas
- Sem dependências novas
- Build estático: zero API de browser no frontmatter

### Validação
- `npm run build`: 29 páginas geradas sem erros ✅
- Zero erros TypeScript ✅
- Nenhuma página nova (Fase 7B é integração em páginas existentes) ✅
- Total de páginas: 29 (sem alteração)

---

## Fase 7A — Compartilhamento (WhatsApp + Copiar link) ✅

### Arquivos criados/alterados

| Arquivo | Ação |
|---------|------|
| `src/utils/share.ts` | Criado — utilitário centralizado de compartilhamento |
| `src/components/ShareButtons.astro` | Refatorado — novas props contextuais, SVG inline, CSS renovado |
| `src/pages/pt-br/jogos/[id].astro` | Atualizado — passa props contextuais corretas para ShareButtons |

### O que foi feito

**`src/utils/share.ts`** (novo)
- Interface `ShareMatchContext` com `matchType`, nomes dos times, data/hora formatada, URL e locale
- `buildWhatsAppText()` — gera texto diferenciado por `matchType`:
  - `confirmed`: "⚽ HomeTeam x AwayTeam\n🕐 data às hora\nVeja no World Cup Games Today: url"
  - `partial`: "⚽ Próxima fase da Copa 2026 — vagas a definir\n📅 data\nVeja no..."
  - `generic`/`simulation`: "⚽ Copa do Mundo 2026 — Veja os jogos no seu horário local\nurl"
- `buildWhatsAppUrl()` — encoda texto e gera URL `wa.me/?text=...`
- `copyToClipboard()` — Clipboard API com fallback textarea + `execCommand`; guard `typeof window`
- `getCurrentPageUrl()` — retorna `window.location.href` com fallback seguro no server

**`src/components/ShareButtons.astro`** (refatorado)
- Props novas: `matchType`, `homeTeamName`, `awayTeamName`, `dateFormatted`, `timeFormatted`, `pageUrl`
- Props legadas `matchId` e `matchTitle` mantidas para compatibilidade (ignoradas silenciosamente)
- Server-side: pré-gera URL WhatsApp via `buildWhatsAppText` + `buildWhatsAppUrl` (sobrescrita pelo JS)
- Client-side `<script>`: reconstrói texto WhatsApp com `window.location.href` real; trata `confirmed`/`partial`/`generic`
- Botão copiar link: Clipboard API + fallback textarea; feedback visual "Copiado!" / "Erro ao copiar" por 2 segundos
- SVG inline para WhatsApp (ícone oficial simplificado) e ícone de copiar (cópia dupla)
- Removido botão Google Calendar (será implementado na Fase 7B)
- CSS scoped: `.share-btn--whatsapp` com verde WhatsApp (#25d366); `.share-btn--copy` com estados `--copied` e `--failed`
- Zero acesso a `window` no frontmatter — todos os guards no `<script>` client-side

**`src/pages/pt-br/jogos/[id].astro`** (atualizado)
- `ShareButtons` agora recebe `matchType`, `homeTeamName`/`awayTeamName` (somente se `confirmed`), `dateFormatted` composto (`weekdayFormatted + dateFormatted`), `timeFormatted`, `pageUrl` canônica com `PUBLIC_SITE_URL`

### Validação
- `npm run build`: 29 páginas geradas sem erros
- Zero erros TypeScript
- Zero erros de build
- Nenhuma mudança no total de páginas geradas

---

---

## Correções pós-QA da Fase 6 — aplicadas em 2026-05-07

### Correção 1 — Página de listagem `/pt-br/selecoes` ✅

**Problema corrigido:** Link "Seleções" no Header apontava para `/pt-br/selecoes` que retornava 404.

**Arquivo criado:** `src/pages/pt-br/selecoes/index.astro`
- Importa `teams.json` e `groups.json` com cast correto
- Agrupa times por grupo via `group.team_ids.includes(t.id)` — campo `team_ids` confirmado em `types/index.ts`
- Hero com h1 descritivo e aviso MOCK
- Para cada grupo: bloco com h2 linkado para `/pt-br/grupos/[slug]`, grid 2col de cards de seleções
- Cada card linka para `/pt-br/selecoes/[slug]` com flag + nome + "Ver jogos →"
- AdPlaceholder, links internos e texto SEO ao final
- CSS scoped com grid responsivo: 2 colunas desktop, 1 coluna mobile (≤480px)
- Compatível com SSG: zero API de browser no frontmatter

**Validação:**
- `dist/pt-br/selecoes/index.html` gerado corretamente
- Build: 29 páginas sem erros, zero TypeScript errors

---

### Correção 2 — ShareButtons: rota `/jogo/` → `/jogos/` ✅

**Problema corrigido:** Linha 48 de `ShareButtons.astro` gerava URL com `/jogo/` (singular).

**Arquivo alterado:** `src/components/ShareButtons.astro`
- Substituído `${siteUrl}/${locale}/jogo/${matchId}` por `${siteUrl}/${locale}/jogos/${matchId}`
- Nenhuma outra ocorrência de `/jogo/` (singular) encontrada no arquivo

---

### Correção 3 — MatchList: discriminar por `match.type` explicitamente ✅

**Problema corrigido:** `MatchList.astro` usava `match.home_team_id` como discriminador em vez de `match.type`.

**Arquivo alterado:** `src/components/MatchList.astro`
- Adicionada variável `isConfirmed = match.type === 'confirmed'`
- `isPartial` já existia: `match.type === 'partial'` (mantido)
- `homeTeamName` e `awayTeamName` agora usam `isConfirmed && match.home_team_id` — se não confirmado, usa label ou partialLabel
- Comentário explícito: `simulation` nunca exibido (já filtrado em `displayMatches`)
- Comportamento: `confirmed` exibe nomes reais; `partial` exibe `home_label`/`away_label` ou "Vaga não definida"

---

### Correção 4 — NextMatchCard: não calcular countdown se partida já passou ✅

**Problema corrigido:** `NextMatchCard.astro` calculava countdown sem verificar se a partida já ocorreu.

**Arquivo alterado:** `src/components/NextMatchCard.astro`
- Importado `isPast` de `../utils/datetime.ts`
- `countdown` agora calculado condicionalmente: `!isPast(match.datetime_utc) ? formatCountdown(...) : ''`
- Template: `{countdown && (...)}` — a div `.next-match-card__countdown` só é renderizada se countdown não estiver vazio
- Partidas passadas não exibem o bloco de contagem regressiva

---

## Arquivos criados/alterados nas correções pós-QA

| Arquivo | Ação |
|---------|------|
| `src/pages/pt-br/selecoes/index.astro` | Criado — página de listagem de seleções |
| `src/components/ShareButtons.astro` | Corrigido — rota `/jogo/` → `/jogos/` |
| `src/components/MatchList.astro` | Corrigido — discriminador `match.type` explícito |
| `src/components/NextMatchCard.astro` | Corrigido — `isPast` antes de exibir countdown |

---

## Páginas totais geradas (29):
- `/index.html`
- `/pt-br/index.html`
- `/en/index.html`
- `/es/index.html`
- `/pt-br/jogos-de-hoje-copa/index.html`
- `/pt-br/tabela-copa-2026/index.html`
- `/pt-br/calendario-copa-2026/index.html`
- `/pt-br/selecoes/index.html` (NOVA — correção pós-QA)
- `/pt-br/selecoes/[northland|eastoria|westmark|southmore|highpeak|lowvale|bayshore|ridgemont]/index.html` (8 paginas)
- `/pt-br/grupos/[m|n]/index.html` (2 paginas)
- `/pt-br/jogos/[match-001..match-011]/index.html` (11 paginas)

---

## Fase 6E2 — Calendario da Copa 2026 (pt-br)

**Arquivo criado:**

**`src/pages/pt-br/calendario-copa-2026.astro`**
- Pagina estatica em `/pt-br/calendario-copa-2026/` — sem rotas dinamicas
- Importa `matches.json`, `teams.json`, `groups.json` com cast correto:
  `(matchesData as { matches: Match[] }).matches`
- Campo de data correto: `datetime_utc` — confirmado via tipos antes de usar
- Filtra `simulation` da lista de exibicao: apenas `confirmed` e `partial`
- `sortMatchesByDate` agrupa as partidas em ordem cronologica crescente
- Agrupamento por data local: `formatDate(match.datetime_utc, locale, defaultTimezone)` como chave de `Record<string, Match[]>`
- `Object.entries(matchesByDate)` mantem ordem de insercao (cronologica garantida por `sortMatchesByDate` antes do reduce)
- `resolveTeamName(slug)` — busca em `allTeams` por `id` ou `slug`; retorna 'A definir' para null/undefined
- `resolveGroupName(groupSlug)` — comparacao case-insensitive com `slug.toLowerCase()`; necessario pois `match.group` e "M"/"N" e `group.slug` e "m"/"n"
- `phaseLabels` mapeamento completo de todos os valores de `MatchPhase`
- `partial` nunca exibido como confirmado: `isConfirmed = match.type === 'confirmed'` controla `homeTeamName`, `awayTeamName`, classe `.tbd`, link vs badge
- `confirmed` recebe link `/pt-br/jogos/${match.id}` — `partial` recebe badge "Vaga a definir"
- `TimezoneSelector` incluido para conversao de fuso horario pelo usuario
- `AdPlaceholder` posicionado apos o calendario, nunca antes do conteudo principal
- `ShareButtons` com `matchTitle="Calendario da Copa do Mundo 2026"`
- Estrutura da pagina: hero -> aviso MOCK -> seletor de fuso -> calendario agrupado -> AdPlaceholder -> links internos -> compartilhar -> texto SEO
- CSS scoped na pagina: `.calendar-section`, `.calendar-day`, `.calendar-day-header`, `.calendar-matches`, `.calendar-match-card`, `.calendar-match-card.partial`, `.cal-match-time`, `.cal-weekday`, `.cal-time`, `.cal-match-info`, `.cal-teams`, `.cal-team`, `.cal-team.tbd`, `.cal-vs`, `.cal-meta`, `.cal-match-actions`, `.cal-detail-link`, `.cal-partial-badge`, `.internal-links`, `.share-section`, `.seo-text`
- Responsividade: breakpoint 600px (grid 1col, cal-match-time linha horizontal); 768px (header maior, links internos em row)
- Compativel com SSG: zero API de browser no frontmatter
- Build: 28 paginas geradas sem erros, zero TypeScript errors

**Paginas totais geradas (28):**
- `/index.html`
- `/pt-br/index.html`
- `/en/index.html`
- `/es/index.html`
- `/pt-br/jogos-de-hoje-copa/index.html`
- `/pt-br/tabela-copa-2026/index.html`
- `/pt-br/calendario-copa-2026/index.html` (NOVA — Fase 6E2)
- `/pt-br/selecoes/[northland|eastoria|westmark|southmore|highpeak|lowvale|bayshore|ridgemont]/index.html` (8 paginas)
- `/pt-br/grupos/[m|n]/index.html` (2 paginas)
- `/pt-br/jogos/[match-001..match-011]/index.html` (11 paginas)

---

## Arquivos criados/alterados na Fase 6E2

| Arquivo | Acao |
|---------|------|
| `src/pages/pt-br/calendario-copa-2026.astro` | Criado |

---

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
