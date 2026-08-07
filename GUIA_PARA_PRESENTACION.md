# 🎓 Guía Completa de Presentación — EduFix AI
> **Dirigida a:** Estudiante expositora de EduFix AI (17 años)  
> **Objetivo:** Explicar el proyecto con total claridad, seguridad y entusiasmo ante el jurado y la comunidad de la IE GABO.

---

## 🌟 1. ¿Qué es EduFix AI?

**EduFix AI** es una aplicación para celulares y computadores creada para que cualquier estudiante, profesor o directivo del colegio **IE GABO** pueda reportar un daño físico (como un ventilador dañado, un tomacorriente roto o una mesa partida) en menos de 1 minuto usando la cámara de su celular.

Piensa en EduFix AI como el **"WhatsApp o Red Social del mantenimiento escolar"**, donde todos en el colegio pueden ver qué se ha dañado, qué se está arreglando y quién lo está reparando en tiempo real.

---

## 🛑 2. ¿Qué problema busca solucionar?

En la mayoría de colegios ocurre lo siguiente:
1. **Los daños se quedan guardados en la mente o en notas de papel:** Un estudiante ve una silla rota, le avisa a un profesor, pero el papel se pierde y nadie arregla nada.
2. **Nadie sabe en qué estado está el arreglo:** El profesor o el estudiante no saben si el coordinador ya enteró al técnico o si el repuesto ya se compró.
3. **Se repiten los mismos reportes:** 5 estudiantes distintos van a la coordinación a avisar lo mismo ("¡El proyector del salón 204 no sirve!"), haciendo perder tiempo a todos.

---

## 💡 3. ¿Por qué surgió esta idea?

Esta idea nació porque **un entorno escolar limpio, bonito y funcional ayuda a aprender mejor**. Queremos que la comunidad de la **IE GABO** tenga una herramienta moderna donde todos colaboren activamente para cuidar y reparar nuestro colegio, sin burocracia ni trámites molestos.

---

## 📱 4. ¿Cómo funciona la aplicación? (Paso a Paso)

Aquí está el recorrido paso a paso que harás en la demostración:

1. **Inicio de sesión con Google:**
   - Abres la aplicación y entras presionando un solo botón usando tu correo del colegio (`@iegabo.edu.co`). No hay contraseñas largas que olvidar.
2. **El Dashboard (Panel Principal):**
   - Es la pantalla principal donde ves las estadísticas del colegio (cuántos problemas hay pendientes, cuántos están en reparación y cuántos ya se solucionaron) y un feed con los reportes recientes.
3. **Crear un Reporte (Botón Flotante +):**
   - Tocas el botón principal de la cámara para empezar a reportar.
4. **Tomar Fotografía:**
   - La aplicación abre la cámara de tu celular. Tomas la foto del daño físico (por ejemplo, la pantalla azul de un proyector o la fuga de agua de un lavamanos).
5. **Análisis con Inteligencia Artificial (IA):**
   - La IA escanea la foto en 2 segundos, comprueba que la foto pertenezca al colegio y sugiere automáticamente la categoría (ejemplo: *Tecnología* o *Infraestructura*).
6. **Evitar Reportes Similares o Duplicados:**
   - Si otra persona ya había reportado ese mismo problema, la app te muestra una alerta y te permite presionar el botón **"Apoyar"** (como darle un "Me gusta" o respaldo) en lugar de duplicar el reporte.
7. **Seleccionar Ubicación Estandarizada:**
   - En lugar de escribir a mano (donde la gente comete errores de ortografía), eliges de una lista ordenada tu grado (ejemplo: **6-1**, **11-2**) o el área (ejemplo: **Biblioteca**, **Patio**, **Baños**).
8. **Seguimiento de Estados:**
   - El reporte pasa por colores y etiquetas claras:
     - 🟡 **Pendiente:** Reporte recibido.
     - 🔵 **En revisión:** El Coordinador lo está evaluando.
     - 🟣 **En reparación:** Se asignó al técnico de mantenimiento.
     - 🟢 **Resuelto:** ¡Daño arreglado!
9. **Resolución con Foto Evidencia:**
   - Cuando el técnico termina el trabajo, sube una foto de la reparación terminada. Así todos en el colegio pueden verificar que el problema se solucionó físicamente.

---

## 👥 5. ¿Qué puede hacer cada rol en la aplicación?

EduFix AI cambia su pantalla automáticamente según quién esté navegando:

* **🎓 Estudiante:**
  - Puede tomar fotos y crear reportes.
  - Puede apoyar reportes de compañeros.
  - Puede ver en tiempo real si su reporte ya fue atendido.

* **👨‍🏫 Profesor / Coordinador:**
  - Puede revisar todos los reportes recibidos.
  - Puede aprobar o rechazar reportes no institucionales.
  - **Puede presionar "Asignar a Mantenimiento"** y elegir qué técnico o cuadrilla (ej: *Carlos Ruíz* o *Equipo de Redes*) se encargará del arreglo.

* **🛠️ Personal de Mantenimiento:**
  - Tiene un panel exclusivo donde ve solo los trabajos que le fueron asignados.
  - Puede cambiar el estado a *"En reparación"*.
  - Sube la foto de la evidencia del trabajo realizado y escribe un comentario técnico.

---

## 🤖 6. ¿Qué hace la Inteligencia Artificial (IA)?

*(Explicación muy importante para el jurado)*

La Inteligencia Artificial en EduFix AI actúa como un **asistente virtual** que:
1. **Analiza las fotos:** Verifica que la imagen corresponda a una instalación física real del colegio.
2. **Categoriza automáticamente:** Determina si el problema es de electricidad, plomería, infraestructura o tecnología.
3. **Detecta duplicados:** Ayuda a unir reportes sobre el mismo daño.

> 📢 **Nota para decir al jurado:** *"Actualmente la aplicación utiliza un motor de simulación de IA con tiempos y respuestas preconfiguradas para mostrar la experiencia de usuario, pero la arquitectura técnica ya está 100% lista para conectarse con APIs reales de visión por computadora como OpenAI o Google Gemini."*

---

## 🛠️ 7. Tecnologías explicadas con palabras sencillas

Si el jurado te pregunta por las tecnologías, no te asustes. Utiliza estas analogías sencillas:

* **Next.js:**
  - *¿Qué es?* Es el motor o la estructura principal de la aplicación web.
  - *¿Para qué sirve?* Hace que la página cargue súper rápido y funcione tanto en celulares como en computadores.
* **Supabase Realtime:**
  - *¿Qué es?* Es la tecnología de comunicación instantánea.
  - *¿Para qué sirve?* Funciona igual que WhatsApp: cuando alguien cambia un estado o sube una foto, la pantalla de todos los demás se actualiza inmediatamente sin necesidad de recargar la página.
* **Supabase Storage:**
  - *¿Qué es?* Es el disco duro o bodega en la nube.
  - *¿Para qué sirve?* Guarda todas las fotos de los problemas y las evidencias de reparación de forma segura y comprimida.
* **Google OAuth:**
  - *¿Qué es?* El sistema de inicio de sesión seguro con Google.
  - *¿Para qué sirve?* Permite entrar con el correo institucional sin inventar claves nuevas.
* **Prisma:**
  - *¿Qué es?* El organizador y traductor de la base de datos.
  - *¿Para qué sirve?* Permite guardar los datos de reportes, usuarios e historiales de forma limpia y ordenada.
* **GSAP:**
  - *¿Qué es?* Es una herramienta de animaciones.
  - *¿Para qué sirve?* Hace que los botones, ventanas emergentes y tarjetas se muevan de forma fluida, elegante y profesional.
* **Tailwind:**
  - *¿Qué es?* El diseñador y estilista visual.
  - *¿Para qué sirve?* Define los colores, bordes, sombras y el aspecto visual moderno.

---

## 🎭 8. Guion Recomendado para la Presentación

*(Puedes practicar este guion paso a paso mientras muestras las pantallas)*

### 🎤 Introducción (30 segundos)
> *"Buenos días a todos los miembros del jurado y compañeros. Mi nombre es [Tu Nombre] y hoy tengo el gusto de presentarles **EduFix AI**, la plataforma inteligente de gestión y mantenimiento escolar diseñada para nuestra Institución Educativa Gabriel García Márquez.*
> 
> *¿Alguna vez han visto un tomacorriente dañado o un lavamanos con fuga en el colegio y no sabían a quién avisar? EduFix AI nace para resolver eso, conectando en tiempo real a estudiantes, coordinadores y personal de mantenimiento."*

### 📱 Demostración en Vivo (2 minutos)

1. **Mostrando el Inicio y Login:**
   > *"Como pueden ver en pantalla, entrar a EduFix AI es tan sencillo como presionar un botón e iniciar sesión con nuestro correo institucional de Google."*

2. **Mostrando el Dashboard:**
   > *"Al entrar, llegamos al Dashboard principal. Aquí vemos las estadísticas globales en tiempo real: cuántos reportes están pendientes, cuántos en reparación y cuántos han sido resueltos."*

3. **Simulando la Creación de un Reporte:**
   > *"Imaginemos que soy un estudiante y encuentro un proyector sin señal en mi salón. Presiono el botón de la cámara, tomo la fotografía y nuestra Inteligencia Artificial procesa la imagen en 2 segundos, sugiriéndome la categoría. Luego, en lugar de escribir a mano, elijo mi salón en la lista oficial, por ejemplo 11-1 o Biblioteca, y publico el reporte."*

4. **Mostrando el Rol del Coordinador:**
   > *"Ahora, pasemos al rol de Coordinador. El coordinador abre el reporte recibido y hace clic en 'Asignar a Mantenimiento'. Elige de la lista al técnico responsable, como el señor Carlos Ruíz de electricidad, y confirma la asignación. De inmediato el reporte cambia a estado 'En reparación'."*

5. **Mostrando el Rol de Mantenimiento y Resolución:**
   > *"Finalmente, el técnico entra a su panel exclusivo de tareas, realiza el arreglo físico, toma la fotografía de la solución terminada y guarda la evidencia. Instantáneamente, todos los estudiantes y profesores ven que el problema ha sido resuelto."*

### 🏁 Cierre (20 segundos)
> *"Con EduFix AI logramos un colegio más cuidado, transparente y colaborativo. Muchas gracias por su atención y quedo atenta a sus preguntas."*

---

## ❓ 9. Posibles Preguntas del Jurado y Respuestas Sencillas

* **P1: ¿Por qué decidieron utilizar Inteligencia Artificial?**
  - **R:** *"Utilizamos IA para agilizar el proceso de reporte. En lugar de que el estudiante llene formularios largos, la IA analiza la foto, sugiere la categoría y ayuda a detectar si el problema ya fue reportado por otro compañero, ahorrando tiempo."*

* **P2: ¿Por qué eligieron ingresar con Google OAuth?**
  - **R:** *"Porque garantiza la seguridad e identidad de la comunidad. Todos los estudiantes y profesores ya cuentan con correo Google institucional, evitando que personas ajenas al colegio creen reportes falsos."*

* **P3: ¿Por qué usaron Supabase y no una base de datos tradicional?**
  - **R:** *"Supabase nos ofrece dos ventajas gigantes: **Realtime** para que la información se actualice al instante tipo WhatsApp sin recargar la página, y **Storage** para guardar las imágenes optimizadas en la nube de forma muy rápida."*

* **P4: ¿Cómo evita la aplicación los reportes duplicados?**
  - **R:** *"La aplicación compara la categoría y ubicación. Si detecta un problema similar en la misma zona, le sugiere al estudiante presionar el botón 'Apoyar' en lugar de crear una publicación repetida."*

* **P5: ¿Cómo protegen la privacidad de los estudiantes?**
  - **R:** *"Solo se requiere la autenticación institucional de Google. No se solicitan datos personales sensibles ni ubicaciones GPS fuera del establecimiento; únicamente la ubicación del salón o área física del colegio."*

* **P6: ¿Cómo podría escalar este proyecto en el futuro?**
  - **R:** *"EduFix AI está construido con una arquitectura modular. En el futuro puede adaptarse fácilmente a cualquier colegio o universidad del país, e integrar alertas Push a celulares y reportes estadísticos descargables para secretarías de educación."*

---

## 🌈 10. Conclusión sobre el Impacto en la IE GABO

EduFix AI demuestra cómo la tecnología accesible y bien diseñada puede transformar la cultura de un colegio. Al empoderar a los estudiantes con una herramienta para cuidar su entorno y facilitar el trabajo del personal de mantenimiento, la **IE GABO** se convierte en un referente de innovación, sentido de pertenencia y eficiencia institucional. ¡Mucho éxito en la presentación! 🚀
