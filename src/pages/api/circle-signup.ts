/**
 * src/pages/api/circle-signup.ts
 * POST /api/circle-signup
 * Registra al usuario en circle_members de Supabase.
 * Valida campos, previene duplicados, devuelve JSON.
 */
export const prerender = false;
import type { APIRoute } from 'astro';
import { insertCircleMember } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  // CORS mínimo
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://www.jordimoyasola.com',
  };

  try {
    const body = await request.json();
    const { name, email, lang = 'es', source = 'web-circulo' } = body;

    // Validación básica
    if (!name?.trim() || !email?.trim()) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Nombre y email son obligatorios.' }),
        { status: 400, headers }
      );
    }

    // Validar formato email
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Email no válido.' }),
        { status: 400, headers }
      );
    }

    const result = await insertCircleMember({ name: name.trim(), email: email.trim().toLowerCase(), lang, source });

    if (result.duplicate) {
      return new Response(
        JSON.stringify({ ok: false, duplicate: true, message: 'Ya eres miembro del Círculo Interior.' }),
        { status: 409, headers }
      );
    }

    if (!result.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Error al registrar. Inténtalo de nuevo.' }),
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, message: 'Bienvenido al Círculo Interior.' }),
      { status: 200, headers }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Error interno.' }),
      { status: 500, headers }
    );
  }
};

// Rechazar otros métodos
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
