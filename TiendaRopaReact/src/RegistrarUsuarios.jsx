import { useState } from "react";
import PropTypes from "prop-types";
import api from "./services/api";
import "./Login.css";

const INITIAL_FORM = {
  nombre: "",
  direccion: "",
  telefono: "",
  email: "",
  password: "",
  rol: "cliente",
};

function RegistrarUsuarios({ cambiarVista }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCargando(true);
    setMensaje("");

    try {
      await api.post("/usuario", formData);
      setMensaje("Cuenta creada correctamente. Ahora puedes iniciar sesion.");
      setFormData(INITIAL_FORM);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="authPage">
      <div className="authCard wide">
        <p className="authEyebrow">Nuevo usuario</p>
        <h2>Crear cuenta</h2>
        <form className="authForm twoColumns" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input name="nombre" value={formData.nombre} onChange={handleChange} required />
          </label>
          <label>
            Telefono
            <input name="telefono" value={formData.telefono} onChange={handleChange} required />
          </label>
          <label className="fullWidth">
            Direccion
            <input name="direccion" value={formData.direccion} onChange={handleChange} required />
          </label>
          <label>
            Correo electronico
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
          <label className="fullWidth">
            Rol
            <select name="rol" value={formData.rol} onChange={handleChange}>
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {mensaje && <p className="authMessage fullWidth">{mensaje}</p>}

          <div className="authActions fullWidth">
            <button type="submit" disabled={cargando}>
              {cargando ? "Guardando..." : "Registrar"}
            </button>
            <button type="button" className="secondary" onClick={() => cambiarVista("Login")}>
              Ir a login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

RegistrarUsuarios.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
};

export default RegistrarUsuarios;
