# Roadmap

## Objetivo del documento

Definir las fases de desarrollo del proyecto y establecer el orden de implementación de cada módulo.

Este roadmap servirá como guía para el desarrollo y permitirá priorizar funcionalidades sin perder el enfoque del MVP.

---

# Estado del proyecto

🟢 Planeación

---

# Fase 1 - Fundación del proyecto

Objetivo:

Construir una base sólida antes de desarrollar funcionalidades.

Módulos:

- Configuración de Next.js
- TypeScript
- ESLint
- Prettier
- Tailwind CSS
- shadcn/ui
- Variables de entorno
- Configuración de Supabase
- Configuración de Prisma
- Configuración de GitHub
- Deploy inicial en Vercel

Resultado esperado:

Proyecto listo para comenzar el desarrollo.

---

# Fase 2 - Autenticación y usuarios

Objetivo:

Garantizar que únicamente miembros autorizados puedan ingresar.

Funcionalidades:

- OAuth con Google
- Restricción del dominio @iegabo.edu.co
- Registro automático del usuario
- Gestión de sesiones
- Middleware de protección
- Sistema de roles (RBAC)

Roles iniciales:

- Estudiante
- Profesor
- Personal de mantenimiento
- Coordinador
- Administrador

Resultado esperado:

Usuarios autenticados con permisos correctamente definidos.

---

# Fase 3 - Gestión de incidencias

Objetivo:

Permitir reportar problemas dentro de la institución.

Funcionalidades:

- Crear reporte
- Adjuntar imágenes
- Categorías
- Ubicación
- Descripción
- Historial
- Estados

Estados:

Pendiente

En revisión

En proceso

Resuelto

Resultado esperado:

Sistema completo de gestión de incidencias.

---

# Fase 4 - Inteligencia Artificial

Objetivo:

Evitar reportes duplicados y ayudar a priorizar incidencias.

Funcionalidades:

- Comparación semántica
- Comparación de imágenes
- Detección de duplicados
- Sugerencia de incidencias existentes
- Clasificación automática
- Priorización inteligente

Resultado esperado:

La IA ayuda al usuario antes de crear un nuevo reporte.

---

# Fase 5 - Dashboard

Objetivo:

Proporcionar herramientas de seguimiento y análisis.

Funcionalidades:

- Estadísticas
- Gráficas
- Reportes recientes
- Filtros
- Búsqueda
- Ordenamiento
- KPIs

Resultado esperado:

Panel administrativo funcional.

---

# Fase 6 - Tiempo real

Objetivo:

Mantener sincronizada la información entre todos los usuarios.

Funcionalidades:

- Actualización automática
- Nuevos reportes
- Cambio de estados
- Confirmaciones
- Notificaciones en tiempo real

Resultado esperado:

Experiencia colaborativa.

---

# Fase 7 - Experiencia de usuario

Objetivo:

Crear una interfaz moderna y agradable.

Funcionalidades:

- Animaciones GSAP
- Microinteracciones
- Skeletons
- Loading States
- Empty States
- Toasts
- Confirmaciones
- Responsive Design

Resultado esperado:

Una experiencia fluida y profesional.

---

# Fase 8 - Calidad

Objetivo:

Garantizar estabilidad y escalabilidad.

Funcionalidades:

- Validaciones
- Manejo de errores
- Optimización
- Accesibilidad
- Seguridad
- Testing

Resultado esperado:

Aplicación lista para producción.

---

# Futuras versiones

- Aplicación móvil
- Sistema de notificaciones push
- Panel para padres
- Analítica predictiva
- IA para mantenimiento preventivo
- Integraciones con plataformas académicas
