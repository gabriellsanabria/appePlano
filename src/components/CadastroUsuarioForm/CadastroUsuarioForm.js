// components/CadastroUsuarioForm.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const CadastroUsuarioForm = ({ onCadastro }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastroUsuario = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log('Novo usuário criado:', user);

      // Chama a função de callback para lidar com o cadastro no Firestore
      onCadastro({ nome, email, userId: user.uid, endereco, cidade, telefone });

      // Faz a requisição para o backend para cadastrar no MySQL
      await axios.post('http://localhost:3100/cadastrar', {
        nome,
        email,
        userId: user.uid,
        endereco,
        cidade,
        telefone,
      });

    } catch (error) {
      console.error('Erro ao criar novo usuário:', error);
    }
  };

  return (
    <form>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Senha:
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>
      <br />
      <label>
        Endereço:
        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      </label>
      <br />
      <label>
        Cidade:
        <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
      </label>
      <br />
      <label>
        Telefone:
        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      </label>
      <br />
      <button type="button" onClick={handleCadastroUsuario}>
        Cadastrar
      </button>
    </form>
  );
};

export default CadastroUsuarioForm;
