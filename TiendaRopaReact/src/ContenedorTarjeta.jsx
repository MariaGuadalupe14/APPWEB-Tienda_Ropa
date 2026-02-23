import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AcercaDe from "./AcercaDe";
import Productos from "./Productos";
import Contacto from "./Contacto";
import Sucursales from "./Sucursales";
import "./ContenedorTarjeta.css";

const TENDENCIAS = [
  {
    titulo: "Novedades",
    texto: "Estilos frescos para esta temporada. Descubre prendas con estilo y comodidad.",
    categoria: "Mujer",
    imagen:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    titulo: "Estilo urbano",
    texto: "Prendas urbanas para hombre con cortes modernos y combinaciones faciles.",
    categoria: "Hombre",
    imagen:
      "https://ae-pic-a1.aliexpress-media.com/kf/H37210870b6e8471282b1fdd46fa7f2170.jpg",
  },
  {
    titulo: "Tendencias para niños",
    texto: "Conjuntos versatiles para el dia a dia con telas suaves y resistentes.",
    categoria: "Niños",
    imagen:
      "https://r.fashionunited.com/Fag7glXsKdA_ff8lcyvlHBHThG-j8h-4kiTVTj-8c9U/resize:fit:1200:630:0/gravity:ce/quality:70/aHR0cHM6Ly9mYXNoaW9udW5pdGVkLmNvbS9pbWcvdXBsb2FkLzIwMjMvMTIvMTMvZHNjLTU2MjEtNzRjbnBrZ3gtMjAyMy0wMi0wMS16cDZuZDNrdC0yMDIzLTEyLTEzLmpwZWc.jpeg",
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
  };

  const claseContenedor =
    vista === "Inicio" ? "contenedorDiv inicioCompleto" : "contenedorDiv";

  return <main className={claseContenedor}>{vistas[vista] || vistas.Inicio}</main>;
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
          <p className="subtituloHero">Moda en tendencia</p>
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
              aria-label={`Diapositiva ${indice + 1}`}
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
