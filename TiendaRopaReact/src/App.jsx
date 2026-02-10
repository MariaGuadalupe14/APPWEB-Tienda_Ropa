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

function UserComponent() {
  const nombre = 'Maria Guadalupe';
  const apellidos = 'Clemente Tellez';
  const nombreCompleto = <h2>El nombre es: {nombre} y sus apellidos {apellidos}</h2>;
  return <h2>User Component {nombreCompleto}</h2>;
}

function ProfileComponent() {
    const users = [
    { id: 1, name:'Maria', role: 'Web Developer'},
    { id: 2, name:'Karen', role: 'Web Designer'},
    { id: 3, name:'Sheila', role: 'Team Leader'},
  ]

  return (
    <>
    <p>Lista de usuarios del sistema</p>
    <ul>
      {
      users.map(function(user,index){
        return (
          <li key={index}>{user.name} es un {user.role}</li>

        )
      })
      }
    </ul>
    </>
  )
}

function FeedComponent() {
      const users = [
    { id: 1, name:'Piedra'},
    { id: 2, name:'Arena'},
    { id: 3, name:'Grava'},
    { id: 4, name:'Ladrillos'},
    { id: 5, name:'Cemento'},
  ]

  return (
    <>
      <h1 className="text-lowercase">Feed Component</h1>
       <p>Lista de materiales para una construcción</p>
      <ul>
        {
          users.map(function(user, index){
            return <li key={index}>{user.name}</li>
          })
        }
      </ul>
    </>
  )
}

App.propTypes = {
  vista: PropTypes.string.isRequired
};

export default App

