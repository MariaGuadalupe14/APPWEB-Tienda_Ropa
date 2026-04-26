const categoriaController = require('../controllers/controller_categoria');

module.exports = (app) => {
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categoria/:nombre', categoriaController.find);
    app.post('/api/categoria', categoriaController.create);
    app.delete('/api/categoria/:id', categoriaController.delete);
    app.put('/api/categoria/:id', categoriaController.update);
};
