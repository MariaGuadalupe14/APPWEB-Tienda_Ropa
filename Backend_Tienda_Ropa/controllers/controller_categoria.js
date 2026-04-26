const db = require('../models');
const categoria = db.tbc_categoria;

module.exports = {
    async create(req, res) {
        try {
            const nuevaCategoria = await categoria.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            });

            return res.status(201).send(nuevaCategoria);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible crear la categoria',
                error: error.message
            });
        }
    },
    async list(_, res) {
        try {
            const categorias = await categoria.findAll({
                order: [['nombre', 'ASC']]
            });

            return res.status(200).send(categorias);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener las categorias',
                error: error.message
            });
        }
    },
    async find(req, res) {
        try {
            const dataCategoria = await categoria.findOne({
                where: {
                    nombre: req.params.nombre,
                }
            });

            if (!dataCategoria) {
                return res.status(404).send({
                    mensaje: 'Categoria no encontrada'
                });
            }

            return res.status(200).send(dataCategoria);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener la categoria',
                error: error.message
            });
        }
    },
    async delete(req, res) {
        try {
            const eliminados = await categoria.destroy({
                where: {
                    id: req.params.id,
                }
            });

            if (!eliminados) {
                return res.status(404).send({
                    mensaje: 'Categoria no encontrada'
                });
            }

            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible eliminar la categoria',
                error: error.message
            });
        }
    },
    async update(req, res) {
        try {
            const dataCategoria = await categoria.findByPk(req.params.id);

            if (!dataCategoria) {
                return res.status(404).send({
                    mensaje: 'Categoria no encontrada'
                });
            }

            await dataCategoria.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            });

            return res.status(200).send({ mensaje: 'Datos actualizados correctamente' });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible actualizar la categoria',
                error: error.message
            });
        }
    }
};
