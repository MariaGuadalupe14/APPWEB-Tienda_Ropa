import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import api from "./services/api";
import "./Productos.css";

function Productos({ categoria }) {
  const { isLoggedIn, isAdmin, usuario, carritoActivo, guardarCarritoActivo } = useAuth();
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    api
      .get("/productos")
      .then(setProductos)
      .catch((error) => setMensaje(error.message));
  }, []);

  const productosFiltrados =
    categoria === "Todas"
      ? productos
      : productos.filter((producto) => {
          const genero = producto.genero || producto.tbc_categoria?.nombre || "Todas";
          return genero === categoria || producto.tbc_categoria?.nombre === categoria;
        });

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

      if (!carrito || carrito.estado !== "pendiente") {
        const carritos = await api.get("/carritos");
        carrito = carritos.find((item) => item.estado === "pendiente");
      }

      if (!carrito) {
        carrito = await api.post("/carrito", {
          total: Number(producto.precio),
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
        total: nuevoTotal,
        estado: "pendiente",
      });

      guardarCarritoActivo({ ...carrito, total: nuevoTotal, estado: "pendiente" });
      setMensaje(`${producto.nombre} se agrego al carrito de ${usuario?.nombre}.`);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <section className="productos">
      <h2>Nuestros Productos</h2>
      <p className="filtroTexto">Categoria: {categoria}</p>
      {mensaje && <p className="productosMensaje">{mensaje}</p>}

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
            <button type="button" onClick={() => agregarAlCarrito(producto)}>
              Agregar al carrito
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

Productos.propTypes = {
  categoria: PropTypes.string,
};

Productos.defaultProps = {
  categoria: "Todas",
};

export default Productos;
