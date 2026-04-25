import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import api from "./services/api";
import "./Productos.css";

const INITIAL_FORM = {
  nombre: "",
  descripcion: "",
  imagen: "",
  precio: "",
  stock: "",
  talla: "",
  color: "",
  genero: "",
  activo: "true",
  id_categoria: "",
};

function Productos({ categoria, cambiarVista }) {
  const { isLoggedIn, isAdmin, usuario, carritoActivo, guardarCarritoActivo } = useAuth();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [productoEditando, setProductoEditando] = useState(null);

  const cargarDatos = async () => {
    try {
      const [productosData, categoriasData] = await Promise.all([
        api.get("/productos"),
        api.get("/categorias"),
      ]);
      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const productosFiltrados =
    categoria === "Todas"
      ? productos
      : productos.filter((producto) => {
          const genero = producto.genero || producto.tbc_categoria?.nombre || "Todas";
          return genero === categoria || producto.tbc_categoria?.nombre === categoria;
        });

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      id_categoria: Number(formData.id_categoria),
      activo: formData.activo === "true",
    };

    try {
      if (productoEditando) {
        await api.put(`/producto/${productoEditando.id}`, payload);
        setMensaje("Producto actualizado correctamente.");
      } else {
        await api.post("/producto", payload);
        setMensaje("Producto registrado correctamente.");
      }

      setProductoEditando(null);
      setFormData(INITIAL_FORM);
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto);
    setFormData({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      imagen: producto.imagen || "",
      precio: producto.precio || "",
      stock: producto.stock || "",
      talla: producto.talla || "",
      color: producto.color || "",
      genero: producto.genero || "",
      activo: String(Boolean(producto.activo)),
      id_categoria: String(producto.id_categoria || ""),
    });
  };

  const limpiarFormulario = () => {
    setProductoEditando(null);
    setFormData(INITIAL_FORM);
  };

  const eliminarProducto = async (id) => {
    try {
      await api.delete(`/producto/${id}`);
      setMensaje("Producto eliminado correctamente.");
      if (productoEditando?.id === id) {
        limpiarFormulario();
      }
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const agregarAlCarrito = async (producto) => {
    if (!isLoggedIn) {
      setMensaje("Inicia sesion para agregar productos al carrito.");
      return;
    }

    if (isAdmin) {
      setMensaje("La cuenta de administrador no agrega productos al carrito.");
      return;
    }

    try {
      let carrito = carritoActivo;

      if (
        !carrito ||
        carrito.estado !== "pendiente" ||
        Number(carrito.id_usuario) !== Number(usuario?.id)
      ) {
        const carritos = await api.get("/carritos");
        carrito = carritos.find(
          (item) =>
            item.estado === "pendiente" &&
            Number(item.id_usuario) === Number(usuario?.id)
        );
      }

      if (!carrito) {
        carrito = await api.post("/carrito", {
          id_usuario: usuario?.id,
          total: 0,
          estado: "pendiente",
        });
      }

      await api.post("/carrito_detalle", {
        id_carrito: carrito.id,
        id_producto: producto.id,
        precio_unitario: Number(producto.precio),
        cantidad: 1,
        subtotal: Number(producto.precio),
      });

      const nuevoTotal = Number(carrito.total || 0) + Number(producto.precio);
      await api.put(`/carrito/${carrito.id}`, {
        id_usuario: usuario?.id,
        total: nuevoTotal,
        estado: "pendiente",
      });

      guardarCarritoActivo({
        ...carrito,
        id_usuario: usuario?.id,
        total: nuevoTotal,
        estado: "pendiente",
      });
      setMensaje(`${producto.nombre} se agrego a tu carrito. Puedes revisarlo en "Mi carrito".`);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <section className="productos">
      <div className="productosHero">
        <div>
          <p className="productosEyebrow">{isAdmin ? "Panel de catalogo" : "Tienda en linea"}</p>
          <h2>{isAdmin ? "Productos y registro" : "Nuestros Productos"}</h2>
          <p className="filtroTexto">Categoria: {categoria}</p>
          {!isAdmin && (
            <p className="productosAyuda">
              Agrega productos aqui y despues entra a <strong>Mi carrito</strong> para revisar tu compra o generar tu pedido.
            </p>
          )}
        </div>
        {isAdmin && <span className="productosBadge">{productos.length} productos</span>}
      </div>
      {mensaje && <p className="productosMensaje">{mensaje}</p>}
      {!isAdmin && isLoggedIn && (
        <div className="productosQuickActions">
          <button type="button" onClick={() => cambiarVista("Carritos")}>
            Ver mi carrito
          </button>
          <button type="button" className="secondary" onClick={() => cambiarVista("Pedidos")}>
            Ver mis pedidos
          </button>
        </div>
      )}

      <div className={isAdmin ? "productosLayout admin" : "productosLayout"}>
        {isAdmin && (
          <aside className="productosCrud">
            <div className="crudGlass">
              <div className="crudTitulo">
                <h3>{productoEditando ? "Editar producto" : "Registrar producto"}</h3>
                <p>Administra tu catalogo sin salir de la vista principal.</p>
              </div>

              <form className="productosForm" onSubmit={handleSubmit}>
                <label>
                  Nombre
                  <input name="nombre" value={formData.nombre} onChange={handleChange} required />
                </label>
                <label>
                  Descripcion
                  <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                </label>
                <label>
                  Imagen URL
                  <input name="imagen" value={formData.imagen} onChange={handleChange} />
                </label>
                <div className="productosFormGrid">
                  <label>
                    Precio
                    <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} required />
                  </label>
                  <label>
                    Stock
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                  </label>
                </div>
                <label>
                  Categoria
                  <select name="id_categoria" value={formData.id_categoria} onChange={handleChange} required>
                    <option value="">Selecciona una categoria</option>
                    {categorias.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="productosFormGrid">
                  <label>
                    Talla
                    <input name="talla" value={formData.talla} onChange={handleChange} />
                  </label>
                  <label>
                    Color
                    <input name="color" value={formData.color} onChange={handleChange} />
                  </label>
                </div>
                <div className="productosFormGrid">
                  <label>
                    Genero
                    <select name="genero" value={formData.genero} onChange={handleChange}>
                      <option value="">Selecciona una opcion</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Ninos">Ninos</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </label>
                  <label>
                    Activo
                    <select name="activo" value={formData.activo} onChange={handleChange}>
                      <option value="true">Si</option>
                      <option value="false">No</option>
                    </select>
                  </label>
                </div>

                <div className="productosCrudActions">
                  <button type="submit">{productoEditando ? "Actualizar" : "Guardar"}</button>
                  <button type="button" className="secondary" onClick={limpiarFormulario}>
                    Limpiar
                  </button>
                </div>
              </form>
            </div>
          </aside>
        )}

        <div className="grid-productos">
          {productosFiltrados.map((producto) => (
            <article className="card-producto" key={producto.id}>
              <img
                src={producto.imagen || "https://placehold.co/500x700/e8ded2/1f1f1f?text=Moda"}
                alt={producto.nombre}
                loading="lazy"
              />
              <span className="categoriaProducto">
                {producto.tbc_categoria?.nombre || producto.genero || "Sin categoria"}
              </span>
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <span>${producto.precio} MXN</span>
              {isAdmin ? (
                <div className="adminCardActions">
                  <button type="button" onClick={() => editarProducto(producto)}>
                    Editar
                  </button>
                  <button type="button" className="secondary" onClick={() => eliminarProducto(producto.id)}>
                    Eliminar
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Productos.propTypes = {
  categoria: PropTypes.string,
  cambiarVista: PropTypes.func.isRequired,
};

Productos.defaultProps = {
  categoria: "Todas",
};

export default Productos;
