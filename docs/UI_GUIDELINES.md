# UI Guidelines

**Estado:** ✅ Congelado v1.0

**Última actualización:** 03/08/2026

---

# Objetivo

Definir la identidad visual, principios de diseño, componentes, animaciones y experiencia de usuario de EduFix AI.

Todas las interfaces deberán seguir este documento.

---

# Filosofía de Diseño

EduFix AI debe transmitir:

- Simplicidad
- Rapidez
- Transparencia
- Confianza
- Modernidad

La interfaz debe ser limpia, intuitiva y accesible.

---

# Inspiración

La aplicación tomará inspiración de:

- Linear
- Vercel
- GitHub
- Notion
- Material Design 3

No se copiará ningún diseño; solo se adoptarán buenas prácticas de experiencia de usuario.

---

# Design System

Toda la interfaz deberá construirse utilizando un sistema de diseño consistente.

## Principios

- Consistencia.
- Reutilización.
- Accesibilidad.
- Escalabilidad.
- Simplicidad.

---

# Paleta de colores

## Primary

Azul

```
#2563EB
```

---

## Success

Verde

```
#22C55E
```

---

## Warning

Amarillo

```
#F59E0B
```

---

## Danger

Rojo

```
#EF4444
```

---

## Background

```
#F8FAFC
```

---

## Surface

```
#FFFFFF
```

---

## Border

```
#E5E7EB
```

---

## Text Primary

```
#111827
```

---

## Text Secondary

```
#6B7280
```

---

# Tipografía

Fuente principal

Geist

Alternativa

Inter

---

# Espaciado

Sistema basado en múltiplos de 4.

```
4
8
12
16
24
32
48
64
```

---

# Border Radius

```
sm
md
lg
xl
2xl
```

---

# Sombras

Solo utilizar sombras suaves.

Nunca utilizar sombras excesivas.

---

# Iconografía

Biblioteca oficial:

Lucide Icons.

Todos los iconos deberán mantener el mismo estilo visual.

---

# Componentes

Base:

- shadcn/ui

Componentes propios:

- EduButton
- ReportCard
- StatusBadge
- PriorityBadge
- UserAvatar
- EmptyState
- ConfirmDialog
- MetricCard
- DashboardCard
- AIRecommendationCard

---

# Estados de un Reporte

| Estado | Color |
|----------|---------|
| Pendiente | Gris |
| En revisión | Azul |
| Asignado | Morado |
| En proceso | Amarillo |
| Resuelto | Verde |
| Cerrado | Gris oscuro |

---

# Prioridades

| Prioridad | Color |
|------------|---------|
| Baja | Verde |
| Media | Amarillo |
| Alta | Naranja |
| Crítica | Rojo |

---

# Animaciones

Biblioteca oficial:

GSAP

---

## Principios

Las animaciones deberán comunicar información.

Nunca distraer al usuario.

Duración máxima recomendada:

300 ms

---

## Animaciones permitidas

- Fade In
- Fade Out
- Slide Up
- Slide Down
- Scale
- Hover
- Pulse
- Counter Animation

---

## Animaciones prohibidas

- Fondos animados.
- Partículas permanentes.
- Objetos girando constantemente.
- Animaciones excesivas.
- Three.js en el MVP.

---

# Experiencia de IA

La IA deberá comunicar siempre qué está haciendo.

Ejemplo:

```
📸 Imagen recibida

↓

🤖 Analizando descripción...

↓

🔍 Buscando incidencias similares...

↓

📍 Comparando ubicación...

↓

✅ Coincidencia encontrada.
```

---

Si no encuentra coincidencias:

```
🤖 Analizando...

↓

No encontramos incidencias similares.

↓

✅ Reporte creado correctamente.
```

---

# IA Explicable

Cuando la IA sugiera una incidencia existente deberá explicar por qué.

Ejemplo

```
Coincidencia: 94%

Motivos

✔ Misma ubicación

✔ Imagen similar

✔ Descripción parecida

✔ Reportado hace dos días
```

---

# Loading States

Utilizar Skeleton Loading.

Evitar Spinner cuando sea posible.

---

# Empty States

Las pantallas vacías deberán ser amigables.

Ejemplo

```
🎉

No hay incidencias pendientes.

¡Excelente trabajo!
```

---

# Error States

Los errores deberán explicar:

- Qué ocurrió.
- Cómo solucionarlo.
- Qué puede hacer el usuario.

---

# Responsive Design

La aplicación seguirá Mobile First.

Resoluciones objetivo:

- Mobile
- Tablet
- Laptop
- Desktop

---

# Accesibilidad

La aplicación deberá cumplir como mínimo:

- Contraste AA.
- Navegación mediante teclado.
- Focus visible.
- Labels accesibles.
- Componentes compatibles con lectores de pantalla.
- Uso correcto de ARIA cuando sea necesario.

---

# Dashboard

El Dashboard utilizará tarjetas de métricas.

Ejemplo

```
112

Incidencias Totales

▲ +18%
```

Las tarjetas deberán animarse suavemente al aparecer.

---

# Modo Oscuro

Aunque no se implemente en el MVP, toda decisión de diseño deberá ser compatible con Dark Mode.

---

# Buenas Prácticas

- Evitar pantallas saturadas.
- Máximo un color de énfasis por pantalla.
- Priorizar la legibilidad.
- Mantener consistencia visual.
- Reutilizar componentes.
- Evitar duplicar estilos.

---

# Architectural Decision Records (ADR)

## ADR-UI-001

Se utilizará un Design System centralizado.

---

## ADR-UI-002

GSAP será la única biblioteca oficial para animaciones.

---

## ADR-UI-003

La aplicación seguirá una estrategia Mobile First.

---

## ADR-UI-004

Toda interacción con IA deberá ser visible y comprensible para el usuario.

---

## ADR-UI-005

La accesibilidad será considerada desde el inicio del desarrollo.
