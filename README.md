# Comerciando Emprendedores

Aplicación estática de gestión y catálogo, desplegable en Vercel con funciones serverless para autenticación y pedidos protegidos.

## Inicio de sesión con Google

El flujo usa OAuth 2.0 Authorization Code: Google devuelve un código al callback del servidor, el servidor lo intercambia y verifica el ID token con `google-auth-library`, y recién entonces crea una cookie HttpOnly firmada. Las cookies de cliente y vendedor son distintas (`ce_customer_session` y `ce_seller_session`), seguras en HTTPS y `SameSite=Lax`.

1. Copiá `.env.example` como `.env.local` para desarrollo o cargá sus variables en Vercel.
2. En [Google Cloud Console](https://console.cloud.google.com/), creá o seleccioná el proyecto, configurá la pantalla de consentimiento OAuth y agregá los usuarios de prueba si la app está en modo Testing.
3. Creá una credencial **OAuth client ID** de tipo **Web application**.
4. En desarrollo agregá `http://localhost:3000` a **Authorized JavaScript origins** y `http://localhost:3000/api/auth/callback` a **Authorized redirect URIs**.
5. En producción agregá el origen de la app, por ejemplo `https://tu-dominio.com`, y el callback exacto `https://tu-dominio.com/api/auth/callback`. Si el catálogo usa un subdominio, agregalo también como origen cuando corresponda y definí `APP_BASE_URL` con el host que recibe el callback.
6. Definí `VENDOR_OWNER_EMAIL` con la cuenta Google del primer administrador. Agregá colaboradores aprobados en `VENDOR_COLLABORATOR_EMAILS`, separados por coma. Esta lista es la fuente de autorización del servidor; un cliente de catálogo no puede elevarse a vendedor.

No expongas `GOOGLE_CLIENT_SECRET` ni `SESSION_SECRET` en HTML, JavaScript de cliente o repositorios.

## Probar

Instalá dependencias y ejecutá la app con Vercel para que también arranquen las funciones:

```bash
npm install
npx vercel dev
```

1. Cliente: entrá a `/catalogo.html`, agregá artículos al carrito y elegí **Realizar compra**. Google autentica, vuelve a `/catalogo.html?checkout=1`, conserva el carrito y abre el checkout. Nombre, apellido (en el nombre completo), correo y avatar provienen de Google; los campos editables siguen disponibles.
2. Vendedor: abrí `/login.html` y elegí **Google**. Usá el correo configurado en `VENDOR_OWNER_EMAIL` o colaboradores. El dueño obtiene rol Administrador y un colaborador, Colaborador.
3. Bloqueo: iniciá Google sólo como cliente e intentá abrir `/index.html`. El middleware y la API de sesión exigen una cookie de vendedor; se redirige al login. El endpoint `POST /api/orders` exige por separado la cookie de cliente.

## Referencias

- [Google Identity: modelo de código OAuth](https://developers.google.com/identity/oauth2/web/guides/use-code-model)
- [Google: verificación de ID token en servidor](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token)
- [Arquitectura de referencia nextjs-google-login](https://github.com/ger86/nextjs-google-login). Su patrón de callback/sesión se adaptó a funciones serverless de Vercel, sin migrar esta aplicación a Next.js.
