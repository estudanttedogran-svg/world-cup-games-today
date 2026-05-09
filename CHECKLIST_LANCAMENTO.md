# Checklist de Lançamento — World Cup Games Today

Use esta lista antes e depois de subir o site. Marque cada item conforme for concluído.

---

## Pré-lançamento (antes de subir)

- [ ] Comprar domínio (ex: worldcupgamestoday.com)
- [ ] Configurar domínio na Hostinger (apontar para o plano de hospedagem)
- [ ] Configurar HTTPS/SSL no painel da Hostinger
- [ ] Preencher `PUBLIC_SITE_URL=https://seudominio.com` no `.env`
- [ ] Rodar `npm run build`
- [ ] Verificar se 92+ páginas foram geradas sem erros
- [ ] Confirmar que a pasta `dist/` foi gerada

---

## Upload e deploy

- [ ] Fazer upload do **conteúdo** de `dist/` para a raiz do domínio na Hostinger (não a pasta `dist/` em si, mas o que está dentro dela)
- [ ] Verificar se o site abre sem erros no domínio

---

## Testes após deploy

- [ ] Testar página raiz `/` (seleção de idioma)
- [ ] Testar home `/pt-br/`
- [ ] Testar home `/en/`
- [ ] Testar home `/es/`
- [ ] Testar `/pt-br/jogos-de-hoje-copa`
- [ ] Testar `/pt-br/tabela-copa-2026`
- [ ] Testar `/pt-br/calendario-copa-2026`
- [ ] Testar uma página de seleção (`/pt-br/selecoes/[slug]`)
- [ ] Testar uma página de jogo (`/pt-br/jogos/[id]`)
- [ ] Testar `/pt-br/sobre`
- [ ] Testar `/pt-br/politica-de-privacidade`
- [ ] Testar `/pt-br/termos-de-uso`
- [ ] Testar `/pt-br/aviso-legal`
- [ ] Confirmar que o aviso de independência aparece no footer em todos os idiomas
- [ ] Acessar `/sitemap.xml` — deve retornar XML válido
- [ ] Acessar `/robots.txt` — deve retornar conteúdo correto
- [ ] Testar conversão de fuso horário (alterar timezone no seletor)
- [ ] Testar troca de idioma no header

---

## Google Analytics

- [ ] Criar conta no Google Analytics 4 em [analytics.google.com](https://analytics.google.com)
- [ ] Criar propriedade e obter o Measurement ID (`G-XXXXXXXXXX`)
- [ ] Preencher `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` no `.env` (ou no painel de variáveis de ambiente da Hostinger)
- [ ] Rodar `npm run build` novamente
- [ ] Fazer novo upload do conteúdo de `dist/`
- [ ] Verificar no painel GA que os acessos estão sendo registrados

---

## Google Search Console

- [ ] Acessar [Google Search Console](https://search.google.com/search-console)
- [ ] Adicionar propriedade com a URL do domínio
- [ ] Verificar propriedade (via DNS ou arquivo HTML)
- [ ] Enviar sitemap: `https://seudominio.com/sitemap.xml`
- [ ] Aguardar indexação (pode levar dias)

---

## Dados reais (antes do lançamento)

- [ ] Revisar `src/data/matches.json` — substituir dados MOCK por dados reais verificados com fonte oficial
- [ ] Revisar `src/data/teams.json` — substituir dados MOCK por times reais
- [ ] Revisar `src/data/groups.json` — substituir por grupos reais
- [ ] Confirmar que nenhuma partida futura está marcada como `confirmed` sem fonte oficial
- [ ] Confirmar que `public/data/live-data.json` está com estrutura correta (scores zerados, status `scheduled`)
- [ ] Rodar build final com dados reais e verificar todas as páginas

---

## Google AdSense (pós-lançamento)

O AdSense só pode ser solicitado depois que o site estiver no ar com conteúdo real.

- [ ] Solicitar aprovação no [Google AdSense](https://www.google.com/adsense)
- [ ] Após aprovação: editar `src/components/AdPlaceholder.astro` com os blocos `<ins class="adsbygoogle">` fornecidos pelo Google
- [ ] Rodar `npm run build` e fazer upload do conteúdo de `dist/`
- [ ] Verificar que os anúncios aparecem nas posições corretas (nunca antes do conteúdo principal)

---

## Revisão final de conformidade

- [ ] Confirmar que não há logo ou identidade visual oficial da FIFA ou da Copa do Mundo 2026
- [ ] Confirmar que não há linguagem sugerindo afiliação oficial com a FIFA
- [ ] Confirmar que o aviso de independência aparece no footer em pt-br, en e es
- [ ] Confirmar que as páginas de Política de Privacidade, Termos de Uso e Aviso Legal estão acessíveis nos três idiomas
