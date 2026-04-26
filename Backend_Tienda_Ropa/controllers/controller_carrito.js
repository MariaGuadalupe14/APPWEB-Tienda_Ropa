const db = require('../models');
const carrito = db.tbb_carrito;
const detalle = db.tbd_carrito_detalle;
const usuario = db.tbc_usuario;

module.exports = {
    async create(req, res) {
        try {
            const idUsuario = req.body.id_usuario;

            if (!idUsuario) {
                return res.status(400).send({
                    mensaje: 'Debes enviar id_usuario'
                });
            }

            const nuevoCarrito = await carrito.create({
                id_usuario: idUsuario,
                total: req.body.total || 0,
                estado: req.body.estado || 'pendiente',
                fecha_creacion: req.body.fecha_creacion || new Date()
            });

            return res.status(201).send(nuevoCarrito);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible crear el carrito',
                error: error.message
            });
        }
    },
    async list(req, res) {
        try {
            const carritos = await carrito.findAll({
                include: [
                    {
                        model: usuario,
                        as: 'tbc_usuario'
                    },
                    {
                        model: detalle,
                        as: 'detalles'
                    }
                ],
                order: [['id', 'DESC']]
            });

            return res.status(200).send(carritos);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener los carritos',
                error: error.message
            });
        }
    },
    async find(req, res) {
        try {
            const dataCarrito = await carrito.findByPk(req.params.id, {
                include: [
                    {
                        model: usuario,
                        as: 'tbc_usuario'
                    },
                    {
                        model: detalle,
                        as: 'detalles'
                    }
                ]
            });

            if (!dataCarrito) {
                return res.status(404).send({
                    mensaje: 'Carrito no encontrado'
                });
            }

            return res.status(200).send(dataCarrito);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener el carrito',
                error: error.message
            });
        }
    },
    async update(req, res) {
        try {
            const dataCarrito = await carrito.findByPk(req.params.id);

            if (!dataCarrito) {
                return res.status(404).send({
                    mensaje: 'Carrito no encontrado'
                });
            }

            const payload = {
                id_usuario: req.body.id_usuario || dataCarrito.id_usuario,
                total: req.body.total,
                estado: req.body.estado,
                fecha_creacion: req.body.fecha_creacion
            };

            await dataCarrito.update(payload);

            return res.status(200).send({ mensaje: 'Datos actualizados correctamente' });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible actualizar el carrito',
                error: error.message
            });
        }
    },
    async delete(req, res) {
        try {
            const dataCarrito = await carrito.findByPk(req.params.id);

            if (!dataCarrito) {
                return res.status(404).send({
                    mensaje: 'Carrito no encontrado'
                });
            }

            await dataCarrito.destroy();

            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible eliminar el carrito',
                error: error.message
            });
        }
    },
};
