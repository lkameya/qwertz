import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/users')
              .then(res => {
                setUsers(res.data);
              });
  }, []);

  return (
    <div className="App">
      <div>{users}</div>
    </div>
  );
}

export default App;
