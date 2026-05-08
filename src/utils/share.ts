// share.ts — Utilitários centralizados de compartilhamento
// Compatível com Astro SSG: guards obrigatórios em todo acesso a window/navigator

import type { Locale } from '../types/index.ts';

export interface ShareMatchContext {
  matchType: 'confirmed' | 'partial' | 'simulation' | 'generic';
  homeTeamName?: string;
  awayTeamName?: string;
  dateFormatted?: string;   // ex: "Quinta-feira, 11 jun."
  timeFormatted?: string;   // ex: "16:00"
  pageUrl: string;          // URL completa da página
  locale: Locale;
}

/**
 * Gera o texto de compartilhamento para WhatsApp de acordo com o contexto da partida.
 * Mensagens em pt-br (idioma principal do MVP).
 */
export function buildWhatsAppText(ctx: ShareMatchContext): string {
  const siteUrl = 'World Cup Games Today';

  if (ctx.matchType === 'confirmed' && ctx.homeTeamName && ctx.awayTeamName) {
    const datePart = ctx.dateFormatted && ctx.timeFormatted
      ? `\n🕐 ${ctx.dateFormatted} às ${ctx.timeFormatted}`
      : '';
    return `⚽ ${ctx.homeTeamName} x ${ctx.awayTeamName}${datePart}\nVeja no ${siteUrl}: ${ctx.pageUrl}`;
  }

  if (ctx.matchType === 'partial') {
    const datePart = ctx.dateFormatted ? `\n📅 ${ctx.dateFormatted}` : '';
    return `⚽ Próxima fase da Copa 2026 — vagas a definir${datePart}\nVeja no ${siteUrl}: ${ctx.pageUrl}`;
  }

  // Generic (home, calendario, etc.) — inclui simulation tratado como generic
  return `⚽ Copa do Mundo 2026 — Veja os jogos no seu horário local\n${ctx.pageUrl}`;
}

/**
 * Gera a URL de WhatsApp com texto encodado.
 */
export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Copia texto para a área de transferência com fallback seguro.
 * Retorna true se teve sucesso, false caso contrário.
 * Nunca executa no servidor — requer guard typeof window.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback para execCommand (browsers antigos)
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

/**
 * Retorna a URL atual da página (somente no browser).
 * Usa fallback quando executado no servidor (SSG build).
 */
export function getCurrentPageUrl(fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return window.location.href;
}
