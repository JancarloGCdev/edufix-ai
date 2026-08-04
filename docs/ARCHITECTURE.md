# Architecture

## Objetivo del documento

Definir la arquitectura de software de EduFix AI, documentando las decisiones técnicas y los principios que guiarán el desarrollo del proyecto.

---

# Filosofía

EduFix AI seguirá una arquitectura **Modular Monolith**, donde cada dominio del sistema será independiente, pero compartirá la misma base de código.

El objetivo es facilitar el desarrollo, el mantenimiento y la escalabilidad sin introducir la complejidad de una arquitectura de microservicios.

---

# Principios arquitectónicos

## Modularidad

Cada funcionalidad importante estará encapsulada dentro de un módulo independiente.

## Separación de responsabilidades

La lógica de negocio nunca estará mezclada con la interfaz de usuario.

## Escalabilidad

Cada módulo podrá evolucionar sin afectar significativamente al resto del sistema.

## Seguridad

Toda validación crítica y modificación de datos deberá ejecutarse en el servidor.

## Reutilización

Los componentes compartidos vivirán únicamente dentro de `shared`.

---

# Stack tecnológico

| Tecnología | Uso | Motivo |
|------------|-----|--------|
| Next.js 15 | Framework Full Stack | Server Components, Server Actions y excelente rendimiento |
| TypeScript | Lenguaje | Tipado estático y mantenibilidad |
| Tailwind CSS | Estilos | Rapidez y consistencia |
| shadcn/ui | Componentes UI | Componentes accesibles y altamente personalizables |
| GSAP | Animaciones | Microinteracciones y mejor experiencia de usuario |
| Auth.js | Autenticación | Integración sencilla con Google OAuth |
| Google OAuth | Inicio de sesión | Acceso rápido y seguro |
| Prisma | ORM | Seguridad de tipos y migraciones |
| PostgreSQL | Base de datos | Modelo relacional, robusto y escalable |
| Supabase | Base de datos, Storage y Realtime | Plan gratuito y excelente integración con PostgreSQL |
| Zod | Validaciones | Validaciones compartidas entre cliente y servidor |
| Google Gemini API | Inteligencia Artificial | Plan gratuito para el MVP |
| Vercel | Despliegue | Integración nativa con Next.js |

---

# Arquitectura general

Frontend (Next.js)

↓

Server Actions

↓

Prisma ORM

↓

PostgreSQL (Supabase)

↓

Supabase Storage

↓

Google Gemini API

---

# Organización del proyecto

```
src/
│
├── app/
├── features/
├── shared/
├── lib/
├── prisma/
├── types/
└── middleware.ts
```

---

# Módulos

## Auth

Responsable de la autenticación, sesiones y control de acceso.

## Users

Gestión del perfil e información del usuario.

## Reports

Creación, actualización y consulta de incidencias.

## Dashboard

Visualización de estadísticas, indicadores y administración.

## AI

Comparación de reportes, clasificación y sugerencias inteligentes.

## Notifications

Notificaciones y eventos en tiempo real.

---

# Flujo de autenticación

```
Usuario

↓

Google OAuth

↓

Auth.js

↓

¿Correo termina en @iegabo.edu.co?

├── No → Acceso denegado

└── Sí

↓

Buscar usuario

↓

¿Existe?

├── No → Crear usuario

└── Sí → Continuar

↓

Asignar permisos

↓

Dashboard
```

---

# Flujo de creación de un reporte

```
Usuario

↓

Crear reporte

↓

Agregar fotografía

↓

Agregar descripción

↓

Seleccionar ubicación

↓

Servicio de IA

↓

Buscar reportes similares

↓

¿Existe uno parecido?

├── Sí

│

├── Mostrar sugerencias

├── Usuario confirma

└── Incrementar apoyo al reporte existente

└── No

↓

Crear nuevo reporte

↓

Estado: Pendiente
```

---

# Flujo del servicio de IA

```
Fotografía

+

Descripción

+

Ubicación

↓

Google Gemini

↓

Análisis

↓

Coincidencias

↓

Porcentaje de confianza

↓

Sugerencias al usuario
```

---

# Engineering Standards

## Arquitectura

- Toda funcionalidad nueva debe pertenecer a un módulo dentro de `features`.
- No se permite lógica de negocio dentro de componentes React.
- Los componentes nunca accederán directamente a la base de datos.

## Backend

- Todas las modificaciones de datos se realizarán mediante Server Actions.
- Toda entrada será validada con Zod.
- Prisma será el único punto de acceso a la base de datos.

## Frontend

- Componentes pequeños y reutilizables.
- No duplicar lógica.
- Priorizar Server Components cuando sea posible.

## Inteligencia Artificial

- La IA solo sugerirá acciones.
- Nunca tomará decisiones automáticamente.
- Todas las sugerencias deberán poder ser rechazadas por el usuario.

## Seguridad

- Solo usuarios con dominio `@iegabo.edu.co` podrán acceder.
- Todos los permisos deberán verificarse en el servidor.

---

# Architectural Decision Records (ADR)

## ADR-001

**Decisión:** Arquitectura Modular Monolith.

**Motivo:** Simplificar el desarrollo del MVP manteniendo una estructura escalable.

---

## ADR-002

**Decisión:** Autenticación mediante Google OAuth con Auth.js.

**Motivo:** Reducir la fricción del usuario y evitar el manejo de contraseñas.

---

## ADR-003

**Decisión:** PostgreSQL utilizando Supabase.

**Motivo:** Aprovechar un plan gratuito con una base de datos relacional robusta y Storage integrado.

---

## ADR-004

**Decisión:** Google Gemini como proveedor inicial de IA.

**Motivo:** Aprovechar el plan gratuito y desacoplar la lógica mediante una capa de servicios para facilitar futuros cambios de proveedor.

---

# Objetivo final

Construir una plataforma mantenible, escalable y preparada para evolucionar sin necesidad de reescribir la arquitectura.