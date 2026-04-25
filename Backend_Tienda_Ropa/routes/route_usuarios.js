const usuarioController = require('../controllers/controller_usuario');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/api/usuarios', usuarioController.list);
    app.get('/api/usuario/:id', usuarioController.find);
    app.post('/api/usuario', usuarioController.create);
    app.post('/api/usuario-admin', verifyToken, verifyAdmin, usuarioController.create);
    app.delete('/api/usuario/:id', verifyToken, verifyAdmin, usuarioController.delete);
    app.put('/api/usuario/:id', verifyToken, verifyAdmin, usuarioController.update);
};
