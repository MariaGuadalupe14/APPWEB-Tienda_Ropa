import { useState } from "react";
import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import PromosContenido from "./PromosContenido";
import PieComponente from "./PieComponente";

function App() {
  const [vista, setVista] = useState("Inicio");
  const [categoria, setCategoria] = useState("Todas");
  const esInicio = vista === "Inicio";

  return (
    <div>
      <Encabezado
        cambiarVista={setVista}
        vistaActual={vista}
        cambiarCategoria={setCategoria}
      />
      <ContenedorTarjeta
        vista={vista}
        categoria={categoria}
        cambiarVista={setVista}
        cambiarCategoria={setCategoria}
      />
      {esInicio && <PromosContenido />}
      <PieComponente />
    </div>
  );
}

export default App;
