// analytics.ts — Abstração segura de eventos de analytics (Google Analytics / gtag)
// Compatível com Astro SSG: verifica typeof window e existência de window.gtag
// Falha silenciosamente se GA não estiver configurado ou o script não tiver sido carregado.
// O script do GA será carregado na Fase 12 — aqui apenas os stubs de evento.

// Extensão do tipo Window para declarar gtag sem depender de @types/gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      eventNameOrTarget: string | Date,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}

/**
 * Envia um evento de analytics via gtag.
 * No-op seguro se:
 * - Estiver rodando no servidor (SSG build)
 * - window.gtag não estiver disponível
 * - PUBLIC_GA_MEASUREMENT_ID estiver vazio ou ausente
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  // Verifica se o ID de medição está configurado (injetado pelo script GA na Fase 12)
  const gaId =
    typeof import.meta !== 'undefined' &&
    typeof (import.meta as { env?: Record<string, string> }).env !== 'undefined'
      ? ((import.meta as { env?: Record<string, string> }).env?.['PUBLIC_GA_MEASUREMENT_ID'] ?? '')
      : '';

  if (!gaId) return;

  window.gtag('event', eventName, params);
}

/**
 * Registra troca de fuso horário pelo usuário.
 */
export function trackTimezoneChange(fromTz: string, toTz: string): void {
  trackEvent('timezone_change', {
    from_timezone: fromTz,
    to_timezone:   toTz,
  });
}

/**
 * Registra troca de idioma pelo usuário.
 */
export function trackLocaleChange(fromLocale: string, toLocale: string): void {
  trackEvent('locale_change', {
    from_locale: fromLocale,
    to_locale:   toLocale,
  });
}

/**
 * Registra seleção de time favorito.
 */
export function trackTeamSelect(teamSlug: string): void {
  trackEvent('team_select', {
    team_slug: teamSlug,
  });
}

/**
 * Registra clique em botão de compartilhamento.
 */
export function trackShareClick(
  method: 'whatsapp' | 'copy_link' | 'calendar' | 'ics'
): void {
  trackEvent('share_click', {
    share_method: method,
  });
}

/**
 * Registra visualização de página de partida.
 */
export function trackMatchView(matchId: string): void {
  trackEvent('match_view', {
    match_id: matchId,
  });
}
