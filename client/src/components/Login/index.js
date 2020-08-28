import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #4568DC;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #B06AB3, #4568DC);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #B06AB3, #4568DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


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

    @media (max-width: 400px) {
      padding: 10px;
    }

    label {
      margin-bottom: 10px;
      margin-top: 10px;
    }

    input {
      outline: none;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 100%;
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
      width: 100%;
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
          <div>Don't have an account? <Link to="/add-usuario">Sign up</Link></div>
          {/* <div>{errors}</div> */}
        </form>
      </Container>
    </Wrap>
  );
}

export default Login;
