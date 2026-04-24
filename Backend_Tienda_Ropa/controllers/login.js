const db = require('../models');
const jwt = require('jsonwebtoken');

const usuario = db.tbc_usuario;

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send({
          mensaje: 'Debes enviar email y password'
        });
      }

      const user = await usuario.findOne({
        where: { email }
      });

      if (!user) {
        return res.status(404).send({
          mensaje: 'Usuario no encontrado'
        });
      }

      if (!user.activo) {
        return res.status(403).send({
          mensaje: 'Usuario inactivo'
        });
      }

      if (user.password !== password) {
        return res.status(401).send({
          mensaje: 'Password incorrecto'
        });
      }

      const secret = process.env.JWT_SECRET || 'clave_secreta_login';

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          rol: user.rol
        },
        secret,
        { expiresIn: '1h' }
      );

      return res.status(200).send({
        mensaje: 'Login correcto',
        token,
        usuario: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
          direccion: user.direccion,
          telefono: user.telefono
        }
      });
    } catch (error) {
      return res.status(500).send({
        mensaje: 'Error al iniciar sesion',
        error: error.message
      });
    }
  }
};
