const db = require('../models');
const carrito_detalle = db.tbd_carrito_detalle;
const carrito = db.tbb_carrito;
const producto = db.tbb_producto;

module.exports = {
    async create(req, res) {
        try {
            const dataCarrito = await carrito.findByPk(req.body.id_carrito);

            if (!dataCarrito) {
                return res.status(404).send({
                    mensaje: 'Carrito no encontrado'
                });
            }

            if (req.user.rol !== 'admin' && dataCarrito.id_usuario !== req.user.id) {
                return res.status(403).send({
                    mensaje: 'No tienes permiso para editar este carrito'
                });
            }

            const nuevoDetalle = await carrito_detalle.create({
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad,
                subtotal: req.body.subtotal || (Number(req.body.precio_unitario) * Number(req.body.cantidad))
            });

            return res.status(201).send(nuevoDetalle);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible crear el detalle del carrito',
                error: error.message
            });
        }
    },
    async list(req, res) {
        try {
            const detalles = await carrito_detalle.findAll({
                include: [
                    {
                        model: carrito,
                        as: 'tbb_carrito'
                    },
                    {
                        model: producto,
                        as: 'tbb_producto'
                    }
                ],
                order: [['id', 'DESC']]
            });

            const filtrados = req.user.rol === 'admin'
                ? detalles
                : detalles.filter((item) => item.tbb_carrito?.id_usuario === req.user.id);

            return res.status(200).send(filtrados);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener el detalle del carrito',
                error: error.message
            });
        }
    },
    async find(req, res) {
        try {
            const dataDetalle = await carrito_detalle.findByPk(req.params.id, {
                include: [
                    {
                        model: carrito,
                        as: 'tbb_carrito'
                    },
                    {
                        model: producto,
                        as: 'tbb_producto'
                    }
                ]
            });

            if (!dataDetalle) {
                return res.status(404).send({
                    mensaje: 'Detalle no encontrado'
                });
            }

            if (req.user.rol !== 'admin' && dataDetalle.tbb_carrito?.id_usuario !== req.user.id) {
                return res.status(403).send({
                    mensaje: 'No tienes permiso para ver este detalle'
                });
            }

            return res.status(200).send(dataDetalle);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener el detalle',
                error: error.message
            });
        }
    },
    async update(req, res) {
        try {
            const dataDetalle = await carrito_detalle.findByPk(req.params.id, {
                include: [{
                    model: carrito,
                    as: 'tbb_carrito'
                }]
            });

            if (!dataDetalle) {
                return res.status(404).send({
                    mensaje: 'Detalle no encontrado'
                });
            }

            if (req.user.rol !== 'admin' && dataDetalle.tbb_carrito?.id_usuario !== req.user.id) {
                return res.status(403).send({
                    mensaje: 'No tienes permiso para editar este detalle'
                });
            }

            await dataDetalle.update({
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad,
                subtotal: req.body.subtotal || (Number(req.body.precio_unitario) * Number(req.body.cantidad))
            });

            return res.status(200).send({ mensaje: 'Datos actualizados correctamente' });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible actualizar el detalle',
                error: error.message
            });
        }
    },
    async delete(req, res) {
        try {
            const dataDetalle = await carrito_detalle.findByPk(req.params.id, {
                include: [{
                    model: carrito,
                    as: 'tbb_carrito'
                }]
            });

            if (!dataDetalle) {
                return res.status(404).send({
                    mensaje: 'Detalle no encontrado'
                });
            }

            if (req.user.rol !== 'admin' && dataDetalle.tbb_carrito?.id_usuario !== req.user.id) {
                return res.status(403).send({
                    mensaje: 'No tienes permiso para eliminar este detalle'
                });
            }

            await dataDetalle.destroy();

            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible eliminar el detalle',
                error: error.message
            });
        }
    },
};
