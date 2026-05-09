// MOCK DATA — gerado a partir dos dados de demonstração
// Ao substituir os dados reais, o sitemap será atualizado automaticamente no próximo build.

import type { APIRoute } from 'astro';
import type { Match, Team, Group } from '../types/index.ts';
import matchesData from '../data/matches.json';
import teamsData from '../data/teams.json';
import groupsData from '../data/groups.json';

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://worldcupgamestoday.com';

  const allMatches = (matchesData as { matches: Match[] }).matches;
  const allTeams   = (teamsData   as { teams:   Team[]  }).teams;
  const allGroups  = (groupsData  as { groups:  Group[] }).groups;

  // Partidas elegíveis para o sitemap: apenas confirmed e partial (nunca simulation)
  const sitemapMatches = allMatches.filter(
    (m) => m.type === 'confirmed' || m.type === 'partial'
  );

  // URLs estáticas fixas
  const staticUrls: string[] = [
    `${siteUrl}/`,
    `${siteUrl}/pt-br/`,
    `${siteUrl}/en/`,
    `${siteUrl}/es/`,
    `${siteUrl}/pt-br/jogos-de-hoje-copa`,
    `${siteUrl}/en/world-cup-games-today`,
    `${siteUrl}/es/partidos-de-hoy-mundial`,
    `${siteUrl}/pt-br/tabela-copa-2026`,
    `${siteUrl}/en/world-cup-2026-schedule`,
    `${siteUrl}/es/calendario-mundial-2026`,
    `${siteUrl}/pt-br/calendario-copa-2026`,
    `${siteUrl}/pt-br/selecoes`,
    `${siteUrl}/en/teams`,
    `${siteUrl}/es/equipos`,
    // Páginas institucionais
    `${siteUrl}/pt-br/sobre`,
    `${siteUrl}/en/about`,
    `${siteUrl}/es/sobre`,
    `${siteUrl}/pt-br/contato`,
    `${siteUrl}/en/contact`,
    `${siteUrl}/es/contacto`,
    `${siteUrl}/pt-br/politica-de-privacidade`,
    `${siteUrl}/en/privacy-policy`,
    `${siteUrl}/es/politica-de-privacidad`,
    `${siteUrl}/pt-br/termos-de-uso`,
    `${siteUrl}/en/terms-of-use`,
    `${siteUrl}/es/terminos-de-uso`,
    `${siteUrl}/pt-br/aviso-legal`,
    `${siteUrl}/en/legal-notice`,
    `${siteUrl}/es/aviso-legal`,
  ];

  // URLs de times (slug idêntico nos três idiomas)
  const teamUrls: string[] = allTeams.flatMap((team) => [
    `${siteUrl}/pt-br/selecoes/${team.slug}`,
    `${siteUrl}/en/teams/${team.slug}`,
    `${siteUrl}/es/equipos/${team.slug}`,
  ]);

  // URLs de grupos (slug idêntico nos três idiomas)
  const groupUrls: string[] = allGroups.flatMap((group) => [
    `${siteUrl}/pt-br/grupos/${group.slug}`,
    `${siteUrl}/en/groups/${group.slug}`,
    `${siteUrl}/es/grupos/${group.slug}`,
  ]);

  // URLs de partidas (id idêntico nos três idiomas)
  const matchUrls: string[] = sitemapMatches.flatMap((match) => [
    `${siteUrl}/pt-br/jogos/${match.id}`,
    `${siteUrl}/en/matches/${match.id}`,
    `${siteUrl}/es/partidos/${match.id}`,
  ]);

  const allUrls = [...staticUrls, ...teamUrls, ...groupUrls, ...matchUrls];

  const urlEntries = allUrls
    .map(
      (url) =>
        `  <url>\n    <loc>${url}</loc>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
