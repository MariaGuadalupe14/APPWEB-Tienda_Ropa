const categoriaController = require('../controllers/controller_categoria');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categoria/:nombre', categoriaController.find);
    app.post('/api/categoria', verifyToken, verifyAdmin, categoriaController.create);
    app.delete('/api/categoria/:id', verifyToken, verifyAdmin, categoriaController.delete);
    app.put('/api/categoria/:id', verifyToken, verifyAdmin, categoriaController.update);
};
