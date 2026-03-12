/**
 * src/lib/supabase.ts
 * Cliente Supabase centralizado.
 * Usa variables de entorno — no exponer en cliente más de lo necesario.
 */

const SUPABASE_URL  = import.meta.env.PUBLIC_SUPABASE_URL  || 'https://yvbysknlztkcxrcnsczj.supabase.co';
const SUPABASE_KEY  = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

// Headers comunes para la REST API de Supabase
export function supabaseHeaders(prefer = 'return=minimal') {
  return {
    'Content-Type':  'application/json',
    'apikey':        SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Prefer':        prefer,
  };
}

export { SUPABASE_URL, SUPABASE_KEY };

// ─── Helpers tipados ───────────────────────────────────────────

export interface CircleMember {
  name:    string;
  email:   string;
  source?: string;
  lang?:   string;
}

export interface ChapterRequest {
  name:  string;
  email: string;
  book?: string;
  lang?: string;
}

export interface ContactMessage {
  name:    string;
  email:   string;
  type?:   string;
  message: string;
}

// Insertar en circle_members
export async function insertCircleMember(data: CircleMember): Promise<{ ok: boolean; duplicate?: boolean }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/circle_members`, {
    method:  'POST',
    headers: supabaseHeaders(),
    body:    JSON.stringify({ ...data, created_at: new Date().toISOString() }),
  });
  if (res.status === 409) return { ok: false, duplicate: true };
  return { ok: res.ok };
}

// Insertar en chapter_requests
export async function insertChapterRequest(data: ChapterRequest): Promise<{ ok: boolean }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/chapter_requests`, {
    method:  'POST',
    headers: supabaseHeaders(),
    body:    JSON.stringify({ ...data, created_at: new Date().toISOString() }),
  });
  return { ok: res.ok };
}

// Insertar en contact_messages
export async function insertContactMessage(data: ContactMessage): Promise<{ ok: boolean }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
    method:  'POST',
    headers: supabaseHeaders(),
    body:    JSON.stringify({ ...data, created_at: new Date().toISOString() }),
  });
  return { ok: res.ok };
}
