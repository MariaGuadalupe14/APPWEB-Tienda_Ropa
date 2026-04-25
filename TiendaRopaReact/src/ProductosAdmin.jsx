import { useEffect, useState } from "react";
import api from "./services/api";
import "./PanelAdmin.css";

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

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

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
        setMensaje("Producto actualizado correctamente");
      } else {
        await api.post("/producto", payload);
        setMensaje("Producto registrado correctamente");
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

  const eliminarProducto = async (id) => {
    try {
      await api.delete(`/producto/${id}`);
      setMensaje("Producto eliminado correctamente");
      cargarDatos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <section className="panelAdmin">
      <div className="panelHeader">
        <div>
          <h2>Gestion de productos</h2>
          <p>Captura tu catalogo y dejalo listo para mostrarse en la tienda.</p>
        </div>
        <span className="panelBadge">{productos.length} productos</span>
      </div>

      <div className="crudGrid">
        <article className="crudCard">
          <h3>{productoEditando ? "Editar producto" : "Nuevo producto"}</h3>
          <form className="crudForm" onSubmit={handleSubmit}>
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
            <label>
              Precio
              <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} required />
            </label>
            <label>
              Stock
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </label>
            <label>
              Categoria
              <select name="id_categoria" value={formData.id_categoria} onChange={handleChange} required>
                <option value="">Selecciona una categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Talla
              <input name="talla" value={formData.talla} onChange={handleChange} />
            </label>
            <label>
              Color
              <input name="color" value={formData.color} onChange={handleChange} />
            </label>
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
            {mensaje && <p className="mensajePanel">{mensaje}</p>}
            <div className="crudActions">
              <button type="submit">{productoEditando ? "Actualizar" : "Guardar"}</button>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setProductoEditando(null);
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
                  <th>Producto</th>
                  <th>Categoria</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.tbc_categoria?.nombre || "Sin categoria"}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <span className="estadoChip">
                        {producto.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="tablaAcciones">
                      <button type="button" onClick={() => editarProducto(producto)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => eliminarProducto(producto.id)}
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

export default ProductosAdmin;
