# PROJECT_BRIEF.md — World Cup Games Today

## Visão geral

Site estático público para acompanhar a Copa do Mundo 2026.
Objetivo principal: qualquer pessoa vê os jogos no **seu horário local**, sem login.

**Tagline EN:** "See every World Cup 2026 match in your local time."
**Tagline PT:** "Veja todos os jogos da Copa 2026 no seu horário local."

---

## Stack

- **Framework:** Astro (static site generator)
- **CSS:** CSS puro / CSS Modules — sem Tailwind
- **Hospedagem:** Hostinger — entrega via pasta `dist/`
- **JavaScript:** mínimo, apenas onde necessário (Islands Architecture do Astro)

---

## Idiomas

| Prefixo | Idioma             |
|---------|--------------------|
| `/pt-br/` | Português do Brasil |
| `/en/`    | Inglês              |
| `/es/`    | Espanhol            |
| `/`       | Página raiz global (seleção de idioma + sugestão automática) |

---

## Variáveis de ambiente

| Variável | Uso | Placeholder |
|----------|-----|-------------|
| `PUBLIC_SITE_URL` | Canonical, sitemap, hreflang, Open Graph | `https://worldcupgamestoday.com` |
| `PUBLIC_GA_MEASUREMENT_ID` | Google Analytics | vazio (site funciona sem ele) |

> Ao comprar o domínio, altere apenas `PUBLIC_SITE_URL` no arquivo `.env`.

---

## Dados

| Arquivo | Localização | Atualizado em |
|---------|-------------|---------------|
| `teams.json` | `src/data/` | build time |
| `matches.json` | `src/data/` | build time |
| `groups.json` | `src/data/` | build time |
| `overrides.json` | `src/data/` | build time |
| `live-data.json` | `public/data/` | qualquer momento, sem rebuild |
| `live-data.example.json` | `public/data/` | referência para edição |

**Regra de dados:** nenhum dado real entra no projeto sem fonte verificada e revisão explícita.
Dados iniciais são MOCK (claramente marcados).

---

## Tipos de partida

1. **Confirmada** — times, data, horário, estádio e fase definidos. Exibir como fato.
2. **Parcialmente definida** — data/horário/fase existem, mas times dependem de classificação. Exibir como possibilidade.
3. **Simulação** — cenário do usuário. Sempre exibir aviso: "Simulação — não é jogo confirmado."

**Nunca mostrar Brasil x Argentina na final como jogo confirmado.**

---

## Fuso horário

- Armazenar horários sempre em UTC.
- Detectar fuso do navegador automaticamente.
- Permitir troca manual por cidade/fuso.
- Salvar escolha no `localStorage`.
- Países grandes têm múltiplos fusos — nunca assumir capital como padrão.

---

## localStorage

Salvar no localStorage:
- `wcgt_lang` — idioma escolhido
- `wcgt_team` — seleção favorita
- `wcgt_timezone` — fuso horário escolhido

---

## Páginas do MVP

### pt-br
- `/pt-br/` — home
- `/pt-br/jogos-de-hoje-copa`
- `/pt-br/tabela-copa-2026`
- `/pt-br/selecoes/[slug]`
- `/pt-br/proximo-jogo-do-brasil` (exemplo)
- `/pt-br/jogo/[id]`
- `/pt-br/grupos/[grupo]`
- `/pt-br/calendario-copa-2026`
- `/pt-br/sobre`, `/pt-br/contato`, `/pt-br/privacidade`, `/pt-br/termos`, `/pt-br/aviso-legal`

### en
- `/en/` — home
- `/en/world-cup-games-today`
- `/en/world-cup-2026-schedule`
- `/en/teams/[slug]`
- `/en/match/[id]`
- `/en/groups/[group]`
- `/en/world-cup-2026-calendar`
- (institutional equivalents)

### es
- `/es/` — home
- `/es/partidos-de-hoy-mundial`
- `/es/calendario-mundial-2026`
- `/es/equipos/[slug]`
- `/es/partido/[id]`
- `/es/grupos/[grupo]`
- (institutional equivalents)

---

## Compartilhamento

Prioridade:
1. WhatsApp (texto pré-formatado com horário local)
2. Copiar link
3. Google Calendar (link)
4. Baixar .ics

---

## SEO

- Title único por página
- Meta description
- H1 claro, H2 úteis
- sitemap.xml + robots.txt
- hreflang entre pt-br, en, es
- Open Graph (WhatsApp, redes)
- SportsEvent schema apenas em partidas confirmadas

---

## Monetização (futura)

- AdSense: apenas placeholders no MVP
- Posições: após card principal, entre seções, antes do FAQ, lateral no desktop
- Nunca antes da informação principal

---

## Legal

Rodapé obrigatório:
> "World Cup Games Today é um site independente e não possui associação oficial com a FIFA ou com a organização da Copa do Mundo."

Páginas obrigatórias: Sobre, Contato, Política de Privacidade, Termos de Uso, Aviso Legal.

---

## Simulador

Desejável, mas fora do MVP. Implementar em MVP 1.5, após lançamento.

---

## Regra de processo

- Fases pequenas e sequenciais
- Atualizar CURRENT_STATUS.md ao fim de cada fase
- Aguardar autorização antes de avançar
- Nunca reiniciar o projeto do zero sem autorização explícita
