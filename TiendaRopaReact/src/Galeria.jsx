import { useState } from "react";
import "./Galeria.css";

const IMAGENES = [
  "https://m.media-amazon.com/images/I/61576rR4yTL._AC_SY741_.jpg",
  "https://m.media-amazon.com/images/I/717MwWkSy9L._AC_SX569_.jpg",
  "https://m.media-amazon.com/images/I/71fE5eFYo4L._AC_SX679_.jpg",
];

function Galeria() {
  const [indiceActual, setIndiceActual] = useState(0);

  function irAnterior() {
    setIndiceActual((prev) => (prev === 0 ? IMAGENES.length - 1 : prev - 1));
  }

  function irSiguiente() {
    setIndiceActual((prev) => (prev === IMAGENES.length - 1 ? 0 : prev + 1));
  }

  return (
    <section className="galeria">
      <h2>Galeria de temporada</h2>
      <div className="carrusel-galeria">
        <button className="btn-carrusel" type="button" onClick={irAnterior}>
          {"<"}
        </button>
        <img src={IMAGENES[indiceActual]} alt="Galeria" className="imagen-carrusel" />
        <button className="btn-carrusel" type="button" onClick={irSiguiente}>
          {">"}
        </button>
      </div>

      <div className="indicadores-galeria">
        {IMAGENES.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`indicador ${index === indiceActual ? "activo" : ""}`}
            onClick={() => setIndiceActual(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Galeria;

