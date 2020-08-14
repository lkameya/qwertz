import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    border: 1px solid red;
    box-shadow: 0 10px 10px 2px rgba(0, 0, 0, .3);
    border-radius: 5px;

    input {
      width: 300px;
      height: 40px;
      margin: 10px;
      background-color: white;
      outline: none;
      padding: 10px;
    }

    button {
      width: 300px;
      height: 40px;
    }

  }

`;

function Login() {

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      pwd: ''
    },
    onSubmit: async (values) => {
      try {
        console.log(process.env.REACT_APP_API_ENDPOINT);
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/login`, values);
        localStorage.setItem("token", response.data.token);
        history.push('/');
      } catch(error) {
      }
    },
  });


  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <input type="email" name="email" onChange={formik.handleChange}/>
        <input type="password" name="pwd" onChange={formik.handleChange}/>
        <button type="submit">Login</button>
        {/* <div>{errors}</div> */}
      </form>
    </Container>
  );
}

export default Login;
