// timezone.ts — Utilitários de fuso horário
// Compatível com Astro SSG: verifica typeof window antes de acessar APIs de navegador

export interface TimezoneOption {
  value: string;   // IANA timezone string, ex: "America/Sao_Paulo"
  label: string;   // Label amigável, ex: "São Paulo"
  region: string;  // Região, ex: "América do Sul"
}

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
    // Formata a data em UTC e no fuso alvo para calcular a diferença
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

  // Extrai a parte da cidade do identificador IANA (após a última "/")
  const parts = tz.split('/');
  const cityRaw = parts[parts.length - 1].replace(/_/g, ' ');

  const offset = getTimezoneOffsetMinutes(tz);
  const offsetStr = formatOffset(offset);

  return `${cityRaw} (${offsetStr})`;
}

/**
 * Lista de fusos populares agrupados por região.
 * Inclui cidades relevantes de países grandes com múltiplos fusos.
 */
export function getPopularTimezones(_locale?: string): TimezoneOption[] {
  const zonesData: Array<{ value: string; label: string; region: string }> = [
    // América do Sul
    { value: 'America/Sao_Paulo',      label: 'São Paulo',       region: 'América do Sul' },
    { value: 'America/Manaus',         label: 'Manaus',          region: 'América do Sul' },
    { value: 'America/Fortaleza',      label: 'Fortaleza',       region: 'América do Sul' },
    { value: 'America/Recife',         label: 'Recife',          region: 'América do Sul' },
    { value: 'America/Belem',          label: 'Belém',           region: 'América do Sul' },
    { value: 'America/Porto_Velho',    label: 'Porto Velho',     region: 'América do Sul' },
    { value: 'America/Boa_Vista',      label: 'Boa Vista',       region: 'América do Sul' },
    { value: 'America/Rio_Branco',     label: 'Rio Branco',      region: 'América do Sul' },
    { value: 'America/Noronha',        label: 'Fernando de Noronha', region: 'América do Sul' },
    { value: 'America/Buenos_Aires',   label: 'Buenos Aires',    region: 'América do Sul' },
    { value: 'America/Santiago',       label: 'Santiago',        region: 'América do Sul' },
    { value: 'America/Lima',           label: 'Lima',            region: 'América do Sul' },
    { value: 'America/Bogota',         label: 'Bogotá',          region: 'América do Sul' },
    { value: 'America/Caracas',        label: 'Caracas',         region: 'América do Sul' },
    { value: 'America/Montevideo',     label: 'Montevidéu',      region: 'América do Sul' },
    { value: 'America/Asuncion',       label: 'Assunção',        region: 'América do Sul' },
    { value: 'America/La_Paz',         label: 'La Paz',          region: 'América do Sul' },
    { value: 'America/Guayaquil',      label: 'Guayaquil',       region: 'América do Sul' },

    // América do Norte
    { value: 'America/New_York',       label: 'Nova York',       region: 'América do Norte' },
    { value: 'America/Chicago',        label: 'Chicago',         region: 'América do Norte' },
    { value: 'America/Denver',         label: 'Denver',          region: 'América do Norte' },
    { value: 'America/Los_Angeles',    label: 'Los Angeles',     region: 'América do Norte' },
    { value: 'America/Phoenix',        label: 'Phoenix',         region: 'América do Norte' },
    { value: 'America/Anchorage',      label: 'Anchorage',       region: 'América do Norte' },
    { value: 'Pacific/Honolulu',       label: 'Honolulu',        region: 'América do Norte' },
    { value: 'America/Toronto',        label: 'Toronto',         region: 'América do Norte' },
    { value: 'America/Vancouver',      label: 'Vancouver',       region: 'América do Norte' },
    { value: 'America/Winnipeg',       label: 'Winnipeg',        region: 'América do Norte' },
    { value: 'America/Halifax',        label: 'Halifax',         region: 'América do Norte' },
    { value: 'America/St_Johns',       label: 'St. John\'s',     region: 'América do Norte' },
    { value: 'America/Mexico_City',    label: 'Cidade do México', region: 'América do Norte' },
    { value: 'America/Monterrey',      label: 'Monterrey',       region: 'América do Norte' },
    { value: 'America/Tijuana',        label: 'Tijuana',         region: 'América do Norte' },
    { value: 'America/Hermosillo',     label: 'Hermosillo',      region: 'América do Norte' },

    // Europa
    { value: 'Europe/London',          label: 'Londres',         region: 'Europa' },
    { value: 'Europe/Lisbon',          label: 'Lisboa',          region: 'Europa' },
    { value: 'Europe/Paris',           label: 'Paris',           region: 'Europa' },
    { value: 'Europe/Berlin',          label: 'Berlim',          region: 'Europa' },
    { value: 'Europe/Madrid',          label: 'Madri',           region: 'Europa' },
    { value: 'Europe/Rome',            label: 'Roma',            region: 'Europa' },
    { value: 'Europe/Amsterdam',       label: 'Amsterdã',        region: 'Europa' },
    { value: 'Europe/Brussels',        label: 'Bruxelas',        region: 'Europa' },
    { value: 'Europe/Warsaw',          label: 'Varsóvia',        region: 'Europa' },
    { value: 'Europe/Moscow',          label: 'Moscou',          region: 'Europa' },
    { value: 'Europe/Samara',          label: 'Samara',          region: 'Europa' },
    { value: 'Asia/Yekaterinburg',     label: 'Ecaterimburgo',   region: 'Europa' },
    { value: 'Europe/Athens',          label: 'Atenas',          region: 'Europa' },
    { value: 'Europe/Helsinki',        label: 'Helsinque',       region: 'Europa' },
    { value: 'Europe/Bucharest',       label: 'Bucareste',       region: 'Europa' },
    { value: 'Europe/Istanbul',        label: 'Istambul',        region: 'Europa' },

    // Ásia e Oceania
    { value: 'Asia/Dubai',             label: 'Dubai',           region: 'Ásia/Oceania' },
    { value: 'Asia/Kolkata',           label: 'Mumbai/Kolkata',  region: 'Ásia/Oceania' },
    { value: 'Asia/Dhaka',             label: 'Dhaka',           region: 'Ásia/Oceania' },
    { value: 'Asia/Bangkok',           label: 'Bangkok',         region: 'Ásia/Oceania' },
    { value: 'Asia/Singapore',         label: 'Singapura',       region: 'Ásia/Oceania' },
    { value: 'Asia/Shanghai',          label: 'Xangai',          region: 'Ásia/Oceania' },
    { value: 'Asia/Tokyo',             label: 'Tóquio',          region: 'Ásia/Oceania' },
    { value: 'Asia/Seoul',             label: 'Seul',            region: 'Ásia/Oceania' },
    { value: 'Asia/Novosibirsk',       label: 'Novosibirsk',     region: 'Ásia/Oceania' },
    { value: 'Asia/Krasnoyarsk',       label: 'Krasnoyarsk',     region: 'Ásia/Oceania' },
    { value: 'Asia/Irkutsk',           label: 'Irkutsk',         region: 'Ásia/Oceania' },
    { value: 'Asia/Vladivostok',       label: 'Vladivostok',     region: 'Ásia/Oceania' },
    { value: 'Australia/Sydney',       label: 'Sydney',          region: 'Ásia/Oceania' },
    { value: 'Australia/Melbourne',    label: 'Melbourne',       region: 'Ásia/Oceania' },
    { value: 'Australia/Brisbane',     label: 'Brisbane',        region: 'Ásia/Oceania' },
    { value: 'Australia/Perth',        label: 'Perth',           region: 'Ásia/Oceania' },
    { value: 'Pacific/Auckland',       label: 'Auckland',        region: 'Ásia/Oceania' },

    // África
    { value: 'Africa/Cairo',           label: 'Cairo',           region: 'África' },
    { value: 'Africa/Johannesburg',    label: 'Joanesburgo',     region: 'África' },
    { value: 'Africa/Lagos',           label: 'Lagos',           region: 'África' },
    { value: 'Africa/Nairobi',         label: 'Nairóbi',         region: 'África' },
    { value: 'Africa/Casablanca',      label: 'Casablanca',      region: 'África' },

    // UTC
    { value: 'UTC',                    label: 'UTC',             region: 'UTC' },
  ];

  // Filtra apenas os fusos que o ambiente suporta
  return zonesData
    .filter((z) => isValidTimezone(z.value))
    .map((z) => ({
      value: z.value,
      label: z.label,
      region: z.region,
    }));
}
