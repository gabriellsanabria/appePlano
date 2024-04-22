import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import './GuiaEplanoModal.scss';

const ModalResumoExecutivo = ({ isOpen, onClose, empresaInfo, onInputChange }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const renderStepContent = () => {
    // Adicione o conteúdo para cada etapa aqui
    switch (currentStep) {
      case 0:
        return <div>Conteúdo da Etapa 1</div>;
      case 1:
        return <div>Conteúdo da Etapa 2</div>;
      case 2:
        return <div>Conteúdo da Etapa 3</div>;
      case 3:
        return <div>Conteúdo da Etapa 4</div>;
      case 4:
        return <div>Conteúdo da Etapa 5</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='overlay' onClick={onClose}></div>
      <div className={`modal-guia ${isOpen ? 'open' : ''}`}>
        <span className='close' onClick={onClose}>
          <FaTimes />
        </span>
        <div className='modal-content'>
          <div className='modal-header'>            
            <h1>Resumo da Empresa</h1>
          </div>
          <div className='modal-container'>
            <h2>How do you plan to use the property?</h2>
            <div className='modal-steps'>
              <div className='step-content'>{renderStepContent()}</div>
            </div>            
          </div>
          <div className='footer-modal'>              
            <div className='modal-buttons'>
              <button onClick={handlePrevStep} disabled={currentStep === 0}>
              <FaArrowLeftLong /> Voltar
              </button>
              <button onClick={handleNextStep} disabled={currentStep === 4}>
                Avançar <FaArrowRightLong /> 
              </button>
            </div>
          </div>
          <div className='progress-indicator'>
            <div className='progress-bar' style={{ width: `${(currentStep + 1) * 20}%`, backgroundColor: '$primary-color' }}></div>
            Progress: Step {currentStep + 1}/5
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalResumoExecutivo;
