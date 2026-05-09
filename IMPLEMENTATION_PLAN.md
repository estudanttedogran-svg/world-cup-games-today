# IMPLEMENTATION_PLAN.md — World Cup Games Today

Plano de implementação em fases sequenciais.
Cada fase termina com atualização do CURRENT_STATUS.md e pausa para autorização.

---

## Fase 0 — Meta / Setup do Processo
**Status:** CONCLUÍDA

- [x] Atualizar CLAUDE.md com regra de continuidade
- [x] Criar PROJECT_BRIEF.md
- [x] Criar IMPLEMENTATION_PLAN.md
- [x] Criar CURRENT_STATUS.md

Resultado: processo estabelecido, nenhum arquivo de código criado.

---

## Fase 1 — Bootstrap do Projeto Astro
**Status:** CONCLUÍDA ✅

Entregas:
- Inicializar projeto Astro com `npm create astro`
- `astro.config.mjs` configurado (sem Tailwind, sem frameworks extras)
- `.env.example` com `PUBLIC_SITE_URL` e `PUBLIC_GA_MEASUREMENT_ID`
- `.env` local com placeholders
- `.gitignore` adequado
- Estrutura de pastas criada:
  ```
  src/
    components/
    layouts/
    pages/
    data/
    styles/
    utils/
    i18n/
  public/
    data/
    images/
    fonts/
  ```
- `package.json` revisado, scripts: `dev`, `build`, `preview`

Resultado esperado: `npm run dev` sobe o servidor local sem erros.

---

## Fase 2 — Camada de Dados (Mock)
**Status:** CONCLUÍDA ✅

Entregas:
- `src/data/teams.json` — MOCK: 8 seleções fictícias
- `src/data/matches.json` — MOCK: ~10 partidas (confirmadas + parcialmente definidas)
- `src/data/groups.json` — MOCK: 2 grupos
- `src/data/overrides.json` — estrutura vazia, pronta para uso
- `public/data/live-data.json` — estrutura mínima (scores, status)
- `public/data/live-data.example.json` — modelo comentado de edição
- `src/types/index.ts` — interfaces TypeScript para todos os tipos de dados

Regra: todos os dados marcados claramente como `// MOCK DATA`.

---

## Fase 3 — Layout Base + CSS
**Status:** CONCLUÍDA ✅

Entregas:
- `src/layouts/BaseLayout.astro` — estrutura HTML base com head, body, slots
- `src/components/Header.astro` — nav com logo, seletor de idioma, busca
- `src/components/Footer.astro` — links institucionais + rodapé legal obrigatório
- `src/styles/reset.css` — CSS reset
- `src/styles/variables.css` — design tokens (cores, tipografia, espaçamento)
- `src/styles/global.css` — estilos base, mobile-first
- Paleta de cores definida (minimalista, profissional)
- Responsividade: mobile-first, breakpoints: 480px, 768px, 1024px, 1280px

---

## Fase 4 — Utilitários Principais
**Status:** CONCLUÍDA ✅

Entregas:
- `src/utils/timezone.ts` — detectar fuso do navegador, converter UTC para local, listar fusos/cidades
- `src/utils/datetime.ts` — formatar datas/horas por idioma e fuso
- `src/utils/language.ts` — detectar idioma do navegador, mapeamento de locale
- `src/utils/storage.ts` — wrapper seguro para localStorage (com fallback se bloqueado)
- `src/utils/matches.ts` — filtrar partidas (hoje, por seleção, por fase, por status)
- `src/utils/analytics.ts` — stubs de eventos GA (não dispara se ID vazio)

---

## Fase 5 — Home Page (pt-br)
**Status:** CONCLUÍDA ✅

Entregas:
- `src/pages/pt-br/index.astro` — página home completa em português
- Componentes necessários:
  - `TimezoneSelector.astro` — exibir fuso + botão de troca manual
  - `TeamSelector.astro` — seleção favorita + busca com lupa
  - `NextMatchCard.astro` — próximo jogo confirmado + contagem regressiva
  - `MatchList.astro` — lista de jogos com horário convertido
  - `TodayMatches.astro` — seção de jogos do dia
  - `ShareButtons.astro` — WhatsApp, copiar link, calendário
  - `AdPlaceholder.astro` — componente de anúncio (placeholder visual)
- Seção de texto/FAQ para SEO
- Meta tags específicas da home

---

## Fase 6A — Jogos de Hoje (pt-br)
**Status:** CONCLUÍDA ✅

Página alvo:
- `src/pages/pt-br/jogos-de-hoje-copa.astro`

Componentes novos esperados:
- Nenhum — página construída inteiramente com componentes já existentes

Componentes existentes reutilizados:
- `TodayMatches.astro` — seção principal de jogos do dia
- `MatchList.astro` — renderização de cada partida
- `TimezoneSelector.astro` — seletor de fuso
- `ShareButtons.astro` — compartilhamento da página
- `AdPlaceholder.astro` — posições de anúncio

Dependências de outras subfases: nenhuma

Complexidade: baixa

Notas: URL dedicada `/pt-br/jogos-de-hoje-copa` com SEO próprio, diferente da home.
Lógica idêntica à seção "Jogos de hoje" da home, mas isolada em página própria.

---

## Fase 6B — Tabela da Copa 2026 (pt-br)
**Status:** CONCLUÍDA ✅

Página alvo:
- `src/pages/pt-br/tabela-copa-2026.astro`

Componentes novos esperados:
- `GroupTable.astro` — tabela de classificação por grupo (posição, J, V, E, D, GP, GC, Pts)
  - Props: `group` (Group), `standings` (StandingEntry[]), `teams` (Team[]), `locale`
  - Identificado como pendente no CURRENT_STATUS.md desde a Fase 5

Componentes existentes reutilizados:
- `AdPlaceholder.astro`
- `ShareButtons.astro`

Dependências de outras subfases: nenhuma (independente de 6A)

Complexidade: média
Motivo: criação do componente `GroupTable.astro` com ordenação de classificação; dados de standings vêm de `live-data.json` (mock estático por enquanto).

Notas: `GroupTable.astro` criado aqui será obrigatoriamente reutilizado na Fase 6D.

---

## Fase 6C — Página por Seleção (pt-br)
**Status:** CONCLUÍDA ✅

Página alvo:
- `src/pages/pt-br/selecoes/[slug].astro` — rota dinâmica, uma página por time

Componentes novos esperados:
- `TeamHeader.astro` — cabeçalho com nome, flag, grupo e confederação do time
  - Props: `team` (Team), `locale`

Componentes existentes reutilizados:
- `MatchList.astro` — lista de todos os jogos da seleção
- `NextMatchCard.astro` — próximo jogo confirmado
- `ShareButtons.astro` — compartilhamento da página da seleção
- `AdPlaceholder.astro`

Dependências de outras subfases: nenhuma técnica (não depende de 6A nem 6B)
Recomenda-se executar após 6B para manter sequência crescente de complexidade.

Complexidade: média-alta
Motivo: primeira rota dinâmica do projeto — requer `getStaticPaths()` no Astro SSG,
gerando uma página por slug de time (ex: `/pt-br/selecoes/northland`).
O padrão Astro para SSG está bem definido, mas é a primeira vez que será aplicado neste projeto.

Notas: slugs gerados a partir de `teams.json` — cada time.slug vira uma rota.

---

## Fase 6D — Página por Grupo (pt-br)
**Status:** CONCLUÍDA ✅

Página alvo:
- `src/pages/pt-br/grupos/[grupo].astro` — rota dinâmica, uma página por grupo

Componentes novos esperados:
- Nenhum — reutiliza integralmente componentes das fases anteriores

Componentes existentes reutilizados:
- `GroupTable.astro` — CRIADO NA FASE 6B (dependência obrigatória)
- `MatchList.astro` — jogos do grupo filtrados
- `AdPlaceholder.astro`
- `ShareButtons.astro`

Dependências de outras subfases:
- DEPENDE DA FASE 6B — `GroupTable.astro` deve existir antes de iniciar esta fase

Complexidade: média
Motivo: rota dinâmica (segunda do projeto, padrão já estabelecido na 6C), mas sem componentes novos.

Notas: slugs gerados a partir de `groups.json` — cada group.slug vira uma rota (ex: `/pt-br/grupos/m`).

---

## Fase 6E — Página por Jogo + Calendário (pt-br)
**Status:** CONCLUÍDA ✅ — Fase 6E1 CONCLUÍDA ✅ | Fase 6E2 CONCLUÍDA ✅

Páginas alvo:
- `src/pages/pt-br/jogo/[id].astro` — rota dinâmica, uma página por partida
- `src/pages/pt-br/calendario-copa-2026.astro` — página estática com lista completa de partidas

Componentes novos esperados:
- `MatchDetail.astro` — exibição completa de uma partida (times, data/hora, estádio, fase, placar se disponível)
  - Props: `match` (Match), `teams` (Team[]), `timezone`, `locale`
  - Inclui bloco de SportsEvent JSON-LD (apenas para partidas `confirmed`)

Componentes existentes reutilizados:
- `ShareButtons.astro` — compartilhamento com contexto da partida específica
- `MatchList.astro` — usado no calendário para listar todas as partidas agrupadas por data
- `AdPlaceholder.astro`
- `TimezoneSelector.astro` — no calendário, para conversão de horário

Dependências de outras subfases: nenhuma técnica
Recomenda-se executar após 6C e 6D para que o contexto da página de jogo possa linkar para seleção e grupo.

Complexidade: alta
Motivo: página de jogo é a mais rica do projeto — SportsEvent schema, placar ao vivo (via live-data.json),
horário localizado, links cruzados (seleção, grupo). O calendário é simples (estático), mas está agrupado nesta fase
para liberar 6B e 6C para componentes mais coesos.

---

## Fase 7 — Compartilhamento + Integração de Calendário
**Status:** CONCLUÍDA ✅

### Fase 7A — WhatsApp + Copiar link
**Status:** CONCLUÍDA ✅

Entregas:
- `src/utils/share.ts` — utilitário centralizado (`buildWhatsAppText`, `buildWhatsAppUrl`, `copyToClipboard`, `getCurrentPageUrl`)
- `src/components/ShareButtons.astro` — refatorado com props contextuais, SVG inline, CSS renovado
- `src/pages/pt-br/jogos/[id].astro` — atualizado para passar props corretas ao ShareButtons
- Mensagens WhatsApp diferenciadas: `confirmed` (times + data/hora), `partial` ("vagas a definir"), `generic` (home/calendário)
- Botão copiar link: Clipboard API + fallback + feedback visual por 2 segundos

### Fase 7B — Google Calendar + .ics
**Status:** CONCLUÍDA ✅

Entregas:
- Geração de link Google Calendar (`eventedit` com parâmetros de data/hora/título)
- Geração de arquivo `.ics` para download (partidas `confirmed` e `partial` com data real)
- Integração na página individual de jogo (`/pt-br/jogos/[id]`)
- `simulation` nunca recebe botões de calendário

---

## Fase 8 — live-data: Fetch Client-Side + Fallback
**Status:** CONCLUÍDA ✅

Entregas:
- `src/utils/liveData.ts` — fetch, validação mínima e acesso ao live-data.json com fallback total
- `src/components/LiveMatchStatus.astro` — componente Island com cache em memória, badge pulsante e placar
- Integrado em `src/pages/pt-br/jogos/[id].astro` — seção "Status da Partida"
- Integrado em `src/components/MatchList.astro` — badge de status em cada item da lista
- Documentação de cache (live-data.json) registrada no CURRENT_STATUS.md
- 29 páginas geradas sem erros — build estático não depende do live-data.json

---

## Fase 9 — Internacionalização (en + es) + Página raiz
**Status:** CONCLUÍDA ✅ — Fase 9A ✅ | Fase 9B ✅ | Fase 9C ✅ | Fase 9D ✅

### Fase 9D — Refinamento i18n de componentes compartilhados
**Status:** CONCLUÍDA ✅ — 2026-05-08

Entregas:
- `src/utils/share.ts` — `buildWhatsAppText` localizado para pt-br, en, es (campo `locale` opcional adicionado)
- `src/components/ShareButtons.astro` — `data-locale` no container; script client-side usa locale para textos WhatsApp
- `src/utils/calendar.ts` — `buildCalendarEventData` localizado para pt-br, en, es (campo `locale` opcional adicionado)
- `src/components/CalendarButtons.astro` — `locale` passado para `buildCalendarEventData`; `data-locale` no botão ICS; script ICS localizado
- Compatibilidade: todas as chamadas existentes sem `locale` continuam usando `'pt-br'`
- Nenhuma página nova — total permanece 77 páginas
- `npm run build`: 77 páginas sem erros ✅

### Fase 9C — Página raiz `/` (seleção de idioma + sugestão automática)
**Status:** CONCLUÍDA ✅ — 2026-05-08

Entregas:
- `src/pages/index.astro` — landing page de seleção de idioma (reescrita do stub)
- Cards de idioma: Português (Brasil), English, Español com grid responsivo
- Sugestão automática via `navigator.language` (sem redirect automático)
- localStorage `wcgt_lang` para salvar e recuperar preferência de idioma
- CSS scoped mobile-first (1 col mobile, 3 colunas >= 480px)
- Nenhuma página nova gerada — total permanece 77 páginas

### Fase 9A — Páginas em inglês (/en/)
**Status:** CONCLUÍDA ✅ — 2026-05-08

Entregas:
- `src/pages/en/index.astro` — home em inglês (reescrita do stub)
- `src/pages/en/world-cup-games-today.astro` — jogos de hoje em inglês
- `src/pages/en/world-cup-2026-schedule.astro` — tabela/calendário em inglês
- `src/pages/en/teams/index.astro` — listagem de times em inglês
- `src/pages/en/teams/[slug].astro` — página por time em inglês (8 páginas)
- `src/pages/en/groups/[group].astro` — página por grupo em inglês (2 páginas)
- `src/pages/en/matches/[id].astro` — página por jogo em inglês (11 páginas)
- Fuso padrão: `America/New_York`
- Locale `'en'` em todos os componentes que aceitam a prop
- 24 páginas novas geradas — total passa de 29 para 53 páginas
- `npm run build`: 53 páginas sem erros ✅

### Fase 9B — Páginas em espanhol (/es/)
**Status:** CONCLUÍDA ✅ — 2026-05-08

Entregas:
- `src/pages/es/index.astro` — home em espanhol (reescrita do stub)
- `src/pages/es/partidos-de-hoy-mundial.astro` — partidos de hoy en español
- `src/pages/es/calendario-mundial-2026.astro` — calendario completo en español
- `src/pages/es/equipos/index.astro` — listado de selecciones en español
- `src/pages/es/equipos/[slug].astro` — página por selección en español (8 páginas)
- `src/pages/es/grupos/[group].astro` — página por grupo en español (2 páginas)
- `src/pages/es/partidos/[id].astro` — página por partido en español (11 páginas)
- Fuso padrão: `America/Mexico_City`
- Locale `'es'` em todos os componentes que aceitam a prop
- 24 páginas novas geradas — total passa de 53 para 77 páginas
- `npm run build`: 77 páginas sem erros ✅

---

## Fase 10 — SEO Técnico
**Status:** CONCLUÍDA ✅

### Fase 10A — sitemap.xml, robots.txt, canonical e hreflang
**Status:** CONCLUÍDA ✅ — 2026-05-08

Entregas:
- `public/sitemap.xml` (gerado via Astro ou script)
- `public/robots.txt`
- Meta tags completas em todas as páginas (title, description, canonical)
- Open Graph em todas as páginas
- SportsEvent JSON-LD em páginas de partidas confirmadas
- Verificação de hreflang correto em todas as rotas

### Fase 10B — Open Graph completo + Twitter Card
**Status:** CONCLUÍDA ✅ — 2026-05-08

Entregas:
- `src/layouts/BaseLayout.astro` — novas props `ogType`, `ogImage`, `ogLocale`, `ogLocaleAlternates`, `twitterCard`; derivacao automatica de `ogLocale` e `ogLocaleAlternates` a partir de `locale` e `alternates`
- Tags Open Graph completas: `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:locale`, `og:locale:alternate`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`
- `og:image` e `twitter:image` nao emitidos (pendente imagem OG real)
- `src/pages/pt-br/jogos/[id].astro` — `ogType="article"` para `confirmed`
- `src/pages/en/matches/[id].astro` — `ogType="article"` para `confirmed`
- `src/pages/es/partidos/[id].astro` — `ogType="article"` para `confirmed`
- 77 paginas geradas sem erros; nenhuma dependencia nova

### Fase 10C — SportsEvent JSON-LD
**Status:** CONCLUÍDA ✅ — 2026-05-08

Entregas:
- `src/utils/schema.ts` — utilitário puro `buildSportsEventSchema()` com interface tipada `SportsEventSchemaOptions`
- `src/pages/pt-br/jogos/[id].astro` — injeção de JSON-LD via `slot="head"` somente para `confirmed`
- `src/pages/en/matches/[id].astro` — injeção de JSON-LD via `slot="head"` somente para `confirmed`
- `src/pages/es/partidos/[id].astro` — injeção de JSON-LD via `slot="head"` somente para `confirmed`
- Regra absoluta: `partial` e `simulation` sem nenhum SportsEvent schema
- Nomes dos times e fase sempre em inglês no schema (padrão internacional)
- 77 páginas geradas sem erros; nenhuma dependência nova

---

## Fase 11 — Páginas Institucionais
**Status:** CONCLUÍDA ✅

Entregas (pt-br, en, es):
- Sobre / About / Acerca de
- Contato / Contact / Contacto
- Política de Privacidade / Privacy Policy / Política de Privacidad
- Termos de Uso / Terms of Use / Términos de Uso
- Aviso Legal / Legal Notice / Aviso Legal

Resultado: 15 páginas criadas, build passou com 92 páginas sem erros. Footer atualizado com links reais. Hreflang configurado entre os 3 idiomas para cada par de páginas.

---

## Fase 12 — Analytics + AdSense (Placeholders)
**Status:** CONCLUÍDA ✅

Entregas:
- Script GA no BaseLayout (condicional: só carrega se `PUBLIC_GA_MEASUREMENT_ID` não estiver vazio; `anonymize_ip: true`)
- Stubs de eventos em `analytics.ts`: troca de seleção, fuso, idioma; clique em WhatsApp, copiar link, calendário, .ics; visualização de partida (todos já existiam e foram validados)
- Componente `AdPlaceholder.astro` melhorado: props `size` (banner/rectangle/sidebar com alturas IAB) e `lang` (textos localizados pt-br/en/es), atributo `data-ad-slot`
- Posicionamento verificado em todas as páginas principais — todos corretos
- Nenhum anúncio real, nenhum ID real

Resultado: build passou com 92 páginas sem erros.

---

## Fase 13 — Documentação
**Status:** PENDENTE

Entregas:
- `README.md` em português com:
  - Como rodar localmente
  - Como fazer build
  - Como subir na Hostinger
  - Como configurar `PUBLIC_SITE_URL`
  - Como inserir GA_MEASUREMENT_ID
  - Como inserir código AdSense
  - Como editar `live-data.json`
  - Como atualizar placares/status
  - Como trocar de domínio
- `CHECKLIST_LANCAMENTO.md`:
  - Configurar domínio
  - Configurar Hostinger
  - Configurar Google Analytics
  - Configurar Search Console
  - Enviar sitemap
  - Solicitar AdSense futuramente

---

## Fase 14 — Build + Validação Final
**Status:** PENDENTE

Entregas:
- `npm run build` sem erros
- Pasta `dist/` verificada e documentada
- Teste manual das rotas principais
- Checagem de SEO básico (title, description, canonical, hreflang)
- Verificação de fallback do live-data.json
- Projeto pronto para upload na Hostinger

---

## Resumo das fases

| Fase | Nome | Status |
|------|------|--------|
| 0 | Meta / Setup do Processo | CONCLUÍDA |
| 1 | Bootstrap do Projeto Astro | CONCLUÍDA ✅ |
| 2 | Camada de Dados (Mock) | CONCLUÍDA ✅ |
| 3 | Layout Base + CSS | CONCLUÍDA ✅ |
| 4 | Utilitários Principais | CONCLUÍDA ✅ |
| 5 | Home Page (pt-br) | CONCLUÍDA ✅ |
| 6A | Jogos de Hoje (pt-br) | CONCLUÍDA ✅ |
| 6B | Tabela da Copa 2026 (pt-br) | CONCLUÍDA ✅ |
| 6C | Página por Seleção — rota dinâmica (pt-br) | CONCLUÍDA ✅ |
| 6D | Página por Grupo — rota dinâmica (pt-br) | CONCLUÍDA ✅ |
| 6E1 | Páginas Individuais por Jogo (pt-br) | CONCLUÍDA ✅ |
| 6E2 | Calendário da Copa 2026 (pt-br) | CONCLUÍDA ✅ |
| 7A | Compartilhamento — WhatsApp + Copiar link | CONCLUÍDA ✅ |
| 7B | Compartilhamento — Google Calendar + .ics | CONCLUÍDA ✅ |
| 8 | live-data fetch + Fallback | CONCLUÍDA ✅ |
| 9A | Internacionalização — Páginas em inglês (/en/) | CONCLUÍDA ✅ |
| 9B | Internacionalização — Páginas em espanhol (/es/) | CONCLUÍDA ✅ |
| 9C | Página raiz `/` — seleção de idioma + sugestão automática | CONCLUÍDA ✅ |
| 10A | SEO Técnico — sitemap, robots, canonical, hreflang | CONCLUÍDA ✅ |
| 10B | SEO Técnico — Open Graph + Twitter Card | CONCLUÍDA ✅ |
| 10C | SEO Técnico — SportsEvent JSON-LD | PENDENTE |
| 11 | Páginas Institucionais | PENDENTE |
| 12 | Analytics + AdSense (placeholders) | CONCLUÍDA ✅ |
| 13 | Documentação | PENDENTE |
| 14 | Build + Validação Final | PENDENTE |

Ordem obrigatória dentro da Fase 6: 6A → 6B → 6C → 6D → 6E
(6D depende de 6B; 6E pode rodar após 6C em paralelo com 6D, mas recomenda-se sequencial)
