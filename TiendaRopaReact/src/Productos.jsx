import "./Productos.css";

const PRODUCTOS = [
  {
    nombre: "Playera casual",
    precio: "$299 MXN",
    desc: "Algodon premium, varios colores.",
    img: "https://m.media-amazon.com/images/I/51sGTVkkShL._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    nombre: "Sudadera clasica",
    precio: "$499 MXN",
    desc: "Ideal para clima fresco.",
    img: "https://m.media-amazon.com/images/I/71egm8s4SaL._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    nombre: "Pantalon slim",
    precio: "$599 MXN",
    desc: "Corte moderno y comodo.",
    img: "https://m.media-amazon.com/images/I/515wpbANaKL._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    nombre: "Chamarra denim",
    precio: "$899 MXN",
    desc: "Look urbano con costuras resistentes.",
    img: "https://m.media-amazon.com/images/I/81zgb19+r1L._AC_UL320_.jpg",
  },
  {
    nombre: "Vestido midi",
    precio: "$699 MXN",
    desc: "Caida suave y elegante.",
    img: "https://m.media-amazon.com/images/I/518drF3xC+L._AC_UL320_.jpg",
  },
  {
    nombre: "Blusa satinada",
    precio: "$399 MXN",
    desc: "Brillo discreto y corte fino.",
    img: "https://m.media-amazon.com/images/I/71Hc0YnGfsL._AC_UL320_.jpg",
  },
];

function Productos() {
  return (
    <section className="productos">
      <h2>Coleccion destacada</h2>
      <div className="grid-productos">
        {PRODUCTOS.map((producto) => (
          <article className="card-producto" key={producto.nombre}>
            <img src={producto.img} alt={producto.nombre} loading="lazy" />
            <h3>{producto.nombre}</h3>
            <p>{producto.desc}</p>
            <span>{producto.precio}</span>
            <button type="button">Comprar</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Productos;
