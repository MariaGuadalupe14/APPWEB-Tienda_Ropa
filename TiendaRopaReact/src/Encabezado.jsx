import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import miLogo from "./assets/logo.png";
import facebookImg from "./assets/redes/facebook.png";
import instagramImg from "./assets/redes/instagram.png";
import tiktokImg from "./assets/redes/tik-tok.png";
import whatsappImg from "./assets/redes/whatsapp.png";
import { useAuth } from "./AuthContext";
import "./Encabezado.css";

const MENU_PUBLICO = ["Inicio", "AcercaDe", "Productos", "Contacto", "Sucursales"];
const MENU_CLIENTE = ["Carritos", "Pedidos"];
const MENU_ADMIN = ["Usuarios", "CategoriasAdmin", "ProductosAdmin", "Carritos", "Pedidos"];
const CATEGORIAS = ["Todas", "Mujer", "Hombre", "Ninos", "Accesorios"];

function Encabezado({ cambiarVista, vistaActual, cambiarCategoria }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { isLoggedIn, isAdmin, usuario, logout } = useAuth();

  const menuPrincipal = useMemo(() => {
    const items = [...MENU_PUBLICO];
    if (isAdmin) {
      items.push(...MENU_ADMIN);
    } else if (isLoggedIn) {
      items.push(...MENU_CLIENTE);
    }
    return items;
  }, [isAdmin, isLoggedIn]);

  const seleccionarCategoria = (categoria) => {
    cambiarCategoria(categoria);
    cambiarVista("Productos");
    setMenuAbierto(false);
  };

  const abrirInicio = () => cambiarVista("Inicio");

  const manejarVista = (item) => {
    if (item === "Productos") {
      cambiarCategoria("Todas");
    }
    cambiarVista(item);
  };

  const cerrarSesion = () => {
    logout();
    cambiarVista("Inicio");
  };

  return (
    <header className="encabezado">
      <div className="logoDiv" onClick={abrirInicio} onKeyDown={abrirInicio} role="button" tabIndex={0}>
        <img src={miLogo} alt="Logo tienda" className="logoImagen" />
        <div className="logoTexto">
          <strong>MSJ</strong>
          <span>Catalogo, ventas y administracion</span>
        </div>
      </div>

      <nav className="menuDiv" aria-label="Menu principal">
        <ul>
          {menuPrincipal.map((item) => (
            <li key={item}>
              <button
                type="button"
                className={vistaActual === item ? "activo" : ""}
                onClick={() => manejarVista(item)}
              >
                {item === "AcercaDe"
                  ? "Acerca de"
                  : item === "CategoriasAdmin"
                    ? "Categorias"
                    : item === "ProductosAdmin"
                      ? "Registrar productos"
                      : item}
              </button>
            </li>
          ))}

          <li className="categoriaMenu">
            <button
              type="button"
              className={vistaActual === "Productos" ? "activo" : ""}
              onClick={() => setMenuAbierto((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={menuAbierto}
            >
              Categorias
            </button>

            {menuAbierto && (
              <ul className="submenuCategorias" aria-label="Categorias">
                {CATEGORIAS.map((categoria) => (
                  <li key={categoria}>
                    <button type="button" onClick={() => seleccionarCategoria(categoria)}>
                      {categoria}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="redesDiv">
        <div className="authStatus">
          {isLoggedIn ? (
            <>
              <span>{usuario?.nombre}</span>
              <small>{isAdmin ? "Administrador" : "Cliente"}</small>
              <button type="button" onClick={cerrarSesion}>
                Salir
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => cambiarVista("Login")}>
                Iniciar sesion
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => cambiarVista("RegistrarUsuarios")}
              >
                Registrarme
              </button>
            </>
          )}
        </div>

        <div className="socialLinks">
          <a href="#" aria-label="Facebook">
            <img src={facebookImg} alt="Facebook" />
          </a>
          <a href="#" aria-label="Instagram">
            <img src={instagramImg} alt="Instagram" />
          </a>
          <a href="#" aria-label="TikTok">
            <img src={tiktokImg} alt="TikTok" />
          </a>
          <a href="#" aria-label="WhatsApp">
            <img src={whatsappImg} alt="WhatsApp" />
          </a>
        </div>
      </div>
    </header>
  );
}

Encabezado.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
  vistaActual: PropTypes.string.isRequired,
  cambiarCategoria: PropTypes.func.isRequired,
};

export default Encabezado;
