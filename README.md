# jordimoyasola.com — Astro Project

Web oficial de Jordi Moya Solà, escritor de thriller psicológico.

## Stack

- **Framework**: [Astro 4](https://astro.build) — genera HTML estático puro, máximo SEO
- **CSS**: Sistema de diseño custom en `src/styles/global.css`
- **Blog**: Artículos en Markdown (`src/content/reflexiones/`)
- **Backend**: Supabase (newsletter + formularios)
- **Deploy**: Netlify o Vercel (recomendado)

---

## Instalación

```bash
# 1. Entrar al directorio
cd jordimoya-astro

# 2. Instalar dependencias
npm install

# 3. Desarrollo local (http://localhost:4321)
npm run dev

# 4. Build de producción
npm run build

# 5. Preview del build
npm run preview
```

---

## Estructura del proyecto

```
src/
├── layouts/
│   └── Base.astro          ← Layout raíz (head, meta, SEO, cursor, scripts globales)
├── components/
│   ├── Nav.astro            ← Navegación (fija, scroll, hamburguesa mobile)
│   └── Footer.astro         ← Footer con links y redes
├── pages/
│   ├── index.astro          ← Inicio (/)
│   ├── sobre.astro          ← Sobre el autor (/sobre)
│   ├── circulo-interior.astro ← Newsletter landing (/circulo-interior)
│   ├── prensa.astro         ← Kit de prensa (/prensa)
│   ├── contacto.astro       ← Contacto (/contacto)
│   ├── libros/
│   │   ├── index.astro      ← Catálogo (/libros)
│   │   ├── swingers-magicfinger.astro ← Libro 1
│   │   ├── locked-in.astro  ← Libro 2
│   │   └── combustion.astro ← Libro 3
│   └── reflexiones/
│       ├── index.astro      ← Blog index (/reflexiones)
│       └── [slug].astro     ← Plantilla dinámica por artículo
├── content/
│   ├── config.ts            ← Esquema de la colección de artículos
│   └── reflexiones/
│       ├── por-que-el-thriller-psicologico-toca-donde-duele.md
│       ├── psicologia-del-antagonista.md
│       └── [nuevos artículos aquí]
└── styles/
    └── global.css           ← Sistema de diseño completo (variables, tipografía, componentes)
```

---

## Añadir un nuevo artículo al blog

1. Crear un archivo `.md` en `src/content/reflexiones/`:

```markdown
---
title: "Título del artículo"
description: "Descripción breve para SEO y previsualización"
date: "Marzo 2025"
tag: "Técnica"
readTime: 5
featured: false
---

Contenido del artículo en Markdown...
```

2. El slug (URL) se genera automáticamente desde el nombre del archivo.
   - `mi-nuevo-articulo.md` → `/reflexiones/mi-nuevo-articulo`

3. `npm run build` genera la página con el diseño de la plantilla automáticamente.

---

## Variables de entorno — Supabase

Antes del lanzamiento, mover las credenciales a variables de entorno:

1. Crear `.env` en la raíz:
```
PUBLIC_SUPABASE_URL=https://yvbysknlztkcxrcnsczj.supabase.co
PUBLIC_SUPABASE_KEY=tu_anon_key_nueva
```

2. En los archivos `.astro`, reemplazar las constantes hardcoded por:
```js
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_KEY;
```

3. **⚠ Activar RLS en Supabase** antes de lanzar:
   - `circle_members` → INSERT permitido para anon
   - `chapter_requests` → INSERT permitido para anon
   - `contact_messages` → INSERT permitido para anon

---

## Deploy en Netlify (recomendado)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Vincular el proyecto
netlify link

# Deploy manual
netlify deploy --prod --dir=dist
```

O conectar el repositorio Git a Netlify para deploys automáticos en cada push.

**Build settings en Netlify:**
- Build command: `npm run build`
- Publish directory: `dist`

---

## URLs generadas

| URL | Página |
|-----|--------|
| `/` | Inicio |
| `/libros` | Catálogo de libros |
| `/libros/swingers-magicfinger` | Libro 1 |
| `/libros/locked-in` | Libro 2 |
| `/libros/combustion` | Libro 3 |
| `/sobre` | Sobre el autor |
| `/reflexiones` | Blog |
| `/reflexiones/[slug]` | Artículo individual |
| `/circulo-interior` | Newsletter landing |
| `/prensa` | Kit de prensa |
| `/contacto` | Contacto |
| `/sitemap.xml` | Generado automáticamente por @astrojs/sitemap |

---

## Páginas pendientes de crear

- [ ] `src/pages/sobre.astro` — Sobre el autor expandido
- [ ] `src/pages/libros/index.astro` — Catálogo de libros
- [ ] `src/pages/libros/locked-in.astro` — Libro 2
- [ ] `src/pages/libros/combustion.astro` — Libro 3  
- [ ] `src/pages/contacto.astro` — Contacto
- [ ] `src/pages/en/index.astro` — Versión inglés
- [ ] `src/pages/privacidad.astro` — Política de privacidad
- [ ] `src/pages/cookies.astro` — Política de cookies
- [ ] `src/pages/aviso-legal.astro` — Aviso legal
- [ ] `src/content/reflexiones/el-silencio-como-tension.md` — Artículo 3

---

*Proyecto iniciado: Marzo 2026*
