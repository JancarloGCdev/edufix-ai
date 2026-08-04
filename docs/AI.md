# Artificial Intelligence (AI)

## Objetivo del documento

Definir cómo la Inteligencia Artificial será utilizada dentro de EduFix AI, qué problemas resolverá, cuándo será utilizada y cuáles serán sus límites.

---

# Filosofía

La Inteligencia Artificial en EduFix AI tiene como objetivo asistir a los usuarios y mejorar la gestión de incidencias.

La IA nunca tomará decisiones automáticas que afecten la información del sistema.

Todas las recomendaciones deberán ser confirmadas por el usuario.

> **La Inteligencia Artificial en EduFix AI actúa como un copiloto que asiste al usuario, nunca como un juez que toma decisiones por él.**

---

# Objetivos

La IA deberá ayudar a:

* Detectar reportes similares.
* Reducir reportes duplicados.
* Clasificar automáticamente las incidencias.
* Priorizar problemas según el impacto.
* Generar información útil para los administradores.
* Facilitar la toma de decisiones.

---

# Arquitectura de la IA

La IA estará dividida en dos servicios internos.

```
AI

│

├── Smart Reports
│   ├── Detectar duplicados
│   ├── Clasificar incidencias
│   ├── Sugerir categorías
│   └── Calcular similitud
│

└── Smart Insights
    ├── Resumir incidencias
    ├── Detectar tendencias
    ├── Generar estadísticas
    └── Ayudar a priorizar
```

---

# Smart Reports

Este servicio está orientado a mejorar la experiencia del estudiante al crear un nuevo reporte.

Funciones:

* Detectar reportes similares.
* Clasificar automáticamente la incidencia.
* Sugerir categorías.
* Evitar reportes duplicados.
* Mostrar el porcentaje de similitud.

---

# Smart Insights

Este servicio está orientado a coordinadores y administradores.

Funciones:

* Generar resúmenes automáticos.
* Detectar tendencias.
* Identificar zonas críticas.
* Recomendar prioridades.
* Generar estadísticas inteligentes.

Ejemplo:

> Durante la última semana se registraron 23 incidencias relacionadas con infraestructura. El Bloque B concentra el 48% de los reportes y presenta un incremento del 15% respecto a la semana anterior.

---

# Casos de uso

## 1. Detección de reportes similares

### Entrada

* Fotografía
* Descripción
* Ubicación

### Resultado

La IA devolverá una lista de posibles coincidencias junto con un porcentaje de similitud.

Ejemplo:

* Baño Bloque B — 97%
* Salón 204 — 84%
* Cafetería — 63%

El usuario decidirá si desea confirmar un reporte existente o crear uno nuevo.

---

## 2. Clasificación automática

La IA sugerirá una categoría para la incidencia.

Ejemplo:

Descripción:

"El baño del segundo piso tiene una fuga de agua."

Resultado:

Categoría sugerida:

* Baños

Confianza:

95%

El usuario podrá aceptar o modificar la sugerencia.

---

## 3. Resumen para administradores

La IA podrá generar un resumen automático de las incidencias.

Ejemplo:

> Durante la última semana se registraron 18 incidencias relacionadas con infraestructura, principalmente en el Bloque B.

---

## 4. Priorización inteligente

La IA podrá recomendar qué incidencias deberían atenderse primero teniendo en cuenta:

* Cantidad de confirmaciones.
* Tiempo sin resolver.
* Categoría.
* Impacto estimado.

La decisión final siempre será tomada por un usuario autorizado.

---

# Pipeline de IA

```
Usuario

↓

Sube fotografía

↓

Escribe descripción

↓

Selecciona ubicación

↓

Validación

↓

Smart Reports

↓

Buscar coincidencias

↓

¿Existen incidencias similares?

├── Sí

│

├── Mostrar sugerencias

├── Usuario confirma

└── Incrementar Confirmation Count

└── No

↓

Clasificación automática

↓

Crear incidencia
```

---

# Flujo general

```
Fotografía

+

Descripción

+

Ubicación

↓

Servicio IA

↓

Análisis

↓

Coincidencias

↓

Clasificación

↓

Respuesta

↓

Usuario confirma
```

---

# Estrategia para reducir llamadas a la IA

Antes de consultar al proveedor de IA, la aplicación intentará reutilizar información existente.

Orden de búsqueda:

1. Buscar incidencias recientes en la misma ubicación.
2. Buscar incidencias con categorías similares.
3. Consultar a la IA únicamente si no existen coincidencias suficientemente confiables.

Este enfoque reduce costos y mejora el rendimiento.

---

# Niveles de confianza

| Similitud    | Acción                                        |
| ------------ | --------------------------------------------- |
| 95% – 100%   | Recomendar unirse al reporte existente.       |
| 80% – 94%    | Mostrar como coincidencia altamente probable. |
| 60% – 79%    | Mostrar como posible coincidencia.            |
| Menor al 60% | Crear un nuevo reporte.                       |

---

# Experiencia del usuario

Cuando exista una coincidencia importante, el sistema mostrará un mensaje similar a:

```
🔎 Encontramos un reporte muy parecido.

Baño Bloque B

Reportado hace 2 días.

Confirmado por 31 personas.

Estado:

🟡 En proceso.

¿Quieres confirmar este reporte?
```

El usuario siempre tendrá la posibilidad de crear un nuevo reporte si considera que no corresponde.

---

# Proveedor de IA

Proveedor inicial:

Google Gemini API.

La aplicación estará diseñada para permitir cambiar el proveedor sin modificar la lógica del negocio.

---

# Abstracción del proveedor

La IA será consumida mediante una capa de abstracción.

```
AIProvider

↓

GeminiProvider

↓

Respuesta
```

En futuras versiones podrán existir implementaciones para otros proveedores sin afectar el resto del sistema.

Ejemplos:

* OpenAI
* Azure OpenAI
* Claude

---

# Manejo de errores

Si el servicio de IA no responde:

* El usuario podrá crear el reporte normalmente.
* La aplicación informará que no fue posible analizar la incidencia.
* Ninguna funcionalidad principal dependerá de la IA.

---

# Limitaciones

La IA:

* No eliminará reportes.
* No modificará estados automáticamente.
* No asignará prioridades automáticamente.
* No tomará decisiones administrativas.

Siempre actuará como un asistente.

---

# Buenas prácticas

* Minimizar el número de llamadas a la IA.
* Evitar solicitudes innecesarias.
* Reutilizar información siempre que sea posible.
* Mostrar el nivel de confianza de cada sugerencia.
* Mantener desacoplado el proveedor de IA.

---

# Evolución futura

En futuras versiones la IA podrá incorporar:

* Detección automática de objetos en imágenes.
* Mantenimiento predictivo.
* Generación de reportes ejecutivos.
* Detección de tendencias.
* Recomendaciones para mantenimiento preventivo.
* Asistente conversacional para administradores.

---

# Architectural Decision Records (ADR)

## ADR-AI-001

La IA nunca reemplazará las decisiones humanas.

---

## ADR-AI-002

La aplicación seguirá funcionando incluso si el servicio de IA no está disponible.

---

## ADR-AI-003

La IA será un servicio desacoplado para permitir cambiar de proveedor sin afectar el resto del sistema.

---

## ADR-AI-004

Todas las sugerencias generadas por IA mostrarán un porcentaje de confianza cuando sea posible.

---

## ADR-AI-005

La IA se dividirá en dos servicios internos:

* Smart Reports
* Smart Insights

Con el fin de separar la asistencia al estudiante de la inteligencia orientada a la gestión administrativa.
