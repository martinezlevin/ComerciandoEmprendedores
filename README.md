# Comerciando Emprendedores

Aplicación estática de gestión y catálogo, desplegable en Vercel con funciones serverless para autenticación y pedidos protegidos.

## Demo

El proyecto incluye un **modo demo** que permite recorrer el flujo de compra completo sin necesidad de autenticación con Google.

### Activar modo demo

El modo se activa automáticamente cuando cualquiera de estas condiciones es verdadera:

- El HTML contiene `<meta name="demo-mode" content="true">` (ya incluido en `catalogo.html` e `index.html`).
- La URL incluye el parámetro `?demo=1` (ej: `catalogo.html?demo=1`).
- La variable de entorno `NEXT_PUBLIC_DEMO=true` está definida.

En modo demo el botón **Realizar compra** abre el modal de checkout directamente, sin redirigir al login de Google.

### Usuario demo de Supabase

Correo: `demo@comerciando.com` (creado por `supabase/functions/create-demo-user.sql`).

---

## Backend con Supabase

### 1. Crear el proyecto

1. Abrí [supabase.com](https://supabase.com/) y creá un proyecto nuevo.
2. Desde **Project Settings → API** copiá:
   - `URL` → `SUPABASE_URL`
   - `anon public` → `SUPABASE_ANON_KEY`

### 2. Configurar variables de entorno

Editá `.env.local` y reemplazá los placeholders:

```env
SUPABASE_URL=https://TU_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=TU_ANON_KEY_AQUI
NEXT_PUBLIC_DEMO=true
SESSION_SECRET=un-secreto-largo-y-aleatorio
```

### 3. Ejecutar los scripts SQL

En el **SQL Editor** de tu dashboard de Supabase, ejecutá en orden:

1. `supabase/setup.sql` — crea la tabla `users` y las políticas RLS.
2. `supabase/functions/create-demo-user.sql` — inserta el usuario demo.

---

## Inicio de sesión con Google

El flujo usa OAuth 2.0 Authorization Code: Google devuelve un código al callback del servidor, el servidor lo intercambia y verifica el ID token con `google-auth-library`, y recién entonces crea una cookie HttpOnly firmada. Las cookies de cliente y vendedor son distintas (`ce_customer_session` y `ce_seller_session`), seguras en HTTPS y `SameSite=Lax`.

1. Copiá `.env.example` como `.env.local` para desarrollo o cargá sus variables en Vercel.
2. En [Google Cloud Console](https://console.cloud.google.com/), creá o seleccioná el proyecto, configurá la pantalla de consentimiento OAuth y agregá los usuarios de prueba si la app está en modo Testing.
3. Creá una credencial **OAuth client ID** de tipo **Web application**.
4. En desarrollo agregá `http://localhost:3000` a **Authorized JavaScript origins** y `http://localhost:3000/api/auth/callback` a **Authorized redirect URIs**.
5. En producción agregá el origen de la app y el callback exacto. Si el catálogo usa un subdominio, agregalo también como origen y definí `APP_BASE_URL` con el host que recibe el callback.
6. Definí `VENDOR_OWNER_EMAIL` con la cuenta Google del primer administrador.

> **Seguridad**: nunca expongas `GOOGLE_CLIENT_SECRET` ni `SESSION_SECRET` en HTML, JS de cliente o repositorios.

---

## Probar localmente

```bash
npm install
npx vercel dev
```

1. **Catálogo (demo):** abrí `/catalogo.html`, agregá artículos y hacé clic en **Realizar compra** — el checkout se abre sin login.
2. **Vendedor:** abrí `/login.html` y elegí **Google** con el correo configurado en `VENDOR_OWNER_EMAIL`.
3. **Superusuario dev:** usá `dev-admin@comerciando.local` / `ComerciandoDev!2026` (solo cuando `DEV_AUTH_ENABLED=true`).

---

## Deploy

### Vercel (recomendado)

El proyecto ya incluye `vercel.json`. Pasos:

1. Importá el repositorio desde [vercel.com/new](https://vercel.com/new).
2. Agregá las variables de entorno en **Settings → Environment Variables**.
3. Desplegá — Vercel detecta las funciones en `/api` automáticamente.

### CI/CD con GitHub Actions

El archivo `.github/workflows/deploy.yml` automatiza el despliegue a Vercel en cada push a `main`.

**Configuración de secretos en GitHub** (`Settings → Secrets and variables → Actions`):

| Secreto | Dónde obtenerlo |
|---------|-----------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `vercel.json` o CLI: `vercel whoami` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` o dashboard de Vercel |

---

## Referencias

- [Google Identity: modelo de código OAuth](https://developers.google.com/identity/oauth2/web/guides/use-code-model)
- [Google: verificación de ID token en servidor](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token)
- [Supabase: Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Arquitectura de referencia nextjs-google-login](https://github.com/ger86/nextjs-google-login)
