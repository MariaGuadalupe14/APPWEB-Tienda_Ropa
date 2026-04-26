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
      <div className="authShell">
        <aside className="authIntro">
          <span className="authPill">Acceso a la tienda</span>
          <p className="authEyebrow">Bienvenida de nuevo</p>
          <h2>Iniciar sesion</h2>
          <p className="authText">
            Ingresa con tu cuenta para administrar productos o continuar con tus compras.
          </p>

          <div className="authHighlights">
            <article>
              <strong>Compra mas rapido</strong>
              <span>Revisa tu carrito y tus pedidos desde un solo lugar.</span>
            </article>
            <article>
              <strong>Experiencia clara</strong>
              <span>Accede a tu cuenta y continua donde te quedaste.</span>
            </article>
          </div>
        </aside>

        <div className="authCard">
          <div className="authCardHeader">
            <span className="authMiniTag">Tu cuenta</span>
            <h3>Accede para seguir comprando</h3>
          </div>

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
      </div>
    </section>
  );
}

Login.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
};

export default Login;
