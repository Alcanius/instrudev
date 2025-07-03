const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();

// Directorio para almacenar las capturas
const uploadDir = path.join(__dirname, 'validar_pagos');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Servir archivos estáticos de la carpeta onepage
app.use(express.static(path.join(__dirname, 'onepage')));

// Ruta de subida de capturas
app.post('/upload', upload.single('comprobante'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se cargó ningún archivo');
  }
  res.send('<p>Captura recibida. Gracias.</p><a href="/onepage/index.html">Volver al inicio</a>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
