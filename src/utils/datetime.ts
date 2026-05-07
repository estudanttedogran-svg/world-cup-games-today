// datetime.ts — Utilitários de formatação de datas e horários
// Compatível com Astro SSG: usa apenas APIs nativas do JavaScript (Intl)

import type { Locale } from '../types/index.ts';

/** Mapeamento de Locale do projeto para código BCP-47 do Intl */
const INTL_LOCALE_MAP: Record<Locale, string> = {
  'pt-br': 'pt-BR',
  'en':    'en-US',
  'es':    'es-ES',
};

/**
 * Converte uma string de data UTC para um objeto Date no fuso especificado.
 * O objeto Date em si é sempre UTC internamente; o fuso é usado apenas para exibição.
 */
export function utcToTimezone(utcDateString: string, _timezone: string): Date {
  return new Date(utcDateString);
}

/**
 * Formata apenas a data localizada.
 * Ex (pt-br): "11 de jun. de 2026"
 * Ex (en):    "Jun 11, 2026"
 * Ex (es):    "11 jun. 2026"
 */
export function formatDate(utcDateString: string, locale: Locale, timezone: string): string {
  const date = new Date(utcDateString);
  const intlLocale = INTL_LOCALE_MAP[locale];
  try {
    return new Intl.DateTimeFormat(intlLocale, {
      timeZone: timezone,
      year:  'numeric',
      month: 'short',
      day:   'numeric',
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat(intlLocale, {
      timeZone: 'UTC',
      year:  'numeric',
      month: 'short',
      day:   'numeric',
    }).format(date);
  }
}

/**
 * Formata apenas a hora localizada.
 * Ex (pt-br): "16:00"
 * Ex (en):    "4:00 PM"
 * Ex (es):    "16:00"
 */
export function formatTime(utcDateString: string, locale: Locale, timezone: string): string {
  const date = new Date(utcDateString);
  const intlLocale = INTL_LOCALE_MAP[locale];
  try {
    return new Intl.DateTimeFormat(intlLocale, {
      timeZone: timezone,
      hour:   '2-digit',
      minute: '2-digit',
      hour12: locale === 'en',
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat(intlLocale, {
      timeZone: 'UTC',
      hour:   '2-digit',
      minute: '2-digit',
      hour12: locale === 'en',
    }).format(date);
  }
}

/**
 * Formata data e hora juntos.
 * Ex: "11 jun. • 16:00"
 */
export function formatDateTime(utcDateString: string, locale: Locale, timezone: string): string {
  const date = formatDate(utcDateString, locale, timezone);
  const time = formatTime(utcDateString, locale, timezone);
  return `${date} • ${time}`;
}

/**
 * Retorna o dia da semana localizado.
 * Ex (pt-br): "Quinta-feira"
 * Ex (en):    "Thursday"
 * Ex (es):    "Jueves"
 */
export function formatWeekday(utcDateString: string, locale: Locale, timezone: string): string {
  const date = new Date(utcDateString);
  const intlLocale = INTL_LOCALE_MAP[locale];
  try {
    return new Intl.DateTimeFormat(intlLocale, {
      timeZone: timezone,
      weekday: 'long',
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat(intlLocale, {
      timeZone: 'UTC',
      weekday: 'long',
    }).format(date);
  }
}

/**
 * Retorna quantos segundos faltam para a data alvo (negativo se já passou).
 */
export function secondsUntil(utcDateString: string): number {
  const target = new Date(utcDateString).getTime();
  const now = Date.now();
  return Math.round((target - now) / 1000);
}

/**
 * Formata uma contagem regressiva em string legível.
 * Ex: "2d 3h 15min", "2h 15min", "45min", "Em breve"
 */
export function formatCountdown(utcDateString: string, locale: Locale): string {
  const secs = secondsUntil(utcDateString);

  if (secs <= 0) {
    const labels: Record<Locale, string> = {
      'pt-br': 'Em breve',
      'en':    'Soon',
      'es':    'En breve',
    };
    return labels[locale];
  }

  const days    = Math.floor(secs / 86400);
  const hours   = Math.floor((secs % 86400) / 3600);
  const minutes = Math.floor((secs % 3600) / 60);

  if (locale === 'pt-br') {
    if (days > 0) return `${days}d ${hours}h ${minutes}min`;
    if (hours > 0) return `${hours}h ${minutes}min`;
    return `${minutes}min`;
  } else if (locale === 'en') {
    if (days > 0) return `${days}d ${hours}h ${minutes}min`;
    if (hours > 0) return `${hours}h ${minutes}min`;
    return `${minutes}min`;
  } else {
    // es
    if (days > 0) return `${days}d ${hours}h ${minutes}min`;
    if (hours > 0) return `${hours}h ${minutes}min`;
    return `${minutes}min`;
  }
}

/**
 * Verifica se uma data UTC é "hoje" no fuso dado.
 * Compara o dia/mês/ano local no fuso escolhido com o do instante atual.
 */
export function isToday(utcDateString: string, timezone: string): boolean {
  const matchDate = new Date(utcDateString);
  const now = new Date();

  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year:  'numeric',
      month: '2-digit',
      day:   '2-digit',
    });
    const matchDay = formatter.format(matchDate); // "YYYY-MM-DD"
    const today    = formatter.format(now);
    return matchDay === today;
  } catch {
    // Fallback: comparação em UTC
    const fmt = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'UTC',
      year:  'numeric',
      month: '2-digit',
      day:   '2-digit',
    });
    return fmt.format(matchDate) === fmt.format(now);
  }
}

/**
 * Verifica se uma data UTC já passou em relação ao instante atual.
 */
export function isPast(utcDateString: string): boolean {
  return new Date(utcDateString).getTime() < Date.now();
}
