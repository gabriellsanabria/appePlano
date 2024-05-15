// GuiaEplano.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

import './GuiaEplano.scss';
import { IoClose, IoChevronDown, IoChevronUp, IoChevronRight } from 'react-icons/io5';
import { PiNewspaperBold } from 'react-icons/pi';
import { FaRegBuilding, FaToolbox, FaTimes } from 'react-icons/fa';
import { TbReportAnalytics } from 'react-icons/tb';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { FaRegCircleCheck } from "react-icons/fa6";
import { PiFilePdfFill } from "react-icons/pi";
import { RiOrganizationChart } from "react-icons/ri";

import ModalResumoExecutivo from './ModalResumoExecutivo';
import ModalCadastreEmpresa from './ModalCadastreEmpresa';


const GuiaEplano = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResumoExecutivoModalOpen, setIsResumoExecutivoModalOpen] = useState(false);
  const [isCnpjModalOpen, setIsCnpjModalOpen] = useState(false);

  const [modalInputValue, setModalInputValue] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCadastroEmpresaEnabled, setIsCadastroEmpresaEnabled] = useState(false); // Initialize with an appropriate value
  const navigate = useNavigate(); // Obtenha a função navigate


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleModalInputChange = (event) => {
    setModalInputValue(event.target.value);
  };

  const steps = [
    'Cadastre uma Empresa',
    'Receitas',
    'Despesas',
    'Investimentos',
  ];

  const descriptions = [
    'Forneça os dados da empresa que vamos gerar um Plano de Negócio',
    'Vamos estimar as Receitas Mensais do seu Negócio',
    'Vamos definir e estimar as Despesas Mensais do seu Negócio',
    'Vamos definir e estimar os investimentos do seu Negócio',
  ];

  const icones = [
    <FaRegBuilding />,
    <PiNewspaperBold />,
    <TbReportAnalytics />,
    <FaToolbox />,
    <RiOrganizationChart />,
    // <PiFilePdfFill />,
  ];

  const handleCloseGuia = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStartButtonClick = (index) => {
    setSelectedOption(index);
    switch (index) {
      case 0:
        setIsCnpjModalOpen(true);
        break;
      case 1:
        navigate('/estimar-receitas');
        break;
      case 2:
        navigate('/estimar-despesas');
        break;
      case 3:
        navigate('/estimar-investimentos');
        break;
      default:
        break;
    }
  };
  
  return (
    <div className='guia-eplano'>
      <div className={`header-guia ${isExpanded ? 'expanded' : 'collapsed'}`} onClick={handleCloseGuia}>
        <div className='titulo-guia'>
          <IoClose style={{ marginRight: '10px' }} />
          <h1>Guia Rápido para Construir o seu ePlano Financeiro</h1>
          <p>Tenha o ePlano Financeiro do seu Negócio em 3 Etapas</p>
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
      <div key={index} onClick={() => handleStartButtonClick(index)} className={`block ${index < progress ? 'completed' : ''}`}>
        <div className='contBox'>
          <div className='ttlBox'>
            <div className='icone-box-guia'>{icones[index]}</div>
            <div className='titulo-box-guia'>{step}</div>
          </div>
          <div className='body-box'>
            {index === 0 ? (
              <div className='etapaConcluida'>
                {isCadastroEmpresaEnabled ? (
                  descriptions[index]
                ) : (
                  <>
                    <FaRegCircleCheck />
                    Etapa concluída
                  </>
                )}
              </div>
            ) : (
              <p>{descriptions[index]}</p>
            )}
          </div>

          <div className='footer-box'>
            {index === 0 ? (
             <span></span>
            ) : (
              // Botão 'Começar' para outros passos
              <button onClick={() => handleStartButtonClick(index)}>Começar</button>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>

        {selectedOption === 1 && (
          <ModalResumoExecutivo
            isOpen={isResumoExecutivoModalOpen}
            onClose={() => {
              setIsResumoExecutivoModalOpen(false);
              setSelectedOption(null);
            }}
          />
        )}
        {selectedOption === 0 && (
          <ModalCadastreEmpresa
            isOpen={isCnpjModalOpen}
            onClose={() => {
              setIsCnpjModalOpen(false);
              setSelectedOption(null);
            }}
          />
        )}

      </div>
    </div>
  );
};

export default GuiaEplano;
