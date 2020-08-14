import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid yellow;
  height: 100px;

  div {
    width: 20%;
  }

`;

const LinksContainer = styled.nav`
  border: 3px solid purple;

  ul {
    display: flex;
    list-style: none;
    text-decoration: none;
  }

  li, a {
    text-decoration: none;
    margin: 0 10px;
  }
`


function Navbar() {

  const handleLogout = () => {
    localStorage.clear("token");
  }

  return (
    <Container>
      <div><Link to="/">Logo do Sistema</Link></div>
      <LinksContainer>
        <ul>
          <li><Link to="/add-usuario">Cadastrar Usuário</Link></li>
          <li>
            {localStorage.getItem("token") ? 
              <Link onClick={handleLogout} to="/login">Logout</Link>
            :
              <Link to="/login">Login</Link>
            }
          </li>
        </ul>
      </LinksContainer>
    </Container>
  );
}

export default Navbar;