# Permissions

## Objetivo del documento

Definir el sistema de control de acceso (RBAC) de EduFix AI, estableciendo los roles, permisos y reglas de autorización que utilizará la plataforma.

---

# Filosofía

EduFix AI implementará un sistema **Role-Based Access Control (RBAC)**.

Los usuarios obtienen permisos a través de un rol.

La aplicación nunca verificará únicamente el rol de un usuario; verificará si posee el permiso necesario para ejecutar una acción.

---

# Roles

## Estudiante

Es el usuario principal de la plataforma.

Puede reportar incidencias y confirmar reportes existentes.

---

## Profesor

Puede realizar las mismas acciones que un estudiante y colaborar en el seguimiento de las incidencias.

---

## Personal de Mantenimiento

Responsable de atender las incidencias asignadas.

Puede actualizar el estado de los reportes.

---

## Coordinador

Gestiona las incidencias de la institución.

Puede asignar responsables y supervisar el proceso de resolución.

---

## Administrador

Tiene acceso completo a la plataforma y puede administrar usuarios, permisos y configuración.

---

# Permisos

Los permisos representan acciones específicas dentro del sistema.

## Usuarios

* users.read
* users.update
* users.delete

---

## Reportes

* reports.create
* reports.read
* reports.update
* reports.delete
* reports.confirm

---

## Comentarios

* comments.create
* comments.update
* comments.delete

---

## Categorías

* categories.read
* categories.create
* categories.update
* categories.delete

---

## Ubicaciones

* locations.read
* locations.create
* locations.update
* locations.delete

---

## Estados

* status.update

---

## Dashboard

* dashboard.read

---

## Administración

* admin.access
* roles.manage
* permissions.manage

---

# Matriz de permisos

| Permiso                      | Estudiante | Profesor | Mantenimiento | Coordinador | Administrador |
| ---------------------------- | :--------: | :------: | :-----------: | :---------: | :-----------: |
| reports.create               |      ✅     |     ✅    |       ✅       |      ✅      |       ✅       |
| reports.read                 |      ✅     |     ✅    |       ✅       |      ✅      |       ✅       |
| reports.confirm              |      ✅     |     ✅    |       ✅       |      ✅      |       ✅       |
| comments.create              |      ✅     |     ✅    |       ✅       |      ✅      |       ✅       |
| users.update (propio perfil) |      ✅     |     ✅    |       ✅       |      ✅      |       ✅       |
| status.update                |      ❌     |     ❌    |       ✅       |      ✅      |       ✅       |
| dashboard.read               |      ❌     |     ❌    |       ✅       |      ✅      |       ✅       |
| categories.manage            |      ❌     |     ❌    |       ❌       |      ✅      |       ✅       |
| locations.manage             |      ❌     |     ❌    |       ❌       |      ✅      |       ✅       |
| roles.manage                 |      ❌     |     ❌    |       ❌       |      ❌      |       ✅       |
| permissions.manage           |      ❌     |     ❌    |       ❌       |      ❌      |       ✅       |
| admin.access                 |      ❌     |     ❌    |       ❌       |      ❌      |       ✅       |

---

# Reglas de autorización

## Regla 1

Todo usuario debe estar autenticado.

---

## Regla 2

Solo usuarios con correo institucional `@iegabo.edu.co` podrán acceder.

---

## Regla 3

Los permisos siempre serán verificados en el servidor.

Nunca se confiará únicamente en validaciones del cliente.

---

## Regla 4

Un usuario solo podrá modificar la información que tenga autorización para editar.

---

## Regla 5

El administrador tendrá acceso completo a la plataforma.

---

# Flujo de autorización

```text
Usuario

↓

Google OAuth

↓

Correo institucional

↓

Buscar usuario

↓

Obtener rol

↓

Obtener permisos

↓

¿Tiene el permiso requerido?

├── Sí → Ejecutar acción

└── No → Acceso denegado
```

---

# Principio de mínimo privilegio

Cada usuario recibirá únicamente los permisos necesarios para desempeñar su función.

Esto reduce riesgos de seguridad y facilita la administración del sistema.

---

# Futuras mejoras

El sistema permitirá incorporar nuevos roles sin modificar la lógica principal.

Ejemplos:

* Rector
* Personal de Seguridad
* Supervisor de Infraestructura
* Invitado

Solo será necesario asignarles los permisos correspondientes.

---

# Architectural Decision Records (ADR)

## ADR-PERM-001

La plataforma utilizará un sistema RBAC.

---

## ADR-PERM-002

Los permisos serán verificados en el servidor.

---

## ADR-PERM-003

Los roles podrán ampliarse sin modificar la arquitectura.

---

## ADR-PERM-004

La autorización se basará en permisos y no únicamente en el nombre del rol.

