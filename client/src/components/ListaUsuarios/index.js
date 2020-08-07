import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  padding: 50px;
  background-color: #ccc;
`;

const Container = styled.div`
  padding: 20px;
  box-shadow: 0px 2px 10px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  
  div {
    display: inline-block;
  }
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1.5px solid #ccc;

  & > div {
    margin-right: 20px;
  }
  
  div {
    min-width: 250px;
  }
`;


const Row = styled.div`
  padding: 20px;
  border-bottom: .6px solid #ccc;

  & > div {
    margin-right: 20px;
  }

  div {
    min-width: 250px;
  }
`;

const Actions = styled.div`
  & > * {
    margin-right: 10px;
  }
`;


function ListaUsuarios() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/users', {
      headers: {"x-access-token" : `${localStorage.getItem("token")}`}
    })
              .then(res => {
                setUsers(res.data);
              });
  }, []);

  const handleLogout = () => {
    Axios.post('http://localhost:5000/logout')
        .then(res => {
          localStorage.setItem("token", null);
    });
  }

  return (
    <Card>
      <Container>
        <Header>
          <div>First Name</div>
          <div>Last Name</div>
          <div>E-mail</div>
          <div>E-mail</div>
          <div>Actions</div>
        </Header>
        {users.map(user => (
          <Row>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.email}</div>
            <Actions>
              <Link to={{
                pathname: `/edit-usuario/${user.id}`,
              }}>Edit</Link>
              <Link to={{
                pathname: `/delete-usuario/${user.id}`,
              }}>Delete</Link>
            </Actions>
          </Row>
        ))}

      </Container>
      <Link to={{
                pathname: `/add-usuario`,
              }}>Cadastrar Usuario</Link>
      <button onClick={handleLogout}>Logout</button>
    </Card>
  );
}

export default ListaUsuarios;