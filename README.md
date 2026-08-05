# 🛠️ EduFix AI — Plataforma Inteligente de Gestión y Mantenimiento Escolar

> **EduFix AI** es una solución web móvil e institucional diseñada para transformar la gestión de incidencias físicas e infraestructura en la Institución Educativa Gabriel García Márquez (IE GABO). Combina la potencia de **Next.js 16**, **Supabase Realtime**, **Prisma ORM**, **Auth.js** y **animaciones fluidas con GSAP** para conectar en tiempo real a estudiantes, docentes, coordinadores y personal técnico de mantenimiento.

---

## 📌 Descripción del Proyecto

EduFix AI moderniza y digitaliza el reporte y seguimiento de averías e imprevistos en colegios e instituciones educativas. Permite a los estudiantes capturar fotografías de problemas físicos (proyectores defectuosos, lavamanos averiados, ventanas rotas, tomacorrientes dañados), procesar la información mediante sugerencias asistidas por Inteligencia Artificial y permitir que los coordinadores evalúen y asignen las tareas al equipo de mantenimiento adecuado.

---

## 🚨 Problema que Resuelve

En la mayoría de las instituciones educativas tradicionales, la gestión de infraestructura sufre de:
1. **Falta de visibilidad:** Los daños físicos no se reportan a tiempo o se quedan en notas en papel que se traspapelan.
2. **Duplicidad de reportes:** Múltiples estudiantes o profesores reportan el mismo fallo sin saber que ya fue notificado.
3. **Falta de trazabilidad y desinformación:** La comunidad escolar desconoce si un problema ya fue revisado, está en reparación o cuándo será resuelto.
4. **Desconexión con el equipo de mantenimiento:** La asignación de cuadrillas de reparación es informal y carece de evidencias fotográficas del trabajo realizado.

---

## 🎯 Objetivos

- **Digitalizar e institucionalizar** la notificación de daños físicos en tiempo real.
- **Implementar una experiencia Mobile-First e intuitiva** operable desde cualquier dispositivo móvil o de escritorio.
- **Automatizar el flujo institucional de 4 roles**: Estudiante → Coordinador → Técnico de Mantenimiento → Comunidad Escolar.
- **Reducir tiempos de atención** mediante asignaciones directas y evidencia fotográfica del trabajo completado.
- **Incorporar inteligencia artificial** para asistencia en detección, moderación y análisis de riesgos/duplicados.

---

## ✨ Características Principales

- 📸 **Captura y Subida de Evidencias:** Compresión y optimización de imágenes en el cliente (AVIF/WebP) y subida a Supabase Storage.
- 📍 **Ubicaciones Estandarizadas:** Selección estricta organizada por **Grados (6-1 a 11-3)** y **Zonas Institucionales** (Biblioteca, Laboratorio, Cafetería, Patio, Baños, Coordinación, Rectoría, Otro).
- 🔄 **Sincronización Multidispositivo en Tiempo Real:** Actualizaciones inmediatas en todos los navegadores mediante Supabase Realtime WebSockets.
- ⚡ **Animaciones de Alto Rendimiento:** Micro-interacciones y transiciones fluidas integradas con **GSAP**.
- 👥 **Gestión por Roles Diferenciados:** Experiencias a medida para Estudiantes, Docentes/Coordinadores, Personal de Mantenimiento y Administradores.
- 🛠️ **Flujo Completo de Asignación y Resolución:** El coordinador asigna técnicos específicos; el técnico sube la foto de la solución física y añade comentarios técnicos.
- 📊 **Métricas e Historial de Cambios:** Estadísticas en vivo y registro de auditoría con fecha, hora y actor en cada cambio de estado.

---

## 🚀 Tecnologías Utilizadas

| Capa | Tecnología |
| :--- | :--- |
| **Framework Web** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) |
| **Estilos & UI** | [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), Lucide Icons |
| **Animaciones** | [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) |
| **Base de Datos & ORM** | [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM 7](https://www.prisma.io/) |
| **Realtime & Storage** | [Supabase](https://supabase.com/) (Channels WebSocket + Storage Buckets) |
| **Autenticación** | [Auth.js / NextAuth v5](https://authjs.dev/) + Google OAuth |

---

## 🏗️ Arquitectura del Proyecto

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CLIENTE (Browser / Mobile)                    │
│   Dashboard UI (Next.js React Client Components + GSAP Animations)     │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
            Server Actions (RSC)               WebSocket Realtime
                    │                                │
┌───────────────────▼──────────────────┐   ┌─────────▼──────────────────┐
│      Next.js Server Actions          │   │ Supabase Realtime Channel  │
│   (createReport, updateStatus, etc.) │   │  ('postgres_changes')      │
└───────────────────┬──────────────────┘   └─────────▲──────────────────┘
                    │                                │
┌───────────────────▼────────────────────────────────┴───────────────────┐
│                       PostgreSQL (Supabase / Neon DB)                 │
│                 Tablas: User, Account, Report, ReportHistory           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas

```
edufix-ai/
├── prisma/
│   └── schema.prisma                 # Modelos de base de datos (User, Report, ReportHistory, etc.)
├── public/                           # Assets estáticos e imágenes
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # Endpoints de API y Auth.js
│   │   ├── dashboard/                # Página principal del Dashboard
│   │   ├── login/                    # Pantalla de Autenticación
│   │   ├── layout.tsx                # Root Layout y Providers
│   │   └── page.tsx                  # Redirección e inicio
│   ├── components/
│   │   ├── dashboard/                # Componentes modulares del Dashboard
│   │   │   ├── action-report-button.tsx
│   │   │   ├── dashboard-context.tsx  # Estado global y sincronización Realtime
│   │   │   ├── maintenance-dashboard-view.tsx
│   │   │   ├── my-reports-section.tsx
│   │   │   ├── popular-reports-section.tsx
│   │   │   ├── public-social-feed.tsx
│   │   │   ├── report-card.tsx
│   │   │   ├── student-dashboard-view.tsx
│   │   │   ├── teacher-dashboard-view.tsx
│   │   │   └── teacher-report-detail-modal.tsx
│   │   └── ui/                       # Componentes base Shadcn / UI
│   ├── features/
│   │   └── reports/
│   │       └── actions.ts            # Server Actions de Prisma (createReport, updateStatus, upvote)
│   ├── lib/
│   │   ├── locations.ts              # Lista oficial de Grados (6-1 a 11-3) y Áreas
│   │   ├── prisma.ts                 # Cliente Singleton de Prisma
│   │   ├── supabase.ts               # Cliente Supabase Browser
│   │   └── utils.ts                  # Utilidades globales de Tailwind
│   └── services/
│       ├── auth/                     # Configuración de Auth.js y Session
│       └── storage.ts                # Servicio de optimización y subida a Supabase Storage
├── .env.local                        # Variables de entorno locales
├── next.config.ts                    # Configuración de Next.js
├── package.json                      # Dependencias del proyecto
└── README.md                         # Documentación oficial
```

---

## ⚙️ Proceso de Instalación

### Prerrequisitos
- **Node.js** v18.x o superior
- **npm** v9.x o superior
- Instancia activa de **PostgreSQL** y proyecto en **Supabase**

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JancarloGCdev/edufix-ai.git
   cd edufix-ai
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno** (ver sección siguiente).

4. **Ejecutar migraciones y generar el cliente de Prisma:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

6. Abrir `http://localhost:3000` en el navegador.

---

## 🔑 Variables de Entorno Necesarias

Crea un archivo `.env.local` en la raíz del proyecto con la siguiente estructura:

```env
# Base de Datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@localhost:5432/edufix_db?schema=public"

# Auth.js / NextAuth
AUTH_SECRET="tu_secreto_super_seguro_generado_con_openssl"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth Credentials
AUTH_GOOGLE_ID="tu_google_client_id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="tu_google_client_secret"

# Supabase Realtime & Storage Credentials
NEXT_PUBLIC_SUPABASE_URL="https://tu-proyecto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_supabase_anon_key"
```

---

## 🖥️ Cómo Ejecutar el Proyecto

```bash
# Servidor de desarrollo con Turbopack
npm run dev

# Compilación para producción
npm run build

# Iniciar servidor en producción
npm start
```

---

## 🗄️ Cómo Ejecutar Prisma

```bash
# Generar cliente de Prisma
npx prisma generate

# Sincronizar esquema directamente con la base de datos
npx prisma db push

# Crear y aplicar una migración
npx prisma migrate dev --name init

# Abrir el panel visual de administración (Prisma Studio)
npx prisma studio
```

---

## 🔐 Cómo Iniciar Sesión

1. **Autenticación Mock (Desarrollo Rápido):**
   - En el login se disponen de botones de acceso rápido para probar los 3 roles:
     - **Estudiante GABO** (Grado 11°A)
     - **Profesor / Coordinador** (Coordinación de Convivencia e Infraestructura)
     - **Técnico de Mantenimiento** (Cuadrilla e Infraestructura)
2. **Google OAuth (Producción):**
   - Iniciar sesión con cuentas institucionales `@iegabo.edu.co` mediante Google OAuth.

---

## 🎭 Roles del Sistema

1. 🎓 **Estudiante (STUDENT):**
   - Reporta nuevos problemas mediante cámara o galería.
   - Selecciona grados (6-1 a 11-3) o áreas comunes.
   - Apoya incidencias creadas por otros compañeros.
   - Consulta el estado de sus reportes en tiempo real.
2. 👨‍🏫 **Profesor / Coordinador (TEACHER / ADMIN):**
   - Evalúa y aprueba/rechaza reportes de la comunidad.
   - **Asigna tareas al personal de mantenimiento** (Carlos Ruíz, Mario Gómez, Esteban López, etc.).
   - Visualiza métricas institucionales y prioridad de atención.
3. 🛠️ **Personal de Mantenimiento (MAINTENANCE):**
   - Visualiza panel exclusivo con sus asignaciones, tareas en proceso y resueltas.
   - Cambia estado a *"En reparación"*.
   - Sube la foto comprobatoria del arreglo y comentarios técnicos.
   - Marca el reporte como *"Resuelto"*.

---

## 🔄 Flujo Completo de Funcionamiento

```
[1. Estudiante] ───> Toma foto + Elige ubicación (ej: 6-1) ───> [Crea Reporte]
                                                                      │
                                                                      ▼
[2. Coordinador] <─── Notificado en tiempo real ─────────── [Revisa Reporte]
        │
        └───────> Selecciona Técnico ─────────> [Asigna a Mantenimiento]
                                                       │
                                                       ▼
[3. Mantenimiento] <── Notificado en su panel ──── [Inicia Reparación]
        │
        └───────> Sube foto de solución + Comentario ──> [Marca como Resuelto]
                                                               │
                                                               ▼
[4. Todos los Usuarios] <── Sincronización Realtime WebSocket ── [Visualizan Solución]
```

---

## ⚡ Integración con Supabase Realtime

EduFix AI utiliza el motor de canales WebSocket de Supabase en `dashboard-context.tsx`:

```typescript
const channel = supabase
  .channel("public:Report")
  .on("postgres_changes", { event: "*", schema: "public", table: "Report" }, (payload) => {
    // Sincroniza inserciones, cambios de estado y apoyos al instante en todos los clientes
  })
  .subscribe();
```

---

## 📦 Integración con Supabase Storage

Las imágenes capturadas se procesan en el cliente mediante un Canvas HTML5 para redimensionar (máx 1200px) y comprimir antes de subirlas al bucket `report-images` de Supabase Storage:

```typescript
export async function uploadReportImageToStorage(file: File): Promise<string> {
  // Proceso de compresión y subida con nombres únicos timestamped
}
```

---

## 🔑 Integración con Google OAuth

Configurada mediante **Auth.js (NextAuth v5)** para autenticación segura sin contraseña y mapeo automático del perfil institucional del usuario.

---

## 🎨 Integración con GSAP

GSAP alimenta el micro-diseño visual y las transiciones fluidas Mobile-First:
- Animación de entrada progresiva en el analizador de IA (`gsap.fromTo`).
- Transiciones fluidas en modales y tarjetas interactivas.

---

## 🤖 Integración Preparada para IA

El sistema cuenta con un pipeline preparado para integrar visión por computadora y LLMs:
- **Análisis de calidad de imagen** (verificación institucional).
- **Detección de duplicados** para evitar alertas repetidas.
- **Categorización automática** sugerida según el daño detectado.

---

## 💡 Buenas Prácticas Utilizadas

- **Diseño Mobile-First Resiliente:** Interfaz optimizada para pantallas táctiles y móviles.
- **Server Actions Puras:** Mutaciones seguras directamente ejecutadas en el servidor de Next.js.
- **Optimización de Estado:** Estado local reactivo combinado con suscripciones en tiempo real.
- **Manejo Elegante de Errores:** Resiliencia ante datos de demostración u omisiones en DB (tratamiento de errores Prisma `P2025`).
- **Arquitectura Limpia y Modular:** Componentes pequeños y reutilizables siguiendo principios SOLID.

---

## 🛣️ Roadmap de Futuras Mejoras

- [ ] Integración con modelos vision de OpenAI/Gemini para auto-clasificación de daños.
- [ ] Notificaciones PWA Push para el equipo de mantenimiento.
- [ ] Exportación de reportes PDF para auditorías de la Secretaría de Educación.
- [ ] Soporte offline con Sync API al recuperar conexión.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

---

<p center="text-center">
  Hecho con ❤️ para la comunidad de la <strong>IE Gabriel García Márquez (IE GABO)</strong>.
</p>
