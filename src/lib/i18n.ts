/**
 * src/lib/i18n.ts
 * Helper de internacionalización.
 * Uso: import { t } from '../lib/i18n'; const txt = t('es', 'hero.cta_primary');
 */
import es from '../i18n/es.json';
import ca from '../i18n/ca.json';
import en from '../i18n/en.json';

export type Lang = 'es' | 'ca' | 'en';

const translations: Record<Lang, typeof es> = { es, ca, en };

/**
 * Obtiene el texto para una clave en un idioma dado.
 * Soporta notación de punto: t('es', 'hero.cta_primary')
 * Devuelve la clave si no encuentra traducción.
 */
export function t(lang: Lang, key: string): string {
  const keys   = key.split('.');
  let result: any = translations[lang] ?? translations['es'];
  for (const k of keys) {
    result = result?.[k];
    if (result === undefined) break;
  }
  // Fallback a español
  if (result === undefined) {
    let fallback: any = translations['es'];
    for (const k of keys) fallback = fallback?.[k];
    result = fallback;
  }
  return typeof result === 'string' ? result : key;
}

/**
 * Detecta el idioma desde la URL.
 * /ca/... → 'ca' | /en/... → 'en' | default → 'es'
 */
export function getLangFromURL(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'ca') return 'ca';
  if (first === 'en') return 'en';
  return 'es';
}

/**
 * Devuelve la URL equivalente en otro idioma.
 */
export function localizeURL(pathname: string, lang: Lang): string {
  const clean = pathname.replace(/^\/(ca|en)/, '') || '/';
  if (lang === 'es') return clean;
  return `/${lang}${clean}`;
}
