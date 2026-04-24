const carritoController = require('../controllers/controller_carrito');
const { verifyToken } = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/api/carritos', verifyToken, carritoController.list);
    app.get('/api/carrito/:id', verifyToken, carritoController.find);
    app.post('/api/carrito', verifyToken, carritoController.create);
    app.delete('/api/carrito/:id', verifyToken, carritoController.delete);
    app.put('/api/carrito/:id', verifyToken, carritoController.update);
};
