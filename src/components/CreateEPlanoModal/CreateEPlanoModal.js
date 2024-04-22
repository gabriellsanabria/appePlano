// Create a new file, e.g., CreateEPlanoModal.js
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Spinner from '../../components/Spinner/Spinner';

const CreateEPlanoModal = ({ isOpen, onClose, onCreate }) => {
  const [newEPlanoName, setNewEPlanoName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event) => {
    setNewEPlanoName(event.target.value);
  };

  const handleCreate = async () => {
       // Verifica se o nome do dashboard está vazio ou contém apenas espaços em branco
       if (!newEPlanoName.trim()) {
        // Exibe uma mensagem de erro (você pode personalizar conforme necessário)
        alert('Por favor, insira um nome para o seu ePlano.');
        return;
      }
    setIsLoading(true);
    await onCreate(newEPlanoName);
    setIsLoading(false);
  };

  return (
    isOpen && (
      <div>
        <div className='overlay'></div>
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={onClose}>
              <FaTimes />
            </span>
            <h2>Criar novo ePlano</h2>
            <p>Insira o Título do Plano de Negócio que vamos criar juntos</p>
            <input
              type='text'
              value={newEPlanoName}
              onChange={handleNameChange}
              placeholder='Nome do ePlano'
            />
            <div className='footer-modal'>
              {isLoading ? (
                <Spinner />
              ) : (
                <button onClick={handleCreate}>Criar ePlano</button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateEPlanoModal;
