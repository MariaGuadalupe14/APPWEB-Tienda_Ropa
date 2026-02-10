import miLogo from './assets/logo.png';
import facebookImg from './assets/redes/facebook.png';
import instagramImg from './assets/redes/instagram.png';
import tiktokImg from './assets/redes/tik-tok.png';
import whatsappImg from './assets/redes/whatsapp.png';
import './Encabezado.css';
import PropTypes from 'prop-types';


function Encabezado({cambiarVista}) { 
    return (
        <div className="Encabezado">
            <Logo/>
            <Menu cambiarVista={cambiarVista}/>
            <Redes/>
        </div>

    );
}


function Logo(){
    return (
        <div className="logoDiv">
            <img src={miLogo} alt="React Logo" />
        </div>
    )
}

function Menu({cambiarVista}) {
    return (
        <nav className="menuDiv">
    
            <ul>
                <li onClick={() => cambiarVista("Inicio")}>Inicio</li>
                <li onClick={() => cambiarVista("AcercaDe")}>Acerca de</li>
                <li onClick={() => cambiarVista("Productos")}>Productos</li>
                <li onClick={() => cambiarVista("Contacto")}>Contacto</li>
                <li onClick={() => cambiarVista("Sucursales")}>Sucursales</li>
                <li onClick={() => cambiarVista("Galeria")}>Galeria</li>
            </ul>
        </nav>
    );
}

function Redes() {
    return (
        <div className="redesDiv">
            <ul>
                    <li><a href='#'><img src={facebookImg} alt="Facebook" width="50" /></a></li>
                    <li><a href='#'><img src={instagramImg} alt="Instagram" width="50" /></a></li>
                    <li><a href='#'><img src={tiktokImg} alt="TikTok" width="50"/></a></li>
                    <li><a href='#'><img src={whatsappImg} alt="WhatsApp" width="50" /></a></li>
            </ul>
        </div>
    );
}

Encabezado.propTypes = {
  cambiarVista: PropTypes.func.isRequired
};

Menu.propTypes = {
  cambiarVista: PropTypes.func.isRequired
};


export default Encabezado;