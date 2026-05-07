// matches.ts — Funções de consulta e filtro de partidas
// As funções recebem os dados via parâmetro (sem importar JSONs diretamente)
// para facilitar testes e reutilização.

import type { Match, MatchPhase, Locale, Team } from '../types/index.ts';
import { isToday } from './datetime.ts';

/**
 * Retorna o próximo jogo CONFIRMADO de uma seleção (datetime_utc mais próximo do futuro).
 * Nunca retorna partidas do tipo 'partial' ou 'simulation' como "próximo jogo confirmado".
 */
export function getNextConfirmedMatch(
  matches: Match[],
  teamSlug: string
): Match | null {
  const now = Date.now();

  const candidates = matches.filter((m) => {
    if (m.type !== 'confirmed') return false;
    const matchTime = new Date(m.datetime_utc).getTime();
    if (matchTime <= now) return false;
    return m.home_team_id === teamSlug || m.away_team_id === teamSlug;
  });

  if (candidates.length === 0) return null;

  return candidates.reduce((closest, m) => {
    const closestTime = new Date(closest.datetime_utc).getTime();
    const mTime       = new Date(m.datetime_utc).getTime();
    return mTime < closestTime ? m : closest;
  });
}

/**
 * Retorna todos os jogos confirmados de uma seleção, em ordem cronológica.
 */
export function getConfirmedMatchesByTeam(
  matches: Match[],
  teamSlug: string
): Match[] {
  return matches
    .filter(
      (m) =>
        m.type === 'confirmed' &&
        (m.home_team_id === teamSlug || m.away_team_id === teamSlug)
    )
    .sort(
      (a, b) =>
        new Date(a.datetime_utc).getTime() - new Date(b.datetime_utc).getTime()
    );
}

/**
 * Retorna todos os jogos (qualquer type) que acontecem "hoje" no fuso dado.
 * "hoje" = a data local no fuso do usuário coincide com a data local da partida.
 */
export function getTodaysMatches(matches: Match[], timezone: string): Match[] {
  return matches
    .filter((m) => isToday(m.datetime_utc, timezone))
    .sort(
      (a, b) =>
        new Date(a.datetime_utc).getTime() - new Date(b.datetime_utc).getTime()
    );
}

/**
 * Retorna os jogos confirmados que acontecem "hoje" no fuso dado.
 */
export function getTodaysConfirmedMatches(
  matches: Match[],
  timezone: string
): Match[] {
  return matches
    .filter((m) => m.type === 'confirmed' && isToday(m.datetime_utc, timezone))
    .sort(
      (a, b) =>
        new Date(a.datetime_utc).getTime() - new Date(b.datetime_utc).getTime()
    );
}

/**
 * Retorna o nome localizado de uma seleção dado seu slug e a lista de times.
 * Retorna o slug como fallback se o time não for encontrado.
 */
export function getTeamName(
  teams: Team[],
  teamSlug: string,
  locale: Locale
): string {
  const team = teams.find((t) => t.slug === teamSlug);
  if (!team) return teamSlug;
  return team.name[locale] ?? team.name['en'] ?? teamSlug;
}

/**
 * Verifica se um jogo é considerado "ao vivo" baseado no mapa de status do live-data.
 * O parâmetro liveStatuses é um mapa { matchId → status string } vindo do live-data.json.
 */
export function isMatchLive(
  matchId: string,
  liveStatuses: Record<string, string>
): boolean {
  return liveStatuses[matchId] === 'live';
}

/**
 * Ordena um array de partidas por data/hora UTC em ordem crescente (ascending).
 * Não modifica o array original — retorna uma cópia ordenada.
 */
export function sortMatchesByDate(matches: Match[]): Match[] {
  return [...matches].sort(
    (a, b) =>
      new Date(a.datetime_utc).getTime() - new Date(b.datetime_utc).getTime()
  );
}

/**
 * Filtra partidas por fase (group_stage, round_of_32, quarterfinal, etc.).
 */
export function filterMatchesByPhase(
  matches: Match[],
  phase: MatchPhase
): Match[] {
  return matches.filter((m) => m.phase === phase);
}
