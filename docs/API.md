# API

**Estado:** ✅ Congelado v1.0

**Última actualización:** 03/08/2026

---

# Objetivo

Definir los contratos del backend de EduFix AI, estableciendo cómo interactúan el frontend, la base de datos, la autenticación y la IA.

Este documento describe las operaciones disponibles para cada módulo del sistema, independientemente de si son implementadas mediante Server Actions, Route Handlers o APIs REST.

---

# Filosofía

El frontend nunca accederá directamente a la base de datos.

Toda interacción pasará por una capa de servicios del servidor.

```
UI

↓

Server Actions

↓

Services

↓

Prisma

↓

PostgreSQL
```

---

# Convenciones

## Entrada

Toda información recibida será validada utilizando Zod.

---

## Salida

Todas las respuestas seguirán una estructura consistente.

```ts
{
  success: boolean,
  message: string,
  data?: unknown,
  errors?: unknown
}
```

---

# Módulo Auth

## login()

Descripción

Autenticar un usuario mediante Google OAuth.

---

## logout()

Cerrar la sesión actual.

---

## getCurrentUser()

Obtener el usuario autenticado.

---

## hasPermission(permission)

Verificar si el usuario posee un permiso específico.

---

# Módulo Users

## getProfile()

Obtiene la información del usuario.

---

## updateProfile()

Actualiza la información del usuario.

---

## getNotifications()

Obtiene las notificaciones del usuario.

---

# Módulo Reports

## createReport()

Crear una nueva incidencia.

Entrada

- title
- description
- image
- category
- location

Proceso

- Validar datos.
- Ejecutar Smart Reports.
- Buscar coincidencias.
- Crear o confirmar incidencia.

---

## getReports()

Obtiene todas las incidencias.

Filtros

- Estado
- Categoría
- Ubicación
- Prioridad

---

## getReportById()

Obtiene una incidencia específica.

---

## updateReport()

Actualiza una incidencia.

---

## assignReport()

Asigna una incidencia a un responsable.

---

## updateStatus()

Actualiza el estado de una incidencia.

También registra el cambio en ReportHistory.

---

## confirmReport()

Confirma que un usuario presenta la misma incidencia.

Proceso

- Verificar duplicados.
- Registrar Confirmation.
- Incrementar confirmationCount.

---

## addComment()

Agregar comentario.

---

## uploadAttachment()

Subir imágenes.

---

# Módulo Dashboard

## getMetrics()

Obtiene indicadores principales.

---

## getRecentReports()

Obtiene incidencias recientes.

---

## getStatistics()

Obtiene estadísticas generales.

---

## getTrends()

Obtiene tendencias calculadas por IA.

---

# Módulo AI

## findSimilarReports()

Buscar incidencias similares.

Entrada

- Imagen
- Descripción
- Ubicación

Salida

- Coincidencias
- Similitud
- Categoría sugerida

---

## classifyReport()

Clasificar automáticamente una incidencia.

---

## generateInsights()

Generar estadísticas inteligentes.

---

## summarizeReports()

Generar resúmenes ejecutivos.

---

# Flujo para crear un reporte

```
Usuario

↓

Validación

↓

Smart Reports

↓

Buscar coincidencias

↓

¿Existe incidencia similar?

├── Sí

│

├── Mostrar sugerencias

├── Usuario confirma

└── Confirmation++

└── No

↓

Crear reporte

↓

Guardar historial

↓

Notificar
```

---

# Manejo de errores

Todos los errores deberán:

- Ser registrados en el servidor.
- Mostrar mensajes comprensibles al usuario.
- No exponer información sensible.

---

# Validaciones

Todas las operaciones deberán validar:

- Autenticación.
- Permisos.
- Datos de entrada.
- Reglas de negocio.

---

# Seguridad

Nunca confiar en validaciones del cliente.

Todas las verificaciones se realizarán nuevamente en el servidor.

---

# Versionado

Inicialmente:

v1

En futuras versiones se podrán crear nuevas implementaciones manteniendo compatibilidad.

---

# Buenas prácticas

- Operaciones pequeñas.
- Funciones reutilizables.
- Sin lógica duplicada.
- Respuestas consistentes.
- Tipado completo con TypeScript.
- Validaciones con Zod.

---

# Architectural Decision Records (ADR)

## ADR-API-001

El frontend nunca accederá directamente a la base de datos.

---

## ADR-API-002

Toda operación será validada en el servidor.

---

## ADR-API-003

Server Actions será el mecanismo principal de comunicación entre el frontend y el backend.

---

## ADR-API-004

Los contratos del backend deberán mantenerse independientes de la tecnología utilizada para implementarlos.

---

## ADR-API-005

Toda operación deberá respetar la arquitectura definida en ARCHITECTURE.md.
