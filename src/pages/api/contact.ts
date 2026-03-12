/**
 * src/pages/api/contact.ts
 * POST /api/contact
 * Guarda mensaje de contacto en contact_messages de Supabase.
 */
export const prerender = false;
import type { APIRoute } from 'astro';
import { insertContactMessage } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://www.jordimoyasola.com',
  };

  try {
    const body = await request.json();
    const { name, email, type = 'general', message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Nombre, email y mensaje son obligatorios.' }),
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

    if (message.trim().length > 2000) {
      return new Response(
        JSON.stringify({ ok: false, error: 'El mensaje no puede superar los 2000 caracteres.' }),
        { status: 400, headers }
      );
    }

    const result = await insertContactMessage({
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      type,
      message: message.trim(),
    });

    if (!result.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Error al enviar. Inténtalo de nuevo o escríbenos directamente.' }),
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, message: 'Mensaje recibido. Gracias por escribir.' }),
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
