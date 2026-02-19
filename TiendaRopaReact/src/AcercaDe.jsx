import "./AcercaDe.css";

function AcercaDe() {
  return (
    <section className="acercaDeDiv">
      <div className="acercaDeHero">
        <span className="acercaDeEtiqueta">Tienda local</span>
        <h2>Moda actual con enfoque practico</h2>
        <p className="acercaDeLead">
          Somos una tienda de ropa enfocada en piezas versatiles para uso diario,
          oficina y eventos casuales. Buscamos equilibrio entre estilo, comodidad y
          precio justo.
        </p>
      </div>

      <div className="acercaDeGrid">
        <article className="acercaDeCard">
          <h3>Mision</h3>
          <p>
            Ofrecer prendas de calidad y asesoria simple para que cada cliente arme
            looks funcionales sin complicaciones.
          </p>
        </article>
        <article className="acercaDeCard">
          <h3>Vision</h3>
          <p>
            Ser referencia regional en moda accesible, experiencia rapida de compra
            y servicio humano.
          </p>
        </article>
        <article className="acercaDeCard">
          <h3>Valores</h3>
          <ul>
            <li>Atencion clara y honesta</li>
            <li>Mejora continua de colecciones</li>
            <li>Compromiso con cada cliente</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default AcercaDe;
