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
**Status:** AGUARDANDO AUTORIZAÇÃO

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
**Status:** PENDENTE

Entregas:
- `src/utils/timezone.ts` — detectar fuso do navegador, converter UTC para local, listar fusos/cidades
- `src/utils/datetime.ts` — formatar datas/horas por idioma e fuso
- `src/utils/language.ts` — detectar idioma do navegador, mapeamento de locale
- `src/utils/storage.ts` — wrapper seguro para localStorage (com fallback se bloqueado)
- `src/utils/matches.ts` — filtrar partidas (hoje, por seleção, por fase, por status)
- `src/utils/analytics.ts` — stubs de eventos GA (não dispara se ID vazio)

---

## Fase 5 — Home Page (pt-br)
**Status:** PENDENTE

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

## Fase 6 — Páginas Principais (pt-br)
**Status:** PENDENTE

Entregas:
- `src/pages/pt-br/jogos-de-hoje-copa.astro`
- `src/pages/pt-br/tabela-copa-2026.astro`
- `src/pages/pt-br/selecoes/[slug].astro` — página dinâmica por seleção
- `src/pages/pt-br/grupos/[grupo].astro` — página dinâmica por grupo
- `src/pages/pt-br/jogo/[id].astro` — página individual por partida
- `src/pages/pt-br/calendario-copa-2026.astro`

---

## Fase 7 — Compartilhamento + Integração de Calendário
**Status:** PENDENTE

Entregas:
- Lógica de compartilhamento WhatsApp (texto com horário local do usuário)
- Botão copiar link (clipboard API)
- Geração de link Google Calendar
- Geração de arquivo `.ics` (download)
- Testes dos 4 fluxos de compartilhamento

---

## Fase 8 — live-data: Fetch Client-Side + Fallback
**Status:** PENDENTE

Entregas:
- Componente Astro Island para buscar `live-data.json` no cliente
- Fallback seguro se arquivo ausente, inválido ou com erro de rede
- Integração com páginas: placares ao vivo, status de partida, classificação
- Documentação de como atualizar o arquivo manualmente

---

## Fase 9 — Internacionalização (en + es)
**Status:** PENDENTE

Entregas:
- `src/i18n/translations.ts` — strings traduzidas para pt-br, en, es
- Todas as páginas do pt-br replicadas para `/en/` e `/es/`
- Página raiz `/` — seleção de idioma + auto-sugestão por navegador
- hreflang configurado em todas as páginas

---

## Fase 10 — SEO Técnico
**Status:** PENDENTE

Entregas:
- `public/sitemap.xml` (gerado via Astro ou script)
- `public/robots.txt`
- Meta tags completas em todas as páginas (title, description, canonical)
- Open Graph em todas as páginas
- SportsEvent JSON-LD em páginas de partidas confirmadas
- Verificação de hreflang correto em todas as rotas

---

## Fase 11 — Páginas Institucionais
**Status:** PENDENTE

Entregas (pt-br, en, es):
- Sobre / About / Acerca de
- Contato / Contact / Contacto
- Política de Privacidade / Privacy Policy / Política de Privacidad
- Termos de Uso / Terms of Use / Términos de Uso
- Aviso Legal / Legal Notice / Aviso Legal

---

## Fase 12 — Analytics + AdSense (Placeholders)
**Status:** PENDENTE

Entregas:
- Script GA no BaseLayout (condicional: só carrega se `PUBLIC_GA_MEASUREMENT_ID` não estiver vazio)
- Stubs de eventos: troca de seleção, fuso, idioma; clique em WhatsApp, copiar link, calendário
- Componente `AdPlaceholder.astro` em todas as posições planejadas
- Nenhum anúncio real, nenhum ID real

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
| 3 | Layout Base + CSS | AGUARDANDO AUTORIZAÇÃO |
| 4 | Utilitários Principais | PENDENTE |
| 5 | Home Page (pt-br) | PENDENTE |
| 6 | Páginas Principais (pt-br) | PENDENTE |
| 7 | Compartilhamento + Calendário | PENDENTE |
| 8 | live-data fetch + Fallback | PENDENTE |
| 9 | Internacionalização (en + es) | PENDENTE |
| 10 | SEO Técnico | PENDENTE |
| 11 | Páginas Institucionais | PENDENTE |
| 12 | Analytics + AdSense (placeholders) | PENDENTE |
| 13 | Documentação | PENDENTE |
| 14 | Build + Validação Final | PENDENTE |
