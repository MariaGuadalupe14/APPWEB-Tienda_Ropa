import "./Sucursales.css";

const SUCURSALES = [
  {
    nombre: "Sucursal Centro",
    direccion: "Calle Hidalgo 123, Centro, Poza Rica, Ver.",
    telefono: "+52 782 000 0001",
    latitud: 20.27657,
    longitud: -97.96426,
  },
  {
    nombre: "Sucursal Norte",
    direccion: "Av. 20 de Noviembre 456, Obrera, Poza Rica, Ver.",
    telefono: "+52 782 000 0002",
    latitud: 20.27619,
    longitud: -97.95967,
  },
  {
    nombre: "Sucursal Sur",
    direccion: "Calle 16 de Septiembre 789, Petromex, Poza Rica, Ver.",
    telefono: "+52 782 000 0003",
    latitud: 20.2756,
    longitud: -97.96429,
  },
];

function Sucursales() {
  return (
    <section className="sucursales">
      <div className="sucursalesHero">
        <div>
          <span className="sucursalesEtiqueta">Visitanos</span>
          <h2>Nuestras sucursales</h2>
          <p>
            Encuentra el punto mas cercano para conocer nuestras prendas, recibir
            atencion personalizada y vivir la experiencia completa de la boutique.
          </p>
        </div>
        <div className="sucursalesResumen">
          <article>
            <strong>{SUCURSALES.length}</strong>
            <span>Sucursales disponibles</span>
          </article>
          <article>
            <strong>Atencion local</strong>
            <span>Ubicaciones pensadas para recibirte mejor</span>
          </article>
        </div>
      </div>

      <div className="lista-sucursales">
        {SUCURSALES.map((sucursal) => (
          <article className="sucursal" key={sucursal.nombre}>
            <div className="sucursalHeader">
              <span className="sucursalEtiqueta">Boutique</span>
              <h3>{sucursal.nombre}</h3>
              <p className="direccion">{sucursal.direccion}</p>
            </div>

            <div className="sucursalMapa">
              <iframe
                title={`Mapa ${sucursal.nombre}`}
                src={`https://maps.google.com/maps?q=${sucursal.latitud},${sucursal.longitud}&z=15&output=embed`}
                loading="lazy"
              />
            </div>

            <div className="sucursalFooter">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${sucursal.latitud},${sucursal.longitud}`}
                target="_blank"
                rel="noreferrer"
              >
                Como llegar
              </a>
              <p>{sucursal.telefono}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Sucursales;
