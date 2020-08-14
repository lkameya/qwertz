import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
  background-color: green;
`;

function Layout(props) {
  return (
    <Container>
      <Navbar />
      {props.children}
    </Container>
  );
}

export default Layout;