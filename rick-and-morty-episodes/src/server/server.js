require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Probar conexión a la base de datos
testConnection();

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Rick y Morty funcionando correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});