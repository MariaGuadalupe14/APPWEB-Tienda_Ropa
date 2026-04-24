const pedidoController = require('../controllers/controller_pedido');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/api/pedidos', verifyToken, pedidoController.list);
    app.get('/api/pedido/:id', verifyToken, pedidoController.find);
    app.post('/api/pedido', verifyToken, pedidoController.create);
    app.delete('/api/pedido/:id', verifyToken, verifyAdmin, pedidoController.delete);
    app.put('/api/pedido/:id', verifyToken, verifyAdmin, pedidoController.update);
};
