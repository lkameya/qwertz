import React from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import AddUsuario from './components/AddUsuario';
import DeleteUsuario from './components/DeleteUsuario';
import EditUsuario from './components/EditUsuario';
import Home from './components/Home';
import ListaUsuarios from './components/ListaUsuarios';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ListaUsuarios}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/add-usuario" component={AddUsuario}/>
        <Route path="/edit-usuario/:id" component={EditUsuario}/>
        <Route path="/delete-usuario/:id" component={DeleteUsuario}/>
      </Switch>
    </Router>
  );
}

export default App;
