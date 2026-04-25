import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AcercaDe from "./AcercaDe";
import Productos from "./Productos";
import Contacto from "./Contacto";
import Sucursales from "./Sucursales";
import Login from "./Login";
import RegistrarUsuarios from "./RegistrarUsuarios";
import CategoriasAdmin from "./CategoriasAdmin";
import UsuariosAdmin from "./UsuariosAdmin";
import Carritos from "./Carritos";
import Pedidos from "./Pedidos";
import { useAuth } from "./AuthContext";
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
    titulo: "Tendencias para ninos",
    texto: "Conjuntos versatiles para el dia a dia con telas suaves y resistentes.",
    categoria: "Ninos",
    imagen:
      "https://r.fashionunited.com/Fag7glXsKdA_ff8lcyvlHBHThG-j8h-4kiTVTj-8c9U/resize:fit:1200:630:0/gravity:ce/quality:70/aHR0cHM6Ly9mYXNoaW9udW5pdGVkLmNvbS9pbWcvdXBsb2FkLzIwMjMvMTIvMTMvZHNjLTU2MjEtNzRjbnBrZ3gtMjAyMy0wMi0wMS16cDZuZDNrdC0yMDIzLTEyLTEzLmpwZWc.jpeg",
  },
];

const WEATHER_LABELS = {
  0: "Cielo despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina con escarcha",
  51: "Llovizna ligera",
  53: "Llovizna moderada",
  55: "Llovizna intensa",
  61: "Lluvia ligera",
  63: "Lluvia moderada",
  65: "Lluvia intensa",
  71: "Nevada ligera",
  73: "Nevada moderada",
  75: "Nevada intensa",
  80: "Chubascos ligeros",
  81: "Chubascos moderados",
  82: "Chubascos intensos",
  95: "Tormenta",
};

function ContenedorTarjeta({ vista, categoria, cambiarVista, cambiarCategoria }) {
  const { isAdmin, isLoggedIn } = useAuth();

  const vistas = {
    Inicio: (
      <Inicio cambiarVista={cambiarVista} cambiarCategoria={cambiarCategoria} />
    ),
    AcercaDe: <AcercaDe />,
    Productos: <Productos categoria={categoria} cambiarVista={cambiarVista} />,
    Contacto: <Contacto />,
    Sucursales: <Sucursales />,
    Login: <Login cambiarVista={cambiarVista} />,
    RegistrarUsuarios: <RegistrarUsuarios cambiarVista={cambiarVista} />,
    CategoriasAdmin: isAdmin ? <CategoriasAdmin /> : <Bloqueo titulo="Categorias" cambiarVista={cambiarVista} />,
    ProductosAdmin: isAdmin ? <Productos categoria={categoria} cambiarVista={cambiarVista} /> : <Bloqueo titulo="Productos" cambiarVista={cambiarVista} />,
    Usuarios: isAdmin ? <UsuariosAdmin /> : <Bloqueo titulo="Usuarios" cambiarVista={cambiarVista} />,
    Carritos: isLoggedIn ? <Carritos /> : <Bloqueo titulo="Carritos" cambiarVista={cambiarVista} />,
    Pedidos: isLoggedIn ? <Pedidos /> : <Bloqueo titulo="Pedidos" cambiarVista={cambiarVista} />,
  };

  const claseContenedor =
    vista === "Inicio" ? "contenedorDiv inicioCompleto" : "contenedorDiv";

  return <main className={claseContenedor}>{vistas[vista] || vistas.Inicio}</main>;
}

function Inicio({ cambiarVista, cambiarCategoria }) {
  const [indiceActual, setIndiceActual] = useState(0);
  const [clima, setClima] = useState(null);
  const [cargandoClima, setCargandoClima] = useState(true);
  const [errorClima, setErrorClima] = useState("");
  const lat = 20.278673257056912;
  const lng = -97.96470248658306;

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((anterior) => (anterior + 1) % TENDENCIAS.length);
    }, 4500);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=auto`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo consultar el clima");
        return res.json();
      })
      .then((data) => {
        setClima({
          nombre: "Tu zona",
          temperatura: Math.round(data.current?.temperature_2m ?? 0),
          descripcion: WEATHER_LABELS[data.current?.weather_code] || "Clima actual",
        });
        setErrorClima("");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setErrorClima("No se pudo obtener el clima");
        }
      })
      .finally(() => setCargandoClima(false));

    return () => controller.abort();
  }, [lat, lng]);

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
          <div className="climaInicio" aria-live="polite">
            {cargandoClima && <p>Cargando clima...</p>}
            {!cargandoClima && errorClima && <p>{errorClima}</p>}
            {!cargandoClima && !errorClima && clima && (
              <>
                <p>
                  {clima.nombre}: {clima.temperatura} C
                </p>
                <p>{clima.descripcion}</p>
              </>
            )}
          </div>
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

function Bloqueo({ titulo, cambiarVista }) {
  return (
    <section className="panelVacio">
      <div>
        <h2>{titulo}</h2>
        <p>Necesitas iniciar sesion con la cuenta correcta para entrar a este apartado.</p>
        <button type="button" onClick={() => cambiarVista("Login")}>
          Ir a login
        </button>
      </div>
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

Bloqueo.propTypes = {
  titulo: PropTypes.string.isRequired,
  cambiarVista: PropTypes.func.isRequired,
};

export default ContenedorTarjeta;
