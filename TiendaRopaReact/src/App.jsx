import { useState } from "react";
import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import PromosContenido from "./PromosContenido";
import PieComponente from "./PieComponente";

function App() {
  const [vista, setVista] = useState("Inicio");
  const esInicio = vista === "Inicio";

  return (
    <div>
      <Encabezado cambiarVista={setVista} vistaActual={vista} />
      <ContenedorTarjeta vista={vista} />
      {esInicio && <PromosContenido />}
      <PieComponente />
    </div>
  );
}

export default App;
