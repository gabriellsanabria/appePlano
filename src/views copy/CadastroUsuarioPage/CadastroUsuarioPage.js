// components/CadastroUsuarioPage.js
import React from 'react';
import CadastroUsuarioForm from '../../components/CadastroUsuarioForm/CadastroUsuarioForm';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const CadastroUsuarioPage = () => {
  const handleCadastroUsuarioFirestore = async (dadosCadastro) => {
    try {
      // Inicialize o Firestore
      const db = getFirestore();

      // Adicione um novo documento à coleção 'usuarios'
      const docRef = await addDoc(collection(db, 'usuarios'), dadosCadastro);

      console.log('Documento adicionado com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao cadastrar usuário no Firestore:', error);
    }
  };

  return (
    <div>
      <h1>Página de Cadastro</h1>
      {/* Passa a função de callback para o componente CadastroUsuarioForm */}
      <CadastroUsuarioForm onCadastro={handleCadastroUsuarioFirestore} />
    </div>
  );
};

export default CadastroUsuarioPage;
