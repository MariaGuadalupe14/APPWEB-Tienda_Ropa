import "./Contacto.css";

function Contacto() {
  return (
    <section className="contacto">
      <h2>Contactanos</h2>
      <p>Respondemos en menos de 24 horas habiles.</p>

      <form className="form-contacto">
        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Correo electronico" />
        <input type="tel" placeholder="Telefono" />
        <textarea placeholder="Mensaje" rows="5" />
        <button type="button">Enviar mensaje</button>
      </form>
    </section>
  );
}

export default Contacto;
