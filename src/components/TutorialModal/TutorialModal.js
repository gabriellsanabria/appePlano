import React, { useState } from 'react';
import './TutorialModal.scss'; // Importe o arquivo de estilo CSS
import { FaPlusCircle,FaTimes, FaArrowCircleRight } from "react-icons/fa";



const TutorialModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Lógica para lidar com o fim do tutorial
      // Pode fechar o modal ou redirecionar para outra página
      onClose();
    }
  };

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
        {step !== 5 && (
          <div className="step-indicator">
            Passo {step} de 4
          </div>
        )}

        {step !== 5 && (
          <div className="skip" onClick={skipTutorial}>
            Pular Tutorial
          </div>
        )}

        <div className="arrow" onClick={nextStep}>
          <FaArrowCircleRight/>
        </div>
        <div className='corpo-tutorial'>          
          <h2>{getStepTitle(step)}</h2>
          <p>{getStepContent(step)}</p>
        </div>
      </div>
    </div>
  );
};

const getStepTitle = (step) => {
  switch (step) {
    case 1:
      return "Tudo o que você precisar está aqui";
    case 2:
      return "Informações da sua conta";
    case 3:
      return "Acesso rápido dos ePlanos";
    case 4:
      return "Integrações";
    case 5:
      return "Comece agora";
    default:
      return "";
  }
};

const getStepContent = (step) => {
  switch (step) {
    case 1:
      return "Aqui fica o menu administrativo. Se precisar configurar a sua conta, contratar mais planos ou falar com o suporte, clique aqui!";
    case 2:
      return "Aqui é possível ver o nome da sua empresa e quantos planos de negócios você possui";
    case 3:
      return "Tenha acesso aos seus planos com poucos cliques";
    case 4:
      return "Sugira/Solicite uma integração sempre que precisar";
    case 5:
      return "Clique aqui e vamos começar o seu primeiro ePlano";
    default:
      return "";
  }
};

export default TutorialModal;