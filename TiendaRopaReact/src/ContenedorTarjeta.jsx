import PropTypes from "prop-types";
import AcercaDe from "./AcercaDe";
import Productos from "./Productos";
import Contacto from "./Contacto";
import Sucursales from "./Sucursales";
import Galeria from "./Galeria";
import "./ContenedorTarjeta.css";

const DESTACADOS = [
  {
    titulo: "Camisa casual",
    descripcion: "Corte moderno para uso diario.",
    imagen:
      "https://m.media-amazon.com/images/I/51vb0FSBdIL._AC_SX679_.jpg",
  },
  {
    titulo: "Jeans slim",
    descripcion: "Comodos y faciles de combinar.",
    imagen:
      "https://m.media-amazon.com/images/I/61YzfMikbqL._AC_SX342_SY445_QL70_ML2_.jpg",
  },
  {
    titulo: "Chamarra urbana",
    descripcion: "Ideal para tardes frescas.",
    imagen:
      "https://m.media-amazon.com/images/I/71fE5eFYo4L._AC_SX679_.jpg",
  },
  {
    titulo: "Vestido midi",
    descripcion: "Ligero y elegante para eventos.",
    imagen:
      "https://m.media-amazon.com/images/I/518drF3xC+L._AC_UL320_.jpg",
  },
];

function ContenedorTarjeta({ vista }) {
  const vistas = {
    Inicio: <Inicio />,
    AcercaDe: <AcercaDe />,
    Productos: <Productos />,
    Contacto: <Contacto />,
    Sucursales: <Sucursales />,
    Galeria: <Galeria />,
  };

  return <main className="contenedorDiv">{vistas[vista] || <Inicio />}</main>;
}

function Inicio() {
  return (
    <section className="inicioGrid" aria-label="Productos destacados">
      {DESTACADOS.map((item) => (
        <article className="tarjetaDiv" key={item.titulo}>
          <img src={item.imagen} alt={item.titulo} loading="lazy" />
          <h3>{item.titulo}</h3>
          <p>{item.descripcion}</p>
          <button type="button">Ver detalle</button>
        </article>
      ))}
    </section>
  );
}

ContenedorTarjeta.propTypes = {
  vista: PropTypes.string.isRequired,
};

export default ContenedorTarjeta;
