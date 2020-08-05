import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Button from '../Shared/Button';
import { Container, Form } from './styles';

function AddUsuario() {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Campo obrigatório').max(10, 'Nome deve ter no maximo 10 caracteres'),
    }),
    onSubmit: async (values) => {
      await axios.post('http://localhost:5000/user', values);
      // await axios.post('https://dry-atoll-57308.herokuapp.com/user', values);
      // setUsers([...users, values]);
    },
  });

  // const [users, setUsers] = useState([]);
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
        <input type="text" name="firstName" onChange={formik.handleChange}/>
        {formik.touched.firstName && formik.errors.firstName ? (
                <p>{formik.errors.firstName}</p>
            ) : null}
        <input type="text" name="lastName" onChange={formik.handleChange} />
        <input type="email" name="email" onChange={formik.handleChange}/>
        <Button type="submit">Add User</Button>
        {/* <div>{errors}</div> */}
      </Form>

    </Container>
  );
}

export default AddUsuario;
