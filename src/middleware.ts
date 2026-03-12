/**
 * src/middleware.ts
 * Middleware Astro — Redirección inteligente por idioma.
 *
 * Comportamiento:
 * 1. Solo actúa en la visita a "/" (raíz).
 * 2. Si el usuario tiene cookie jms_lang → respeta su preferencia.
 * 3. Si no → lee Accept-Language del navegador.
 * 4. Catalán  → redirige a /ca
 * 5. Inglés   → redirige a /en
 * 6. Cualquier otro (incluyendo español) → sirve /  (default ES)
 * 7. NO redirige si ya está en /ca, /en o cualquier subruta.
 */

import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  const pathname = url.pathname;

  // Solo intervenir en la raíz exacta "/"
  if (pathname !== '/') {
    return next();
  }

  // Si ya tiene cookie de preferencia de idioma → respetar
  const cookieHeader = request.headers.get('cookie') || '';
  const langCookie   = parseLangCookie(cookieHeader);
  if (langCookie === 'ca') {
    return Response.redirect(new URL('/ca', url), 302);
  }
  if (langCookie === 'en') {
    return Response.redirect(new URL('/en', url), 302);
  }
  if (langCookie === 'es') {
    return next(); // Español explícito → no redirigir
  }

  // Sin cookie → detectar por Accept-Language
  const acceptLang = request.headers.get('accept-language') || '';
  const detected   = detectLang(acceptLang);

  if (detected === 'ca') {
    return Response.redirect(new URL('/ca', url), 302);
  }
  if (detected === 'en') {
    return Response.redirect(new URL('/en', url), 302);
  }

  // Español o desconocido → servir página normal
  return next();
});

// ─── helpers ────────────────────────────────────────────────────

function parseLangCookie(header: string): string | null {
  const match = header.match(/jms_lang=([^;]+)/);
  return match ? match[1] : null;
}

function detectLang(acceptLang: string): 'ca' | 'en' | 'es' | null {
  if (!acceptLang) return null;

  // Normalizar: "ca-ES,ca;q=0.9,es;q=0.8,en;q=0.7"
  const langs = acceptLang
    .split(',')
    .map(part => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1.0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of langs) {
    if (lang === 'ca' || lang.startsWith('ca-')) return 'ca';
    if (lang === 'es' || lang.startsWith('es-')) return 'es';
    if (lang === 'en' || lang.startsWith('en-')) return 'en';
  }

  return null;
}
