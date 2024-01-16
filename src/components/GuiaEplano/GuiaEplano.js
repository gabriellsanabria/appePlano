// GuiaEplano.js

import React, { useState, useEffect } from 'react';
import './GuiaEplano.scss';
import { IoClose, IoChevronDown, IoChevronUp, IoChevronRight } from 'react-icons/io5';
import { PiNewspaperBold } from 'react-icons/pi';
import { FaRegBuilding, FaToolbox } from 'react-icons/fa';
import { TbReportAnalytics } from 'react-icons/tb';

const GuiaEplano = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Produtos ou Serviços',
    'Resumo Executivo',
    'Descrição da Empresa',
    'Análise de Mercado',
  ];

  const descriptions = [
    'Produtos ou Serviços',
    'Seção crucial que fornece uma visão geral do seu empreendimento',
    'Fornece uma visão geral concisa da natureza da sua empresa.',
    'Análise de Mercado',
  ];

  const icones = [
    <FaToolbox />,
    <PiNewspaperBold />,
    <FaRegBuilding />,
    <TbReportAnalytics />,
    // Adicione ícones para os novos passos conforme necessário
  ];

  const handleCloseGuia = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStartButtonClick = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(currentStep + 1);
    } else {
      // Lógica adicional quando todos os passos estiverem concluídos
    }
  };

  return (
    <div className='guia-eplano'>
      <div className={`header-guia ${isExpanded ? 'expanded' : 'collapsed'}`} onClick={handleCloseGuia}>
        <div className='titulo-guia'>
          <IoClose style={{ marginRight: '10px' }} />
          <h1>Guia para Construir o seu ePlano</h1>
          <p>Tenha um plano de negócios em menos de 10 minutos</p>
        </div>
        <div className='close-guia' onClick={handleCloseGuia}>
          <div className='botao'>
            {isExpanded ? <IoChevronUp /> : <IoChevronDown />}
          </div>
        </div>
      </div>

      <div className='progress-box'>
        <div className='progress-bar' style={{ width: `${(progress / (steps.length - 1)) * 100}%` }}></div>
      </div>

      <div className={`blocks ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className='steps'>
          {steps.map((step, index) => (
            <div key={index} className={`block ${index < progress ? 'completed' : ''}`}>
              <div className='contBox'>
                <div className='ttlBox'>
                  <div className='icone-box-guia'>{icones[index]}</div>
                  <div className='titulo-box-guia'>{step}</div>
                </div>
                <div className='body-box'>
                  <p>{descriptions[index]}</p>
                </div>
                <div className='footer-box'>
                  <button onClick={handleStartButtonClick}>Começar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuiaEplano;
