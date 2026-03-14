import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ request }, next) => {

  const url = new URL(request.url);
  const pathname = url.pathname;

  // Español es el idioma principal en la raíz
  if (pathname === "/") {
    return next();
  }

  // Permitir rutas de idioma
  if (
    pathname.startsWith("/en") ||
    pathname.startsWith("/ca")
  ) {
    return next();
  }

  // Todo lo demás sigue normal
  return next();
});
