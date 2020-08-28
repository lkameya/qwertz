import React from 'react';
import {
  BrowserRouter as Router,

  Redirect, Route, Switch
} from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import AddUsuario from './components/AddUsuario';
import DeleteUsuario from './components/DeleteUsuario';
import EditUsuario from './components/EditUsuario';
import Home from './components/Home';
import ListaUsuarios from './components/ListaUsuarios';
import Login from './components/Login';
import NotificationProvider from './components/Notification/NotificationProvider';
import Layout from './components/Shared/Layout';
import theme from './styles/theme';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Nunito', sans-serif;
  }
`

const PrivateRoute = ({component: Component, ...rest}) => {
  console.log("Private route");

  return (
    <Route
    {...rest}
      render={props =>
        !!localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
    }
  />
  )
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <NotificationProvider>
        <Switch>
          <Route path="/login" exact component={Login}/>
          <Layout>
            <Route path="/add-usuario" exact component={AddUsuario}/>
            <PrivateRoute path="/home" exact component={Home}/>
            <PrivateRoute path="/edit-usuario/:id" exact component={EditUsuario}/>
            <PrivateRoute path="/delete-usuario/:id" exact component={DeleteUsuario}/>
            <PrivateRoute path="/" exact component={ListaUsuarios}/>
          </Layout>
          </Switch>
        </NotificationProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
