import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AcercaDe from "./AcercaDe";
import Productos from "./Productos";
import Contacto from "./Contacto";
import Sucursales from "./Sucursales";
import Galeria from "./Galeria";
import "./ContenedorTarjeta.css";

const TENDENCIAS = [
  {
    titulo: "New In",
    texto: "Looks frescos para esta temporada. Descubre prendas con estilo y comodidad.",
    categoria: "Mujer",
    imagen:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    titulo: "Street Style",
    texto: "Prendas urbanas para hombre con cortes modernos y combinaciones faciles.",
    categoria: "Hombre",
    imagen:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    titulo: "Tendencias Ninos",
    texto: "Outfits versatiles para el dia a dia con telas suaves y resistentes.",
    categoria: "Ninos",
    imagen:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1600&q=80",
  },
];

function ContenedorTarjeta({ vista, categoria, cambiarVista, cambiarCategoria }) {
  const vistas = {
    Inicio: (
      <Inicio cambiarVista={cambiarVista} cambiarCategoria={cambiarCategoria} />
    ),
    AcercaDe: <AcercaDe />,
    Productos: <Productos categoria={categoria} />,
    Contacto: <Contacto />,
    Sucursales: <Sucursales />,
    Galeria: <Galeria />,
  };

  return <main className="contenedorDiv">{vistas[vista] || vistas.Inicio}</main>;
}

function Inicio({ cambiarVista, cambiarCategoria }) {
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((anterior) => (anterior + 1) % TENDENCIAS.length);
    }, 4500);

    return () => clearInterval(intervalo);
  }, []);

  const slideActual = TENDENCIAS[indiceActual];

  const abrirCategoria = (categoria) => {
    cambiarCategoria(categoria);
    cambiarVista("Productos");
  };

  return (
    <section className="inicioSeccion" aria-label="Inicio tienda">
      <article className="carruselHero">
        {TENDENCIAS.map((slide, indice) => (
          <div
            key={slide.titulo}
            className={`slideFondo ${indice === indiceActual ? "activo" : ""}`}
            style={{ backgroundImage: `url(${slide.imagen})` }}
            aria-hidden={indice !== indiceActual}
          />
        ))}

        <div className="overlayHero" />

        <div className="contenidoHero">
          <p className="subtituloHero">Tienda en tendencia</p>
          <h1>{slideActual.titulo}</h1>
          <p>{slideActual.texto}</p>
          <div className="heroAcciones">
            <button type="button" onClick={() => abrirCategoria(slideActual.categoria)}>
              Ver {slideActual.categoria}
            </button>
            <button type="button" onClick={() => abrirCategoria("Todas")}>
              Ver todo
            </button>
          </div>
        </div>

        <div className="indicadoresHero" aria-label="Cambiar slide">
          {TENDENCIAS.map((slide, indice) => (
            <button
              key={slide.titulo}
              type="button"
              className={indice === indiceActual ? "activo" : ""}
              onClick={() => setIndiceActual(indice)}
              aria-label={`Slide ${indice + 1}`}
            />
          ))}
        </div>
      </article>
    </section>
  );
}

ContenedorTarjeta.propTypes = {
  vista: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
  cambiarVista: PropTypes.func.isRequired,
  cambiarCategoria: PropTypes.func.isRequired,
};

Inicio.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
  cambiarCategoria: PropTypes.func.isRequired,
};

export default ContenedorTarjeta;
