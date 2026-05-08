/**
 * schema.ts — Utilitário para geração de JSON-LD SportsEvent
 *
 * REGRAS INVIOLÁVEIS:
 * - Somente partidas do tipo 'confirmed' com home e away definidos emitem JSON-LD
 * - Partidas 'partial' NÃO emitem SportsEvent (times indefinidos = schema enganoso)
 * - Partidas 'simulation' NÃO emitem nenhum schema de evento real
 * - Em caso de dúvida, preferir não emitir a emitir schema incorreto
 */

export interface SportsEventSchemaOptions {
  matchId: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamSlug?: string;
  awayTeamSlug?: string;
  datetimeUtc: string;       // ex: "2026-06-11T19:00:00Z"
  stadiumName: string;
  cityName: string;
  countryName: string;
  phase: string;             // label em inglês (Group Stage, Semifinal, etc.)
  locale: string;            // 'pt-br' | 'en' | 'es' — reservado para uso futuro
  canonicalUrl: string;      // URL absoluta da página
}

/**
 * Gera um objeto JSON-LD SportsEvent para partidas confirmadas.
 *
 * Usar apenas quando:
 * - match.type === 'confirmed'
 * - homeTeam e awayTeam estão definidos (não nulos)
 *
 * NÃO usar para:
 * - match.type === 'partial' (times indefinidos)
 * - match.type === 'simulation' (dado fictício)
 */
export function buildSportsEventSchema(opts: SportsEventSchemaOptions): object {
  const {
    homeTeamName,
    awayTeamName,
    datetimeUtc,
    stadiumName,
    cityName,
    countryName,
    phase,
    canonicalUrl,
  } = opts;

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': `${homeTeamName} vs ${awayTeamName}`,
    'description': `FIFA World Cup 2026 — ${phase}. (demonstration data)`,
    'startDate': datetimeUtc,
    'sport': 'Soccer',
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'location': {
      '@type': 'Place',
      'name': stadiumName,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': cityName,
        'addressCountry': countryName,
      },
    },
    'competitor': [
      {
        '@type': 'SportsTeam',
        'name': homeTeamName,
      },
      {
        '@type': 'SportsTeam',
        'name': awayTeamName,
      },
    ],
    'url': canonicalUrl,
  };
}
