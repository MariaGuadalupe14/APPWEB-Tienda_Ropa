import "./PieComponente.css";

function PieComponente() {
  return (
    <footer className="pieDiv">
      <div className="pieBloque">
        <h4>Contacto</h4>
        <p>correo@tienda.com</p>
        <p>+52 782 123 4567</p>
      </div>
      <div className="pieBloque">
        <h4>Horario</h4>
        <p>Lunes a viernes: 10:00 a 20:00</p>
        <p>Sabado: 10:00 a 18:00</p>
      </div>
      <div className="pieBloque">
        <h4>Equipo</h4>
        <p>Maria, Karen y Sheila</p>
      </div>
    </footer>
  );
}

export default PieComponente;
