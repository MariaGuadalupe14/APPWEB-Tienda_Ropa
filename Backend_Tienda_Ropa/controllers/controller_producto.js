const db = require('../models');
const producto = db.tbb_producto;
const categoria = db.tbc_categoria;

module.exports = {
    async create(req, res) {
        try {
            const nuevoProducto = await producto.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen,
                precio: req.body.precio,
                stock: req.body.stock,
                talla: req.body.talla,
                color: req.body.color,
                genero: req.body.genero,
                activo: typeof req.body.activo === 'boolean' ? req.body.activo : true,
                id_categoria: req.body.id_categoria
            });

            return res.status(201).send(nuevoProducto);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible crear el producto',
                error: error.message
            });
        }
    },
    async list(_, res) {
        try {
            const productos = await producto.findAll({
                include: [{
                    model: categoria,
                    as: 'tbc_categoria'
                }],
                order: [['id', 'ASC']]
            });

            return res.status(200).send(productos);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener los productos',
                error: error.message
            });
        }
    },
    async find(req, res) {
        try {
            const dataProducto = await producto.findByPk(req.params.id, {
                include: [{
                    model: categoria,
                    as: 'tbc_categoria'
                }]
            });

            if (!dataProducto) {
                return res.status(404).send({
                    mensaje: 'Producto no encontrado'
                });
            }

            return res.status(200).send(dataProducto);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener el producto',
                error: error.message
            });
        }
    },
    async update(req, res) {
        try {
            const dataProducto = await producto.findByPk(req.params.id);

            if (!dataProducto) {
                return res.status(404).send({
                    mensaje: 'Producto no encontrado'
                });
            }

            await dataProducto.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen,
                precio: req.body.precio,
                stock: req.body.stock,
                talla: req.body.talla,
                color: req.body.color,
                genero: req.body.genero,
                activo: req.body.activo,
                id_categoria: req.body.id_categoria
            });

            return res.status(200).send({ mensaje: 'Datos actualizados correctamente' });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible actualizar el producto',
                error: error.message
            });
        }
    },
    async delete(req, res) {
        try {
            const eliminados = await producto.destroy({
                where: {
                    id: req.params.id,
                }
            });

            if (!eliminados) {
                return res.status(404).send({
                    mensaje: 'Producto no encontrado'
                });
            }

            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible eliminar el producto',
                error: error.message
            });
        }
    },
};
