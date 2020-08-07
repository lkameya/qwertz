import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Login() {

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      pwd: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/login', values);
        console.log(response);
        localStorage.setItem("token", response.data.token);
      } catch(error) {
      }
    },
  });


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input type="email" name="email" onChange={formik.handleChange}/>
        <input type="password" name="pwd" onChange={formik.handleChange}/>
        <button type="submit">Login</button>
        {/* <div>{errors}</div> */}
      </form>

    </div>
  );
}

export default Login;
