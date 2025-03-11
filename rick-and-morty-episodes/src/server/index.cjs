const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'rick_and_morty_app'
});

// Conectar a MySQL
connection.connect(error => {
  if (error) {
    console.error('Error conectando a MySQL:', error);
    return;
  }
  console.log('Conectado exitosamente a MySQL');
});

// Ruta de prueba
app.get('/test', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

// Ruta de registro
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Generar hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    connection.query(query, [username, email, hashedPassword], (error, results) => {
      if (error) {
        console.error('Error en registro:', error);
        return res.status(500).json({ error: 'Error en el registro' });
      }
      res.json({ 
        success: true, 
        message: 'Usuario registrado exitosamente',
        userId: results.insertId 
      });
    });
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
    res.status(500).json({ error: 'Error en el registro' });
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE email = ?';
  
  connection.query(query, [email], async (error, results) => {
    if (error) {
      console.error('Error en login:', error);
      return res.status(500).json({ error: 'Error en el login' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];
    
    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({ 
      success: true, 
      message: 'Login exitoso',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});