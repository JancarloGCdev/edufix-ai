# Database

**Estado:** ✅ Congelado v1.0

**Última actualización:** 03/08/2026

---

# Objetivo del documento

Definir el modelo de datos de EduFix AI, las entidades principales del sistema, sus relaciones y las reglas de negocio antes de implementar la base de datos utilizando Prisma ORM y PostgreSQL.

---

# Principios de diseño

- Cada entidad representa un concepto real del negocio.
- Evitar duplicidad de información.
- Mantener relaciones normalizadas.
- Facilitar futuras funcionalidades sin rediseñar la base de datos.
- Mantener trazabilidad de las acciones importantes.
- Priorizar la integridad de los datos.

---

# Entidades

## User

Representa cualquier usuario registrado en la plataforma.

### Atributos

- id
- name
- email
- image
- roleId
- createdAt
- updatedAt

### Relaciones

- Pertenece a un Role.
- Puede crear múltiples Report.
- Puede realizar múltiples Confirmation.
- Puede realizar múltiples Comment.
- Puede recibir múltiples Notification.
- Puede ser responsable de múltiples Report.
- Puede asignar múltiples Report.

---

## Role

Representa el rol asignado a un usuario.

### Atributos

- id
- name
- description

### Relaciones

- Tiene múltiples User.

### Roles iniciales

- Estudiante
- Profesor
- Personal de Mantenimiento
- Coordinador
- Administrador

---

## Report

Representa una incidencia reportada dentro de la institución.

### Atributos

- id
- title
- description
- imageUrl
- categoryId
- locationId
- statusId
- createdBy
- assignedTo
- assignedBy
- assignedAt
- priority
- confirmationCount
- createdAt
- updatedAt

### Relaciones

- Pertenece a User (creador).
- Puede estar asignado a un User.
- Puede haber sido asignado por un User.
- Pertenece a Category.
- Pertenece a Location.
- Pertenece a Status.
- Tiene múltiples Comment.
- Tiene múltiples Confirmation.
- Tiene múltiples Attachment.
- Tiene múltiples ReportHistory.
- Tiene múltiples AssignmentHistory.

---

## Category

Clasifica el tipo de incidencia.

### Atributos

- id
- name
- description

### Ejemplos

- Infraestructura
- Baños
- Electricidad
- Limpieza
- Tecnología
- Seguridad
- Mobiliario

---

## Location

Representa el lugar donde ocurre la incidencia.

### Atributos

- id
- name
- description

### Ejemplos

- Bloque A
- Bloque B
- Biblioteca
- Cafetería
- Laboratorio
- Patio
- Cancha
- Salón

---

## Status

Representa el estado actual de una incidencia.

### Atributos

- id
- name
- description

### Estados iniciales

- Pendiente
- En revisión
- Asignado
- En proceso
- Resuelto
- Cerrado

---

## Comment

Representa un comentario realizado sobre una incidencia.

### Atributos

- id
- reportId
- userId
- content
- createdAt

---

## Confirmation

Representa la confirmación de que otro usuario también presenta el mismo problema.

### Atributos

- id
- reportId
- userId
- createdAt

### Reglas

- Un usuario solo puede confirmar una incidencia una vez.
- Incrementa el confirmationCount.
- Ayuda a calcular la prioridad.

---

## Attachment

Representa archivos asociados a un reporte.

### Atributos

- id
- reportId
- url
- type
- createdAt

### Tipos iniciales

- Imagen

---

## Notification

Representa una notificación enviada a un usuario.

### Atributos

- id
- userId
- title
- message
- read
- createdAt

---

## AssignmentHistory

Mantiene el historial de asignaciones de una incidencia.

### Atributos

- id
- reportId
- assignedBy
- assignedTo
- previousAssignee
- assignedAt
- notes

### Objetivo

Permitir conocer:

- Quién asignó.
- A quién se asignó.
- Cuándo ocurrió.
- Observaciones de la asignación.

---

## ReportHistory

Mantiene el historial completo de cambios de estado de una incidencia.

### Atributos

- id
- reportId
- changedBy
- oldStatus
- newStatus
- comment
- changedAt

### Objetivo

Permitir auditoría completa del ciclo de vida del reporte.

---

# Relaciones generales

```
Role
│
└── User
     │
     ├── Report
     │      ├── Category
     │      ├── Location
     │      ├── Status
     │      ├── Comment
     │      ├── Confirmation
     │      ├── Attachment
     │      ├── AssignmentHistory
     │      └── ReportHistory
     │
     └── Notification
```

---

# Índices sugeridos

Crear índices para:

- User.email
- Report.statusId
- Report.categoryId
- Report.locationId
- Report.createdAt
- Report.priority
- Confirmation.reportId
- AssignmentHistory.reportId
- ReportHistory.reportId

---

# Reglas de negocio

## Usuarios

- El correo debe ser único.
- Solo se permiten correos institucionales `@iegabo.edu.co`.
- Todo usuario debe tener un rol.

---

## Reportes

- Todo reporte debe tener un creador.
- Todo reporte debe pertenecer a una categoría.
- Todo reporte debe pertenecer a una ubicación.
- Todo reporte iniciará con estado **Pendiente**.
- Todo reporte podrá asignarse a un responsable.
- Toda asignación deberá registrar quién la realizó.
- Todo cambio de estado deberá registrarse en ReportHistory.
- confirmationCount nunca podrá ser negativo.

---

## Confirmaciones

- Un usuario solo podrá confirmar un reporte una vez.
- Confirmar un reporte incrementará confirmationCount.
- Las confirmaciones influirán en la prioridad de la incidencia.

---

## Comentarios

- Solo usuarios autenticados podrán comentar.
- Los comentarios nunca se eliminarán físicamente.

---

## Historial

- Todo cambio de estado generará un registro en ReportHistory.
- Toda asignación generará un registro en AssignmentHistory.

---

## Eliminación

No se eliminarán reportes físicamente.

Se utilizará eliminación lógica cuando sea necesario para preservar la trazabilidad.

---

# Escalabilidad

Este modelo permitirá incorporar en futuras versiones:

- Auditoría avanzada.
- Gamificación.
- Reacciones.
- Múltiples imágenes por incidencia.
- Videos.
- Notificaciones Push.
- Estadísticas avanzadas.
- Analítica mediante IA.
- Mantenimiento predictivo.
- Dashboard ejecutivo.

---

# Consideraciones para Prisma

- Utilizar UUID como identificador principal.
- Utilizar relaciones explícitas mediante claves foráneas.
- Configurar eliminación lógica para entidades críticas.
- Mantener nombres de modelos en singular.
- Mantener nombres de tablas en plural mediante `@@map()` si se considera necesario.

---

# Architectural Decision Records (ADR)

## ADR-DB-001

La base de datos será PostgreSQL utilizando Supabase.

---

## ADR-DB-002

Prisma será el único ORM utilizado por la aplicación.

---

## ADR-DB-003

La plataforma utilizará eliminación lógica para preservar el historial.

---

## ADR-DB-004

Las confirmaciones reemplazan el concepto de "likes" o "apoyos", representando que múltiples usuarios presentan la misma incidencia.

---

## ADR-DB-005

Toda asignación y cambio de estado deberá conservar su historial para garantizar trazabilidad y facilitar auditorías.

---

## ADR-DB-006

El modelo de datos se diseñará para soportar futuras funcionalidades sin requerir una reestructuración significativa.