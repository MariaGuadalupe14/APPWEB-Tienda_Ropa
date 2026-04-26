import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import api from "./services/api";
import "./Login.css";

function Login({ cambiarVista }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const data = await api.post("/login", formData);
      login(data.token, data.usuario);
      setMensaje("Sesion iniciada correctamente");
      cambiarVista("Inicio");
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="authPage">
      <div className="authCard">
        <p className="authEyebrow">Acceso a la tienda</p>
        <h2>Iniciar sesion</h2>
        <p className="authText">
          Ingresa con tu cuenta para administrar productos o continuar con tus compras.
        </p>

        <form className="authForm" onSubmit={handleSubmit}>
          <label>
            Correo electronico
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          {mensaje && <p className="authMessage">{mensaje}</p>}

          <div className="authActions">
            <button type="submit" disabled={cargando}>
              {cargando ? "Ingresando..." : "Entrar"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => cambiarVista("RegistrarUsuarios")}
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

Login.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
};

export default Login;
