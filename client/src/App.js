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
import NotificationProvider from './components/Notification/NotificationProvider';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <Switch>
          <Route path="/" exact component={ListaUsuarios}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/add-usuario" component={AddUsuario}/>
          <Route path="/edit-usuario/:id" component={EditUsuario}/>
          <Route path="/delete-usuario/:id" component={DeleteUsuario}/>
        </Switch>
      </NotificationProvider>
    </Router>
  );
}

export default App;
