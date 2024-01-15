// GuiaEplano.js

import React, { useState, useEffect } from 'react';
import './GuiaEplano.scss';

const GuiaEplano = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Resumo Executivo',
    'Descrição da Empresa',
    'Produtos ou Serviços',
    'Análise de Mercado',
    // Adicione mais passos conforme necessário
  ];

  const descriptions = [
    'Seção crucial que fornece uma visão geral concisa e persuasiva do seu empreendimento',
    'Fornece uma visão geral concisa da natureza da sua empresa.',
    'Produtos ou Serviços',
    'Análise de Mercado',
    // Adicione mais passos conforme necessário
  ];

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStartButtonClick = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(currentStep + 1);
    } else {
      // Caso todos os passos estejam concluídos, pode adicionar alguma lógica adicional aqui
      console.log('Todos os passos concluídos.');
    }
  };

  return (
    <div>
      <h1>Guia para Construir o seu ePlano</h1>
      <div className={`blocks ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className='progress-bar' style={{ width: `${(progress / (steps.length - 1)) * 100}%` }}></div>
        <div className='steps'>
          {steps.map((step, index) => (
            <div key={index} className={`block ${index < progress ? 'completed' : ''}`} onClick={toggleExpansion}>
              <div className='contBox'>
                <div className='ttlBox'>{step}</div>
                <p>{descriptions[index]}</p>
                <button onClick={handleStartButtonClick}>Começar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuiaEplano;
