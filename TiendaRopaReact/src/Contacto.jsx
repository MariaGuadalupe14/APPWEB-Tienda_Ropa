import "./Contacto.css";

function Contacto() {
  return (
    <section className="contacto">
      <div className="contactoHero">
        <div className="contactoEncabezado">
          <span className="contactoEtiqueta">Hablemos</span>
          <h2>Contactanos</h2>
          <p>
            Respondemos en menos de 24 horas habiles. Si necesitas apoyo con
            pedidos, productos o disponibilidad, estamos listas para ayudarte.
          </p>
        </div>

        <div className="contactoResumen">
          <article>
            <strong>Atencion cercana</strong>
            <span>Resolvemos dudas con una respuesta clara y rapida.</span>
          </article>
          <article>
            <strong>Soporte de compra</strong>
            <span>Te orientamos con tallas, productos y seguimiento.</span>
          </article>
        </div>
      </div>

      <div className="contactoContenido">
        <aside className="contactoInfo">
          <span className="contactoMiniEtiqueta">Canales</span>
          <h3>Estamos para acompanarte durante tu compra.</h3>
          <p>
            Puedes escribirnos para solicitar informacion de prendas, confirmar
            existencias o recibir orientacion antes de generar tu pedido.
          </p>

          <div className="contactoInfoLista">
            <article>
              <strong>Tiempo de respuesta</strong>
              <span>Menos de 24 horas habiles</span>
            </article>
            <article>
              <strong>Seguimiento</strong>
              <span>Atencion para pedidos, dudas y catalogo</span>
            </article>
            <article>
              <strong>Experiencia</strong>
              <span>Comunicacion mas clara, simple y humana</span>
            </article>
          </div>
        </aside>

        <form className="form-contacto">
          <div className="formHeader">
            <span className="contactoMiniEtiqueta">Formulario</span>
            <h3>Envianos un mensaje</h3>
          </div>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo electronico" />
          <input type="tel" placeholder="Telefono" />
          <textarea placeholder="Mensaje" rows="5" />
          <button type="button">Enviar mensaje</button>
        </form>
      </div>
    </section>
  );
}

export default Contacto;
