import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: 400px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 20px;
  }

  input {
    border: .6px solid #ccc;
    border-radius: 10px;
  }
`;
