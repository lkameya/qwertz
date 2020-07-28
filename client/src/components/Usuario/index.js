import React from 'react';
import { Container } from './styles';


function Usuario(props) {

  return (
    <Container>
      <p>{props.firstName}</p>
      <p>{props.lastName}</p>
    </Container>
  );
}

export default Usuario;
