# World Cup Games Today

Site estático para acompanhar a Copa do Mundo 2026 com conversão automática de fuso horário.
Qualquer pessoa vê os jogos no seu horário local, sem precisar criar conta.

Disponível em três idiomas: Português (Brasil), English e Español.

---

## Stack

- **Framework:** Astro (gerador de site estático)
- **CSS:** CSS puro — sem Tailwind
- **JavaScript:** mínimo, apenas onde necessário
- **TypeScript:** utilitários internos
- **Node.js / npm**

---

## Pré-requisitos

- Node.js 18 ou superior
- npm (instalado junto com Node.js)

---

## Instalação

```bash
npm install
```

---

## Comandos principais

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Sobe servidor local em `http://localhost:4321` |
| `npm run build` | Gera pasta `dist/` com o site pronto |
| `npm run preview` | Preview local do build gerado |

---

## Variáveis de ambiente

O projeto usa um arquivo `.env` na raiz do projeto.

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PUBLIC_SITE_URL` | URL canônica do domínio (obrigatório para SEO) | `https://worldcupgamestoday.com` |
| `PUBLIC_GA_MEASUREMENT_ID` | ID do Google Analytics 4 (deixar vazio = Analytics desligado) | `G-XXXXXXXXXX` |

**Como configurar:**

1. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```
2. Edite `.env` com os valores reais.

O arquivo `.env` não é enviado ao GitHub (está no `.gitignore`).

---

## Como configurar o domínio (PUBLIC_SITE_URL)

Ao comprar o domínio, edite `.env` e altere:

```
PUBLIC_SITE_URL=https://seudominio.com
```

Depois rode `npm run build` novamente. Essa variável é usada em:
- Meta tag canonical
- sitemap.xml
- hreflang
- Open Graph

---

## Como ativar o Google Analytics

1. Acesse [analytics.google.com](https://analytics.google.com) e crie uma conta GA4.
2. Obtenha o Measurement ID (formato `G-XXXXXXXXXX`).
3. Edite `.env`:
   ```
   PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Rode `npm run build` e faça o upload da pasta `dist/`.

Se `PUBLIC_GA_MEASUREMENT_ID` estiver vazio, nenhum script do Google Analytics é inserido no HTML. O site funciona normalmente sem ele.

Todos os eventos de analytics (troca de fuso, idioma, clique em WhatsApp, etc.) estão definidos em `src/utils/analytics.ts`. Eles só disparam quando o ID está preenchido.

---

## Como integrar o Google AdSense

O componente `src/components/AdPlaceholder.astro` ocupa as posições de anúncio com visuais de placeholder (bordas pontilhadas, sem conteúdo real).

**Quando o AdSense for aprovado:**

1. No painel do AdSense, gere os blocos de anúncio para cada posição.
2. Edite `src/components/AdPlaceholder.astro` substituindo o conteúdo interno pelos blocos `<ins class="adsbygoogle">` fornecidos pelo Google.
3. Use o atributo `data-ad-slot` já presente no componente como referência para mapear posições.
4. Rode `npm run build` e faça o upload.

Não inserir nenhum ID `ca-pub-XXXXXXXXXX` fictício. Aguardar a aprovação do Google AdSense antes de qualquer alteração real.

---

## Como subir o site na Hostinger

O site é 100% estático. Não há backend.

**Passo a passo:**

1. Rode `npm run build` — isso gera a pasta `dist/`.
2. Acesse o painel da Hostinger e vá ao Gerenciador de Arquivos.
3. Navegue até a pasta raiz do domínio (normalmente `public_html`).
4. Faça upload do **conteúdo** da pasta `dist/` — não a pasta `dist/` em si.
   - Correto: enviar `index.html`, `_astro/`, `sitemap.xml`, etc. diretamente para `public_html/`
   - Errado: enviar a pasta `dist/` inteira (criaria `public_html/dist/index.html`)
5. Acesse o domínio no navegador para confirmar que o site está funcionando.

A cada atualização, repita o processo: build → upload.

---

## Estrutura de dados

O projeto usa dois tipos de dados:

### Dados de build time — `src/data/`

Esses arquivos são lidos no momento do build e geram as páginas estáticas. Para alterar, é necessário editar os arquivos e rodar `npm run build` novamente.

| Arquivo | Conteúdo |
|---------|----------|
| `src/data/teams.json` | Dados das seleções (nome, flag, grupo, confederação) |
| `src/data/matches.json` | Partidas (data/hora UTC, times, estádio, fase, status) |
| `src/data/groups.json` | Grupos da fase de grupos |
| `src/data/overrides.json` | Substituições pontuais de dados |

**Atenção:** todos esses dados estão marcados como MOCK. Antes de lançar o site, substitua pelos dados reais verificados.

### Dados em tempo real — `public/data/live-data.json`

Esse arquivo pode ser editado e enviado para o servidor sem necessidade de rebuild. O site lê esse arquivo diretamente no navegador do usuário.

---

## Como editar live-data.json

O arquivo `public/data/live-data.json` controla placares ao vivo, status de partidas e classificação dos grupos.

Use `public/data/live-data.example.json` como referência — ele tem comentários explicando cada campo.

**O que pode ser editado sem rebuild:**

- Placar de uma partida em andamento ou encerrada
- Status da partida (`scheduled`, `live`, `finished`, `postponed`)
- Classificação dos grupos (pontos, vitórias, gols)

**Como atualizar:**

1. Edite `public/data/live-data.json` com os dados corretos.
2. Envie o arquivo para o servidor na Hostinger (na pasta `data/` dentro da raiz do domínio).
3. O site reflete as mudanças automaticamente — sem rebuild, sem redeploy.

---

## Regra de dados — leia com atenção

- **Nunca inserir dados reais sem fonte verificada.** Todos os dados iniciais são MOCK.
- **Nunca marcar partidas futuras como confirmadas sem fonte oficial.** Partidas com times a definir devem usar status `partial`.
- **Nunca inventar resultados.** Placares só entram em `live-data.json` quando forem reais e verificados.
- A data oficial de início da Copa do Mundo 2026 é **11 de junho de 2026**.

---

## Idiomas e estrutura de URLs

| Prefixo | Idioma |
|---------|--------|
| `/` | Página raiz — seleção de idioma |
| `/pt-br/` | Português do Brasil |
| `/en/` | Inglês |
| `/es/` | Espanhol |

Exemplos de URLs:
- `/pt-br/jogos-de-hoje-copa`
- `/en/world-cup-games-today`
- `/es/partidos-de-hoy-mundial`

---

## localStorage

O site salva preferências no navegador do usuário. Nenhum dado é enviado ao servidor.

| Chave | O que salva |
|-------|-------------|
| `wcgt_lang` | Idioma escolhido (`pt-br`, `en` ou `es`) |
| `wcgt_timezone` | Fuso horário escolhido (ex: `America/Sao_Paulo`) |
| `wcgt_team` | Slug da seleção favorita (ex: `northland`) |

---

## SEO

O `sitemap.xml` e o `robots.txt` são gerados automaticamente no build pelo Astro.
Após cada build, eles ficam em `dist/sitemap.xml` e `dist/robots.txt`.

Após o deploy, envie o sitemap para o Google Search Console:
```
https://seudominio.com/sitemap.xml
```

---

## Legal

O site é independente e não possui associação oficial com a FIFA ou com a organização da Copa do Mundo.

O aviso de independência está no footer em todos os idiomas. Não usar logo, mascote ou identidade visual oficial da FIFA.
