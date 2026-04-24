const productoController = require('../controllers/controller_producto');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/api/productos', productoController.list);
    app.get('/api/producto/:id', productoController.find);
    app.post('/api/producto', verifyToken, verifyAdmin, productoController.create);
    app.delete('/api/producto/:id', verifyToken, verifyAdmin, productoController.delete);
    app.put('/api/producto/:id', verifyToken, verifyAdmin, productoController.update);
};
