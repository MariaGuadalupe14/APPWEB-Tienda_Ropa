const pedidoController = require('../controllers/controller_pedido');

module.exports = (app) => {
    app.get('/api/pedidos', pedidoController.list);
    app.get('/api/pedido/:id', pedidoController.find);
    app.post('/api/pedido', pedidoController.create);
    app.delete('/api/pedido/:id', pedidoController.delete);
    app.put('/api/pedido/:id', pedidoController.update);
};
