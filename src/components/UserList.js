// frontend/src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

// frontend/src/components/UserList.js
useEffect(() => {
    axios.get('http://localhost:3001/usuarios')  // Certifique-se de incluir a porta correta do seu servidor backend
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter dados de usuários:', error);
      });
  }, []);
  

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
