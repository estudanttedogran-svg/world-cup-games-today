// language.ts — Detecção de idioma e labels de UI por locale
// Compatível com Astro SSG: verifica typeof window antes de acessar APIs de navegador

import type { Locale } from '../types/index.ts';

const VALID_LOCALES: Locale[] = ['pt-br', 'en', 'es'];

/**
 * Detecta o idioma preferido do navegador e retorna o Locale mais próximo.
 * Mapeamento: pt* → 'pt-br', es* → 'es', demais → 'en'
 * Fallback seguro: retorna 'en' se window não estiver disponível.
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  try {
    const langs =
      navigator.languages && navigator.languages.length > 0
        ? Array.from(navigator.languages)
        : [navigator.language || 'en'];

    for (const lang of langs) {
      const lower = lang.toLowerCase();
      if (lower.startsWith('pt')) return 'pt-br';
      if (lower.startsWith('es')) return 'es';
      if (lower.startsWith('en')) return 'en';
    }
    return 'en';
  } catch {
    return 'en';
  }
}

/**
 * Valida se uma string é um Locale válido do projeto.
 */
export function isValidLocale(value: string): value is Locale {
  return (VALID_LOCALES as string[]).includes(value);
}

/**
 * Retorna o nome do idioma no próprio idioma (para o seletor de idioma).
 * Ex: getLocaleName('pt-br') → 'Português'
 */
export function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    'pt-br': 'Português',
    'en':    'English',
    'es':    'Español',
  };
  return names[locale];
}

/**
 * Retorna o código HTML lang correspondente ao Locale do projeto.
 * Ex: getHtmlLang('pt-br') → 'pt-BR'
 */
export function getHtmlLang(locale: Locale): string {
  const htmlLangs: Record<Locale, string> = {
    'pt-br': 'pt-BR',
    'en':    'en',
    'es':    'es',
  };
  return htmlLangs[locale];
}

/**
 * Labels básicos de UI por locale para componentes do Header e Footer.
 */
export const uiLabels: Record<Locale, {
  home: string;
  todaysMatches: string;
  schedule: string;
  teams: string;
  language: string;
  skipToContent: string;
  legalNotice: string;
  mockDataWarning: string;
  privacyPolicy: string;
  termsOfUse: string;
  about: string;
  contact: string;
}> = {
  'pt-br': {
    home:            'Início',
    todaysMatches:   'Jogos de Hoje',
    schedule:        'Tabela',
    teams:           'Seleções',
    language:        'Idioma',
    skipToContent:   'Pular para o conteúdo principal',
    legalNotice:     'Aviso Legal',
    mockDataWarning: 'Atenção: este site utiliza dados fictícios (MOCK). Não usar como referência oficial.',
    privacyPolicy:   'Política de Privacidade',
    termsOfUse:      'Termos de Uso',
    about:           'Sobre',
    contact:         'Contato',
  },
  'en': {
    home:            'Home',
    todaysMatches:   "Today's Matches",
    schedule:        'Schedule',
    teams:           'Teams',
    language:        'Language',
    skipToContent:   'Skip to main content',
    legalNotice:     'Legal Notice',
    mockDataWarning: 'Notice: this site uses mock (fictional) data. Do not use as an official reference.',
    privacyPolicy:   'Privacy Policy',
    termsOfUse:      'Terms of Use',
    about:           'About',
    contact:         'Contact',
  },
  'es': {
    home:            'Inicio',
    todaysMatches:   'Partidos de Hoy',
    schedule:        'Calendario',
    teams:           'Equipos',
    language:        'Idioma',
    skipToContent:   'Saltar al contenido principal',
    legalNotice:     'Aviso Legal',
    mockDataWarning: 'Aviso: este sitio usa datos ficticios (MOCK). No usar como referencia oficial.',
    privacyPolicy:   'Política de Privacidad',
    termsOfUse:      'Términos de Uso',
    about:           'Acerca de',
    contact:         'Contacto',
  },
};
