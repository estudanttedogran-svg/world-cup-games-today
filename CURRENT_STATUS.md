# CURRENT_STATUS.md — World Cup Games Today

**Última atualização:** 2026-05-07

---

## Status atual

**Fase concluída:** Fase 3 — Layout Base + CSS
**Próxima fase:** Fase 4 — Utilitários Principais
**Aguardando:** Autorização do usuário para iniciar Fase 4

---

## O que foi feito

### Fase 0 ✅ — Meta / Setup do Processo
### Fase 1 ✅ — Bootstrap do Projeto Astro (Astro 5.18.1)
### Fase 2 ✅ — Camada de Dados (Mock)

### Fase 3 ✅ — Layout Base + CSS

**Correção de tipo:**
- `src/types/index.ts`: tipo `Locale` corrigido de `'pt' | 'en' | 'es'` para `'pt-br' | 'en' | 'es'`
- `LocalizedString`: campo `pt` renomeado para `pt-br` para consistência com rotas e hreflang
- `src/data/teams.json`, `src/data/matches.json`, `src/data/groups.json`: chave `"pt"` atualizada para `"pt-br"` em todos os objetos `LocalizedString`

**CSS:**
- `src/styles/reset.css` — reset moderno e mínimo: box-sizing, margin/padding, img/svg responsive, nav lists
- `src/styles/variables.css` — design tokens completos: cores, tipografia, espaçamento (escala 4px), bordas, sombras, layout, transições
- `src/styles/global.css` — estilos base mobile-first: body, links, headings, .container, .sr-only, .skip-link, .site-header, .site-nav, .lang-nav, .site-nav-mobile, .site-footer, #main-content, utilitários

**Componentes:**
- `src/components/Header.astro` — logo, navegação principal por idioma, seletor de idioma (PT/EN/ES), skip link de acessibilidade, nav mobile abaixo do header
- `src/components/Footer.astro` — nome + ano, links institucionais por idioma (placeholder href="#"), aviso legal obrigatório em pt-br/en/es, aviso de dados mock

**Layout:**
- `src/layouts/BaseLayout.astro` — HTML base completo: charset, viewport, title, description, canonical, Open Graph básico, Twitter Card, slots `head` e `scripts`, Header + main#main-content + Footer

**Páginas atualizadas:**
- `src/pages/index.astro` — usa BaseLayout com locale="en"
- `src/pages/pt-br/index.astro` — usa BaseLayout com locale="pt-br"
- `src/pages/en/index.astro` — usa BaseLayout com locale="en"
- `src/pages/es/index.astro` — usa BaseLayout com locale="es"

**Validação:**
- `npm run build`: ✅ 4 páginas geradas sem erros, sem TypeScript errors

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

## Próximos passos (Fase 4)

Fase 4 — Utilitários Principais:
1. `src/utils/timezone.ts` — detectar fuso do navegador, converter UTC para local
2. `src/utils/datetime.ts` — formatar datas/horas por idioma e fuso
3. `src/utils/language.ts` — detectar idioma do navegador
4. `src/utils/storage.ts` — wrapper seguro para localStorage
5. `src/utils/matches.ts` — filtrar partidas (hoje, por seleção, por fase, por status)
6. `src/utils/analytics.ts` — stubs de eventos GA

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
