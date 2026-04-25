const db = require('../models');

const pedido = db.tbe_pedido;
const carrito = db.tbb_carrito;
const usuario = db.tbc_usuario;

module.exports = {
    async create(req, res) {
        try {
            const dataCarrito = await carrito.findByPk(req.body.id_carrito);

            if (!dataCarrito) {
                return res.status(404).send({
                    mensaje: 'Carrito no encontrado'
                });
            }

            const nuevoPedido = await pedido.create({
                id_usuario: req.body.id_usuario || dataCarrito.id_usuario,
                id_carrito: req.body.id_carrito,
                total: req.body.total ?? dataCarrito.total,
                estado: req.body.estado || 'pendiente',
                metodo_pago: req.body.metodo_pago,
                direccion_envio: req.body.direccion_envio,
                fecha_pedido: req.body.fecha_pedido || new Date()
            });

            return res.status(201).send(nuevoPedido);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible crear el pedido',
                error: error.message
            });
        }
    },
    async list(req, res) {
        try {
            const pedidos = await pedido.findAll({
                include: [
                    {
                        model: usuario,
                        as: 'tbc_usuario'
                    },
                    {
                        model: carrito,
                        as: 'tbb_carrito'
                    }
                ],
                order: [['id', 'DESC']]
            });

            return res.status(200).send(pedidos);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener los pedidos',
                error: error.message
            });
        }
    },
    async find(req, res) {
        try {
            const dataPedido = await pedido.findByPk(req.params.id, {
                include: [
                    {
                        model: usuario,
                        as: 'tbc_usuario'
                    },
                    {
                        model: carrito,
                        as: 'tbb_carrito'
                    }
                ]
            });

            if (!dataPedido) {
                return res.status(404).send({
                    mensaje: 'Pedido no encontrado'
                });
            }

            return res.status(200).send(dataPedido);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener el pedido',
                error: error.message
            });
        }
    },
    async update(req, res) {
        try {
            const dataPedido = await pedido.findByPk(req.params.id);

            if (!dataPedido) {
                return res.status(404).send({
                    mensaje: 'Pedido no encontrado'
                });
            }

            const payload = {
                id_usuario: req.body.id_usuario || dataPedido.id_usuario,
                id_carrito: req.body.id_carrito || dataPedido.id_carrito,
                total: req.body.total,
                estado: req.body.estado,
                metodo_pago: req.body.metodo_pago,
                direccion_envio: req.body.direccion_envio,
                fecha_pedido: req.body.fecha_pedido
            };

            await dataPedido.update(payload);

            return res.status(200).send({
                mensaje: 'Datos actualizados correctamente'
            });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible actualizar el pedido',
                error: error.message
            });
        }
    },
    async delete(req, res) {
        try {
            const dataPedido = await pedido.findByPk(req.params.id);

            if (!dataPedido) {
                return res.status(404).send({
                    mensaje: 'Pedido no encontrado'
                });
            }

            await dataPedido.destroy();

            return res.status(200).send({
                mensaje: 'Datos eliminados correctamente'
            });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible eliminar el pedido',
                error: error.message
            });
        }
    }
};
