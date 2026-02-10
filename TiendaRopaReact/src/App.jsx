import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import PromosContenido from "./PromosContenido";
import PieComponente from "./PieComponente";
import PropTypes from 'prop-types';
import {useState} from "react";

function App() {
  const [vista, setVista] = useState("Inicio");
  return (
    <div>
      <Encabezado cambiarVista={setVista}/>
      <ContenedorTarjeta vista = {vista}/>
      <PromosContenido/>
      <PieComponente/>
    </div>
  )
}

export default App

