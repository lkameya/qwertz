import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(210deg, rgba(2,0,36,1) 0%, rgba(82,9,106,1) 43%, rgba(0,212,255,1) 100%);

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 10px 2px rgba(0, 0, 0, .3);
  background-color: #fff;
  padding: 50px;

  form {
    display: flex;
    flex-direction: column;
    padding: 50px;

    label {
      margin-bottom: 10px;
      margin-top: 10px;
    }

    input {
      outline: none;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 300px;
      height: 40px;
      background-color: white;
      outline: none;
      padding: 10px;
    }

    button {
      outline: none;
      border: none;
      color: white;
      text-transform: uppercase;
      background-color: #F66D8E;
      border-radius: 50px;
      padding: 10px 0;
      cursor: pointer;
      width: 300px;
      height: 40px;
      margin-top: 50px;
      margin-bottom: 50px;
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
    <Wrap>
      <Container>
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" onChange={formik.handleChange}/>
          <label>Password</label>
          <input type="password" name="pwd" onChange={formik.handleChange}/>
          <button type="submit">Login</button>
          <div>Don't have an account? <a href="/add-usuario">Sign up</a></div>
          {/* <div>{errors}</div> */}
        </form>
      </Container>
    </Wrap>
  );
}

export default Login;
