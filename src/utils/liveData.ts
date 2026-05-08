// liveData.ts — Utilitário para buscar e validar /data/live-data.json no cliente
// MOCK DATA — não usar em produção sem revisão
// Este módulo deve ser usado APENAS no browser (guard typeof window).
// O build estático do Astro nunca depende deste arquivo para renderização.

import type { LiveData, LiveMatchData } from '../types/index.ts';

// URL do arquivo de dados vivos — relativa para funcionar em qualquer domínio
const LIVE_DATA_URL = '/data/live-data.json';

// Tempo limite para o fetch em milissegundos
const FETCH_TIMEOUT_MS = 8000;

/**
 * Valida se o objeto recebido tem a estrutura mínima esperada de LiveData.
 * Retorna false em qualquer falha — nunca lança exceção.
 */
function isValidLiveData(data: unknown): data is LiveData {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;

  // Campo matches é obrigatório e deve ser objeto (Record)
  if (!obj['matches'] || typeof obj['matches'] !== 'object' || Array.isArray(obj['matches'])) {
    return false;
  }

  // Campo last_updated é opcional, mas se presente deve ser string
  if (obj['last_updated'] !== undefined && typeof obj['last_updated'] !== 'string') {
    return false;
  }

  // Valida entradas do matches — cada entrada deve ter pelo menos o campo status
  const matches = obj['matches'] as Record<string, unknown>;
  for (const key of Object.keys(matches)) {
    const entry = matches[key];
    if (!entry || typeof entry !== 'object') return false;
    const entryObj = entry as Record<string, unknown>;
    if (!entryObj['status'] || typeof entryObj['status'] !== 'string') return false;
  }

  return true;
}

/**
 * Faz fetch de /data/live-data.json com timeout.
 * Retorna null em qualquer falha (404, JSON inválido, timeout, rede offline).
 * NUNCA lança exceção.
 * NUNCA deve ser chamada fora do browser — verificar typeof window antes.
 */
export async function fetchLiveData(): Promise<LiveData | null> {
  // Guard obrigatório — nunca executar fora do browser
  if (typeof window === 'undefined' || typeof fetch === 'undefined') {
    return null;
  }

  // Verificar se o navegador está offline
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return null;
  }

  try {
    // AbortController para timeout seguro
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(LIVE_DATA_URL, {
        signal: controller.signal,
        // Cache de curta duração — o servidor deve ter Cache-Control: no-cache ou max-age=60
        cache: 'no-cache',
      });
    } finally {
      clearTimeout(timeoutId);
    }

    // Não lançar erro para status HTTP — apenas retornar null
    if (!response.ok) {
      return null;
    }

    // Verificar se há conteúdo antes de tentar parsear
    const text = await response.text();
    if (!text || text.trim().length === 0) {
      return null;
    }

    // Parsear JSON com tratamento seguro
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      // JSON malformado — fallback silencioso
      return null;
    }

    // Validar estrutura mínima antes de usar
    if (!isValidLiveData(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    // Qualquer erro de rede, timeout (AbortError), etc. — fallback silencioso
    return null;
  }
}

/**
 * Busca os dados ao vivo de uma partida específica.
 * Retorna null se liveData for null ou se o match_id não existir.
 * Nunca lança exceção.
 */
export function getLiveMatchData(
  liveData: LiveData | null,
  matchId: string
): LiveMatchData | null {
  if (!liveData) return null;
  if (!matchId || typeof matchId !== 'string') return null;

  const entry = liveData.matches[matchId];
  if (!entry) return null;

  // Validar campos mínimos da entrada antes de retornar
  if (!entry.status || typeof entry.status !== 'string') return null;

  return entry;
}

/**
 * Retorna o rótulo localizado para um status de partida.
 * Suporta pt-br, en, es — fallback para pt-br.
 */
export function getStatusLabel(
  status: string,
  locale: string = 'pt-br'
): string {
  const labels: Record<string, Record<string, string>> = {
    'pt-br': {
      scheduled:  'Agendado',
      live:       'Ao Vivo',
      finished:   'Encerrado',
      postponed:  'Adiado',
      cancelled:  'Cancelado',
    },
    'en': {
      scheduled:  'Scheduled',
      live:       'Live',
      finished:   'Finished',
      postponed:  'Postponed',
      cancelled:  'Cancelled',
    },
    'es': {
      scheduled:  'Programado',
      live:       'En Vivo',
      finished:   'Finalizado',
      postponed:  'Aplazado',
      cancelled:  'Cancelado',
    },
  };

  const localeLabels = labels[locale] ?? labels['pt-br'];
  return localeLabels[status] ?? status;
}
