// timezone.ts — Utilitários de fuso horário
// Compatível com Astro SSG: verifica typeof window antes de acessar APIs de navegador

export interface TimezoneOption {
  value: string;   // IANA timezone string, ex: "America/Sao_Paulo"
  label: string;   // Label amigável localizado, ex: "São Paulo"
  region: string;  // Região localizada, ex: "América do Sul"
}

type SupportedLocale = 'pt-br' | 'en' | 'es';

/**
 * Retorna true se o código estiver rodando no navegador.
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Valida se uma string é um fuso IANA válido.
 * Tenta criar um Intl.DateTimeFormat com ele; retorna false se lançar exceção.
 */
export function isValidTimezone(tz: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/**
 * Retorna o fuso do navegador (ex: "America/Sao_Paulo") ou "UTC" como fallback.
 */
export function getBrowserTimezone(): string {
  if (!isBrowser()) return 'UTC';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz && isValidTimezone(tz) ? tz : 'UTC';
  } catch {
    return 'UTC';
  }
}

/**
 * Calcula o offset UTC atual de um fuso em minutos.
 * Retorna 0 se o fuso for inválido.
 */
function getTimezoneOffsetMinutes(tz: string): number {
  try {
    const now = new Date();
    const utcStr = now.toLocaleString('en-US', { timeZone: 'UTC' });
    const tzStr = now.toLocaleString('en-US', { timeZone: tz });
    const utcDate = new Date(utcStr);
    const tzDate = new Date(tzStr);
    return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
  } catch {
    return 0;
  }
}

/**
 * Formata o offset UTC em string legível (ex: "UTC-3", "UTC+5:30", "UTC+0").
 */
function formatOffset(offsetMinutes: number): string {
  if (offsetMinutes === 0) return 'UTC+0';
  const sign = offsetMinutes > 0 ? '+' : '-';
  const absMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absMinutes / 60);
  const mins = absMinutes % 60;
  return mins === 0 ? `UTC${sign}${hours}` : `UTC${sign}${hours}:${String(mins).padStart(2, '0')}`;
}

/**
 * Converte string de fuso IANA para rótulo amigável.
 * Ex: "America/Sao_Paulo" → "São Paulo (UTC-3)"
 */
export function getTimezoneLabel(tz: string, _locale?: string): string {
  if (!isValidTimezone(tz)) return tz;

  const parts = tz.split('/');
  const cityRaw = parts[parts.length - 1].replace(/_/g, ' ');

  const offset = getTimezoneOffsetMinutes(tz);
  const offsetStr = formatOffset(offset);

  return `${cityRaw} (${offsetStr})`;
}

// Traduções de regiões por locale
const regionLabels: Record<string, Record<SupportedLocale, string>> = {
  'south-america': { 'pt-br': 'América do Sul',   en: 'South America',   es: 'América del Sur'   },
  'north-america': { 'pt-br': 'América do Norte',  en: 'North America',   es: 'América del Norte'  },
  'europe':        { 'pt-br': 'Europa',            en: 'Europe',          es: 'Europa'             },
  'asia-oceania':  { 'pt-br': 'Ásia/Oceania',      en: 'Asia/Oceania',    es: 'Asia/Oceanía'       },
  'africa':        { 'pt-br': 'África',            en: 'Africa',          es: 'África'             },
  'utc':           { 'pt-br': 'UTC',               en: 'UTC',             es: 'UTC'                },
};

// Dados com labels localizados por locale
interface TzEntry {
  value: string;
  labels: Record<SupportedLocale, string>;
  regionKey: string;
}

const TIMEZONE_DATA: TzEntry[] = [
  // América do Sul
  { value: 'America/Sao_Paulo',    labels: { 'pt-br': 'São Paulo',          en: 'São Paulo',        es: 'São Paulo'          }, regionKey: 'south-america' },
  { value: 'America/Manaus',       labels: { 'pt-br': 'Manaus',             en: 'Manaus',           es: 'Manaus'             }, regionKey: 'south-america' },
  { value: 'America/Fortaleza',    labels: { 'pt-br': 'Fortaleza',          en: 'Fortaleza',        es: 'Fortaleza'          }, regionKey: 'south-america' },
  { value: 'America/Recife',       labels: { 'pt-br': 'Recife',             en: 'Recife',           es: 'Recife'             }, regionKey: 'south-america' },
  { value: 'America/Belem',        labels: { 'pt-br': 'Belém',              en: 'Belém',            es: 'Belém'              }, regionKey: 'south-america' },
  { value: 'America/Porto_Velho',  labels: { 'pt-br': 'Porto Velho',        en: 'Porto Velho',      es: 'Porto Velho'        }, regionKey: 'south-america' },
  { value: 'America/Boa_Vista',    labels: { 'pt-br': 'Boa Vista',          en: 'Boa Vista',        es: 'Boa Vista'          }, regionKey: 'south-america' },
  { value: 'America/Rio_Branco',   labels: { 'pt-br': 'Rio Branco',         en: 'Rio Branco',       es: 'Rio Branco'         }, regionKey: 'south-america' },
  { value: 'America/Noronha',      labels: { 'pt-br': 'Fernando de Noronha', en: 'Fernando de Noronha', es: 'Fernando de Noronha' }, regionKey: 'south-america' },
  { value: 'America/Buenos_Aires', labels: { 'pt-br': 'Buenos Aires',       en: 'Buenos Aires',     es: 'Buenos Aires'       }, regionKey: 'south-america' },
  { value: 'America/Santiago',     labels: { 'pt-br': 'Santiago',           en: 'Santiago',         es: 'Santiago'           }, regionKey: 'south-america' },
  { value: 'America/Lima',         labels: { 'pt-br': 'Lima',               en: 'Lima',             es: 'Lima'               }, regionKey: 'south-america' },
  { value: 'America/Bogota',       labels: { 'pt-br': 'Bogotá',             en: 'Bogotá',           es: 'Bogotá'             }, regionKey: 'south-america' },
  { value: 'America/Caracas',      labels: { 'pt-br': 'Caracas',            en: 'Caracas',          es: 'Caracas'            }, regionKey: 'south-america' },
  { value: 'America/Montevideo',   labels: { 'pt-br': 'Montevidéu',         en: 'Montevideo',       es: 'Montevideo'         }, regionKey: 'south-america' },
  { value: 'America/Asuncion',     labels: { 'pt-br': 'Assunção',           en: 'Asunción',         es: 'Asunción'           }, regionKey: 'south-america' },
  { value: 'America/La_Paz',       labels: { 'pt-br': 'La Paz',             en: 'La Paz',           es: 'La Paz'             }, regionKey: 'south-america' },
  { value: 'America/Guayaquil',    labels: { 'pt-br': 'Guayaquil',          en: 'Guayaquil',        es: 'Guayaquil'          }, regionKey: 'south-america' },

  // América do Norte
  { value: 'America/New_York',     labels: { 'pt-br': 'Nova York',          en: 'New York',         es: 'Nueva York'         }, regionKey: 'north-america' },
  { value: 'America/Chicago',      labels: { 'pt-br': 'Chicago',            en: 'Chicago',          es: 'Chicago'            }, regionKey: 'north-america' },
  { value: 'America/Denver',       labels: { 'pt-br': 'Denver',             en: 'Denver',           es: 'Denver'             }, regionKey: 'north-america' },
  { value: 'America/Los_Angeles',  labels: { 'pt-br': 'Los Angeles',        en: 'Los Angeles',      es: 'Los Ángeles'        }, regionKey: 'north-america' },
  { value: 'America/Phoenix',      labels: { 'pt-br': 'Phoenix',            en: 'Phoenix',          es: 'Phoenix'            }, regionKey: 'north-america' },
  { value: 'America/Anchorage',    labels: { 'pt-br': 'Anchorage',          en: 'Anchorage',        es: 'Anchorage'          }, regionKey: 'north-america' },
  { value: 'Pacific/Honolulu',     labels: { 'pt-br': 'Honolulu',           en: 'Honolulu',         es: 'Honolulu'           }, regionKey: 'north-america' },
  { value: 'America/Toronto',      labels: { 'pt-br': 'Toronto',            en: 'Toronto',          es: 'Toronto'            }, regionKey: 'north-america' },
  { value: 'America/Vancouver',    labels: { 'pt-br': 'Vancouver',          en: 'Vancouver',        es: 'Vancouver'          }, regionKey: 'north-america' },
  { value: 'America/Winnipeg',     labels: { 'pt-br': 'Winnipeg',           en: 'Winnipeg',         es: 'Winnipeg'           }, regionKey: 'north-america' },
  { value: 'America/Halifax',      labels: { 'pt-br': 'Halifax',            en: 'Halifax',          es: 'Halifax'            }, regionKey: 'north-america' },
  { value: 'America/St_Johns',     labels: { 'pt-br': "St. John's",         en: "St. John's",       es: "St. John's"         }, regionKey: 'north-america' },
  { value: 'America/Mexico_City',  labels: { 'pt-br': 'Cidade do México',   en: 'Mexico City',      es: 'Ciudad de México'   }, regionKey: 'north-america' },
  { value: 'America/Monterrey',    labels: { 'pt-br': 'Monterrey',          en: 'Monterrey',        es: 'Monterrey'          }, regionKey: 'north-america' },
  { value: 'America/Tijuana',      labels: { 'pt-br': 'Tijuana',            en: 'Tijuana',          es: 'Tijuana'            }, regionKey: 'north-america' },
  { value: 'America/Hermosillo',   labels: { 'pt-br': 'Hermosillo',         en: 'Hermosillo',       es: 'Hermosillo'         }, regionKey: 'north-america' },

  // Europa
  { value: 'Europe/London',        labels: { 'pt-br': 'Londres',            en: 'London',           es: 'Londres'            }, regionKey: 'europe' },
  { value: 'Europe/Lisbon',        labels: { 'pt-br': 'Lisboa',             en: 'Lisbon',           es: 'Lisboa'             }, regionKey: 'europe' },
  { value: 'Europe/Paris',         labels: { 'pt-br': 'Paris',              en: 'Paris',            es: 'París'              }, regionKey: 'europe' },
  { value: 'Europe/Berlin',        labels: { 'pt-br': 'Berlim',             en: 'Berlin',           es: 'Berlín'             }, regionKey: 'europe' },
  { value: 'Europe/Madrid',        labels: { 'pt-br': 'Madri',              en: 'Madrid',           es: 'Madrid'             }, regionKey: 'europe' },
  { value: 'Europe/Rome',          labels: { 'pt-br': 'Roma',               en: 'Rome',             es: 'Roma'               }, regionKey: 'europe' },
  { value: 'Europe/Amsterdam',     labels: { 'pt-br': 'Amsterdã',           en: 'Amsterdam',        es: 'Ámsterdam'          }, regionKey: 'europe' },
  { value: 'Europe/Brussels',      labels: { 'pt-br': 'Bruxelas',           en: 'Brussels',         es: 'Bruselas'           }, regionKey: 'europe' },
  { value: 'Europe/Warsaw',        labels: { 'pt-br': 'Varsóvia',           en: 'Warsaw',           es: 'Varsovia'           }, regionKey: 'europe' },
  { value: 'Europe/Moscow',        labels: { 'pt-br': 'Moscou',             en: 'Moscow',           es: 'Moscú'              }, regionKey: 'europe' },
  { value: 'Europe/Samara',        labels: { 'pt-br': 'Samara',             en: 'Samara',           es: 'Samara'             }, regionKey: 'europe' },
  { value: 'Asia/Yekaterinburg',   labels: { 'pt-br': 'Ecaterimburgo',      en: 'Yekaterinburg',    es: 'Ekaterimburgo'      }, regionKey: 'europe' },
  { value: 'Europe/Athens',        labels: { 'pt-br': 'Atenas',             en: 'Athens',           es: 'Atenas'             }, regionKey: 'europe' },
  { value: 'Europe/Helsinki',      labels: { 'pt-br': 'Helsinque',          en: 'Helsinki',         es: 'Helsinki'           }, regionKey: 'europe' },
  { value: 'Europe/Bucharest',     labels: { 'pt-br': 'Bucareste',          en: 'Bucharest',        es: 'Bucarest'           }, regionKey: 'europe' },
  { value: 'Europe/Istanbul',      labels: { 'pt-br': 'Istambul',           en: 'Istanbul',         es: 'Estambul'           }, regionKey: 'europe' },

  // Ásia e Oceania
  { value: 'Asia/Dubai',           labels: { 'pt-br': 'Dubai',              en: 'Dubai',            es: 'Dubái'              }, regionKey: 'asia-oceania' },
  { value: 'Asia/Kolkata',         labels: { 'pt-br': 'Mumbai/Kolkata',     en: 'Mumbai/Kolkata',   es: 'Bombay/Calcuta'     }, regionKey: 'asia-oceania' },
  { value: 'Asia/Dhaka',           labels: { 'pt-br': 'Dhaka',              en: 'Dhaka',            es: 'Daca'               }, regionKey: 'asia-oceania' },
  { value: 'Asia/Bangkok',         labels: { 'pt-br': 'Bangkok',            en: 'Bangkok',          es: 'Bangkok'            }, regionKey: 'asia-oceania' },
  { value: 'Asia/Singapore',       labels: { 'pt-br': 'Singapura',          en: 'Singapore',        es: 'Singapur'           }, regionKey: 'asia-oceania' },
  { value: 'Asia/Shanghai',        labels: { 'pt-br': 'Xangai',             en: 'Shanghai',         es: 'Shanghái'           }, regionKey: 'asia-oceania' },
  { value: 'Asia/Tokyo',           labels: { 'pt-br': 'Tóquio',             en: 'Tokyo',            es: 'Tokio'              }, regionKey: 'asia-oceania' },
  { value: 'Asia/Seoul',           labels: { 'pt-br': 'Seul',               en: 'Seoul',            es: 'Seúl'               }, regionKey: 'asia-oceania' },
  { value: 'Asia/Novosibirsk',     labels: { 'pt-br': 'Novosibirsk',        en: 'Novosibirsk',      es: 'Novosibirsk'        }, regionKey: 'asia-oceania' },
  { value: 'Asia/Krasnoyarsk',     labels: { 'pt-br': 'Krasnoyarsk',        en: 'Krasnoyarsk',      es: 'Krasnoyarsk'        }, regionKey: 'asia-oceania' },
  { value: 'Asia/Irkutsk',         labels: { 'pt-br': 'Irkutsk',            en: 'Irkutsk',          es: 'Irkutsk'            }, regionKey: 'asia-oceania' },
  { value: 'Asia/Vladivostok',     labels: { 'pt-br': 'Vladivostok',        en: 'Vladivostok',      es: 'Vladivostok'        }, regionKey: 'asia-oceania' },
  { value: 'Australia/Sydney',     labels: { 'pt-br': 'Sydney',             en: 'Sydney',           es: 'Sídney'             }, regionKey: 'asia-oceania' },
  { value: 'Australia/Melbourne',  labels: { 'pt-br': 'Melbourne',          en: 'Melbourne',        es: 'Melbourne'          }, regionKey: 'asia-oceania' },
  { value: 'Australia/Brisbane',   labels: { 'pt-br': 'Brisbane',           en: 'Brisbane',         es: 'Brisbane'           }, regionKey: 'asia-oceania' },
  { value: 'Australia/Perth',      labels: { 'pt-br': 'Perth',              en: 'Perth',            es: 'Perth'              }, regionKey: 'asia-oceania' },
  { value: 'Pacific/Auckland',     labels: { 'pt-br': 'Auckland',           en: 'Auckland',         es: 'Auckland'           }, regionKey: 'asia-oceania' },

  // África
  { value: 'Africa/Cairo',         labels: { 'pt-br': 'Cairo',              en: 'Cairo',            es: 'El Cairo'           }, regionKey: 'africa' },
  { value: 'Africa/Johannesburg',  labels: { 'pt-br': 'Joanesburgo',        en: 'Johannesburg',     es: 'Johannesburgo'      }, regionKey: 'africa' },
  { value: 'Africa/Lagos',         labels: { 'pt-br': 'Lagos',              en: 'Lagos',            es: 'Lagos'              }, regionKey: 'africa' },
  { value: 'Africa/Nairobi',       labels: { 'pt-br': 'Nairóbi',            en: 'Nairobi',          es: 'Nairobi'            }, regionKey: 'africa' },
  { value: 'Africa/Casablanca',    labels: { 'pt-br': 'Casablanca',         en: 'Casablanca',       es: 'Casablanca'         }, regionKey: 'africa' },

  // UTC
  { value: 'UTC',                  labels: { 'pt-br': 'UTC',                en: 'UTC',              es: 'UTC'                }, regionKey: 'utc' },
];

/**
 * Lista de fusos populares agrupados por região, com labels localizados.
 * Aceita locale 'pt-br' | 'en' | 'es' (padrão: 'pt-br').
 */
export function getPopularTimezones(locale?: string): TimezoneOption[] {
  const lang = (locale as SupportedLocale) ?? 'pt-br';
  const safeLocale: SupportedLocale = ['pt-br', 'en', 'es'].includes(lang) ? lang : 'pt-br';

  return TIMEZONE_DATA
    .filter((z) => isValidTimezone(z.value))
    .map((z) => ({
      value: z.value,
      label: z.labels[safeLocale],
      region: regionLabels[z.regionKey][safeLocale],
    }));
}
