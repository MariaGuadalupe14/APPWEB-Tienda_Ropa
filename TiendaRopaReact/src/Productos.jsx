import PropTypes from "prop-types";
import "./Productos.css";

const PRODUCTOS = [
  { nombre: "Playera Casual", precio: "$299 MXN", desc: "Algodon premium, varios colores.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/51sGTVkkShL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Sudadera Clasica", precio: "$499 MXN", desc: "Ideal para clima frio.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/71egm8s4SaL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Pantalon Slim", precio: "$599 MXN", desc: "Corte moderno y comodo.", categoria: "Mujer", img: "https://m.media-amazon.com/images/I/515wpbANaKL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Chamarra Denim", precio: "$899 MXN", desc: "Look urbano con costuras resistentes.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/81zgb19+r1L._AC_UL320_.jpg" },
  { nombre: "Vestido Midi", precio: "$699 MXN", desc: "Caida suave y elegante.", categoria: "Mujer", img: "https://m.media-amazon.com/images/I/518drF3xC+L._AC_UL320_.jpg" },
  { nombre: "Falda Plisada", precio: "$449 MXN", desc: "Textura ligera para cualquier ocasion.", categoria: "Mujer", img: "https://m.media-amazon.com/images/I/71jstxCy-6L._AC_UL320_.jpg" },
  { nombre: "Blusa Satinada", precio: "$399 MXN", desc: "Brillo discreto y corte fino.", categoria: "Mujer", img: "https://m.media-amazon.com/images/I/71Hc0YnGfsL._AC_UL320_.jpg" },
  { nombre: "Camisa Blanca", precio: "$349 MXN", desc: "Basico elegante para diario.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/51q1ceKvBYL._AC_UL320_.jpg" },
  { nombre: "Short Deportivo", precio: "$259 MXN", desc: "Comodo y transpirable.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/51kEdCSZh0L._AC_UL320_.jpg" },
  { nombre: "Pants Jogger", precio: "$529 MXN", desc: "Estilo relajado y moderno.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/618Cvh2r-GL._AC_UL320_.jpg" },
  { nombre: "Top Deportivo", precio: "$279 MXN", desc: "Soporte y libertad de movimiento.", categoria: "Mujer", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR2pAPo0sMb-5x_Ge_cdX-kaNvRNXO2_5T7rapk7UnUmjPc2fArlageeYvZX9ykJOuo4sVah4__OP6s82mQLU8NVRI2VCUlOdbqw03HufrnztAVk6hcCwnZdot4jLgbkcEI1EQ5Rg&usqp=CAc" },
  { nombre: "Sueter Tejido", precio: "$649 MXN", desc: "Calido y suave al tacto.", categoria: "Mujer", img: "https://m.media-amazon.com/images/I/61r6xY2yE3L._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Blazer Negro", precio: "$999 MXN", desc: "Formal y elegante.", categoria: "Mujer", img: "https://m.media-amazon.com/images/I/61f9D2JYhZL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Chaleco Acolchado", precio: "$799 MXN", desc: "Ligero y abrigador.", categoria: "Hombre", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh0QWgQxL4kUxmSvNDzHH6EbNVHCsu7P9A8w&s" },
  { nombre: "Camisa Cuadros", precio: "$369 MXN", desc: "Clasica con estilo casual.", categoria: "Hombre", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5KgffWOykZDQA3KdCDWLxusU_OR7LsdvSug&s" },
  { nombre: "Playera Oversize", precio: "$329 MXN", desc: "Corte amplio y comodo.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/61XxZx4yU2L._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Jeans Rectos", precio: "$579 MXN", desc: "Denim clasico para diario.", categoria: "Mujer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2X_9DWfj0BKz5yqHfziLJONjyjJCr55tYqQ&s" },
  { nombre: "Blusa Basica", precio: "$259 MXN", desc: "Suave y combinable.", categoria: "Mujer", img: "https://m.media-amazon.com/images/I/61U0SxT3C4L._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Vestido Negro", precio: "$749 MXN", desc: "Elegante para noche.", categoria: "Mujer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqIWSrVpt2v-L2mmRuNXcXRacuZFMv-WtlQ&s" },
  { nombre: "Falda Denim", precio: "$389 MXN", desc: "Basica y moderna.", categoria: "Mujer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_kazo8z0GpsDPcj6OEQMx5CzhRsiYpGRYg&s" },
  { nombre: "Camisa Lino", precio: "$459 MXN", desc: "Fresca para calor.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/61xB4k1QKxL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Chamarra Piel", precio: "$1499 MXN", desc: "Estilo premium.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/71q0bNwS9WL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Sueter Cuello Alto", precio: "$679 MXN", desc: "Calidez con estilo.", categoria: "Mujer", img: "https://m.media-amazon.com/images/I/61D5c2yUQBL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Camisa Manga Corta", precio: "$319 MXN", desc: "Casual y ligera.", categoria: "Hombre", img: "https://m.media-amazon.com/images/I/61t8u2n1cXL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Leggings", precio: "$289 MXN", desc: "Comodos y elasticos.", categoria: "Mujer", img: "https://m.media-amazon.com/images/I/71Kf6k2sQYL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Chalina", precio: "$199 MXN", desc: "Suave y ligera.", categoria: "Accesorios", img: "https://m.media-amazon.com/images/I/61b6Vn8E2tL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Gorra Basica", precio: "$159 MXN", desc: "Accesorio urbano.", categoria: "Accesorios", img: "https://m.media-amazon.com/images/I/61qH9hVYLOL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Cinturon Negro", precio: "$219 MXN", desc: "Acabado elegante.", categoria: "Accesorios", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQCFghQWzjic6sm_5RC6Nlq6KWR8HA3X-nKQ&s" },
  { nombre: "Bolso Tote", precio: "$499 MXN", desc: "Amplio y practico.", categoria: "Accesorios", img: "https://m.media-amazon.com/images/I/61B3o0m8tPL._AC_UL480_FMwebp_QL65_.jpg" },
  { nombre: "Calcetines Pack", precio: "$149 MXN", desc: "Comodos todo el dia.", categoria: "Accesorios", img: "https://m.media-amazon.com/images/I/61m8b1Y4zXL._AC_UL480_FMwebp_QL65_.jpg" },
];

function Productos({ categoria }) {
  const productosFiltrados =
    categoria === "Todas"
      ? PRODUCTOS
      : PRODUCTOS.filter((producto) => producto.categoria === categoria);

  return (
    <section className="productos">
      <h2>Nuestros Productos</h2>
      <p className="filtroTexto">Categoria: {categoria}</p>

      <div className="grid-productos">
        {productosFiltrados.map((producto) => (
          <article className="card-producto" key={producto.nombre}>
            <img src={producto.img} alt={producto.nombre} loading="lazy" />
            <span className="categoriaProducto">{producto.categoria}</span>
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

Productos.propTypes = {
  categoria: PropTypes.string,
};

Productos.defaultProps = {
  categoria: "Todas",
};

export default Productos;
