import PropTypes from "prop-types";
import miLogo from "./assets/logo.png";
import facebookImg from "./assets/redes/facebook.png";
import instagramImg from "./assets/redes/instagram.png";
import tiktokImg from "./assets/redes/tik-tok.png";
import whatsappImg from "./assets/redes/whatsapp.png";
import "./Encabezado.css";

const MENU_ITEMS = [
  "Inicio",
  "AcercaDe",
  "Productos",
  "Contacto",
  "Sucursales",
  "Galeria",
];

function Encabezado({ cambiarVista, vistaActual }) {
  return (
    <header className="encabezado">
      <div className="logoDiv">
        <img src={miLogo} alt="Logo tienda" />
      </div>

      <nav className="menuDiv" aria-label="Menu principal">
        <ul>
          {MENU_ITEMS.map((item) => (
            <li key={item}>
              <button
                type="button"
                className={vistaActual === item ? "activo" : ""}
                onClick={() => cambiarVista(item)}
              >
                {item === "AcercaDe" ? "Acerca de" : item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="redesDiv">
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
    </header>
  );
}

Encabezado.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
  vistaActual: PropTypes.string.isRequired,
};

export default Encabezado;
