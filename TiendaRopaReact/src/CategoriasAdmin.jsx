import { useEffect, useState } from "react";
import api from "./services/api";
import "./PanelAdmin.css";

const INITIAL_FORM = { nombre: "", descripcion: "" };

function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarCategorias = async () => {
    try {
      const data = await api.get("/categorias");
      setCategorias(data);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (categoriaEditando) {
        await api.put(`/categoria/${categoriaEditando.id}`, formData);
        setMensaje("Categoria actualizada correctamente");
      } else {
        await api.post("/categoria", formData);
        setMensaje("Categoria registrada correctamente");
      }
      setFormData(INITIAL_FORM);
      setCategoriaEditando(null);
      cargarCategorias();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const editarCategoria = (categoria) => {
    setCategoriaEditando(categoria);
    setFormData({
      nombre: categoria.nombre || "",
      descripcion: categoria.descripcion || "",
    });
  };

  const eliminarCategoria = async (id) => {
    try {
      await api.delete(`/categoria/${id}`);
      setMensaje("Categoria eliminada correctamente");
      if (categoriaEditando?.id === id) {
        setCategoriaEditando(null);
        setFormData(INITIAL_FORM);
      }
      cargarCategorias();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <section className="panelAdmin">
      <div className="panelHeader">
        <div>
          <h2>Gestion de categorias</h2>
          <p>Registra y organiza las categorias que usara tu catalogo.</p>
        </div>
        <span className="panelBadge">{categorias.length} categorias</span>
      </div>

      <div className="crudGrid">
        <article className="crudCard">
          <h3>{categoriaEditando ? "Editar categoria" : "Nueva categoria"}</h3>
          <form className="crudForm" onSubmit={handleSubmit}>
            <label>
              Nombre
              <input name="nombre" value={formData.nombre} onChange={handleChange} required />
            </label>
            <label>
              Descripcion
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </label>
            {mensaje && <p className="mensajePanel">{mensaje}</p>}
            <div className="crudActions">
              <button type="submit">{categoriaEditando ? "Actualizar" : "Guardar"}</button>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setCategoriaEditando(null);
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
                  <th>Descripcion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion || "Sin descripcion"}</td>
                    <td className="tablaAcciones">
                      <button type="button" onClick={() => editarCategoria(categoria)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => eliminarCategoria(categoria.id)}
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

export default CategoriasAdmin;
