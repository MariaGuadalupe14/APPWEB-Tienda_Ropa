const carritoController = require('../controllers/controller_carrito');

module.exports = (app) => {
    app.get('/api/carritos', carritoController.list);
    app.get('/api/carrito/:id', carritoController.find);
    app.post('/api/carrito', carritoController.create);
    app.delete('/api/carrito/:id', carritoController.delete);
    app.put('/api/carrito/:id', carritoController.update);
};
