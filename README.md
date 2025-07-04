# instrudev

Este repositorio contiene ejemplos y recursos para ejercicios de desarrollo.

## onepage

Carpeta `onepage` con un sitio one-page de ejemplo. La página principal ahora muestra un portafolio personal con navegación a secciones como Home, About, Resume, Services, Skills, **Cursos**, **Portafolio**, My Blog y Contact. Se usa Tailwind CSS y JavaScript para animaciones y desplazamiento suave. La sección de cursos presenta tarjetas con un botón de compra que redirige a `pago.html`, mientras que el portafolio incluye una barra de filtros que resalta el activo en amarillo y un grid de proyectos con overlay e iconos que abren una galería modal.
La sección de habilidades incluye barras de progreso animadas que se llenan cuando aparecen en pantalla. El bloque **About** incorpora una imagen de perfil y un texto biográfico que resalta instituciones y años relevantes, con tooltips para tecnologías como PHP o React. Al pulsar el botón de descarga se abre el CV en un visor PDF sobre la misma página.

La sección **Services** muestra seis tarjetas con información de los planes de estudio, clases prácticas, mentorías y más. Cada tarjeta se eleva al pasar el cursor y, al hacer clic, despliega un modal con detalles adicionales. Las tarjetas de "Planes de estudio" y "Evaluaciones" incluyen además barras de progreso animadas.

La sección **Cursos** fue mejorada con un diseño en cuadrícula responsiva. Las tarjetas muestran un degradado amarillo al hacer hover, botones con iconos y animación *pulse*, efecto de inclinación 3D y un círculo de popularidad. Al pulsar **Ver más** se abre un modal con información extra y precio, y **Inscribirse** despliega un acordeón con un pequeño formulario.

Cada tarjeta de curso incluye un botón **Inscribirse** que abre un modal para registrar nombre completo, teléfono, correo, género y edad. El nombre del curso seleccionado aparece en la parte superior del formulario.

La página incorpora además un botón flotante de WhatsApp en la esquina inferior derecha para contacto rápido.

También se añadió un servidor Express (`server.js`) que recibe capturas de pantalla de pagos y las guarda en la carpeta `validar_pagos`. Para ejecutarlo es necesario instalar las dependencias y luego iniciar el servidor:

```bash
npm install
npm start
```

Edita `pago.html` y `script.js` para colocar tus números reales de cuenta en el objeto `cuentas`.
