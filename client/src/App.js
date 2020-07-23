import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const newValues = {...values};
    newValues[e.target.name] = e.target.value;
    setValues(newValues);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviar os dados pro backend");
    console.log(values);
    await axios.post('http://localhost:5000/user', values);
    setUsers([...users, values]);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/users')
              .then(res => {
                setUsers(res.data);
              });
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" onChange={handleChange} />
        <input type="text" name="lastName" onChange={handleChange} />
        <input type="email" name="email" onChange={handleChange}/>
        <button type="submit">Add User</button>
      </form>
      <div>
        {users.map(user => (<div key={user.firstName}>{user.firstName}</div>))}
      </div>
    </div>
  );
}

export default App;
