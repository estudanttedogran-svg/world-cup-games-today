// storage.ts — Wrapper seguro para localStorage
// Compatível com Astro SSG: verifica typeof localStorage antes de acessar
// Nunca lança erro se localStorage estiver indisponível — falha silenciosamente

import type { Locale } from '../types/index.ts';
import { isValidLocale } from './language.ts';
import { isValidTimezone } from './timezone.ts';

export interface UserPreferences {
  locale?:           Locale;
  timezone?:         string;
  favoriteTeamSlug?: string;
}

const STORAGE_KEY = 'wcgt_prefs';

/** Verifica se localStorage está disponível no ambiente atual. */
function isStorageAvailable(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    // Teste de escrita/leitura para detectar modo privativo com localStorage bloqueado
    const testKey = '__wcgt_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/** Lê o objeto JSON de preferências do localStorage. Retorna {} em caso de erro. */
function readRaw(): Partial<UserPreferences> {
  if (!isStorageAvailable()) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return sanitize(parsed);
  } catch {
    return {};
  }
}

/** Escreve o objeto de preferências no localStorage. Falha silenciosamente. */
function writeRaw(prefs: Partial<UserPreferences>): void {
  if (!isStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Quota exceeded ou localStorage bloqueado — ignorar silenciosamente
  }
}

/**
 * Sanitiza e valida os dados lidos do localStorage antes de retornar.
 * Campos inválidos são omitidos em vez de retornados como dados corrompidos.
 */
function sanitize(raw: Record<string, unknown>): Partial<UserPreferences> {
  const result: Partial<UserPreferences> = {};

  if (typeof raw['locale'] === 'string' && isValidLocale(raw['locale'])) {
    result.locale = raw['locale'];
  }

  if (typeof raw['timezone'] === 'string' && isValidTimezone(raw['timezone'])) {
    result.timezone = raw['timezone'];
  }

  if (typeof raw['favoriteTeamSlug'] === 'string' && raw['favoriteTeamSlug'].length > 0) {
    result.favoriteTeamSlug = raw['favoriteTeamSlug'];
  }

  return result;
}

/**
 * Salva uma preferência específica no localStorage.
 */
export function savePreference<K extends keyof UserPreferences>(
  key: K,
  value: UserPreferences[K]
): void {
  const current = readRaw();
  current[key] = value;
  writeRaw(current);
}

/**
 * Lê uma preferência específica do localStorage.
 * Retorna null se não encontrada ou inválida.
 */
export function loadPreference<K extends keyof UserPreferences>(
  key: K
): UserPreferences[K] | null {
  const prefs = readRaw();
  const val = prefs[key];
  return val !== undefined ? (val as UserPreferences[K]) : null;
}

/**
 * Salva todas as preferências de uma vez (merge com as existentes).
 */
export function savePreferences(prefs: Partial<UserPreferences>): void {
  const current = readRaw();
  const merged: Partial<UserPreferences> = { ...current, ...prefs };
  writeRaw(merged);
}

/**
 * Lê todas as preferências salvas. Retorna objeto vazio se nenhuma encontrada.
 */
export function loadPreferences(): Partial<UserPreferences> {
  return readRaw();
}

/**
 * Remove todas as preferências salvas do localStorage.
 */
export function clearPreferences(): void {
  if (!isStorageAvailable()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignorar silenciosamente
  }
}
