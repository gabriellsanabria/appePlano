import React, { useState } from 'react';
import './TutorialModal.scss'; // Importe o arquivo de estilo CSS

const TutorialModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Lógica para lidar com o fim do tutorial
      // Pode fechar o modal ou redirecionar para outra página
    }
  };

  // Função para pular o tutorial (exemplo com console.log)
  const skipTutorial = () => {
    console.log('Pular tutorial');
    onClose();
  };
  

  return (
    <div>
      <div className="overlay" onClick={skipTutorial}></div>
      <div
        className={`tutorial-modal ${step === 5 ? 'last-step' : ''} ${step === 1 ? 'step-one' : ''} ${step === 2 ? 'step-two' : ''} ${step === 3 ? 'step-three' : ''} ${step === 4 ? 'step-four' : ''} ${step === 5 ? 'step-five' : ''}`}
      >
        <h2>{getStepTitle(step)}</h2>
        <p>{getStepContent(step)}</p>
        
        <div className="arrow" onClick={nextStep}>
          <span>&rarr;</span>
        </div>

        {step !== 4 && (
          <div className="skip" onClick={skipTutorial}>
            Pular Tutorial
          </div>
        )}
      </div>
    </div>
  );
};

const getStepTitle = (step) => {
  switch (step) {
    case 1:
      return "Título do Primeiro Passo";
    case 2:
      return "Título do Segundo Passo";
    case 3:
      return "Título do Terceiro Passo";
    case 4:
      return "Título do quarto Passo";
    case 5:
      return "Título do Último Passo";
    default:
      return "";
  }
};

const getStepContent = (step) => {
  switch (step) {
    case 1:
      return "Conteúdo do Primeiro Passo";
    case 2:
      return "Conteúdo do Segundo Passo";
    case 3:
      return "Conteúdo do Terceiro Passo";
    case 4:
      return "Conteúdo do Quarto Passo";
    case 5:
      return "Conteúdo do Último Passo";
    default:
      return "";
  }
};

export default TutorialModal;
