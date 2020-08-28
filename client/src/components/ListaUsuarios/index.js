import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import styled from 'styled-components';

const Card = styled.div`
  padding: 50px;
  /* background-color: #ccc; */
`;

const ChatContainer = styled.div`

`;

const Container = styled.div`
  padding: 20px;
  box-shadow: 0px 2px 10px 4px rgba(0, 0, 0, 0.2);
  background-color: ${props => props.theme.colors.blue};
  
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


function ListaUsuarios(props) {

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users`, {
      headers: {"x-access-token" : `${localStorage.getItem("token")}`}
    })
      .then(res => {
        setUsers(res.data);
    });
  },[]);

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_API_ENDPOINT);
    socket.on("messages", data => {
      setMessages(data);
    }); 
  }, []);

  const handleLogout = () => {
    Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/logout`)
        .then(res => {
          localStorage.setItem("token", null);
    });
  }

  const handleChange = e => {
    setNewMessage(e.target.value);
  }
  const handleSubmit = () => {
    const socket = socketIOClient(process.env.REACT_APP_API_ENDPOINT);
    socket.emit("new-message", newMessage);
  }

  return (
    <Card>
      <Container {...props}>
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
      <ChatContainer>
            {messages.map(msg => <p>{msg.text}</p>)}
            <input type="text" value={newMessage} onChange={handleChange} />
            <button type="submit" onClick={handleSubmit}>Enviar</button>
      </ChatContainer>
    </Card>
  );
}

export default ListaUsuarios;