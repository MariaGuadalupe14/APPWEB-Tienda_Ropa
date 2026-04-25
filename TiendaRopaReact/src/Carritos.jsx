import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "./services/api";
import "./PanelAdmin.css";

const INITIAL_CART = {
  id_usuario: "",
  total: "",
  estado: "pendiente",
};

const INITIAL_DETAIL = {
  id_carrito: "",
  id_producto: "",
  precio_unitario: "",
  cantidad: "",
  subtotal: "",
};

function Carritos() {
  const { isAdmin, usuario } = useAuth();
  const [carritos, setCarritos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cartForm, setCartForm] = useState(INITIAL_CART);
  const [detailForm, setDetailForm] = useState(INITIAL_DETAIL);
  const [carritoEditando, setCarritoEditando] = useState(null);
  const [detalleEditando, setDetalleEditando] = useState(null);

  const cargarDatos = async () => {
    try {
      const [carritosData, detallesData, productosData] = await Promise.all([
        api.get("/carritos"),
        api.get("/carrito_detalles"),
        api.get("/productos"),
      ]);

      setCarritos(carritosData);
      setDetalles(detallesData);
      setProductos(productosData);

      if (isAdmin) {
        const usuariosData = await api.get("/usuarios");
        setUsuarios(usuariosData);
      }
    } catch (error) {
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [isAdmin]);

  const handleCartChange = ({ target }) => {
    setCartForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleDetailChange = ({ target }) => {
    setDetailForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const guardarCarrito = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        total: Number(cartForm.total),
        estado: cartForm.estado,
      };

      if (isAdmin) {
        payload.id_usuario = Number(cartForm.id_usuario);
      }

      if (carritoEditando) {
        await api.put(`/carrito/${carritoEditando.id}`, payload);
        setMensaje("Carrito actualizado correctamente");
      } else {
        await api.post("/carrito", payload);
        setMensaje("Carrito creado correctamente");
      }

      setCarritoEditando(null);
      setCartForm(INITIAL_CART);
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const guardarDetalle = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        id_carrito: Number(detailForm.id_carrito),
        id_producto: Number(detailForm.id_producto),
        precio_unitario: Number(detailForm.precio_unitario),
        cantidad: Number(detailForm.cantidad),
        subtotal: Number(
          detailForm.subtotal ||
            Number(detailForm.precio_unitario) * Number(detailForm.cantidad)
        ),
      };

      if (detalleEditando) {
        await api.put(`/carrito_detalle/${detalleEditando.id}`, payload);
        setMensaje("Detalle actualizado correctamente");
      } else {
        await api.post("/carrito_detalle", payload);
        setMensaje("Detalle agregado correctamente");
      }

      setDetalleEditando(null);
      setDetailForm(INITIAL_DETAIL);
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const editarCarrito = (carrito) => {
    setCarritoEditando(carrito);
    setCartForm({
      id_usuario: String(carrito.id_usuario || ""),
      total: String(carrito.total || ""),
      estado: carrito.estado || "pendiente",
    });
  };

  const editarDetalle = (detalle) => {
    setDetalleEditando(detalle);
    setDetailForm({
      id_carrito: String(detalle.id_carrito || ""),
      id_producto: String(detalle.id_producto || ""),
      precio_unitario: String(detalle.precio_unitario || ""),
      cantidad: String(detalle.cantidad || ""),
      subtotal: String(detalle.subtotal || ""),
    });
  };

  const eliminarCarrito = async (id) => {
    try {
      await api.delete(`/carrito/${id}`);
      setMensaje("Carrito eliminado correctamente");
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const eliminarDetalle = async (id) => {
    try {
      await api.delete(`/carrito_detalle/${id}`);
      setMensaje("Detalle eliminado correctamente");
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const generarPedido = async (carrito) => {
    try {
      await api.post("/pedido", {
        id_carrito: carrito.id,
        total: Number(carrito.total),
        estado: "pendiente",
        metodo_pago: "pendiente",
        direccion_envio: usuario?.direccion || "Por definir",
      });

      await api.put(`/carrito/${carrito.id}`, {
        total: Number(carrito.total),
        estado: "pagado",
      });

      setMensaje("Pedido generado correctamente desde el carrito.");
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const titulo = isAdmin ? "Gestion de carritos" : "Mi carrito";
  const descripcion = isAdmin
    ? "Administra carritos y su detalle."
    : "Consulta tus productos agregados y genera tu pedido.";

  return (
    <section className="panelAdmin">
      <div className="panelHeader">
        <div>
          <h2>{titulo}</h2>
          <p>{descripcion}</p>
        </div>
        <span className="panelBadge">{carritos.length} carritos</span>
      </div>

      {mensaje && <p className="mensajePanel">{mensaje}</p>}

      {isAdmin && (
        <div className="crudGrid">
          <article className="crudCard">
            <h3>{carritoEditando ? "Editar carrito" : "Nuevo carrito"}</h3>
            <form className="crudForm" onSubmit={guardarCarrito}>
              <label>
                Usuario
                <select name="id_usuario" value={cartForm.id_usuario} onChange={handleCartChange} required>
                  <option value="">Selecciona un usuario</option>
                  {usuarios.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre} - {item.rol}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Total
                <input type="number" step="0.01" name="total" value={cartForm.total} onChange={handleCartChange} required />
              </label>
              <label>
                Estado
                <select name="estado" value={cartForm.estado} onChange={handleCartChange}>
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </label>
              <div className="crudActions">
                <button type="submit">{carritoEditando ? "Actualizar" : "Guardar"}</button>
                <button type="button" className="secondary" onClick={() => {
                  setCarritoEditando(null);
                  setCartForm(INITIAL_CART);
                }}>
                  Limpiar
                </button>
              </div>
            </form>
          </article>

          <article className="crudCard">
            <h3>{detalleEditando ? "Editar detalle" : "Nuevo detalle"}</h3>
            <form className="crudForm" onSubmit={guardarDetalle}>
              <label>
                Carrito
                <select name="id_carrito" value={detailForm.id_carrito} onChange={handleDetailChange} required>
                  <option value="">Selecciona un carrito</option>
                  {carritos.map((item) => (
                    <option key={item.id} value={item.id}>
                      Carrito #{item.id}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Producto
                <select name="id_producto" value={detailForm.id_producto} onChange={handleDetailChange} required>
                  <option value="">Selecciona un producto</option>
                  {productos.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Precio unitario
                <input type="number" step="0.01" name="precio_unitario" value={detailForm.precio_unitario} onChange={handleDetailChange} required />
              </label>
              <label>
                Cantidad
                <input type="number" name="cantidad" value={detailForm.cantidad} onChange={handleDetailChange} required />
              </label>
              <label>
                Subtotal
                <input type="number" step="0.01" name="subtotal" value={detailForm.subtotal} onChange={handleDetailChange} />
              </label>
              <div className="crudActions">
                <button type="submit">{detalleEditando ? "Actualizar" : "Guardar"}</button>
                <button type="button" className="secondary" onClick={() => {
                  setDetalleEditando(null);
                  setDetailForm(INITIAL_DETAIL);
                }}>
                  Limpiar
                </button>
              </div>
            </form>
          </article>
        </div>
      )}

      <article className="listadoCard">
        <h3>Carritos</h3>
        <div className="tablaResponsive">
          <table className="tablaCrud">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Detalles</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carritos.map((carrito) => (
                <tr key={carrito.id}>
                  <td>{carrito.id}</td>
                  <td>{carrito.tbc_usuario?.nombre || carrito.id_usuario}</td>
                  <td>${carrito.total}</td>
                  <td><span className="estadoChip">{carrito.estado}</span></td>
                  <td>{carrito.detalles?.length || 0} productos</td>
                  <td className="tablaAcciones">
                    {isAdmin ? (
                      <>
                        <button type="button" onClick={() => editarCarrito(carrito)}>Editar</button>
                        <button type="button" className="secondary" onClick={() => eliminarCarrito(carrito.id)}>Eliminar</button>
                      </>
                    ) : carrito.estado === "pendiente" ? (
                      <button type="button" onClick={() => generarPedido(carrito)}>Generar pedido</button>
                    ) : (
                      <span className="estadoChip">Procesado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="listadoCard">
        <h3>Detalle del carrito</h3>
        <div className="tablaResponsive">
          <table className="tablaCrud">
            <thead>
              <tr>
                <th>ID</th>
                <th>Carrito</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle) => (
                <tr key={detalle.id}>
                  <td>{detalle.id}</td>
                  <td>{detalle.id_carrito}</td>
                  <td>{detalle.tbb_producto?.nombre || detalle.id_producto}</td>
                  <td>${detalle.precio_unitario}</td>
                  <td>{detalle.cantidad}</td>
                  <td>${detalle.subtotal}</td>
                  <td className="tablaAcciones">
                    <button type="button" onClick={() => editarDetalle(detalle)}>
                      {isAdmin ? "Editar" : "Modificar"}
                    </button>
                    <button type="button" className="secondary" onClick={() => eliminarDetalle(detalle.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}

export default Carritos;
