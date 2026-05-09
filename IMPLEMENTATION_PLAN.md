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
**Status:** CONCLUÍDA ✅ — 2026-05-09

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
  - Regra de dados, idiomas, localStorage, SEO
- `CHECKLIST_LANCAMENTO.md`:
  - Pré-lançamento (domínio, Hostinger, HTTPS, build)
  - Upload e deploy
  - Testes após deploy (20+ itens)
  - Google Analytics
  - Google Search Console + sitemap
  - Dados reais
  - Google AdSense (pós-lançamento)
  - Revisão de conformidade legal

Resultado: 2 arquivos criados, build passou com 92 páginas sem erros.

---

## Fase 14 — Build + Validação Final
**Status:** CONCLUÍDA ✅ — 2026-05-09

Entregas:
- `npm run build`: 92 páginas geradas sem erros
- `dist/` verificada: todas as rotas existem, `_astro/` presente, `robots.txt` e `sitemap.xml` gerados
- Todas as 9 verificações QA passaram
- Correção aplicada: `src/pages/sitemap.xml.ts` — 15 páginas institucionais adicionadas ao sitemap (passou de 77 para 92 entradas)
- `FINAL_QA_REPORT.md` criado com resultado detalhado
- Projeto aprovado para upload na Hostinger

---

---

## Fase 15 — Dados Reais e Preparação para Produção
**Status:** PLANEJADA — aguardando autorização para iniciar
**Data do planejamento:** 2026-05-09
**Pré-requisito:** MVP mockado aprovado (v1.0-mock) ✅

### Visão geral

Esta fase transiciona o site de dados fictícios (MOCK) para dados reais verificados da Copa do Mundo 2026, ao mesmo tempo em que prepara a infraestrutura de produção (domínio, hospedagem, Analytics, AdSense).

### Regras absolutas da Fase 15

1. Nenhum dado real é inserido sem fonte verificada e data de coleta registrada no commit.
2. Nenhum confronto é inventado ou deduzido — somente registrar o que a fonte oficial confirmar.
3. Lacunas são preenchidas com `partial` (data/estádio definidos, times pendentes), nunca com `confirmed` sem os dois times.
4. `SportsEvent` JSON-LD só é emitido para partidas `confirmed` com ambos os times definidos.
5. `live-data.json` mantém structure atual — apenas scores/status/classificação em tempo real.
6. O site deve funcionar sem Analytics e sem AdSense em qualquer estado da fase.
7. Avisos MOCK são removidos somente na Subfase 15I, após QA dos dados (15H) aprovado.

---

### Fase 15A — Congelar MVP Mockado Aprovado
**Status:** PENDENTE

**Objetivo:** criar ponto de retorno seguro antes de qualquer alteração de dados.

**Entregas:**
- Tag Git `v1.0-mock` criada no commit atual
- `dist/` copiado para pasta de backup local `dist_mock_backup/` (não versionada — adicionar ao `.gitignore`)
- Registro no CURRENT_STATUS.md: hash do commit e tag do congelamento
- Confirmação de que `npm run build` ainda gera 92 páginas sem erros a partir do estado congelado

**Critério de conclusão:** tag `v1.0-mock` presente no repositório; backup local confirmado.

---

### Fase 15B — Preparar Domínio e PUBLIC_SITE_URL
**Status:** PENDENTE
**Depende de:** 15A

**Objetivo:** configurar infraestrutura de hospedagem com domínio real antes de inserir dados reais.

**Entregas:**
- Domínio adquirido e apontado para o plano Hostinger
- HTTPS/SSL ativado no painel Hostinger
- `.env` atualizado: `PUBLIC_SITE_URL=https://<dominio-real>`
- `npm run build` executado com a URL real — verificar que canonical, sitemap e hreflang usam o domínio correto
- Upload do conteúdo de `dist/` para `public_html/` na Hostinger
- Testes pós-deploy executados conforme CHECKLIST_LANCAMENTO.md (seções "Upload e deploy" e "Testes após deploy")

**Critério de conclusão:** site ao vivo no domínio real com dados MOCK — todas as rotas respondem 200.

**Observação:** esta subfase pode ser executada em paralelo com 15C (planejamento de dados), mas o upload final com dados reais só acontece na 15J.

---

### Fase 15C — Definir Processo de Coleta de Dados Reais
**Status:** PENDENTE
**Depende de:** nenhuma (planejamento puro)

**Objetivo:** estabelecer protocolo de coleta, verificação e registro de dados antes de tocar em qualquer JSON.

**Entregas:**
- Documento `DATA_SOURCES.md` criado na raiz do projeto com:
  - Fonte primária selecionada (ex: site oficial FIFA, Transfermarkt, Wikipedia com referência cruzada)
  - Data de acesso registrada por coleta
  - Critério de aceitação: dado só entra como `confirmed` se presente na fonte oficial com data e horário publicados
  - Processo de revisão: autor + data + URL da fonte em comentário no topo de cada JSON editado
- Definição dos campos obrigatórios por tipo (alinhados com `src/types/index.ts`):
  - `confirmed`: `id`, `type`, `phase`, `group`, `match_number`, `datetime_utc` (ISO-8601 UTC), `stadium` (LocalizedString), `city` (LocalizedString), `country` (LocalizedString), `home_team_id`, `away_team_id` — todos definidos pela fonte oficial
  - `partial`: `id`, `type`, `phase`, `group`, `match_number`, `datetime_utc`, `stadium`, `city`, `country` — `home_team_id` e `away_team_id` nulos ou descritores textuais em `home_label`/`away_label`
  - Nenhum placar entra em `matches.json` — apenas em `live-data.json`
- Definição do fluxo de atualização de `live-data.json` durante o torneio (sem rebuild)

**Critério de conclusão:** `DATA_SOURCES.md` aprovado pelo usuário.

---

### Fase 15D — Importar Seleções Reais
**Status:** PENDENTE
**Depende de:** 15C aprovado

**Objetivo:** substituir os 8 times fictícios de `src/data/teams.json` pelos times reais classificados para a Copa 2026.

**Escopo esperado:** 48 seleções (formato Copa 2026).

**Campos por seleção:**
```
id          — slug único, ex: "brazil"
name        — LocalizedString: chaves 'pt-br', en, es
slug        — usado nas rotas dinâmicas (/pt-br/selecoes/brazil)
group       — grupo atribuído (ex: "A"), ou null se ainda não sorteado
confederation — confederação (CONMEBOL, UEFA, etc.)
flag        — path para imagem em public/images/flags/ (a ser providenciado)
```

**Regras:**
- Nenhum nome inventado.
- Nenhuma seleção marcada em grupo sem sorteio oficial confirmado.
- Slug derivado do nome em inglês, sem acentos, sem espaços (ex: `saudi-arabia`).
- `flag` pode ser `null` temporariamente enquanto as imagens não estiverem disponíveis.

**Impacto no build:**
- Rotas dinâmicas `/pt-br/selecoes/[slug]`, `/en/teams/[slug]`, `/es/equipos/[slug]` gerarão 48 páginas cada (144 páginas de seleções, +120 em relação ao mock com 8 times).
- `npm run build` deve completar sem erros com os novos slugs.

**Critério de conclusão:** `teams.json` com 48 seleções reais, fonte registrada, build sem erros.

---

### Fase 15E — Importar Grupos Reais
**Status:** PENDENTE
**Depende de:** 15D concluído

**Objetivo:** substituir os 2 grupos fictícios de `src/data/groups.json` pelos 16 grupos reais da Copa 2026.

**Escopo esperado:** 12 grupos (A a L), 4 seleções por grupo.

**Campos por grupo:**
```
id          — ex: "A"
slug        — ex: "a" (usado na rota /pt-br/grupos/a)
name        — LocalizedString: chaves 'pt-br', en, es (ex: "Grupo A")
team_ids    — array de 4 team_ids
```

**Regras:**
- Grupos só preenchidos com times após sorteio oficial confirmado.
- Se o sorteio não tiver ocorrido, manter `team_ids: []` e `status: "pending_draw"`.
- Rotas dinâmicas geradas por slug: `/pt-br/grupos/[slug]`, `/en/groups/[group]`, `/es/grupos/[grupo]`.

**Impacto no build:**
- 12 grupos × 3 idiomas = 36 páginas de grupos (+30 em relação ao mock com 2 grupos).
- Total estimado após 15D + 15E: ~200+ páginas.

**Critério de conclusão:** `groups.json` com 16 grupos reais, fonte registrada, build sem erros.

---

### Fase 15F — Importar Calendário Real dos 104 Jogos
**Status:** PENDENTE
**Depende de:** 15D e 15E concluídos

**Objetivo:** substituir as partidas fictícias de `src/data/matches.json` pelas 104 partidas reais da Copa 2026.

**Estrutura dos 104 jogos:**
- Fase de grupos: 48 jogos (16 grupos × 3 rodadas, mas cada grupo tem 3 jogos, logo 16 × 3 = 48)
- Fase eliminatória: 56 jogos (Round of 32: 16, R16: 8, QF: 4, SF: 2, 3º lugar: 1, Final: 1 = 32... o usuário especifica 104 total então seguir o dado real)
- O número exato de jogos por fase será determinado pela fonte oficial — não inferir.

**Tipagem por partida:**
- `confirmed`: data, hora (UTC), estádio, cidade, fase e **ambos os times** definidos pela fonte.
- `partial`: data, hora (UTC), estádio, cidade, fase definidos — times dependem de classificação (ex: "Vencedor do Jogo 12").
- Nenhuma partida marcada como `simulation`.

**Campos obrigatórios:**
```
id           — ex: "match-001" (manter sequência)
type         — "confirmed" | "partial"
date         — ISO-8601 UTC ex: "2026-06-11T18:00:00Z"
venue        — nome do estádio
city         — cidade-sede
stage        — "group" | "round_of_32" | "round_of_16" | "quarterfinal" | "semifinal" | "third_place" | "final"
group        — letra do grupo (somente para stage: "group")
home_team_id — team.id ou null (partial)
away_team_id — team.id ou null (partial)
```

**Regras:**
- `score` não entra em `matches.json` — apenas em `live-data.json`.
- Horários sempre em UTC — conversão para fuso local é responsabilidade do front-end (já implementado).
- Fonte e data de coleta registradas em comentário no topo do arquivo ou em `DATA_SOURCES.md`.
- SportsEvent JSON-LD continuará emitido apenas para `confirmed` — nenhuma mudança de código necessária.

**Impacto no build:**
- 104 jogos × 3 idiomas = 312 páginas de jogos (+279 em relação ao mock com 11 jogos).
- Total estimado: ~560+ páginas.
- `sitemap.xml` deve ser verificado — gerador dinâmico (`src/pages/sitemap.xml.ts`) já itera sobre os dados, portanto deve refletir automaticamente.

**Critério de conclusão:** `matches.json` com 104 partidas reais, sem scores, sem `simulation`, fonte registrada, build sem erros.

---

### Fase 15G — Converter e Validar Horários UTC
**Status:** PENDENTE
**Depende de:** 15F concluído

**Objetivo:** garantir que todos os horários em `matches.json` estão corretos em UTC e que a conversão para fuso local funciona em todos os fusos relevantes.

**Entregas:**
- Validação de cada horário UTC contra a fonte oficial (data + horário local do país-sede + offset UTC)
- Checklist de fusos testados:
  - `America/Sao_Paulo` (UTC-3)
  - `America/New_York` (UTC-4/UTC-5)
  - `America/Mexico_City` (UTC-5/UTC-6)
  - `Europe/London` (UTC+1)
  - `Asia/Tokyo` (UTC+9)
  - `Australia/Sydney` (UTC+10/UTC+11)
- Verificação de horários de verão (DST) para junho–julho 2026 nos fusos acima
- Registro de qualquer discrepância encontrada e correção aplicada

**Ferramentas de verificação (sem código novo):**
- Testar páginas de jogo em `npm run dev` com troca manual de fuso no `TimezoneSelector`
- Comparar exibição com conversor externo confiável

**Critério de conclusão:** todos os 104 jogos exibem horário correto nos 6 fusos listados; nenhuma discrepância registrada.

---

### Fase 15H — QA dos Dados Reais
**Status:** PENDENTE
**Depende de:** 15G concluído

**Objetivo:** revisão completa dos dados reais antes de remover qualquer aviso MOCK.

**Checklist de QA:**

| Item | Verificação |
|------|-------------|
| H1 | Número de times em `teams.json` confere com fonte oficial |
| H2 | Nenhum time fictício remanescente |
| H3 | Slugs únicos, sem colisão de rotas |
| H4 | Número de grupos em `groups.json` confere com fonte oficial |
| H5 | Cada grupo tem exatamente 3 times (ou `teams: []` se sorteio pendente) |
| H6 | Número total de partidas em `matches.json` confere com fonte oficial |
| H7 | Nenhuma partida `confirmed` sem os dois times definidos |
| H8 | Nenhum score em `matches.json` |
| H9 | Nenhuma partida do tipo `simulation` |
| H10 | Todos os `home_team_id` e `away_team_id` existem em `teams.json` |
| H11 | Todos os grupos referenciados em `matches.json` existem em `groups.json` |
| H12 | `SportsEvent` JSON-LD emitido somente para `confirmed` com ambos os times |
| H13 | `live-data.json` com scores zerados e status `scheduled` para todas as partidas |
| H14 | `npm run build` sem erros — todas as páginas geradas corretamente |
| H15 | `sitemap.xml` reflete o número correto de páginas |

**Critério de conclusão:** todos os 15 itens aprovados; relatório de QA adicionado ao `FINAL_QA_REPORT.md`.

---

### Fase 15I — Remover / Ajustar Avisos MOCK
**Status:** PENDENTE
**Depende de:** 15H aprovado

**Objetivo:** remover ou adaptar os avisos de dados fictícios agora que os dados são reais.

**Arquivos a revisar:**

| Arquivo | Aviso atual | Ação |
|---------|-------------|------|
| `src/data/teams.json` | `"_mock": true`, `"_note": "MOCK DATA..."` | Remover campos `_mock` e `_note` |
| `src/data/matches.json` | `"_mock": true`, `"_note": "MOCK DATA..."` | Remover campos `_mock` e `_note` |
| `src/data/groups.json` | `"_mock": true` (se presente) | Remover se presente |
| `public/data/live-data.json` | `"_mock": true` | Remover; manter scores zerados / `scheduled` |
| Footer (pt-br, en, es) | "Dados de exemplo — não refletem jogos reais" | Remover aviso de dados MOCK; manter aviso de independência da FIFA |
| Qualquer outro aviso de demo | — | Verificar e remover |

**Regras:**
- O aviso de independência da FIFA **permanece** intacto em todos os idiomas — não é um aviso MOCK, é um requisito legal.
- Nenhuma alteração em código de componentes, utilitários ou layouts — apenas remoção de campos de dados e texto de aviso.

**Critério de conclusão:** nenhum texto de "MOCK" ou "dados de exemplo" visível para o usuário final; aviso FIFA intacto; build sem erros.

---

### Fase 15J — Rebuild e Upload da Versão Real
**Status:** PENDENTE
**Depende de:** 15I concluído + 15B concluído (domínio ativo)

**Objetivo:** gerar e publicar a versão de produção com dados reais.

**Entregas:**
- `npm run build` executado com `PUBLIC_SITE_URL` real no `.env`
- Verificação da pasta `dist/`: número de páginas correto, nenhum arquivo inesperado
- Upload do conteúdo de `dist/` para `public_html/` na Hostinger (substituindo versão MOCK)
- Testes pós-deploy completos conforme CHECKLIST_LANCAMENTO.md:
  - Rotas de seleções reais (ex: `/pt-br/selecoes/brazil`)
  - Rotas de jogos reais (ex: `/pt-br/jogos/match-001`)
  - Rotas de grupos reais (ex: `/pt-br/grupos/a`)
  - Conversão de fuso horário em ao menos 3 fusos diferentes
  - `sitemap.xml` e `robots.txt` acessíveis
  - Aviso FIFA presente no footer
  - Nenhum aviso MOCK visível

**Critério de conclusão:** site ao vivo com dados reais; todos os testes do CHECKLIST_LANCAMENTO.md marcados.

---

### Fase 15K — Search Console, Analytics e AdSense
**Status:** PENDENTE
**Depende de:** 15J concluído (site ao vivo com dados reais)

**Objetivo:** ativar monitoramento e monetização conforme CHECKLIST_LANCAMENTO.md.

**Entregas por serviço:**

**Google Search Console:**
- Propriedade criada para o domínio real
- Verificação de domínio (via DNS TXT record ou arquivo HTML)
- Sitemap enviado: `https://<dominio>/sitemap.xml`
- Aguardar indexação (processo externo, pode levar dias)

**Google Analytics 4:**
- Conta e propriedade criadas em analytics.google.com
- Measurement ID (`G-XXXXXXXXXX`) obtido
- `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` configurado no `.env` (ou variável de ambiente na Hostinger)
- `npm run build` executado novamente
- Upload do novo `dist/` para Hostinger
- Verificação: acessar o site e confirmar evento em GA4 Realtime

**Google AdSense:**
- Solicitação de aprovação enviada (somente após site ao vivo com conteúdo real)
- Após aprovação: editar `src/components/AdPlaceholder.astro` com blocos `<ins class="adsbygoogle">` fornecidos pelo Google
- Rebuild + upload
- Verificação: anúncios aparecem nas posições corretas (nunca antes do conteúdo principal)
- Nenhuma posição de anúncio adicionada além das já definidas no MVP

**Regra de fallback:** se Analytics ou AdSense estiverem vazios/não aprovados, o site continua 100% funcional. Não há dependência de código.

**Critério de conclusão:** Search Console com sitemap enviado; GA4 registrando acessos; AdSense aprovado e anúncios visíveis (ou registrado como pendente de aprovação se ainda em revisão).

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
| 9D | Refinamento i18n de componentes compartilhados | CONCLUÍDA ✅ |
| 10A | SEO Técnico — sitemap, robots, canonical, hreflang | CONCLUÍDA ✅ |
| 10B | SEO Técnico — Open Graph + Twitter Card | CONCLUÍDA ✅ |
| 10C | SEO Técnico — SportsEvent JSON-LD | CONCLUÍDA ✅ |
| 11 | Páginas Institucionais | CONCLUÍDA ✅ |
| 12 | Analytics + AdSense (placeholders) | CONCLUÍDA ✅ |
| 13 | Documentação | CONCLUÍDA ✅ |
| 14 | Build + Validação Final | CONCLUÍDA ✅ |
| 15A | Dados Reais — Congelar MVP Mock | PENDENTE |
| 15B | Dados Reais — Domínio e PUBLIC_SITE_URL | PENDENTE |
| 15C | Dados Reais — Definir processo de coleta | PENDENTE |
| 15D | Dados Reais — Importar seleções reais | PENDENTE |
| 15E | Dados Reais — Importar grupos reais | PENDENTE |
| 15F | Dados Reais — Importar calendário 104 jogos | PENDENTE |
| 15G | Dados Reais — Converter e validar horários UTC | PENDENTE |
| 15H | Dados Reais — QA dos dados reais | PENDENTE |
| 15I | Dados Reais — Remover/ajustar avisos MOCK | PENDENTE |
| 15J | Dados Reais — Rebuild e upload versão real | PENDENTE |
| 15K | Dados Reais — Search Console, Analytics e AdSense | PENDENTE |

Ordem obrigatória dentro da Fase 6: 6A → 6B → 6C → 6D → 6E

Ordem obrigatória dentro da Fase 15: 15A → 15B (paralelo com 15C) → 15C → 15D → 15E → 15F → 15G → 15H → 15I → 15J → 15K
(6D depende de 6B; 6E pode rodar após 6C em paralelo com 6D, mas recomenda-se sequencial)
