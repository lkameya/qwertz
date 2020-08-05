import { default as Axios } from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../Shared/Button';
import { Container, Form } from './styles';

function DeleteUsuario() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    // GET user/id
    Axios.get(`http://localhost:5000/user/${id}`)
              .then(res => {
                setUser(res.data);
        });
  }, [id]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user.id || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || ''
    },
    onSubmit: async (values) => {
      await Axios.delete(`http://localhost:5000/user/${values.id}`, values);
    },
  });

  // const [values, setValues] = useState({});
  // const [errors, setErrors] = useState('');

  // const handleChange = (e) => {
  //   const newValues = {...values};
  //   newValues[e.target.name] = e.target.value;
  //   setValues(newValues);
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Enviar os dados pro backend");
  //   console.log(values);

  //   if(values.firstName !== '') {
  //     if(values.firstName.length < 5) {
  //       setErrors('Nome não pode ter menos que 5 caracteres');
  //     }
  //   }
  //   else{
  //     await axios.post('http://localhost:5000/user', values);
  //     // await axios.post('https://dry-atoll-57308.herokuapp.com/user', values);
  //     setUsers([...users, values]);
  //   }
  // }

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <input type="text" name="firstName" onChange={formik.handleChange} value={formik.values.firstName} disabled/>
        {formik.touched.firstName && formik.errors.firstName ? (
                <p>{formik.errors.firstName}</p>
            ) : null}
        <input type="text" name="lastName" onChange={formik.handleChange} value={formik.values.lastName} disabled/>
        <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} disabled/>
        <Button type="submit">Delete User</Button>
        {/* <div>{errors}</div> */}
      </Form>
    </Container>
  );
}

export default DeleteUsuario;
