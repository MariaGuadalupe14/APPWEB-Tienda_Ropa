const jwt = require('jsonwebtoken');

function getTokenFromHeaders(req) {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.split(' ')[1];
}

function verifyToken(req, res, next) {
  const token = getTokenFromHeaders(req);

  if (!token) {
    return res.status(401).send({
      mensaje: 'Token no proporcionado'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'clave_secreta_login';
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).send({
      mensaje: 'Token invalido'
    });
  }
}

function verifyAdmin(req, res, next) {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).send({
      mensaje: 'Acceso solo para administradores'
    });
  }

  return next();
}

module.exports = {
  verifyToken,
  verifyAdmin
};
