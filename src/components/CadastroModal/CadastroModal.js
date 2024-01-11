import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase/app';
import 'firebase/auth';
import './CadastroModal.scss';

const CadastroModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    email: '',
    celular: '',
    senha: '',
    concordo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3200/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Usuário cadastrado com sucesso, faça o que for necessário aqui
        console.log('Usuário cadastrado com sucesso!');
        onRequestClose(); // Feche o modal após o cadastro
      } else {
        console.error('Erro ao cadastrar usuário:', response.statusText);
        // Manipule erros de cadastro aqui
      }
    } catch (error) {
      console.error('Erro de conexão:', error.message);
      // Manipule erros de conexão aqui
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch('http://localhost:3200/cadastrar/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        console.log('Usuário autenticado com sucesso!');
        onRequestClose(); // Feche o modal após o login
      } else {
        console.error('Erro ao autenticar usuário com o Google:', response.statusText);
        // Manipule erros de autenticação aqui
      }
    } catch (error) {
      console.error('Erro ao autenticar usuário com o Google:', error.message);
      // Manipule erros de autenticação aqui
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Crie sua Conta"
      className="CadastroModal"
      overlayClassName="CadastroModalOverlay"
      shouldCloseOnOverlayClick={false}
    >
      <div className="CadastroModal__content">
        <button onClick={onRequestClose}>Fechar</button>
        <h2>Crie sua Conta</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome Completo:
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          </label>

          <label>
            Email Profissional:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Celular/WhatsApp:
            <input type="tel" name="celular" value={formData.celular} onChange={handleChange} required />
          </label>

          <label>
            Senha de Acesso:
            <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
          </label>

          <div className="terms">
            <input type="checkbox" name="concordo" checked={formData.concordo} onChange={handleChange} required />
            <span>
              Concordo com os{' '}
              <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer">
                Termos de Uso
              </a>
            </span>
          </div>

          <button className="bt azul" type="submit">Continuar</button>
        </form>

        <div className="google-login">
          <button onClick={handleGoogleLogin}>Entrar com o Google</button>
        </div>
      </div>
    </Modal>
  );
};

export default CadastroModal;
