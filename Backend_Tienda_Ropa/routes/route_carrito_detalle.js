const carritoDetalleController = require('../controllers/controller_carrito_detalle');
const { verifyToken } = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/api/carrito_detalles', verifyToken, carritoDetalleController.list);
    app.get('/api/carrito_detalle/:id', verifyToken, carritoDetalleController.find);
    app.post('/api/carrito_detalle', verifyToken, carritoDetalleController.create);
    app.delete('/api/carrito_detalle/:id', verifyToken, carritoDetalleController.delete);
    app.put('/api/carrito_detalle/:id', verifyToken, carritoDetalleController.update);
};
