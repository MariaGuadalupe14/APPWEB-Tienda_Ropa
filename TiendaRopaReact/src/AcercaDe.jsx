import "./AcercaDe.css";

function AcercaDe() {
  return (
    <section className="acercaDeDiv">
      <div className="acercaDeHero">
        <div className="acercaDeHeroContenido">
          <span className="acercaDeEtiqueta">Tienda local</span>
          <h2>Moda actual con enfoque practico</h2>
          <p className="acercaDeLead">
            Somos una tienda de ropa enfocada en piezas versatiles para uso diario,
            oficina y eventos casuales. Buscamos equilibrio entre estilo, comodidad y
            precio justo.
          </p>

          <div className="acercaDeHeroStats">
            <article>
              <strong>Estilo</strong>
              <span>Prendas faciles de combinar</span>
            </article>
            <article>
              <strong>Calidad</strong>
              <span>Textiles pensados para durar</span>
            </article>
            <article>
              <strong>Atencion</strong>
              <span>Experiencia cercana y clara</span>
            </article>
          </div>
        </div>

        <aside className="acercaDeDestacado">
          <p className="acercaDeMiniEtiqueta">Nuestra esencia</p>
          <h3>Una boutique pensada para vestir tu rutina con mas personalidad.</h3>
          <p>
            Seleccionamos prendas con lineas limpias, tonos combinables y detalles
            actuales para que cada compra se sienta util, linda y facil de llevar.
          </p>
        </aside>
      </div>

      <div className="acercaDeGrid">
        <article className="acercaDeCard">
          <span className="acercaDeNumero">01</span>
          <h3>Mision</h3>
          <p>
            Ofrecer prendas de calidad y asesoria simple para que cada cliente arme
            looks funcionales sin complicaciones.
          </p>
        </article>
        <article className="acercaDeCard">
          <span className="acercaDeNumero">02</span>
          <h3>Vision</h3>
          <p>
            Ser referencia regional en moda accesible, experiencia rapida de compra
            y servicio humano.
          </p>
        </article>
        <article className="acercaDeCard">
          <span className="acercaDeNumero">03</span>
          <h3>Valores</h3>
          <ul>
            <li>Atencion clara y honesta</li>
            <li>Mejora continua de colecciones</li>
            <li>Compromiso con cada cliente</li>
          </ul>
        </article>
      </div>

      <section className="acercaDeHistoria">
        <div className="acercaDeHistoriaTexto">
          <span className="acercaDeSubtitulo">Lo que nos mueve</span>
          <h3>Queremos que comprar ropa se sienta simple, inspirador y cercano.</h3>
          <p>
            En lugar de saturar con demasiadas opciones, buscamos un catalogo claro
            con prendas que realmente funcionen para distintos momentos del dia.
          </p>
          <p>
            Nuestra propuesta combina moda accesible, presentacion cuidada y una
            experiencia mas comoda para quienes quieren verse bien sin complicarse.
          </p>
        </div>

        <div className="acercaDeHistoriaPanel">
          <div className="acercaDeFrase">
            <span>MSJ Boutique</span>
            <strong>Estilo que acompana tu dia a dia.</strong>
          </div>
          <div className="acercaDePilares">
            <article>
              <h4>Seleccion curada</h4>
              <p>Modelos actuales con mejor equilibrio entre tendencia y practicidad.</p>
            </article>
            <article>
              <h4>Compra clara</h4>
              <p>Informacion sencilla para elegir con mas confianza y menos friccion.</p>
            </article>
          </div>
        </div>
      </section>
    </section>
  );
}

export default AcercaDe;
