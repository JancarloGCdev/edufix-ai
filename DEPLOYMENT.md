# 🚀 Guía Definitiva de Despliegue en Producción — EduFix AI

> **EduFix AI** — Plataforma Inteligente de Gestión y Mantenimiento Escolar  
> **Plataformas de Despliegue:** Vercel (Hosting & Next.js) + Supabase (PostgreSQL, Realtime & Storage) + Google Cloud Console (OAuth 2.0).

---

## 📌 1. Requisitos Previos

Antes de comenzar el despliegue, asegúrate de crear una cuenta gratuita en los siguientes servicios oficiales:

- 🐙 **GitHub Account:** [https://github.com/signup](https://github.com/signup)
- ▲ **Vercel Account:** [https://vercel.com/signup](https://vercel.com/signup) (se recomienda iniciar sesión con GitHub)
- ⚡ **Supabase Account:** [https://supabase.com/dashboard](https://supabase.com/dashboard)
- ☁️ **Google Cloud Console:** [https://console.cloud.google.com/](https://console.cloud.google.com/)

---

## 💻 2. Preparación del Proyecto Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JancarloGCdev/edufix-ai.git
   cd edufix-ai
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en entorno local:**
   ```bash
   npm run dev
   ```

4. **Comprobar funcionamiento:**
   - Abre `http://localhost:3000` en tu navegador.
   - Verifica que la interfaz cargue correctamente en modo desarrollo.

---

## ⚡ 3. Configuración de Supabase

### Paso 3.1: Crear un Nuevo Proyecto en Supabase
1. Ingresa al [Dashboard de Supabase](https://supabase.com/dashboard) y haz clic en **"New Project"**.
2. Selecciona tu organización e ingresa:
   - **Name:** `edufix-ai-prod`
   - **Database Password:** *Guarda esta contraseña en un lugar seguro (la necesitarás para la URL).*
   - **Region:** Selecciona la región más cercana a tus usuarios (ej. `us-east-1` o `sa-east-1`).
   - **Plan:** Free Tier.
3. Haz clic en **"Create new project"** y espera 1-2 minutos a que se aprovisione la base de datos.

### Paso 3.2: Obtener las Cadenas de Conexión (DATABASE_URL y DIRECT_URL)
1. Ve a **Project Settings** (ícono de engranaje) ➔ **Database**.
2. En la sección **Connection string**, selecciona el tab **URI**:
   - **Transaction Pooler (Puerto 6543):** Esta será tu `DATABASE_URL` para Vercel Serverless.
     ```text
     postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbooster=true
     ```
   - **Direct Connection (Puerto 5432):** Esta será tu `DIRECT_URL` utilizada por Prisma para migraciones.
     ```text
     postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
     ```

### Paso 3.3: Configurar Supabase Storage para Imágenes
1. En el menú lateral izquierdo de Supabase, ve a **Storage**.
2. Haz clic en **"Create a new bucket"**:
   - **Bucket Name:** `report-images`
   - **Public Bucket:** **Habilitar / ON** (Permite que las imágenes de reportes sean visibles en la app web).
3. Haz clic en **"Save"**.
4. **Configurar Políticas RLS (Storage Policies):**
   - Ve a **Storage** ➔ **Policies** ➔ **report-images**.
   - Haz clic en **"New Policy"** ➔ **"For full customization"**:
     - **Policy Name:** `Allow public read and upload`
     - **Allowed Operations:** Marcar `SELECT` e `INSERT`.
     - **Target Roles:** `anon` y `authenticated`.
     - **USING / WITH CHECK Expression:** `true`
   - Guarda la política.

### Paso 3.4: Habilitar Supabase Realtime
1. Ve a **Database** ➔ **Publications** en Supabase.
2. Selecciona la publicación `supabase_realtime`.
3. Asegúrate de incluir la tabla **`Report`** en la lista de tablas publicadas para escuchar eventos `INSERT` y `UPDATE`.

---

## 🗄️ 4. Configuración de Prisma ORM

### Comandos de Prisma y sus diferencias

| Comando | Propósito | Cuándo usarlo |
| :--- | :--- | :--- |
| `npx prisma generate` | Crea el cliente TypeScript basado en el archivo `schema.prisma`. | Después de instalar dependencias o actualizar el esquema. |
| `npx prisma db push` | Sincroniza el esquema directamente con la base de datos sin crear archivos de migración. | Ideal para prototipado rápido y sincronizar Supabase por primera vez. |
| `npx prisma migrate deploy` | Aplica archivos de migración SQL pendientes en una base de datos de producción. | En builds de producción de Vercel y entornos de CI/CD. |

### Pasos para preparar la base de datos de producción:

1. En tu archivo `.env.local` temporal, coloca tus URLs de Supabase:
   ```env
   DATABASE_URL="postgresql://postgres.[REF]:[PASS]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbooster=true"
   DIRECT_URL="postgresql://postgres:[PASS]@db.[REF].supabase.co:5432/postgres"
   ```
2. Ejecuta la sincronización de tablas:
   ```bash
   npx prisma db push
   ```
3. Verifica en Supabase ➔ **Table Editor** que las tablas `User`, `Account`, `Session`, `Report` y `ReportHistory` se hayan creado correctamente.

---

## 🔑 5. Configuración de Google OAuth (Google Cloud Console)

### Paso 5.1: Crear Proyecto en GCP
1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Haz clic en el selector de proyectos superior y presiona **"Nuevo Proyecto"**.
3. Nombre: `EduFix AI Prod` ➔ Haz clic en **"Crear"**.

### Paso 5.2: Configurar Pantalla de Consentimiento de OAuth
1. Ve a **API y servicios** ➔ **Pantalla de consentimiento de OAuth**.
2. Tipo de usuario: **External** (Externo) ➔ Haz clic en **"Crear"**.
3. Completa los datos requeridos:
   - **Nombre de la app:** `EduFix AI`
   - **Correo de soporte:** Tu correo institucional o personal.
   - **Datos de contacto del desarrollador:** Tu correo electrónico.
4. En la sección **Scopes (Permisos)**, agrega: `userinfo.email` y `userinfo.profile`.
5. En **Test users (Usuarios de prueba)**, agrega las cuentas de correo `@iegabo.edu.co` que probarán la app en fase de desarrollo/prueba.

### Paso 5.3: Crear Credenciales OAuth Client ID
1. Ve a **API y servicios** ➔ **Credenciales**.
2. Haz clic en **"Crear credenciales"** ➔ **"ID de cliente de OAuth"**.
3. Tipo de aplicación: **Aplicación web**.
4. **Orígenes autorizados de JavaScript (Authorized JavaScript Origins):**
   - Desarrollo: `http://localhost:3000`
   - Producción: `https://tu-dominio-edufix.vercel.app`
5. **URIs de redireccionamiento autorizados (Authorized Redirect URIs):**
   - Desarrollo: `http://localhost:3000/api/auth/callback/google`
   - Producción: `https://tu-dominio-edufix.vercel.app/api/auth/callback/google`
6. Haz clic en **"Crear"**.
7. Copia e guarda el **ID de cliente** (`AUTH_GOOGLE_ID`) y el **Secreto de cliente** (`AUTH_GOOGLE_SECRET`).

---

## 📋 6. Tabla Completa de Variables de Entorno

A continuación se detallan todas las variables necesarias para el despliegue en Vercel:

| Variable | Alcance | Descripción | Dónde se obtiene |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | Privada (Server) | Connection String del Pooler (Puerto 6543) | Supabase ➔ Project Settings ➔ Database (URI Pooler) |
| `DIRECT_URL` | Privada (Server) | Conexión directa a PostgreSQL (Puerto 5432) | Supabase ➔ Project Settings ➔ Database (Direct URI) |
| `AUTH_SECRET` | Privada (Server) | Clave secreta para cifrar cookies de sesión | Generado en terminal con `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Privada (Server) | URL pública base de la aplicación | `https://tu-dominio-edufix.vercel.app` |
| `AUTH_GOOGLE_ID` | Privada (Server) | Client ID de Google OAuth 2.0 | Google Cloud Console ➔ Credenciales |
| `AUTH_GOOGLE_SECRET` | Privada (Server) | Secret de Google OAuth 2.0 | Google Cloud Console ➔ Credenciales |
| `NEXT_PUBLIC_SUPABASE_URL` | Pública (Client) | URL base de la API de Supabase | Supabase ➔ Settings ➔ API (Project URL) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública (Client) | Clave pública de lectura/subida cliente | Supabase ➔ Settings ➔ API (Project API Keys `anon`) |

---

## ▲ 7. Despliegue en Vercel

1. Entra a tu cuenta en [Vercel Dashboard](https://vercel.com/dashboard).
2. Haz clic en **"Add New..."** ➔ **"Project"**.
3. Selecciona tu repositorio de GitHub `edufix-ai` y presiona **"Import"**.
4. **Configuración del proyecto:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npx prisma generate && next build`
5. **Desplegar sección "Environment Variables":**
   - Agrega una a una las 8 variables definidas en la tabla de la Sección 6.
6. Haz clic en **"Deploy"**.
7. Espera unos instantes a que concluya la compilación de Turbopack. ¡Tu app estará publicada en `https://edufix-ai.vercel.app`!

---

## ⚙️ 8. Configuración Posterior al Despliegue

Una vez completado el despliegue en Vercel, debes actualizar las URLs oficiales de producción en Google Cloud y Auth.js:

1. **En Google Cloud Console:**
   - Edita tu OAuth Client ID y añade la URL final asignada por Vercel a *Authorized Origins* y *Authorized Redirect URIs* (`https://tu-app.vercel.app/api/auth/callback/google`).
2. **En Vercel:**
   - Asegúrate de que `NEXTAUTH_URL` coincida exactamente con el dominio de producción (`https://tu-app.vercel.app`).

---

## 🌐 9. Dominio Personalizado

Para conectar un dominio propio (ejemplo: `edufix.iegabo.edu.co`):

1. En Vercel, ve a **Settings** ➔ **Domains**.
2. Escribe tu dominio o subdominio y presiona **"Add"**.
3. Configura los registros DNS en tu proveedor de dominio:
   - **Subdominio (CNAME):** `cname.vercel-dns.com`
   - **Dominio raíz (A Record):** `76.76.21.21`
4. Una vez validado el certificado SSL automático en Vercel, actualiza `NEXTAUTH_URL` y las URIs de Google OAuth con tu nuevo dominio.

---

## 🚨 10. Solución de Problemas Frecuentes

### 1. Error 400 `redirect_uri_mismatch` en Google OAuth
- **Causa:** La URL desde la que estás iniciando sesión no está registrada exactamente igual en Google Cloud.
- **Solución:** Revisa que `https://tu-app.vercel.app/api/auth/callback/google` esté registrada en los *Redirect URIs* de Google Cloud Console.

### 2. Error de Conexión en Prisma / Supabase (`P1001` o `P2025`)
- **Causa:** Uso incorrecto del puerto o credenciales de la base de datos.
- **Solución:** Asegúrate de usar el puerto `6543` en `DATABASE_URL` (Pooler) y el puerto `5432` en `DIRECT_URL`.

### 3. Las imágenes subidas devuelven Error 403 / No se muestran
- **Causa:** El bucket `report-images` de Supabase Storage está en modo privado o le faltan políticas RLS.
- **Solución:** Ve a Supabase Storage ➔ `report-images` ➔ Settings ➔ Cambia el bucket a **Public**.

### 4. Supabase Realtime no actualiza las pantallas
- **Causa:** La tabla `Report` no está agregada a la publicación de tiempo real.
- **Solución:** Ve a Supabase ➔ **Database** ➔ **Publications** ➔ `supabase_realtime` y marca la casilla de la tabla `Report`.

---

## ✅ 11. Checklist Final de Verificación

Marca cada casilla para confirmar que el proyecto está 100% operativo en producción:

- [ ] Repository alojado en GitHub.
- [ ] Proyecto de Supabase aprovisionado y tablas creadas.
- [ ] Bucket `report-images` creado y configurado como Público.
- [ ] Publicación `supabase_realtime` activa para la tabla `Report`.
- [ ] Proyecto de Google OAuth creado con URIs de desarrollo y producción autorizados.
- [ ] Variables de entorno configuradas correctamente en Vercel.
- [ ] Despliegue exitoso en Vercel (Build sin errores).
- [ ] Inicio de sesión con Google OAuth verificado.
- [ ] Creación de reportes con captura/subida de imagen funcionando en producción.
- [ ] Cambio de estados y asignación a mantenimiento reflejado en tiempo real.
