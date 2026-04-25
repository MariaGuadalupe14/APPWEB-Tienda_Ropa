import { useEffect, useState } from "react";
import api from "./services/api";
import "./PanelAdmin.css";

const INITIAL_FORM = {
  nombre: "",
  direccion: "",
  telefono: "",
  email: "",
  password: "",
  rol: "cliente",
  activo: "true",
};

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarUsuarios = async () => {
    try {
      const data = await api.get("/usuarios");
      setUsuarios(data);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...formData,
      activo: formData.activo === "true",
    };

    try {
      if (usuarioEditando) {
        await api.put(`/usuario/${usuarioEditando.id}`, payload);
        setMensaje("Usuario actualizado correctamente");
      } else {
        await api.post("/usuario-admin", payload);
        setMensaje("Usuario creado correctamente");
      }
      setUsuarioEditando(null);
      setFormData(INITIAL_FORM);
      cargarUsuarios();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const editarUsuario = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nombre: usuario.nombre || "",
      direccion: usuario.direccion || "",
      telefono: usuario.telefono || "",
      email: usuario.email || "",
      password: usuario.password || "",
      rol: usuario.rol || "cliente",
      activo: String(Boolean(usuario.activo)),
    });
  };

  const eliminarUsuario = async (id) => {
    try {
      await api.delete(`/usuario/${id}`);
      setMensaje("Usuario eliminado correctamente");
      cargarUsuarios();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <section className="panelAdmin">
      <div className="panelHeader">
        <div>
          <h2>Gestion de usuarios</h2>
          <p>Administra clientes y cuentas administrativas de la tienda.</p>
        </div>
        <span className="panelBadge">{usuarios.length} usuarios</span>
      </div>

      <div className="crudGrid">
        <article className="crudCard">
          <h3>{usuarioEditando ? "Editar usuario" : "Nuevo usuario"}</h3>
          <form className="crudForm" onSubmit={handleSubmit}>
            <label>
              Nombre
              <input name="nombre" value={formData.nombre} onChange={handleChange} required />
            </label>
            <label>
              Direccion
              <input name="direccion" value={formData.direccion} onChange={handleChange} required />
            </label>
            <label>
              Telefono
              <input name="telefono" value={formData.telefono} onChange={handleChange} required />
            </label>
            <label>
              Correo
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Password
              <input type="text" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <label>
              Rol
              <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="cliente">Cliente</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label>
              Activo
              <select name="activo" value={formData.activo} onChange={handleChange}>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </label>
            {mensaje && <p className="mensajePanel">{mensaje}</p>}
            <div className="crudActions">
              <button type="submit">{usuarioEditando ? "Actualizar" : "Guardar"}</button>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setUsuarioEditando(null);
                  setFormData(INITIAL_FORM);
                }}
              >
                Limpiar
              </button>
            </div>
          </form>
        </article>

        <article className="listadoCard">
          <h3>Listado</h3>
          <div className="tablaResponsive">
            <table className="tablaCrud">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <span className="estadoChip">
                        {usuario.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="tablaAcciones">
                      <button type="button" onClick={() => editarUsuario(usuario)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => eliminarUsuario(usuario.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  );
}

export default UsuariosAdmin;
