const { pool } = require('../config/db');
const bcrypt = require('bcrypt');

// Función para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  try {
    // Obtener datos del cuerpo de la petición
    const { username, email, password } = req.body;
    
    // Validar datos
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Por favor, proporciona nombre de usuario, email y contraseña' 
      });
    }
    
    // Verificar si el usuario ya existe
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?', 
      [username, email]
    );
    
    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'El nombre de usuario o email ya está en uso' 
      });
    }
    
    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insertar el nuevo usuario en la base de datos
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    
    // Responder con éxito
    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      userId: result.insertId
    });
    
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al registrar usuario' 
    });
  }
};

// Función para obtener todos los usuarios (solo para pruebas)
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, username, email, created_at FROM users'
    );
    
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
    
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener usuarios' 
    });
  }
};