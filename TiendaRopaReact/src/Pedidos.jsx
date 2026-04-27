import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import api from "./services/api";
import "./PanelAdmin.css";

const INITIAL_FORM = {
  id_usuario: "",
  id_carrito: "",
  total: "",
  estado: "pendiente",
  metodo_pago: "",
  direccion_envio: "",
};

function Pedidos({ cambiarVista }) {
  const { isAdmin, usuario } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [carritos, setCarritos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [pedidoEditando, setPedidoEditando] = useState(null);

  const cargarDatos = async () => {
    try {
      const pedidosData = await api.get("/pedidos");
      setPedidos(pedidosData);

      if (isAdmin) {
        const [usuariosData, carritosData] = await Promise.all([
          api.get("/usuarios"),
          api.get("/carritos"),
        ]);
        setUsuarios(usuariosData);
        setCarritos(carritosData);
      }
    } catch (error) {
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [isAdmin]);

  const pedidosVisibles = isAdmin
    ? pedidos
    : pedidos.filter((item) => Number(item.id_usuario) === Number(usuario?.id));
  const pedidosEntregados = pedidosVisibles.filter((item) => item.estado === "entregado").length;
  const pedidosPendientes = pedidosVisibles.filter((item) => item.estado === "pendiente").length;
  const totalPedidos = pedidosVisibles.reduce((acumulado, item) => acumulado + Number(item.total || 0), 0);

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const guardarPedido = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        id_usuario: Number(formData.id_usuario),
        id_carrito: Number(formData.id_carrito),
        total: Number(formData.total),
        estado: formData.estado,
        metodo_pago: formData.metodo_pago,
        direccion_envio: formData.direccion_envio,
      };

      if (pedidoEditando) {
        await api.put(`/pedido/${pedidoEditando.id}`, payload);
        setMensaje("Pedido actualizado correctamente");
      } else {
        await api.post("/pedido", payload);
        setMensaje("Pedido creado correctamente");
      }

      setPedidoEditando(null);
      setFormData(INITIAL_FORM);
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const editarPedido = (pedido) => {
    setPedidoEditando(pedido);
    setFormData({
      id_usuario: String(pedido.id_usuario || ""),
      id_carrito: String(pedido.id_carrito || ""),
      total: String(pedido.total || ""),
      estado: pedido.estado || "pendiente",
      metodo_pago: pedido.metodo_pago || "",
      direccion_envio: pedido.direccion_envio || "",
    });
  };

  const eliminarPedido = async (id) => {
    try {
      await api.delete(`/pedido/${id}`);
      setMensaje("Pedido eliminado correctamente");
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <section className="panelAdmin">
      <div className="panelHeader">
        <div>
          <h2>{isAdmin ? "Gestion de pedidos" : "Mis pedidos"}</h2>
          <p>
            {isAdmin
              ? "Consulta, registra y modifica pedidos."
              : "Aqui se muestran las compras que ya fueron generadas desde tu carrito."}
          </p>
          {!isAdmin && (
            <button
              type="button"
              className="panelBackButton"
              onClick={() => cambiarVista("Productos")}
            >
              Regresar a productos
            </button>
          )}
        </div>
        <span className="panelBadge">{pedidosVisibles.length} pedidos</span>
      </div>

      {!isAdmin && (
        <section className="panelResumenGrid">
          <article className="panelResumenCard">
            <span className="panelResumenLabel">Pedidos registrados</span>
            <strong>{pedidosVisibles.length}</strong>
            <p>Aqui puedes consultar todas las compras que ya fueron generadas desde tu carrito.</p>
          </article>
          <article className="panelResumenCard">
            <span className="panelResumenLabel">Pendientes</span>
            <strong>{pedidosPendientes}</strong>
            <p>Tus compras en proceso apareceran aqui mientras avanzan de estado.</p>
          </article>
          <article className="panelResumenCard dark">
            <span className="panelResumenLabel">Total acumulado</span>
            <strong>${totalPedidos} MXN</strong>
            <p>{pedidosEntregados} pedido{pedidosEntregados === 1 ? "" : "s"} entregado{pedidosEntregados === 1 ? "" : "s"} hasta ahora.</p>
          </article>
        </section>
      )}

      {mensaje && <p className="mensajePanel">{mensaje}</p>}
      {!isAdmin && (
        <p className="mensajePanel">
          Esta seccion guarda tus pedidos confirmados. Si un producto aun no aparece aqui, primero debes revisarlo en "Mi carrito" y generar el pedido.
        </p>
      )}

      {isAdmin && (
        <article className="crudCard">
          <h3>{pedidoEditando ? "Editar pedido" : "Nuevo pedido"}</h3>
          <form className="crudForm" onSubmit={guardarPedido}>
            <label>
              Usuario
              <select name="id_usuario" value={formData.id_usuario} onChange={handleChange} required>
                <option value="">Selecciona un usuario</option>
                {usuarios.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Carrito
              <select name="id_carrito" value={formData.id_carrito} onChange={handleChange} required>
                <option value="">Selecciona un carrito</option>
                {carritos.map((item) => (
                  <option key={item.id} value={item.id}>
                    Carrito #{item.id}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Total
              <input type="number" step="0.01" name="total" value={formData.total} onChange={handleChange} required />
            </label>
            <label>
              Estado
              <select name="estado" value={formData.estado} onChange={handleChange}>
                <option value="pendiente">Pendiente</option>
                <option value="pagado">Pagado</option>
                <option value="enviado">Enviado</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </label>
            <label>
              Metodo de pago
              <input name="metodo_pago" value={formData.metodo_pago} onChange={handleChange} required />
            </label>
            <label>
              Direccion de envio
              <input name="direccion_envio" value={formData.direccion_envio} onChange={handleChange} required />
            </label>
            <div className="crudActions">
              <button type="submit">{pedidoEditando ? "Actualizar" : "Guardar"}</button>
              <button type="button" className="secondary" onClick={() => {
                setPedidoEditando(null);
                setFormData(INITIAL_FORM);
              }}>
                Limpiar
              </button>
            </div>
          </form>
        </article>
      )}

      <article className="listadoCard">
        <div className="listadoCardHeader">
          <div>
            <span className="listadoCardEyebrow">{isAdmin ? "Control de pedidos" : "Historial de compra"}</span>
            <h3>{isAdmin ? "Pedidos registrados" : "Listado de pedidos"}</h3>
          </div>
        </div>
        <div className="tablaResponsive">
          <table className="tablaCrud">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Metodo</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Direccion</th>
                {isAdmin && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {pedidosVisibles.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.tbc_usuario?.nombre || pedido.id_usuario}</td>
                  <td>{pedido.metodo_pago}</td>
                  <td>${pedido.total}</td>
                  <td><span className="estadoChip">{pedido.estado}</span></td>
                  <td>{pedido.direccion_envio}</td>
                  {isAdmin && (
                    <td className="tablaAcciones">
                      <button type="button" onClick={() => editarPedido(pedido)}>Editar</button>
                      <button type="button" className="secondary" onClick={() => eliminarPedido(pedido.id)}>
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}

Pedidos.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
};

export default Pedidos;
