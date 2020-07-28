import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 40px;
  background-color: orangered;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #ff7788;
  }
`;

const ButtonSecondary = styled(StyledButton)`
  background-color: aquamarine;
`;

function Button(props) {
  return (
    <StyledButton>{props.children}</StyledButton>
  );
}

Button.Secondary = ButtonSecondary;

export default Button;