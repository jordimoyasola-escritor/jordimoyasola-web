/**
 * src/pages/api/chapter-request.ts
 * POST /api/chapter-request
 * Registra la solicitud del capítulo y devuelve URL de descarga.
 */
export const prerender = false;
import type { APIRoute } from 'astro';
import { insertChapterRequest } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://www.jordimoyasola.com',
  };

  try {
    const body = await request.json();
    const { name, email, book = 'swingers-magicfinger', lang = 'es' } = body;

    if (!name?.trim() || !email?.trim()) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Nombre y email son obligatorios.' }),
        { status: 400, headers }
      );
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Email no válido.' }),
        { status: 400, headers }
      );
    }

    // Guardar en Supabase (no bloqueante — si falla igual entregamos)
    await insertChapterRequest({ name: name.trim(), email: email.trim().toLowerCase(), book, lang })
      .catch(() => {}); // Silencioso: no bloquear la descarga por error de BD

    return new Response(
      JSON.stringify({
        ok: true,
        downloadUrl: '/capitulo1-swingers-magicfinger.pdf',
        message: 'Descarga lista. Bienvenido al Círculo Interior.',
      }),
      { status: 200, headers }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Error interno.' }),
      { status: 500, headers }
    );
  }
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
