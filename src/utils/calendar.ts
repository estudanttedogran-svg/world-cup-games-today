// calendar.ts — Utilitários de integração com calendário
// Compatível com Astro SSG: funções puras que rodam no Node (build time) e no browser (runtime)
// downloadICS() só executa no browser — guarded com typeof window

import type { Locale } from '../types/index.ts';

export interface CalendarEventData {
  id: string;                  // match.id — ex: "match-001"
  matchType: 'confirmed' | 'partial' | 'simulation';
  summary: string;             // Título do evento
  description: string;         // Descrição com link e aviso mock
  location: string;            // Estádio, cidade, país
  dtstart: string;             // ISO UTC — ex: "2026-06-11T19:00:00Z"
  durationMinutes?: number;    // default: 120
  pageUrl: string;             // URL da página do jogo
}

// --- Google Calendar ---

/**
 * Formata data para o formato YYYYMMDDTHHMMSSZ esperado pelo Google Calendar.
 * "2026-06-11T19:00:00Z" → "20260611T190000Z"
 */
export function toGoogleCalendarDate(utcDateString: string): string {
  return utcDateString
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

/**
 * Gera link para adicionar evento no Google Calendar.
 * Seguro para rodar no Node (build time) — URLSearchParams está disponível no Node 18+.
 */
export function buildGoogleCalendarUrl(event: CalendarEventData): string {
  const base = 'https://calendar.google.com/calendar/r/eventedit';
  const start = toGoogleCalendarDate(event.dtstart);

  // Calcular end: dtstart + durationMinutes
  const durationMs = (event.durationMinutes ?? 120) * 60 * 1000;
  const endDate = new Date(new Date(event.dtstart).getTime() + durationMs);
  const end = toGoogleCalendarDate(endDate.toISOString());

  const params = new URLSearchParams({
    text: event.summary,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });

  return `${base}?${params.toString()}`;
}

// --- ICS (RFC 5545) ---

/**
 * Escapa texto para formato ICS (RFC 5545).
 * Regras: backslash → \\, ponto-e-vírgula → \;, vírgula → \,, newline → \n, CR removido.
 */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

/**
 * Formata data UTC para YYYYMMDDTHHMMSSZ (formato ICS).
 * "2026-06-11T19:00:00.000Z" → "20260611T190000Z"
 */
export function toICSDate(utcDateString: string): string {
  return utcDateString
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

/**
 * Gera o timestamp atual no formato ICS (DTSTAMP).
 */
export function nowICSDate(): string {
  return toICSDate(new Date().toISOString());
}

/**
 * Gera o conteúdo completo de um arquivo .ics para um evento.
 * Função pura — segura para rodar no Node (build time).
 */
export function buildICSContent(event: CalendarEventData): string {
  const durationMs = (event.durationMinutes ?? 120) * 60 * 1000;
  const endDate = new Date(new Date(event.dtstart).getTime() + durationMs);

  const dtstart = toICSDate(event.dtstart);
  const dtend = toICSDate(endDate.toISOString());
  const dtstamp = nowICSDate();
  // UID estável baseado no match.id e no domínio (não usar random/timestamp)
  const uid = `${event.id}@worldcupgamestoday.com`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//World Cup Games Today//Copa 2026//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escapeICS(event.summary)}`,
    `DESCRIPTION:${escapeICS(event.description)}`,
    `LOCATION:${escapeICS(event.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

/**
 * Faz o download do .ics no browser (somente client-side).
 * Retorna false se não estiver no browser ou se houver falha.
 */
export function downloadICS(event: CalendarEventData): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const content = buildICSContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `copa-2026-${event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}

/**
 * Constrói um CalendarEventData a partir dos dados disponíveis na página de jogo.
 * Suporta pt-br, en e es via parâmetro locale. Padrão: pt-br.
 */
export function buildCalendarEventData(opts: {
  matchId: string;
  matchType: 'confirmed' | 'partial' | 'simulation';
  homeTeamName?: string;
  awayTeamName?: string;
  datetimeUtc: string;
  locationStr: string;   // "Estádio, Cidade, País"
  pageUrl: string;
  locale?: Locale;       // opcional — padrão 'pt-br' para compatibilidade
}): CalendarEventData {
  const {
    matchId,
    matchType,
    homeTeamName,
    awayTeamName,
    datetimeUtc,
    locationStr,
    pageUrl,
  } = opts;

  const locale = opts.locale ?? 'pt-br';

  let summary: string;
  let description: string;

  if (matchType === 'confirmed' && homeTeamName && awayTeamName) {
    if (locale === 'en') {
      summary = `${homeTeamName} vs ${awayTeamName} — World Cup 2026`;
      description = `FIFA World Cup 2026 match.\n${homeTeamName} vs ${awayTeamName}\n\nSee details at: ${pageUrl}\n\n⚠ DEMONSTRATION DATA (MOCK). This site is independent and has no official affiliation with FIFA.`;
    } else if (locale === 'es') {
      summary = `${homeTeamName} vs ${awayTeamName} — Copa 2026`;
      description = `Partido de la Copa Mundial FIFA 2026.\n${homeTeamName} vs ${awayTeamName}\n\nVer detalles en: ${pageUrl}\n\n⚠ DATOS DE DEMOSTRACION (MOCK). Este sitio es independiente y no tiene afiliacion oficial con la FIFA.`;
    } else {
      // pt-br (padrão)
      summary = `${homeTeamName} x ${awayTeamName} — Copa 2026`;
      description = `Jogo da Copa do Mundo FIFA 2026.\n${homeTeamName} x ${awayTeamName}\n\nVeja detalhes em: ${pageUrl}\n\n⚠ DADOS DE DEMONSTRACAO (MOCK). Este site e independente e nao possui afiliacao oficial com a FIFA.`;
    }
  } else if (matchType === 'partial') {
    if (locale === 'en') {
      summary = `Match to be confirmed — World Cup 2026`;
      description = `FIFA World Cup 2026 match.\nTeams will be determined as the competition progresses.\n\nSee details at: ${pageUrl}\n\n⚠ DEMONSTRATION DATA (MOCK). This site is independent and has no official affiliation with FIFA.`;
    } else if (locale === 'es') {
      summary = `Partido por definir — Copa 2026`;
      description = `Partido de la Copa Mundial FIFA 2026.\nLas selecciones se definiran a lo largo de la competicion.\n\nVer detalles en: ${pageUrl}\n\n⚠ DATOS DE DEMOSTRACION (MOCK). Este sitio es independiente y no tiene afiliacion oficial con la FIFA.`;
    } else {
      // pt-br (padrão)
      summary = `Partida a definir — Copa 2026`;
      description = `Jogo da Copa do Mundo FIFA 2026.\nAs selecoes serao definidas ao longo da competicao.\n\nVeja detalhes em: ${pageUrl}\n\n⚠ DADOS DE DEMONSTRACAO (MOCK). Este site e independente e nao possui afiliacao oficial com a FIFA.`;
    }
  } else {
    if (locale === 'en') {
      summary = `World Cup 2026`;
      description = `See at: ${pageUrl}\n\n⚠ DEMONSTRATION DATA (MOCK).`;
    } else if (locale === 'es') {
      summary = `Copa Mundial 2026`;
      description = `Ver en: ${pageUrl}\n\n⚠ DATOS DE DEMOSTRACION (MOCK).`;
    } else {
      // pt-br (padrão)
      summary = `Copa do Mundo 2026`;
      description = `Veja em: ${pageUrl}\n\n⚠ DADOS DE DEMONSTRACAO (MOCK).`;
    }
  }

  return {
    id: matchId,
    matchType,
    summary,
    description,
    location: locationStr,
    dtstart: datetimeUtc,
    durationMinutes: 120,
    pageUrl,
  };
}
