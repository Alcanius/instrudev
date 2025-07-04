# instrudev

Este repositorio contiene ejemplos y recursos para ejercicios de desarrollo.

## onepage

Carpeta `onepage` con un sitio one-page de ejemplo. La página principal ahora muestra un portafolio personal con navegación a secciones como Home, About, Resume, Services, Skills, **Cursos**, **Portafolio**, My Blog y Contact. Se usa Tailwind CSS y JavaScript para animaciones y desplazamiento suave. La sección de cursos presenta tarjetas con un botón de compra que redirige a `pago.html`, mientras que el portafolio cuenta con filtros por categoría y efecto hover.
La sección de habilidades incluye barras de progreso animadas que se llenan cuando aparecen en pantalla. Además, el bloque **About** muestra una imagen de perfil, datos personales y un botón para descargar el CV con un watermark decorativo de fondo. Al pulsar dicho botón se despliega un visor de PDF en la misma página.

Cada tarjeta de curso incluye un botón **Inscribirse** que abre un modal para registrar nombre completo, teléfono, correo, género y edad. El nombre del curso seleccionado aparece en la parte superior del formulario.

La página incorpora además un botón flotante de WhatsApp en la esquina inferior derecha para contacto rápido.

También se añadió un servidor Express (`server.js`) que recibe capturas de pantalla de pagos y las guarda en la carpeta `validar_pagos`. Para ejecutarlo es necesario instalar las dependencias y luego iniciar el servidor:

```bash
npm install
npm start
```

Edita `pago.html` y `script.js` para colocar tus números reales de cuenta en el objeto `cuentas`.
