import React from 'react';
import {
  BrowserRouter as Router,

  Route, Switch, useHistory
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

const PrivateRoute = (props) => {
  const history = useHistory();

  if(localStorage.getItem("token"))
    return <Route {...props}/>;

  console.log("PRIVATE ROUTE");
  history.push("/login");

  return null;
};

const PublicRoute = (props) => {
  return <Route {...props}/>;
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
            <PrivateRoute path="/" exact component={ListaUsuarios}/>
            <PublicRoute path="/add-usuario" component={AddUsuario}/>
            <PublicRoute path="/home" exact component={Home}/>
            <PublicRoute path="/edit-usuario/:id" component={EditUsuario}/>
            <PublicRoute path="/delete-usuario/:id" component={DeleteUsuario}/>
          </Layout>
          </Switch>
        </NotificationProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
