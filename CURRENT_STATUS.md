# CURRENT_STATUS.md — World Cup Games Today

**Última atualização:** 2026-05-09 (Fase 15B — preparada localmente; aguardando propagação/HTTPS do domínio)

---

## Status atual

**Fase concluída:** Fase 15A — Congelar MVP Mockado Aprovado CONCLUÍDA ✅
**Fase concluída anterior:** Fase 14 — Build + Validação Final CONCLUÍDA ✅
**Correção pós-QA aplicada:** Bug Checklist 3 — Labels de fuso horário localizados (2026-05-09) ✅
**Correção pós-QA aplicada:** Bug Checklist 4 — Horários client-side reativos ao fuso (2026-05-09) ✅
**Checklist 5 — Dados dos Jogos: APROVADO COM OBSERVAÇÃO (2026-05-09)** ✅
**Correção pós-QA: Checklist Páginas Dinâmicas — Links de seleção + Overflow mobile (2026-05-09) ✅ CONFIRMADO**
**Correção pós-auditoria SEO — robots.txt + og:image (2026-05-09) ✅ APLICADA**
**SEO Técnico:** APROVADO ✅ — robots.txt permite rastreamento, og:image presente em todas as 92 páginas
**Correção acessibilidade/mobile — touch targets 44px (2026-05-09) ✅ APLICADA**
**Checklist mobile:** APROVADO ✅ — todos os botões principais com min-height: 44px
**Melhoria pós-auditoria estratégica — FAQ nas homes (2026-05-09) ✅ IMPLEMENTADA**
**FAQ:** Presente nas homes /pt-br/, /en/, /es/ — 6 perguntas por idioma, FAQPage JSON-LD incluído
**Status geral do projeto:** MVP MOCKADO CONGELADO — TAG v1.0-mock CRIADA ✅
**Verificação de upload (2026-05-09):** dist/ confirmado limpo e completo — 104 arquivos, sem .env, sem node_modules, sem src/
**Marco de versão (2026-05-09):** MVP MOCK APROVADO — todos os checklists validados ✅
**Fase 15 planejada (2026-05-09):** Dados Reais e Preparação para Produção — 11 subfases definidas em IMPLEMENTATION_PLAN.md
**Fase 15A concluída (2026-05-09):** MVP congelado — tag v1.0-mock no commit 6b82b6c, backup dist_mock_backup/ criado
**Fase 15C concluída (2026-05-09):** DATA_SOURCES.md criado — protocolo completo de coleta, validação e registro de dados reais
**Fase 15B preparada localmente (2026-05-09):** domínio `worldcupgamestoday.com` confirmado — .env já configurado, build 92 páginas OK, dist/ gerado e verificado com domínio real em sitemap/robots/canonical/hreflang/og:url/og:image. Aguardando propagação de DNS e HTTPS ativo na Hostinger para upload final.
**Próxima ação:** Quando `https://worldcupgamestoday.com` abrir sem erro de certificado → fazer upload do conteúdo de dist/ para public_html/ na Hostinger (ver instruções detalhadas na seção "Fase 15B" abaixo). Após upload e testes, marcar 15B como CONCLUÍDA.

---

## Fase 15 — Dados Reais e Preparação para Produção (2026-05-09)

**Status:** EM ANDAMENTO — 15A concluída
**Plano completo:** ver IMPLEMENTATION_PLAN.md, seção "Fase 15"

### Subfases e status

| Subfase | Descrição | Status |
|---------|-----------|--------|
| 15A | Congelar MVP mockado aprovado (tag v1.0-mock + backup) | CONCLUÍDA ✅ |
| 15B | Preparar domínio e PUBLIC_SITE_URL | PREPARADA LOCALMENTE — aguardando propagação/HTTPS ⏳ |
| 15C | Definir processo de coleta de dados reais com fonte verificada | CONCLUÍDA ✅ |
| 15D | Importar seleções reais (48 times) | PENDENTE |
| 15E | Importar grupos reais (12 grupos) | PENDENTE |
| 15F | Importar calendário real dos 104 jogos | PENDENTE |
| 15G | Converter e validar horários UTC | PENDENTE |
| 15H | QA dos dados reais | PENDENTE |
| 15I | Remover/ajustar avisos MOCK | PENDENTE |
| 15J | Rebuild e upload da versão real | PENDENTE |
| 15K | Search Console, Analytics e AdSense | PENDENTE |

### Regras absolutas (resumo)
- Nenhum dado real sem fonte verificada e data de coleta registrada.
- Nenhum confronto inventado ou deduzido.
- `confirmed` exige os dois times definidos pela fonte oficial.
- `SportsEvent` JSON-LD somente para `confirmed` com ambos os times.
- Avisos MOCK removidos somente após QA (15H) aprovado — na 15I.
- Site funciona sem Analytics e sem AdSense em qualquer estado.

---

## Fase 15B — Preparar Domínio e PUBLIC_SITE_URL — PREPARADA LOCALMENTE ⏳

**Data de início do planejamento:** 2026-05-09
**Preparação local concluída:** 2026-05-09
**Status:** PREPARADA LOCALMENTE — aguardando propagação de DNS e HTTPS ativo na Hostinger para upload final

### Resultado da preparação local (2026-05-09)

| Verificação | Resultado |
|-------------|-----------|
| Domínio confirmado | `worldcupgamestoday.com` ✅ |
| `.env` com domínio real | `PUBLIC_SITE_URL=https://worldcupgamestoday.com` ✅ |
| `npm run build` | 92 páginas geradas sem erros ✅ |
| `dist/sitemap.xml` usa domínio real | ✅ — 92 URLs com `https://worldcupgamestoday.com/` |
| `dist/robots.txt` usa domínio real | ✅ — `Sitemap: https://worldcupgamestoday.com/sitemap.xml` |
| `canonical` usa domínio real | ✅ — verificado em `dist/pt-br/index.html` |
| `hreflang` usa domínio real | ✅ — pt-BR, en, es e x-default corretos |
| `og:url` usa domínio real | ✅ — verificado em `dist/pt-br/index.html` |
| `og:image` usa domínio real | ✅ — `https://worldcupgamestoday.com/images/og-default.svg` |
| Dados MOCK preservados | ✅ — nenhum dado real inserido |
| Avisos MOCK preservados | ✅ — nenhum aviso removido |
| Analytics/AdSense reais | ✅ — nenhum inserido (`PUBLIC_GA_MEASUREMENT_ID` vazio) |

### O que depende de PUBLIC_SITE_URL

`PUBLIC_SITE_URL` é lido em tempo de build em **42 arquivos** do projeto. Ao mudar o valor e rodar `npm run build`, todos os itens abaixo são atualizados automaticamente:

| Item | Onde é gerado |
|------|--------------|
| Meta tag `<link rel="canonical">` | `BaseLayout.astro` — todas as páginas |
| `<meta property="og:url">` | `BaseLayout.astro` — todas as páginas |
| `<meta property="og:image">` | `BaseLayout.astro` — `${siteUrl}/images/og-default.svg` |
| Tags `<link rel="alternate" hreflang>` | Todas as páginas com `alternates` |
| Todas as URLs em `/sitemap.xml` | `src/pages/sitemap.xml.ts` |
| Linha `Sitemap:` em `/robots.txt` | `src/pages/robots.txt.ts` |
| URLs absolutas nos schemas JSON-LD | Páginas de jogo (`confirmed`) |

### Valor atual em .env

```
PUBLIC_SITE_URL=https://worldcupgamestoday.com
PUBLIC_GA_MEASUREMENT_ID=
```

Este valor já está configurado com o domínio real: `https://worldcupgamestoday.com`. NÃO alterar.

### Status das etapas de preparação local

**Etapa 1 — Comprar e configurar o domínio na Hostinger** — EM ANDAMENTO (propagação de DNS e HTTPS)

**Etapa 2 — Atualizar o .env local** — CONCLUÍDA ✅
`.env` contém `PUBLIC_SITE_URL=https://worldcupgamestoday.com`. Não alterar até a Fase 15K.

**Etapa 3 — Rodar o build com o domínio real** — CONCLUÍDA ✅
`npm run build` gerou **92 páginas sem erros** em 2026-05-09.

**Etapa 4 — Verificar o canonical e sitemap no dist/** — CONCLUÍDA ✅
- `dist/sitemap.xml`: 92 URLs iniciando com `https://worldcupgamestoday.com/` ✅
- `dist/robots.txt`: `Sitemap: https://worldcupgamestoday.com/sitemap.xml` ✅
- `dist/pt-br/index.html`: `canonical`, `hreflang`, `og:url`, `og:image` com domínio real ✅

**Etapa 5 — Upload para Hostinger** — PENDENTE (aguardando propagação/HTTPS)

1. Acesse o **Gerenciador de Arquivos** no painel da Hostinger.
2. Navegue até `public_html/` (raiz do seu domínio).
3. Faça upload do **conteúdo** da pasta `dist/` — não a pasta `dist/` em si, mas tudo que está dentro dela:
   - `index.html`
   - `_astro/`
   - `pt-br/`
   - `en/`
   - `es/`
   - `sitemap.xml`
   - `robots.txt`
   - `data/`
   - `images/`
   - `fonts/`
4. Confirme que **nenhum** destes arquivos foi enviado: `.env`, `node_modules/`, `src/`, `dist_mock_backup/`.

### Checklist pós-domínio (executar após o upload)

Marcar cada item após confirmação no navegador:

| # | Verificação | URL de teste | Status |
|---|-------------|-------------|--------|
| B1 | Homepage raiz abre | `https://worldcupgamestoday.com/` | PENDENTE — aguardar upload |
| B2 | Home pt-br abre | `https://worldcupgamestoday.com/pt-br/` | PENDENTE — aguardar upload |
| B3 | Home en abre | `https://worldcupgamestoday.com/en/` | PENDENTE — aguardar upload |
| B4 | Home es abre | `https://worldcupgamestoday.com/es/` | PENDENTE — aguardar upload |
| B5 | HTTPS ativo (cadeado verde) | `https://worldcupgamestoday.com/` | PENDENTE — aguardar propagação |
| B6 | `sitemap.xml` usa domínio real | `https://worldcupgamestoday.com/sitemap.xml` | PENDENTE — aguardar upload |
| B7 | `robots.txt` usa domínio real | `https://worldcupgamestoday.com/robots.txt` | PENDENTE — aguardar upload |
| B8 | `canonical` usa domínio real | Inspecionar `<link rel="canonical">` em qualquer página | VERIFICADO LOCALMENTE ✅ |
| B9 | `hreflang` usa domínio real | Inspecionar `<link rel="alternate" hreflang>` | VERIFICADO LOCALMENTE ✅ |
| B10 | `og:url` usa domínio real | Inspecionar `<meta property="og:url">` | VERIFICADO LOCALMENTE ✅ |
| B11 | `og:image` usa domínio real | Inspecionar `<meta property="og:image">` | VERIFICADO LOCALMENTE ✅ |
| B12 | Página de jogo abre | `https://seudominio.com/pt-br/jogos/match-001/` | PENDENTE |
| B13 | Página de seleção abre | `https://seudominio.com/pt-br/selecoes/northland/` | PENDENTE |
| B14 | Página de grupo abre | `https://seudominio.com/pt-br/grupos/m/` | PENDENTE |
| B15 | Footer com aviso FIFA presente | Inspecionar rodapé em qualquer página | PENDENTE |

**Critério de conclusão da Fase 15B:** todos os 15 itens acima marcados.

### O que fazer após confirmar domínio conectado

Me informe aqui que o domínio está apontado e o HTTPS ativo. Então:
1. Verificarei o checklist acima com você.
2. Marcarei 15B como CONCLUÍDA no CURRENT_STATUS.md e IMPLEMENTATION_PLAN.md.
3. A próxima fase será a 15D — Importar Seleções Reais.

---

## Fase 15A — Congelar MVP Mockado Aprovado — 2026-05-09 ✅

**Data:** 2026-05-09
**Status:** CONCLUÍDA

### Checklist executado

| Item | Resultado |
|------|-----------|
| `npm run build` executado | ✅ 92 páginas geradas sem erros |
| Número de páginas confirmado | ✅ 92 páginas (igual ao QA da Fase 14) |
| Estado Git verificado | ✅ Repositório limpo, branch master, up to date com origin |
| Tag `v1.0-mock` criada | ✅ Commit `6b82b6c` — enviada para origin |
| Backup `dist_mock_backup/` criado | ✅ 106 arquivos copiados |
| `dist_mock_backup/` adicionado ao `.gitignore` | ✅ |

### Referências do congelamento

- **Commit:** `6b82b6c`
- **Tag Git:** `v1.0-mock` (anotada, mensagem: "MVP mockado aprovado — 92 páginas, 3 idiomas, dados MOCK, build limpo")
- **Tag no GitHub:** `https://github.com/estudanttedogran-svg/world-cup-games-today/releases/tag/v1.0-mock`
- **Backup local:** `dist_mock_backup/` — 106 arquivos (não versionado)

### Próximas subfases recomendadas

- **15B** — Preparar domínio e PUBLIC_SITE_URL (depende de ação externa: compra de domínio)
- **15C** — Definir processo de coleta de dados reais (independente de 15B, pode iniciar em paralelo)

---

## Fase 15C — Definir Processo de Coleta de Dados Reais — 2026-05-09 ✅

**Data:** 2026-05-09
**Status:** CONCLUÍDA

### Entregas

| Entrega | Status |
|---------|--------|
| `DATA_SOURCES.md` criado na raiz do projeto | ✅ |
| Fontes primárias definidas (FIFA oficial como prioridade 1) | ✅ |
| Fontes secundárias permitidas (somente conferência cruzada) | ✅ |
| Fontes proibidas listadas (incluindo memória de IA) | ✅ |
| Protocolo de coleta passo a passo | ✅ |
| Protocolo de validação por campo | ✅ |
| Mapeamento completo para `teams.json` (interface `Team`) | ✅ |
| Mapeamento completo para `groups.json` (interface `Group`) | ✅ |
| Mapeamento completo para `matches.json` (interface `Match`) | ✅ |
| Mapeamento completo para `live-data.json` (interface `LiveData`) | ✅ |
| Como lidar com dados ausentes | ✅ |
| Como lidar com conflitos entre fontes | ✅ |
| Checklist antes do build | ✅ |
| Checklist antes de remover MOCK (Fase 15I) | ✅ |
| Checklist antes de subir produção (Fase 15J) | ✅ |
| Formato de registro de data, autor e fonte nos JSONs | ✅ |
| Formato de mensagem de commit para dados reais | ✅ |
| Valores válidos por campo (Apêndice B) | ✅ |
| `npm run build` após criação: 92 páginas sem erros | ✅ |

### Arquivos criados/alterados
- `DATA_SOURCES.md` — criado (protocolo completo)
- `IMPLEMENTATION_PLAN.md` — 15C marcada CONCLUÍDA; 15A marcada CONCLUÍDA na tabela de resumo
- `CURRENT_STATUS.md` — este registro

### Próximas subfases

- **15D** — Importar seleções reais (48 times em `teams.json`) — requer: sorteio oficial FIFA realizado e seleções todas confirmadas
- **15B** — Preparar domínio e PUBLIC_SITE_URL — pode rodar em paralelo com 15D (requer ação externa)

---

## MVP Mock Approved — 2026-05-09

**Versão:** v1.0-mock
**Data de aprovação:** 2026-05-09
**Responsável:** qa-reviewer (Claude Code)

### Checklists validados

| Checklist | Status |
|-----------|--------|
| Build — 92 páginas sem erros | ✅ APROVADO |
| Rotas principais em dist/ | ✅ APROVADO |
| Links Header e Footer | ✅ APROVADO |
| SEO técnico (sitemap, robots, canonical, hreflang, OG) | ✅ APROVADO |
| Regras de dados (MOCK, sem dados reais) | ✅ APROVADO |
| Analytics e AdSense (sem IDs reais) | ✅ APROVADO |
| Legal e conformidade de marca | ✅ APROVADO |
| live-data.json (estrutura e MOCK) | ✅ APROVADO |
| Hostinger (estrutura dist/) | ✅ APROVADO |
| Acessibilidade mobile (touch targets 44px) | ✅ APROVADO |
| FAQ nas homes (3 idiomas + JSON-LD) | ✅ APROVADO |

### Observações
- Dados reais ainda não integrados — escopo pós-MVP.
- Nenhum código funcional foi alterado neste marco.
- Commit de referência: `chore: mark mock MVP as approved`

---

## Melhoria Pós-Auditoria Estratégica — FAQ nas Homes (2026-05-09) ✅

### Objetivo
Adicionar FAQ nas homes dos três idiomas para aumentar potencial de cauda longa e featured snippets.

### Implementação

**Componente criado:** `src/components/FAQSection.astro`
- Aceita `heading` (string) e `items` (array de `{ question, answer }`)
- HTML semântico: `<section>`, `<h2>`, `<details>`, `<summary>`, `<p>`
- Acessibilidade: `summary` clicável, `focus-visible`, `min-height: 44px`, `aria-label`
- FAQPage JSON-LD schema embutido no componente — válido, refletindo exatamente o conteúdo visível
- Indicador visual +/− no `::after` do summary (sem JS)
- Mobile-first, sem dependências novas

**Páginas atualizadas:**

| Página | Idioma | Perguntas |
|--------|--------|-----------|
| `src/pages/pt-br/index.astro` | Português | 6 perguntas |
| `src/pages/en/index.astro` | English | 6 questions |
| `src/pages/es/index.astro` | Español | 6 preguntas |

**Posição:** após `.seo-text`, antes do `</div>` de fechamento — sem interferir no conteúdo principal.

### Validação

| Critério | Resultado |
|----------|-----------|
| FAQ presente nas 3 homes | ✅ |
| Nenhuma mistura de idiomas | ✅ |
| 6 perguntas por idioma | ✅ |
| FAQ após conteúdo principal | ✅ |
| Site não afirma ser oficial | ✅ |
| FAQPage JSON-LD válido | ✅ |
| Build: 92 páginas, sem erros | ✅ |

---

## Correção Acessibilidade/Mobile — Touch Targets 44px (2026-05-09) ✅

### Problema
Botões principais com altura entre 37–39px, abaixo do mínimo recomendado (44px) para toque em mobile.

### Solução
Adicionado `min-height: 44px` em todos os elementos interativos principais. Para os botões sem `display: flex`, adicionados também `display: inline-flex; align-items: center; justify-content: center;` para garantir centralização vertical correta.

### Arquivos alterados

| Arquivo | Elemento | Alteração |
|---------|----------|-----------|
| `src/components/TimezoneSelector.astro` | `.tz-selector__select` | `min-height: 44px` |
| `src/components/TimezoneSelector.astro` | `.tz-selector__btn` | `display: inline-flex; align-items: center; justify-content: center; min-height: 44px` |
| `src/components/TeamSelector.astro` | `.team-selector__select` | `min-height: 44px` |
| `src/components/TeamSelector.astro` | `.team-selector__btn` | `display: inline-flex; align-items: center; justify-content: center; min-height: 44px` |
| `src/components/ShareButtons.astro` | `.share-btn` | `min-height: 44px` |
| `src/components/CalendarButtons.astro` | `.cal-btn` | `min-height: 44px` |

### Build
92 páginas geradas sem erros. Layout desktop não afetado.

### Checklist mobile pós-correção: APROVADO ✅

---

## Correção Pós-Auditoria SEO — robots.txt + og:image (2026-05-09) ✅

### Diagnóstico

| Ponto | Status encontrado | Ação |
|-------|-------------------|------|
| robots.txt | Já correto no src (`Allow: /`, sem bloqueio Googlebot) | Confirmado — sem alteração no fonte |
| og:image | Ausente em todas as páginas | Corrigido |

### Correção 1 — robots.txt

O arquivo `src/pages/robots.txt.ts` já gerava corretamente:
```
User-agent: *
Allow: /

Sitemap: https://worldcupgamestoday.com/sitemap.xml
```
Nenhum bloqueio de Googlebot. Nenhuma rota bloqueada. O dist confirmado correto após rebuild.

### Correção 2 — og:image padrão

**Problema:** `BaseLayout.astro` só emitia `og:image` quando a prop `ogImage` era passada explicitamente. Nenhuma página passava essa prop → tag ausente em 92 páginas.

**Solução:**
1. Criado `public/images/og-default.svg` (1200×630) — design neutro, texto "World Cup Games Today / World Cup 2026 matches in your local time", sem identidade oficial FIFA
2. `BaseLayout.astro`: adicionada variável `resolvedOgImage = ogImage || defaultOgImage` com URL absoluta via `PUBLIC_SITE_URL`
3. Tags og:image, og:image:width (1200), og:image:height (630) agora emitidas em todas as páginas
4. `twitter:card` atualizado para `summary_large_image` (melhor preview com imagem grande)
5. `twitter:image` agora sempre presente

### Arquivos alterados

| Arquivo | Alteração |
|---------|-----------|
| `public/images/og-default.svg` | Criado — imagem OG padrão 1200×630 |
| `src/layouts/BaseLayout.astro` | `resolvedOgImage` com fallback; og:image + og:image:width/height sempre presentes; twitter:card → summary_large_image |
| `CURRENT_STATUS.md` | Esta entrada |

### Build
92 páginas geradas sem erros. og:image e twitter:image presentes em todas as páginas.

### SEO Técnico pós-correção: APROVADO ✅

| Critério | Status |
|----------|--------|
| robots.txt permite Googlebot | ✅ |
| robots.txt não bloqueia nenhuma rota | ✅ |
| Sitemap correto (92 URLs) | ✅ |
| og:image em todas as páginas | ✅ |
| og:image URL absoluta | ✅ |
| og:image:width / og:image:height | ✅ |
| twitter:image em todas as páginas | ✅ |
| twitter:card = summary_large_image | ✅ |

---

## Correção Pós-QA — Checklist Páginas Dinâmicas (2026-05-09) ✅

### Correção 1 — Links entre seleções nas páginas de seleção

**Problema:** Páginas de seleção (`/pt-br/selecoes/[slug]`) não exibiam links para as outras seleções do mesmo grupo.

**Causa raiz:** A seção "Outras Seleções do Grupo" existia no template mas estava incompleta — faltavam os styles CSS para `.group-teams-section`, `.group-teams-list` e `.group-link`.

**Solução:**
- `src/pages/pt-br/selecoes/[slug].astro`: adicionados styles CSS para a seção de outras seleções do grupo (cards com pill buttons + link para página do grupo)

### Correção 2 — Overflow horizontal no mobile nas páginas de grupo

**Problema:** Em mobile (390px), a tabela de classificação com `min-width: 480px` podia propagar scroll horizontal para o body da página.

**Causa raiz:** `.group-table-wrapper` em `GroupTable.astro` não tinha `max-width: 100%` — sem essa constraint, o wrapper podia crescer além da viewport em alguns contextos de layout, fazendo a tabela vazar para além da borda da tela.

**Solução:**
- `src/components/GroupTable.astro`: adicionado `max-width: 100%; box-sizing: border-box;` ao `.group-table-wrapper`. O `overflow: hidden` já existente + o inner `.table-wrapper { overflow-x: auto }` passam a funcionar corretamente dentro da constraint de largura.

### Arquivos alterados

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/pt-br/selecoes/[slug].astro` | CSS para `.group-teams-section`, `.group-teams-list`, `.group-link` |
| `src/components/GroupTable.astro` | `max-width: 100%; box-sizing: border-box;` no `.group-table-wrapper` |

### Build
92 páginas geradas sem erros.

---

## Checklist 5 — Dados dos Jogos: APROVADO COM OBSERVAÇÃO (2026-05-09)

### Resultado: APROVADO ✅ (com observação menor)

| Item | Resultado |
|------|-----------|
| Bug crítico de fuso (Checklist 4) confirmado corrigido | ✅ UTC 18:00Z → São Paulo 15:00 / Paris 20:00 |
| Conversão bidirecional de timezone | ✅ Funcionando |
| Jogos mockados aparecem corretamente | ✅ |
| Badge MOCK visível | ✅ |
| Jogos `confirmed` exibem times | ✅ |
| `simulation` não aparece como jogo real | ✅ |
| Datas, fases, ordenação e status coerentes | ✅ |
| Confrontos impossíveis | ✅ Nenhum encontrado |
| Jogos `partial` com "A definir" | ⚠️ Não testáveis visualmente nesta rodada — mock atual nas páginas auditadas não apresentou mata-mata/parciais visíveis |
| `/pt-br/selecoes/brasil` | ⚠️ Retorna 404 — não é bug de código; é consequência do mock (ver observação) |

### Observação — `/pt-br/selecoes/brasil` e similares (não é bug de código)
As rotas de seleções reais (Brasil, Argentina, México, etc.) não existem no build atual porque os dados usam equipes fictícias. O Astro gera as páginas dinamicamente a partir de `teams.json` — quando o arquivo contiver as 48 seleções reais com slugs corretos (`brasil`, `argentina`, etc.), rodar `npm run build` gerará automaticamente todas as páginas. **Não há hotfix possível: depende da substituição dos dados mock pelos dados reais, seguida de rebuild e re-upload do `dist/`.**

---

## Correção Pós-QA — Bug Checklist 4: Horários Reativos ao Fuso ✅ (2026-05-09)

### Problema
Os horários dos jogos eram renderizados estaticamente no build (SSG) e não atualizavam quando o usuário trocava o fuso horário. O seletor salvava a preferência no localStorage e recarregava a página, mas a página sempre renderizava com o `defaultTimezone` do build.

### Causa raiz
Ausência de lógica client-side para reformatar os horários exibidos após a seleção de um novo fuso.

### Solução
**Abordagem:** data attributes + script global + evento customizado

1. **`data-utc-datetime`** e **`data-tz-format`** adicionados a todos os elementos que exibem horários/datas derivados de UTC.
2. **Script global** em `BaseLayout.astro` (is:inline IIFE) que:
   - Na carga da página: lê timezone salvo em `wcgt_prefs` e aplica a todos os `[data-utc-datetime]`
   - Escuta evento `wcgt:timezone-change` para atualizar imediatamente sem reload
3. **`TimezoneSelector.astro`**: substituído `window.location.reload()` por `document.dispatchEvent(new CustomEvent('wcgt:timezone-change', { detail: { timezone: chosen } }))` + atualização do label de exibição
4. **`data-tz-label`** em spans de nome de cidade para atualizar junto com o fuso

### Arquivos alterados

| Arquivo | Alteração |
|---------|-----------|
| `src/layouts/BaseLayout.astro` | Script global de reformatação por fuso (IIFE inline) |
| `src/components/TimezoneSelector.astro` | Substituído reload por dispatch de evento + atualização de label |
| `src/components/MatchList.astro` | `<time>` com `data-utc-datetime` + `data-tz-format="full"` |
| `src/components/NextMatchCard.astro` | `<time>` com `data-utc-datetime` + `data-tz-format="full"` |
| `src/pages/pt-br/calendario-copa-2026.astro` | Spans weekday/time com data attributes |
| `src/pages/pt-br/jogos/[id].astro` | Spans date + time com data attributes + data-tz-label |
| `src/pages/en/matches/[id].astro` | Spans date + time com data attributes + data-tz-label |
| `src/pages/es/partidos/[id].astro` | Spans date + time com data attributes + data-tz-label |

### Verificação de math timezone para `2026-06-12T18:00:00Z`

| Timezone | Esperado | Comportamento |
|----------|----------|---------------|
| America/Sao_Paulo (UTC-3) | 15:00 | Script aplica corretamente |
| Europe/Paris (UTC+2) | 20:00 | Script aplica corretamente |
| America/New_York (UTC-4) | 14:00 | Script aplica corretamente |
| America/Mexico_City (UTC-6) | 12:00 | Script aplica corretamente |

### Build
92 páginas sem erros.

---

## Correção Pós-QA — Bug Checklist 3: Timezone Labels i18n ✅ (2026-05-09)

### Problema
O seletor de fuso horário (`TimezoneSelector.astro`) exibia labels e regiões hardcoded em português em todas as versões do site (incluindo `/en/` e `/es/`).

### Causa raiz
`getPopularTimezones()` em `src/utils/timezone.ts` tinha um único array de dados com labels em PT-BR. O parâmetro `_locale` existia mas era ignorado (prefixado com `_`).

### Solução
Reestruturação de `timezone.ts`: cada timezone agora armazena um objeto `labels` com as três traduções (`pt-br`, `en`, `es`), e as regiões são resolvidas via mapa `regionLabels`. `getPopularTimezones(locale)` agora retorna o label/região correto para o idioma solicitado. O `TimezoneSelector.astro` foi atualizado para passar `locale` ao chamar a função.

### Arquivos alterados

| Arquivo | Alteração |
|---------|-----------|
| `src/utils/timezone.ts` | Substituído array único por estrutura com `labels` trilingue por timezone + mapa `regionLabels` |
| `src/components/TimezoneSelector.astro` | `getPopularTimezones()` → `getPopularTimezones(locale)` |

### Verificação no HTML gerado

| Rota | America/New_York | America/Mexico_City | Região SA |
|------|-----------------|--------------------|-----------| 
| `/pt-br/` | Nova York — América do Norte | Cidade do México — América do Norte | América do Sul |
| `/en/` | New York — North America | Mexico City — North America | South America |
| `/es/` | Nueva York — América del Norte | Ciudad de México — América del Norte | América del Sur |

### Build
92 páginas geradas sem erros.

---

## Fase 14 — Build + Validação Final ✅ (2026-05-09)

### Resultado geral: APROVADO

Build final: 92 páginas geradas sem erros.
Única correção aplicada: sitemap.xml atualizado para incluir as 15 páginas institucionais.

### Arquivo criado

| Arquivo | Descrição |
|---------|-----------|
| `FINAL_QA_REPORT.md` | Relatório completo da revisão QA final com 9 verificações |

### Arquivo alterado

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/sitemap.xml.ts` | Adicionadas 15 URLs institucionais ao `staticUrls` — sitemap passou de 77 para 92 entradas |

### Verificações realizadas

| # | Verificação | Status |
|---|-------------|--------|
| 1 | Build npm run build | OK — 92 páginas, sem erros |
| 2 | Rotas principais em dist/ | OK — todas as 19+ rotas existem |
| 3 | Links Header e Footer | OK — sem links quebrados ou # pendentes |
| 4 | SEO técnico | OK — sitemap corrigido, robots, canonical, hreflang, OG presentes |
| 5 | Regras de dados | OK — todos MOCK, sem dados reais |
| 6 | Analytics e AdSense | OK — sem IDs reais, GA condicional |
| 7 | Legal e conformidade | OK — aviso de independência em 3 idiomas |
| 8 | live-data.json | OK — válido, copiado para dist/ |
| 9 | Estrutura para Hostinger | OK — index.html na raiz, _astro/ presente |

### Riscos residuais

- Nenhum risco bloqueante para upload do MVP
- Pendências para producão real: domínio, dados reais, GA, AdSense, og:image (documentadas em FINAL_QA_REPORT.md e CHECKLIST_LANCAMENTO.md)

---

## Fase 13 — Documentação ✅ (2026-05-09)

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `README.md` | Documentação completa em português para o mantenedor: instalação, build, deploy na Hostinger, variáveis de ambiente, Analytics, AdSense, dados, idiomas, localStorage, SEO |
| `CHECKLIST_LANCAMENTO.md` | Lista de verificação para lançamento com 7 seções: pré-lançamento, upload, testes pós-deploy, Google Analytics, Google Search Console, dados reais e Google AdSense |

### Validação

- `npm run build`: **92 páginas** geradas sem erros
- Nenhum arquivo de código alterado nesta fase

### Riscos e pendências

- Nenhum risco bloqueante
- Fase 14 (Build + Validação Final) é a última fase antes do MVP completo

---

---

## Fase 12 — Analytics + AdSense (Placeholders) ✅ (2026-05-09)

### Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `src/layouts/BaseLayout.astro` | Adicionado bloco condicional GA: só insere scripts se `PUBLIC_GA_MEASUREMENT_ID` não estiver vazio. Usa `anonymize_ip: true`. Fica após `<Footer />` antes de `</body>`. |
| `src/components/AdPlaceholder.astro` | Melhorado com props `size` (`banner` / `rectangle` / `sidebar`) e `lang` (`pt-br` / `en` / `es`). Adicionado `data-ad-slot` attribute. Textos localizados. CSS responsivo para tamanhos IAB. |
| `src/utils/analytics.ts` | Sem alterações — arquivo já estava completo com todos os eventos necessários. |

### Verificações realizadas

- **analytics.ts**: todos os eventos necessários presentes (`trackTimezoneChange`, `trackLocaleChange`, `trackTeamSelect`, `trackShareClick`, `trackMatchView`, `trackEvent`)
- **AdPlaceholder posicionamento**: verificado em todas as páginas principais — todas em posições corretas (após conteúdo principal, nunca antes)
- **Política de Privacidade**: já menciona Google Analytics e Google AdSense — sem alteração necessária
- **Páginas institucionais**: não alteradas

### Posicionamento de AdPlaceholder verificado

| Página | Posição do AdPlaceholder | Conforme? |
|--------|--------------------------|-----------|
| `pt-br/index.astro` | Após NextMatchCard, antes dos jogos de hoje | Sim |
| `pt-br/jogos-de-hoje-copa.astro` | Após lista de jogos de hoje | Sim |
| `pt-br/tabela-copa-2026.astro` | Entre classificação e lista de jogos | Sim |
| `pt-br/calendario-copa-2026.astro` | Após o calendário completo | Sim |

### Validação

- `npm run build`: **92 páginas** geradas sem erros nem warnings
- Comportamento com `PUBLIC_GA_MEASUREMENT_ID` vazio: nenhum script GA adicionado ao HTML
- Comportamento com `PUBLIC_GA_MEASUREMENT_ID` preenchido: scripts GA carregados com `anonymize_ip: true`

### Como ativar Analytics futuramente

Preencher `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` no arquivo `.env` (ou variável de ambiente na Hostinger) e fazer rebuild.

### Como inserir AdSense futuramente

Substituir o componente `AdPlaceholder.astro` por bloco `<ins class="adsbygoogle">` com o `ca-pub-XXXXXXXXXX` e `data-ad-slot` fornecidos pelo Google AdSense, usando o atributo `data-ad-slot` já presente no componente como referência de posição.

### Riscos e pendências

- Nenhum risco bloqueante
- Chaves específicas de localStorage (`wcgt_lang`, `wcgt_timezone`, `wcgt_team`) ainda não nomeadas explicitamente na Política de Privacidade — pendência menor, recomendada para Fase 13

---

## Revisão QA — Fase 11 ✅ (2026-05-09)

**Resultado:** APROVADA — nenhum problema bloqueante
**Build:** 92 páginas geradas sem erros nem warnings

---

## Revisão QA — Fase 11 ✅ (2026-05-09)

**Resultado:** APROVADA — nenhum problema bloqueante
**Build:** 92 páginas geradas sem erros nem warnings

### Problemas encontrados
- Nenhum problema bloqueante
- Aviso menor: política de privacidade PT-BR cita as funcionalidades do localStorage genericamente (idioma, fuso, time favorito) mas não lista os nomes das chaves (`wcgt_lang`, `wcgt_timezone`, `wcgt_team`). Não bloqueante para MVP.

### Correções aplicadas
- Nenhuma correção necessária

### Riscos residuais
- Chaves específicas de localStorage não nomeadas na Política de Privacidade (aviso menor, corrigível na Fase 13 — Documentação)

---

## Fase 11 — Páginas Institucionais ✅ (2026-05-08)

### Arquivos criados

| Arquivo | URL gerada |
|---------|------------|
| `src/pages/pt-br/sobre.astro` | `/pt-br/sobre` |
| `src/pages/pt-br/contato.astro` | `/pt-br/contato` |
| `src/pages/pt-br/politica-de-privacidade.astro` | `/pt-br/politica-de-privacidade` |
| `src/pages/pt-br/termos-de-uso.astro` | `/pt-br/termos-de-uso` |
| `src/pages/pt-br/aviso-legal.astro` | `/pt-br/aviso-legal` |
| `src/pages/en/about.astro` | `/en/about` |
| `src/pages/en/contact.astro` | `/en/contact` |
| `src/pages/en/privacy-policy.astro` | `/en/privacy-policy` |
| `src/pages/en/terms-of-use.astro` | `/en/terms-of-use` |
| `src/pages/en/legal-notice.astro` | `/en/legal-notice` |
| `src/pages/es/sobre.astro` | `/es/sobre` |
| `src/pages/es/contacto.astro` | `/es/contacto` |
| `src/pages/es/politica-de-privacidad.astro` | `/es/politica-de-privacidad` |
| `src/pages/es/terminos-de-uso.astro` | `/es/terminos-de-uso` |
| `src/pages/es/aviso-legal.astro` | `/es/aviso-legal` |

### Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `src/components/Footer.astro` | Links do footer atualizados de `#` para URLs reais das páginas institucionais. Adicionado "Aviso Legal" / "Legal Notice" / "Aviso Legal" em cada idioma. |

### Validação

- `npm run build`: **92 páginas** geradas sem erros (77 anteriores + 15 novas)
- `dist/robots.txt`: presente
- `dist/sitemap.xml`: presente
- Todas as 15 páginas renderizadas com sucesso

### Conteúdo implementado

**Estrutura de cada página:**
- `BaseLayout` com `title`, `description`, `lang`, `locale`, `canonicalUrl`, `alternates` (hreflang)
- `<h1>` principal
- Parágrafos em prosa (sem dados inventados de jogos)
- Nav de links internos no rodapé da página para outras páginas do mesmo idioma

**Hreflang configurado:**
- `/pt-br/sobre` ↔ `/en/about` ↔ `/es/sobre`
- `/pt-br/contato` ↔ `/en/contact` ↔ `/es/contacto`
- `/pt-br/politica-de-privacidade` ↔ `/en/privacy-policy` ↔ `/es/politica-de-privacidad`
- `/pt-br/termos-de-uso` ↔ `/en/terms-of-use` ↔ `/es/terminos-de-uso`
- `/pt-br/aviso-legal` ↔ `/en/legal-notice` ↔ `/es/aviso-legal`

**Política de Privacidade cobre:**
- Logs automáticos do servidor
- localStorage (idioma, fuso, time favorito)
- Google Analytics (futuro, anonimizado)
- Google AdSense (futuro)
- Sem login/cadastro no MVP
- Direitos do usuário
- Contato para dúvidas

**Termos de Uso cobrem:**
- Uso exclusivamente informativo
- Dados sujeitos a alteração sem aviso
- Isenção de responsabilidade por dados desatualizados
- Independência da FIFA
- Propriedade intelectual

**Aviso Legal:**
- Disclaimer obrigatório de independência da FIFA
- Uso de marcas apenas para fins informativos e descritivos
- Operado por entusiastas do esporte

### Conformidade de marca

- Nenhuma imagem protegida da FIFA usada
- Nenhum logo oficial da Copa 2026 usado
- Nenhum mascote oficial usado
- Linguagem claramente independente e descritiva
- Sem sugestão de afiliação oficial

### Riscos e pendências

| Item | Impacto |
|------|---------|
| Footer links agora apontam para URLs reais — confirmar que todas as páginas estão acessíveis após deploy | Baixo — build confirma geração correta |
| Aviso legal no footer difere levemente da versão es (inclui "ninguna") vs. o aviso legal nas páginas es | Mínimo — ambos comunicam claramente a independência |
| Fase 12 pendente: stubs de Analytics e placeholders de AdSense ainda não implementados | Médio — sem GA e AdSense o site funciona normalmente |

---

## Fase 10C — SportsEvent JSON-LD ✅ (2026-05-08)

### Arquivos criados

| Arquivo | Ação |
|---------|------|
| `src/utils/schema.ts` | CRIADO — utilitário puro `buildSportsEventSchema()` com interface tipada |

### Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `src/pages/pt-br/jogos/[id].astro` | Importação do schema; cálculo de `schemaData`; injeção via `slot="head"` |
| `src/pages/en/matches/[id].astro` | Importação do schema; cálculo de `schemaData`; injeção via `slot="head"` |
| `src/pages/es/partidos/[id].astro` | Importação do schema; cálculo de `schemaData`; injeção via `slot="head"` |

### O que foi implementado

**`src/utils/schema.ts`**

Função pura `buildSportsEventSchema(opts: SportsEventSchemaOptions): object` que retorna objeto JSON-LD com:
- `@type`: `SportsEvent`
- `name`: `{homeTeam} vs {awayTeam}` (separador neutro internacional)
- `description`: aviso explícito "(demonstration data)"
- `startDate`: `datetime_utc` exato da partida
- `sport`: `"Soccer"` (padrão schema.org)
- `eventStatus`: `"https://schema.org/EventScheduled"`
- `eventAttendanceMode`: `"https://schema.org/OfflineEventAttendanceMode"`
- `location`: estádio, cidade e país em inglês
- `competitor`: array de dois `SportsTeam` com nomes em inglês
- `url`: URL canônica da página

**Não incluídos no schema (por política):**
- Scores/placar — dado mock não confiável
- Organizer com nome FIFA — sem afiliação
- Imagens — sem URL real
- Preços ou ingressos

**Injeção nas páginas**

Padrão idêntico nas três versões de idioma:
```astro
{schemaData && (
  <script type="application/ld+json" set:html={JSON.stringify(schemaData)} slot="head" />
)}
```

Usando `<slot name="head" />` já existente no `BaseLayout.astro` — sem alteração no layout.

### Regras de emissão do JSON-LD

| Tipo de partida | JSON-LD emitido? | Motivo |
|-----------------|------------------|--------|
| `confirmed` (com homeTeam e awayTeam definidos) | SIM | Times, data e local conhecidos |
| `partial` (teams nulos) | NÃO | Times indefinidos — schema seria enganoso |
| `simulation` | NÃO | Dado fictício — nunca schema de evento real |

### Nomes dos times no schema

Sempre em inglês, independente do locale da página:
```typescript
const homeTeamNameForSchema = homeTeam?.name['en'] ?? homeTeam?.name['pt-br'] ?? homeTeamName;
```

### Validação

- `npm run build`: 77 páginas geradas sem erros
- `dist/robots.txt` presente
- `dist/sitemap.xml` presente
- JSON-LD verificado em match-001 (confirmed): presente e correto
- JSON-LD verificado em match-009 (partial): AUSENTE (correto)
- Todos os 8 jogos confirmed têm JSON-LD nas três versões de idioma
- Todos os 3 jogos partial sem JSON-LD

### Riscos e pendências

| Item | Impacto |
|------|---------|
| Dados mock — nomes de times, estádios e datas são fictícios | Alto — schema com dados reais exige revisão completa antes do lançamento |
| `url` no schema aponta para cada URL de idioma (pt-br, en, es) separadamente — não há schema único centralizado | Baixo — comportamento correto (cada página tem sua própria URL canônica) |
| `eventStatus` fixado como `EventScheduled` — não será atualizado automaticamente após término | Médio — exige processo de atualização quando jogos forem encerrados |

---

## Fase 10B — Open Graph completo + Twitter Card ✅ (2026-05-08)

### Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `src/layouts/BaseLayout.astro` | Atualizado — novas props OG e Twitter Card; derivacao automatica de `ogLocale` e `ogLocaleAlternates` |
| `src/pages/pt-br/jogos/[id].astro` | Atualizado — `ogType="article"` para partidas `confirmed` |
| `src/pages/en/matches/[id].astro` | Atualizado — `ogType="article"` para partidas `confirmed` |
| `src/pages/es/partidos/[id].astro` | Atualizado — `ogType="article"` para partidas `confirmed` |

### O que foi implementado

**`src/layouts/BaseLayout.astro`**

Novas props adicionadas (todas opcionais — retrocompatibilidade total):
- `ogType?: string` — 'website' | 'article' — padrao: 'website'
- `ogImage?: string` — URL absoluta da imagem OG — nao emitida se ausente
- `ogLocale?: string` — ex: 'pt_BR', 'en_US', 'es_ES' — derivado automaticamente de `locale` se omitido
- `ogLocaleAlternates?: string[]` — derivado automaticamente de `alternates` se omitido
- `twitterCard?: string` — 'summary' | 'summary_large_image' — padrao: 'summary'

Tags Open Graph emitidas:
- `og:title` — sempre emitido (valor de `title`)
- `og:description` — sempre emitido (valor de `description`, string vazia se ausente)
- `og:type` — `ogType ?? 'website'`
- `og:url` — `canonicalUrl` (ou pathname automatico)
- `og:site_name` — "World Cup Games Today" (hardcoded)
- `og:locale` — derivado de `locale` automaticamente ('pt-br' -> 'pt_BR', 'en' -> 'en_US', 'es' -> 'es_ES')
- `og:locale:alternate` — derivado de `alternates` (hreflang) automaticamente, excluindo 'x-default'
- `og:image` — somente se `ogImage` for passado

Tags Twitter Card emitidas:
- `twitter:card` — `twitterCard ?? 'summary'`
- `twitter:title` — valor de `title`
- `twitter:description` — valor de `description`
- `twitter:image` — somente se `ogImage` for passado

Derivacao automatica no frontmatter:
- `ogLocale`: mapeado via `localeToOgLocale` ('pt-br' -> 'pt_BR', 'en' -> 'en_US', 'es' -> 'es_ES')
- `ogLocaleAlternates`: mapeado via `hreflangToOgLocale` a partir de `alternates?.map(a => hreflangToOgLocale[a.hreflang])` — exclui 'x-default' automaticamente (nao tem mapeamento)

**Paginas de jogo (pt-br, en, es)**
- `ogType={match.type === 'confirmed' ? 'article' : 'website'}` adicionado
- Partidas `confirmed`: `og:type` = 'article'
- Partidas `partial` e `simulation`: `og:type` = 'website' (padrao)

### Regras respeitadas
- `og:image` e `twitter:image` nao emitidos — imagem OG pendente (ver pendencias)
- `simulation` nao recebe `og:type` = 'article' — regra de classificacao mantida
- Nenhuma pagina nova criada — total permanece 77 paginas
- Nenhuma dependencia nova instalada
- Conteudo visual das paginas nao alterado
- SportsEvent JSON-LD nao implementado (Fase 10C)
- sitemap.xml e robots.txt nao alterados

### Validacao
- `npm run build`: 77 paginas geradas sem erros
- Zero erros TypeScript
- `dist/robots.txt` presente
- `dist/sitemap.xml` presente
- Total de paginas: 77 (sem alteracao)

### Riscos e pendencias

| Item | Impacto |
|------|---------|
| Imagem OG (`og:image` e `twitter:image`) nao criada — sem URL real e sem identidade visual definida | Medio — compartilhamentos em redes sociais nao exibiram preview de imagem ate a imagem ser criada e hospedada |
| `og:description` emite string vazia quando `description` nao passado — tecnicamente valido, mas nao ideal | Baixo — todas as paginas ja passam `description` |
| `og:locale:alternate` derivado de hreflang — 'x-default' nao mapeado (excluido corretamente) | Nenhum |
| Fase 10C pendente — SportsEvent JSON-LD | Proxima fase |

---

---

## Correção pós-Fase 10A — robots.txt dinâmico ✅ (2026-05-08)

### Problema corrigido
1. `public/robots.txt` bloqueava `/data/` — removido (live-data.json é usado pelo cliente)
2. Domínio hardcoded no robots.txt — substituído por endpoint dinâmico que usa `PUBLIC_SITE_URL`

### Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `public/robots.txt` | **Removido** — substituído pelo endpoint dinâmico |
| `src/pages/robots.txt.ts` | **Criado** — endpoint Astro que usa `PUBLIC_SITE_URL`; sem Disallow; Sitemap com URL dinâmica |

### Validação
- `npm run build`: 77 páginas + `robots.txt` + `sitemap.xml` em `dist/` ✅
- `/data/` não bloqueado ✅
- URL do sitemap gerada via `PUBLIC_SITE_URL || 'https://worldcupgamestoday.com'` ✅

---

## Fase 10A — sitemap.xml, robots.txt, canonical e hreflang ✅

### Arquivos criados/alterados

| Arquivo | Ação |
|---------|------|
| `src/layouts/BaseLayout.astro` | Atualizado — novas props `canonicalUrl` e `alternates` (hreflang); compatibilidade retroativa mantida |
| `src/pages/sitemap.xml.ts` | Criado — endpoint Astro que gera sitemap.xml em build time (sem dependência nova) |
| `public/robots.txt` | Criado — permite rastreamento geral, bloqueia `/data/`, referencia sitemap |
| `src/pages/index.astro` | Atualizado — canonical + hreflang (x-default, pt-BR, en, es) |
| `src/pages/pt-br/index.astro` | Atualizado — canonical + hreflang (x-default, pt-BR, en, es) |
| `src/pages/en/index.astro` | Atualizado — canonical + hreflang (x-default, pt-BR, en, es) |
| `src/pages/es/index.astro` | Atualizado — canonical + hreflang (x-default, pt-BR, en, es) |
| `src/pages/pt-br/jogos-de-hoje-copa.astro` | Atualizado — canonical + hreflang (pt-BR, en, es) |
| `src/pages/en/world-cup-games-today.astro` | Atualizado — canonical + hreflang (pt-BR, en, es) |
| `src/pages/es/partidos-de-hoy-mundial.astro` | Atualizado — canonical + hreflang (pt-BR, en, es) |
| `src/pages/pt-br/tabela-copa-2026.astro` | Atualizado — canonical + hreflang (pt-BR, en, es) |
| `src/pages/en/world-cup-2026-schedule.astro` | Atualizado — canonical + hreflang (pt-BR, en, es) |
| `src/pages/es/calendario-mundial-2026.astro` | Atualizado — canonical + hreflang (pt-BR, en, es) |
| `src/pages/pt-br/calendario-copa-2026.astro` | Atualizado — canonical apenas (sem alternates — página sem equivalente en/es) |
| `src/pages/pt-br/selecoes/index.astro` | Atualizado — canonical + hreflang (pt-BR, en, es) |
| `src/pages/en/teams/index.astro` | Atualizado — canonical + hreflang (pt-BR, en, es) |
| `src/pages/es/equipos/index.astro` | Atualizado — canonical + hreflang (pt-BR, en, es) |
| `src/pages/pt-br/selecoes/[slug].astro` | Atualizado — canonical + hreflang por slug (pt-BR, en, es) |
| `src/pages/en/teams/[slug].astro` | Atualizado — canonical + hreflang por slug (pt-BR, en, es) |
| `src/pages/es/equipos/[slug].astro` | Atualizado — canonical + hreflang por slug (pt-BR, en, es) |
| `src/pages/pt-br/grupos/[grupo].astro` | Atualizado — canonical + hreflang por slug de grupo (pt-BR, en, es) |
| `src/pages/en/groups/[group].astro` | Atualizado — canonical + hreflang por slug de grupo (pt-BR, en, es) |
| `src/pages/es/grupos/[group].astro` | Atualizado — canonical + hreflang por slug de grupo (pt-BR, en, es) |
| `src/pages/pt-br/jogos/[id].astro` | Atualizado — canonical + hreflang por match.id (pt-BR, en, es) |
| `src/pages/en/matches/[id].astro` | Atualizado — canonical + hreflang por match.id (pt-BR, en, es) |
| `src/pages/es/partidos/[id].astro` | Atualizado — canonical + hreflang por match.id (pt-BR, en, es) |

### O que foi implementado

**`src/layouts/BaseLayout.astro`**
- Interface `HreflangAlternate` adicionada: `{ hreflang: string; href: string }`
- Prop `canonicalUrl` (nova, opcional) — tem prioridade sobre `canonical` (legada) e sobre o pathname automático
- Prop `alternates` (nova, opcional) — array de `HreflangAlternate`
- Tags `<link rel="alternate" hreflang="...">` renderizadas no `<head>` se `alternates` for passado
- Compatibilidade total: todas as páginas que não passam as props novas continuam funcionando sem erros

**`src/pages/sitemap.xml.ts`**
- Endpoint Astro (APIRoute) que gera XML em build time — sem dependências novas
- Usa `PUBLIC_SITE_URL` com fallback `https://worldcupgamestoday.com`
- Importa `matches.json`, `teams.json`, `groups.json` — URLs geradas a partir dos dados
- Exclui partidas do tipo `simulation` do sitemap (apenas `confirmed` e `partial`)
- URLs incluídas:
  - 4 URLs fixas de raiz/homes (`/`, `/pt-br/`, `/en/`, `/es/`)
  - 3 URLs fixas de "jogos de hoje" (pt-br, en, es)
  - 3 URLs fixas de tabela/schedule (pt-br, en, es)
  - 1 URL de calendário pt-br
  - 3 URLs de índice de seleções (pt-br, en, es)
  - 24 URLs de times (8 times × 3 idiomas)
  - 6 URLs de grupos (2 grupos × 3 idiomas)
  - 33 URLs de partidas (11 partidas × 3 idiomas)
- Total: 77 URLs no sitemap

**`public/robots.txt`**
- `User-agent: *` — todos os crawlers
- `Allow: /` — todo o site indexável
- `Disallow: /data/` — bloqueia `live-data.json` de indexação
- `Sitemap: https://worldcupgamestoday.com/sitemap.xml`

**Padrão de hreflang aplicado:**
- `x-default`: `{siteUrl}/` — somente nas homes (raiz e `/pt-br/`, `/en/`, `/es/`)
- `pt-BR`: `{siteUrl}/pt-br/...`
- `en`: `{siteUrl}/en/...`
- `es`: `{siteUrl}/es/...`
- Páginas dinâmicas: slug/id idêntico nos três idiomas (ex: `northland`, `match-001`, `m`)

### Decisões técnicas

- Sitemap gerado via endpoint Astro (`src/pages/sitemap.xml.ts`) em vez de plugin — sem dependência nova
- `@astrojs/sitemap` não estava instalado em `package.json` — decisão correta: não instalar
- `canonicalUrl` como prop nova com prioridade sobre `canonical` (legacy) — retrocompatível
- `calendario-copa-2026` (pt-br) sem alternates — não há equivalente direto en/es
- Nenhuma página de 404, asset ou dado incluído no sitemap

### Validação

- `npm run build`: 77 páginas geradas sem erros ✅
- Zero erros TypeScript ✅
- `dist/sitemap.xml` gerado ✅
- `dist/robots.txt` copiado de `public/` ✅
- Endpoint `src/pages/sitemap.xml.ts` renderizado como `/sitemap.xml` em `dist/` ✅
- Total de páginas: 77 (sem alteração — sitemap.xml é endpoint, não página HTML contada) ✅
- Nenhuma página existente quebrada ✅
- Nenhuma dependência nova instalada ✅

### Riscos e pendências

| Item | Impacto |
|------|---------|
| `robots.txt` referencia o domínio hardcoded `worldcupgamestoday.com` — não usa `PUBLIC_SITE_URL` (arquivo estático, não processado pelo Astro) | Baixo — trocar manualmente se o domínio mudar |
| Sitemap sem `<lastmod>` e sem `<priority>` — formato mínimo válido | Baixo — adequado para MVP; adicionar em fase futura se necessário |
| `calendario-copa-2026` (pt-br) não tem equivalentes en/es — sem hreflang nessa página | Aceitável — página sem equivalente cross-language confirmado |
| Fase 10B pendente — Open Graph completo + SportsEvent JSON-LD | Próxima fase |

---

## Fase 9D — Refinamento i18n de componentes compartilhados ✅

### Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `src/utils/share.ts` | Atualizado — `buildWhatsAppText` agora usa `locale` para gerar textos em pt-br, en e es |
| `src/components/ShareButtons.astro` | Atualizado — `data-locale` adicionado ao container; script client-side usa locale para textos WhatsApp |
| `src/utils/calendar.ts` | Atualizado — `buildCalendarEventData` aceita `locale` opcional e localiza summary/description em pt-br, en, es |
| `src/components/CalendarButtons.astro` | Atualizado — `locale` passado para `buildCalendarEventData`; `data-locale` adicionado ao botão ICS; script client-side usa locale |

### O que foi implementado

**`src/utils/share.ts`**
- Campo `locale?: Locale` adicionado a `ShareMatchContext` (opcional, padrão `'pt-br'` — sem quebrar chamadas existentes)
- `buildWhatsAppText` agora gera textos diferenciados para 3 idiomas e 3 tipos de partida:
  - `confirmed` pt-br: "⚽ HomeTeam x AwayTeam\n🕐 data às hora\nVeja no World Cup Games Today: url"
  - `confirmed` en: "⚽ HomeTeam vs AwayTeam\n🕐 date at time\nSee on World Cup Games Today: url"
  - `confirmed` es: "⚽ HomeTeam vs AwayTeam\n🕐 fecha a las hora\nVer en World Cup Games Today: url"
  - `partial` en: "⚽ World Cup 2026 — Teams to be confirmed\nSee on World Cup Games Today: url"
  - `partial` es: "⚽ Copa Mundial 2026 — Equipos por definir\nVer en World Cup Games Today: url"
  - `generic` en: "⚽ FIFA World Cup 2026 — See all matches in your local time\nurl"
  - `generic` es: "⚽ Copa Mundial FIFA 2026 — Todos los partidos en tu horario local\nurl"

**`src/components/ShareButtons.astro`**
- `data-locale={locale}` adicionado ao container `[data-share-component]`
- Script client-side: lê `container.dataset.locale` e usa para escolher textos WhatsApp inline (sem importar módulos TS)
- Pendência i18n do WhatsApp client-side: RESOLVIDA

**`src/utils/calendar.ts`**
- Campo `locale?: Locale` adicionado aos opts de `buildCalendarEventData` (opcional, padrão `'pt-br'`)
- `summary` e `description` localizados para pt-br, en e es nos três tipos: `confirmed`, `partial`, `simulation`/genérico
- `uid`, `dtstart`, `dtend`, `dtstamp`, `location` sem alteração de lógica

**`src/components/CalendarButtons.astro`**
- `locale` agora passado explicitamente para `buildCalendarEventData` (Google Calendar já usa summary localizado)
- `data-locale={locale}` adicionado ao botão `.cal-btn--ics`
- Script client-side do ICS: lê `el.dataset.locale` e gera `summary`/`description` em pt-br, en ou es
- Pendência i18n do ICS client-side: RESOLVIDA

### Regras respeitadas

- `simulation` nunca gera calendário — regra mantida (`shouldRender = matchType !== 'simulation'`)
- `partial` nunca inventa times — summary usa textos genéricos sem nomes de seleções
- `uid`, `dtstart`, `dtend`, `location` sem alteração de lógica
- Compatibilidade: todas as chamadas existentes sem `locale` continuam usando `'pt-br'` como padrão
- Nenhuma dependência nova adicionada
- Nenhuma refatoração ampla — apenas adição de `locale` onde necessário
- Todos os guards (`typeof window`, `typeof document`) mantidos

### Validação

- `npm run build`: 77 páginas geradas sem erros ✅
- Zero erros TypeScript ✅
- Total de páginas: 77 (sem alteração — nenhuma página nova nesta fase) ✅
- Páginas pt-br, en e es existentes não alteradas ✅

### Pendências i18n resolvidas nesta fase

| Pendência | Arquivo | Status |
|-----------|---------|--------|
| `ShareButtons.astro`: texto WhatsApp client-side hardcoded em pt-br | `src/components/ShareButtons.astro` + `src/utils/share.ts` | RESOLVIDA ✅ |
| `CalendarButtons.astro`: texto ICS client-side hardcoded em pt-br | `src/components/CalendarButtons.astro` + `src/utils/calendar.ts` | RESOLVIDA ✅ |

---

---

## Fase 9C — Página raiz `/` ✅

### Arquivos criados/alterados

| Arquivo | Ação |
|---------|------|
| `src/pages/index.astro` | Reescrito — landing page de seleção de idioma com sugestão automática |

### O que foi implementado

**`src/pages/index.astro`** (reescrita completa do stub)

- `BaseLayout` com `title="World Cup Games Today 2026"`, `description` em inglês, `lang="en"`, `locale="en"`
- Hero centralizado: ícone de bola, h1 "World Cup Games Today", tagline em inglês
- Três cards de seleção de idioma em grid responsivo:
  - 3 colunas em desktop (>=480px) / 1 coluna mobile com layout horizontal
  - Cada card: flag (emoji), nome do idioma, região, seta de acesso, `hreflang` e `aria-label`
  - Hover: `border-color: var(--color-accent)`, `box-shadow`, `translateY(-2px)` — CSS puro, sem JS
  - Cards com `data-lang` para o script salvar a escolha no localStorage
- Sugestão automática (seção `#lang-suggestion`):
  - Começa com atributo `hidden` (não `display:none`) — acessível e oculto antes do JS
  - Script client-side detecta `navigator.language` (com fallback para `navigator.languages[]`)
  - Mapeamento: `pt*` → `/pt-br/`, `es*` → `/es/`, outros → `/en/`
  - Se `wcgt_lang` já salvo no localStorage, usa esse valor em vez de detectar
  - Exibe texto + link para a versão sugerida (link normal, sem redirect automático)
  - `aria-live="polite"` para anunciar ao leitor de tela quando exibida
- localStorage (`wcgt_lang`):
  - Chave separada `wcgt_lang` (não `wcgt_prefs`) conforme PROJECT_BRIEF.md
  - Escrita ao clicar em qualquer card de idioma
  - Leitura para pré-selecionar a sugestão automática
  - Guards completos: `typeof window`, `typeof localStorage`, `try/catch`
- Nota de dados: "Data shown is for demonstration purposes only." discreta no rodapé da seção
- CSS scoped na página: `.lang-select-page`, `.lang-hero`, `.lang-suggestion`, `.lang-cards`, `.lang-card`, `.lang-demo-note`
- Mobile-first: breakpoints 480px (grid 3 colunas), 768px (hero maior)
- Nenhum JS no frontmatter — toda lógica em `<script>` client-side com guards

### Regras respeitadas

- Nenhuma nova dependência adicionada
- Nenhuma página existente alterada
- Nenhum redirect automático — sugestão exige clique do usuário
- Build estático: zero API de browser no frontmatter
- Guards obrigatórios no script client-side (`typeof window`, `typeof navigator`, `try/catch`)
- Aviso legal no Footer (já presente via `BaseLayout` + `Footer.astro`)

### Validação

- `npm run build`: 77 páginas geradas sem erros ✅
- Zero erros TypeScript ✅
- Total de páginas: 77 (sem alteração — apenas reescrita do `index.astro`) ✅
- Nenhuma página de idioma alterada ✅

### Riscos e pendências identificados

| Item | Impacto |
|------|---------|
| `hreflang` nos cards é atributo de link, não meta tag — Fase 10 (SEO Técnico) deve adicionar `<link rel="alternate" hreflang>` no `<head>` | Baixo para MVP |
| Script detecta `navigator.language` via ES5 (`var`, loop manual) para máxima compatibilidade — adequado para MVP | Nenhum |
| `detectBrowserLocale` de `language.ts` não foi importado no script (incompatível com bundling de módulos TS em `<script>` sem `import`) — lógica equivalente implementada inline | Nenhum |

---

## Fase 9B — Páginas em espanhol (/es/) ✅

### Arquivos criados/alterados

| Arquivo | Ação |
|---------|------|
| `src/pages/es/index.astro` | Reescrito — home completa em espanhol (antes era stub mínimo) |
| `src/pages/es/partidos-de-hoy-mundial.astro` | Criado — partidos de hoy en español |
| `src/pages/es/calendario-mundial-2026.astro` | Criado — calendario completo en español |
| `src/pages/es/equipos/index.astro` | Criado — listado de selecciones en español |
| `src/pages/es/equipos/[slug].astro` | Criado — página por selección en español (8 páginas geradas) |
| `src/pages/es/grupos/[group].astro` | Criado — página por grupo en español (2 páginas geradas) |
| `src/pages/es/partidos/[id].astro` | Criado — página por partido en español (11 páginas geradas) |

### Páginas geradas pela Fase 9B (24 novas)

- `/es/index.html` (reescrita do stub — 1 página já contada nas 53 anteriores)
- `/es/partidos-de-hoy-mundial/index.html`
- `/es/calendario-mundial-2026/index.html`
- `/es/equipos/index.html`
- `/es/equipos/northland/index.html`
- `/es/equipos/eastoria/index.html`
- `/es/equipos/westmark/index.html`
- `/es/equipos/southmore/index.html`
- `/es/equipos/highpeak/index.html`
- `/es/equipos/lowvale/index.html`
- `/es/equipos/bayshore/index.html`
- `/es/equipos/ridgemont/index.html`
- `/es/grupos/m/index.html`
- `/es/grupos/n/index.html`
- `/es/partidos/match-001/index.html`
- `/es/partidos/match-002/index.html`
- `/es/partidos/match-003/index.html`
- `/es/partidos/match-004/index.html`
- `/es/partidos/match-005/index.html`
- `/es/partidos/match-006/index.html`
- `/es/partidos/match-007/index.html`
- `/es/partidos/match-008/index.html`
- `/es/partidos/match-009/index.html`
- `/es/partidos/match-010/index.html`
- `/es/partidos/match-011/index.html`

### O que foi implementado

**Padrão geral (aplicado em todas as páginas /es/):**
- Locale `'es'` passado para todos os componentes que aceitam a prop (`TimezoneSelector`, `TeamSelector`, `NextMatchCard`, `MatchList`, `TodayMatches`, `GroupTable`, `LiveMatchStatus`, `ShareButtons`, `CalendarButtons`)
- Fuso padrão `America/Mexico_City` (México — maior mercado hispanohablante; aceito pelo `Intl` do Node.js sem erros)
- Todos os textos da página em espanhol: h1, h2, avisos, links internos, meta tags SEO
- Aviso MOCK en español: "&#9888; Este sitio usa datos de demostración (MOCK). Los datos mostrados son ficticios."
- Nomes de times via `team.name['es'] ?? team.name['en'] ?? team.name['pt-br']`
- Nomes de grupos via `group.name['es'] ?? group.name['en'] ?? group.name['pt-br']`
- Links internos apontam para `/es/...` — nenhum link quebrado para `/pt-br/...` ou `/en/...`
- `partial` nunca tratado como `confirmed`
- `simulation` nunca exibido como jogo real

**Rótulos de fase em espanhol (usados em `src/pages/es/partidos/[id].astro`):**
- `group_stage` → "Fase de Grupos"
- `round_of_32` → "Ronda de 32"
- `round_of_16` → "Octavos de Final"
- `quarterfinal` → "Cuartos de Final"
- `semifinal` → "Semifinal"
- `third_place` → "Tercer Puesto"
- `final` → "Final"

**URLs espanholas adotadas (conforme especificação):**
- `/es/` — home
- `/es/partidos-de-hoy-mundial` — partidos de hoy
- `/es/calendario-mundial-2026` — calendario
- `/es/equipos` — listado de selecciones
- `/es/equipos/[slug]` — página por selección
- `/es/grupos/[group]` — página por grupo (parâmetro: `group`, slug do grupo)
- `/es/partidos/[id]` — página por partido

### Componentes: suporte a locale="es" verificado

| Componente | Suporte a locale="es" | Observação |
|------------|----------------------|------------|
| `ShareButtons.astro` | Parcial — labels en español corretos | Script JS client-side ainda hardcoded em pt-br (textos WhatsApp) — PENDÊNCIA (herdada da Fase 9A) |
| `CalendarButtons.astro` | Parcial — labels en español corretos | Script ICS client-side ainda hardcoded em pt-br — PENDÊNCIA (herdada da Fase 9A) |
| `LiveMatchStatus.astro` | Completo — labels en español implementados | OK |
| `MatchList.astro` | Completo — prop locale aceita 'es' | OK |
| `GroupTable.astro` | Completo — prop locale aceita 'es' | OK |
| `NextMatchCard.astro` | Completo — prop locale aceita 'es' | OK |
| `TodayMatches.astro` | Completo — prop locale aceita 'es' | OK |
| `TimezoneSelector.astro` | Completo — prop locale aceita 'es' | OK |
| `TeamSelector.astro` | Completo — prop locale aceita 'es' | OK |

### Regras respeitadas

- `partial` nunca tratado como `confirmed` — verificado em todas as 7 páginas
- `simulation` nunca exibido como jogo real — verificado em todas as 7 páginas
- Nenhuma dependência nova adicionada (`npm install` não foi executado)
- Nenhuma página pt-br ou en alterada
- Nenhum dado real da Copa inserido
- Build estático: zero API de browser nos frontmatters
- Guards obrigatórios em todos os scripts client-side herdados dos componentes existentes

### Validação

- `npm run build`: 77 páginas geradas sem erros ✅
- Zero erros TypeScript ✅
- Nenhuma página pt-br ou en alterada ✅
- Fuso `America/Mexico_City` aceito por `formatDate`/`formatTime` sem erros ✅
- Total de 24 novas páginas /es/ geradas (53 → 77) ✅

### Pendências identificadas durante a implementação

| Pendência | Arquivo | Impacto |
|-----------|---------|---------|
| `ShareButtons.astro`: texto WhatsApp no script client-side hardcoded em pt-br | `src/components/ShareButtons.astro` | Baixo — labels dos botões estão corretos em espanhol; apenas o texto da mensagem WhatsApp gerada no client é em pt-br |
| `CalendarButtons.astro`: texto do `.ics` (summary e description) hardcoded em pt-br no script client-side | `src/components/CalendarButtons.astro` | Baixo — arquivo .ics funcional; apenas o texto interno está em pt-br |

Essas pendências estavam registradas desde a Fase 9A e se aplicam igualmente ao espanhol. Serão tratadas na fase de refatoração de componentes (i18n completa de scripts client-side).

---

## Fase 9A — Páginas em inglês (/en/) ✅

### Arquivos criados/alterados

| Arquivo | Ação |
|---------|------|
| `src/pages/en/index.astro` | Reescrito — home completa em inglês (antes era stub mínimo) |
| `src/pages/en/world-cup-games-today.astro` | Criado — jogos de hoje em inglês |
| `src/pages/en/world-cup-2026-schedule.astro` | Criado — tabela + classificações em inglês |
| `src/pages/en/teams/index.astro` | Criado — listagem de times em inglês |
| `src/pages/en/teams/[slug].astro` | Criado — página por time em inglês (8 páginas geradas) |
| `src/pages/en/groups/[group].astro` | Criado — página por grupo em inglês (2 páginas geradas) |
| `src/pages/en/matches/[id].astro` | Criado — página por jogo em inglês (11 páginas geradas) |

### Páginas geradas pela Fase 9A (24 novas)

- `/en/index.html` (reescrita)
- `/en/world-cup-games-today/index.html`
- `/en/world-cup-2026-schedule/index.html`
- `/en/teams/index.html`
- `/en/teams/northland/index.html`
- `/en/teams/eastoria/index.html`
- `/en/teams/westmark/index.html`
- `/en/teams/southmore/index.html`
- `/en/teams/highpeak/index.html`
- `/en/teams/lowvale/index.html`
- `/en/teams/bayshore/index.html`
- `/en/teams/ridgemont/index.html`
- `/en/groups/m/index.html`
- `/en/groups/n/index.html`
- `/en/matches/match-001/index.html`
- `/en/matches/match-002/index.html`
- `/en/matches/match-003/index.html`
- `/en/matches/match-004/index.html`
- `/en/matches/match-005/index.html`
- `/en/matches/match-006/index.html`
- `/en/matches/match-007/index.html`
- `/en/matches/match-008/index.html`
- `/en/matches/match-009/index.html`
- `/en/matches/match-010/index.html`
- `/en/matches/match-011/index.html`

### O que foi implementado

**Padrão geral (aplicado em todas as páginas /en/):**
- Locale `'en'` passado para todos os componentes que aceitam a prop (`TimezoneSelector`, `TeamSelector`, `NextMatchCard`, `MatchList`, `TodayMatches`, `GroupTable`, `LiveMatchStatus`, `ShareButtons`, `CalendarButtons`)
- Fuso padrão `America/New_York` (compatível com `formatDate`/`formatTime` — sem erros no build)
- Todos os textos da página em inglês: h1, h2, avisos, links internos, meta tags SEO
- Aviso MOCK em inglês: "⚠ This site uses demonstration data (MOCK). The data shown is fictional."
- Nomes de times via `team.name['en'] ?? team.name['pt-br']`
- Nomes de grupos via `group.name['en'] ?? group.name['pt-br']`
- Links internos apontam para `/en/...` — nenhum link quebrado para `/pt-br/...`
- `partial` nunca tratado como `confirmed`
- `simulation` nunca exibido como jogo real

**`src/pages/en/index.astro`** (reescrita do stub)
- Estrutura completa idêntica ao pt-br: hero → aviso MOCK → seletores → próximo jogo → anúncio → jogos de hoje → jogos da seleção → compartilhar → texto SEO
- Componentes reutilizados: `TimezoneSelector`, `TeamSelector`, `NextMatchCard`, `MatchList`, `TodayMatches`, `ShareButtons`, `AdPlaceholder`

**`src/pages/en/world-cup-games-today.astro`**
- Equivalente a `/pt-br/jogos-de-hoje-copa`
- Resume jogos de hoje, seletor de fuso, `TodayMatches`, compartilhamento
- CSS scoped inline (não afeta global.css)

**`src/pages/en/world-cup-2026-schedule.astro`**
- Equivalente a `/pt-br/tabela-copa-2026`
- Tabela de classificação por grupo (`GroupTable` com `locale="en"`), jogos confirmados, parciais separados
- Mock standings idênticos ao pt-br para consistência

**`src/pages/en/teams/index.astro`**
- Equivalente a `/pt-br/selecoes/index`
- Grid de times agrupados por grupo, links para `/en/teams/[slug]` e `/en/groups/[slug]`

**`src/pages/en/teams/[slug].astro`**
- Equivalente a `/pt-br/selecoes/[slug]`
- `getStaticPaths()` gera 8 páginas (um por time em teams.json)
- Nome do time via `team.name['en'] ?? team.name['pt-br']`
- Bloco informativo "Knockout Stages" no lugar de listar parciais genéricos (mesma regra do pt-br)
- Links internos para `/en/groups/[slug]` quando grupo disponível

**`src/pages/en/groups/[group].astro`**
- Equivalente a `/pt-br/grupos/[grupo]`
- `getStaticPaths()` gera 2 páginas (grupos M e N)
- Parâmetro da rota: `group` (não `grupo` como no pt-br) — consistência com URLs em inglês
- Mock standings idênticos ao pt-br

**`src/pages/en/matches/[id].astro`**
- Equivalente a `/pt-br/jogos/[id]`
- `getStaticPaths()` gera 11 páginas (uma por partida em matches.json)
- Rótulos de fase em inglês: Group Stage, Round of 32, Round of 16, Quarterfinal, Semifinal, Third Place, Final
- Estádio/cidade/país via `match.stadium['en'] ?? match.stadium['pt-br']`
- Horário exibido como "(New York)" no campo "Kick-off"
- `LiveMatchStatus` com `locale="en"` — suporte multilíngue confirmado (componente já tinha labels en)
- `CalendarButtons` com `locale="en"` — suporte multilíngue confirmado
- `ShareButtons` com `locale="en"` — labels em inglês (botão "Share on WhatsApp", "Copy link")
- Links para `/en/teams/[slug]` e `/en/groups/[slug]`

### Componentes: suporte multilíngue verificado

| Componente | Suporte a locale="en" | Observação |
|------------|----------------------|------------|
| `ShareButtons.astro` | Sim — labels en/es/pt-br | Texto WhatsApp no script JS ainda hardcoded em pt-br — PENDÊNCIA registrada abaixo |
| `CalendarButtons.astro` | Sim — labels en/es/pt-br | Completo |
| `LiveMatchStatus.astro` | Sim — labels en/es/pt-br | Completo |
| `MatchList.astro` | Sim — prop locale aceita 'en' | Completo |
| `GroupTable.astro` | Sim — prop locale aceita 'en' | Completo |
| `NextMatchCard.astro` | Sim — prop locale aceita 'en' | Completo |
| `TodayMatches.astro` | Sim — prop locale aceita 'en' | Completo |
| `TimezoneSelector.astro` | Sim — prop locale aceita 'en' | Completo |
| `TeamSelector.astro` | Sim — prop locale aceita 'en' | Completo |

### Regras respeitadas

- `partial` nunca tratado como `confirmed` — verificado em todas as 7 páginas
- `simulation` nunca exibido como jogo real — verificado em todas as 7 páginas
- Nenhuma dependência nova adicionada (`npm install` não foi executado)
- Nenhuma página pt-br alterada
- Nenhum dado real da Copa inserido
- Build estático: zero API de browser nos frontmatters
- Guards obrigatórios em todos os scripts client-side herdados dos componentes existentes

### Validação

- `npm run build`: 53 páginas geradas sem erros ✅
- Zero erros TypeScript ✅
- Nenhuma página pt-br alterada ✅
- Fuso `America/New_York` aceito por `formatDate`/`formatTime` sem erros ✅

### Pendências identificadas durante a implementação

| Pendência | Arquivo | Impacto |
|-----------|---------|---------|
| `ShareButtons.astro`: texto WhatsApp no script client-side ainda hardcoded em pt-br (linhas com "Próxima fase da Copa 2026", "Copa do Mundo 2026") | `src/components/ShareButtons.astro` | Baixo — label dos botões está correto em inglês; apenas o texto da mensagem WhatsApp gerada no client é em pt-br |
| `CalendarButtons.astro`: texto do `.ics` (summary e description) hardcoded em pt-br no script client-side | `src/components/CalendarButtons.astro` | Baixo — o arquivo .ics é funcional; apenas o texto interno está em pt-br |

Essas pendências foram identificadas conforme instrução ("não reescrever componente agora — registrar no CURRENT_STATUS.md"). Serão tratadas na fase de i18n completa (Fase 9B ou fase de refatoração de componentes).

---

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

## Páginas totais geradas (77):

### Raiz e pt-br (29 páginas — inalteradas)
- `/index.html`
- `/pt-br/index.html`
- `/pt-br/jogos-de-hoje-copa/index.html`
- `/pt-br/tabela-copa-2026/index.html`
- `/pt-br/calendario-copa-2026/index.html`
- `/pt-br/selecoes/index.html`
- `/pt-br/selecoes/[northland|eastoria|westmark|southmore|highpeak|lowvale|bayshore|ridgemont]/index.html` (8 páginas)
- `/pt-br/grupos/[m|n]/index.html` (2 páginas)
- `/pt-br/jogos/[match-001..match-011]/index.html` (11 páginas)

### Inglês /en/ (24 páginas — Fase 9A)
- `/en/index.html`
- `/en/world-cup-games-today/index.html`
- `/en/world-cup-2026-schedule/index.html`
- `/en/teams/index.html`
- `/en/teams/[northland|eastoria|westmark|southmore|highpeak|lowvale|bayshore|ridgemont]/index.html` (8 páginas)
- `/en/groups/[m|n]/index.html` (2 páginas)
- `/en/matches/[match-001..match-011]/index.html` (11 páginas)

### Espanhol /es/ (24 páginas — NOVAS — Fase 9B)
- `/es/index.html` (reescrita do stub)
- `/es/partidos-de-hoy-mundial/index.html`
- `/es/calendario-mundial-2026/index.html`
- `/es/equipos/index.html`
- `/es/equipos/[northland|eastoria|westmark|southmore|highpeak|lowvale|bayshore|ridgemont]/index.html` (8 páginas)
- `/es/grupos/[m|n]/index.html` (2 páginas)
- `/es/partidos/[match-001..match-011]/index.html` (11 páginas)

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
