const db = require('../models');
const usuario = db.tbc_usuario;

function buildUserPayload(body) {
    return {
        nombre: body.nombre,
        direccion: body.direccion,
        telefono: body.telefono,
        email: body.email,
        password: body.password,
        rol: body.rol,
        fecha_registro: body.fecha_registro,
        activo: body.activo
    };
}

function normalizeRole(role) {
    if (typeof role !== 'string') {
        return 'cliente';
    }

    const value = role.trim().toLowerCase();
    return value === 'admin' ? 'admin' : 'cliente';
}

module.exports = {
    async create(req, res) {
        try {
            const existeUsuario = await usuario.findOne({
                where: { email: req.body.email }
            });

            if (existeUsuario) {
                return res.status(409).send({
                    mensaje: 'Ya existe un usuario con ese correo'
                });
            }

            const nuevoUsuario = await usuario.create({
                ...buildUserPayload(req.body),
                rol: normalizeRole(req.body.rol),
                activo: typeof req.body.activo === 'boolean' ? req.body.activo : true,
                fecha_registro: req.body.fecha_registro || new Date()
            });

            return res.status(201).send(nuevoUsuario);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible crear el usuario',
                error: error.message
            });
        }
    },
    async list(_, res) {
        try {
            const usuarios = await usuario.findAll({
                order: [['id', 'ASC']]
            });

            return res.status(200).send(usuarios);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener los usuarios',
                error: error.message
            });
        }
    },
    async find(req, res) {
        try {
            const dataUsuario = await usuario.findByPk(req.params.id);

            if (!dataUsuario) {
                return res.status(404).send({
                    mensaje: 'Usuario no encontrado'
                });
            }

            return res.status(200).send(dataUsuario);
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible obtener el usuario',
                error: error.message
            });
        }
    },
    async update(req, res) {
        try {
            const dataUsuario = await usuario.findByPk(req.params.id);

            if (!dataUsuario) {
                return res.status(404).send({
                    mensaje: 'Usuario no encontrado'
                });
            }

            const payload = buildUserPayload(req.body);
            if (req.user?.rol !== 'admin') {
                delete payload.rol;
            }

            await dataUsuario.update(payload);

            return res.status(200).send({
                mensaje: 'Datos actualizados correctamente'
            });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible actualizar el usuario',
                error: error.message
            });
        }
    },
    async delete(req, res) {
        try {
            const eliminados = await usuario.destroy({
                where: {
                    id: req.params.id,
                }
            });

            if (!eliminados) {
                return res.status(404).send({
                    mensaje: 'Usuario no encontrado'
                });
            }

            return res.status(200).send({
                mensaje: 'Datos eliminados correctamente'
            });
        } catch (error) {
            return res.status(400).send({
                mensaje: 'No fue posible eliminar el usuario',
                error: error.message
            });
        }
    },
};
