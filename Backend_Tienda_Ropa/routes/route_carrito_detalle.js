const carritoDetalleController = require('../controllers/controller_carrito_detalle');

module.exports = (app) => {
    app.get('/api/carrito_detalles', carritoDetalleController.list);
    app.get('/api/carrito_detalle/:id', carritoDetalleController.find);
    app.post('/api/carrito_detalle', carritoDetalleController.create);
    app.delete('/api/carrito_detalle/:id', carritoDetalleController.delete);
    app.put('/api/carrito_detalle/:id', carritoDetalleController.update);
};
