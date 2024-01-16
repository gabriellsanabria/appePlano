// GuiaEplano.js

import React, { useState, useEffect } from 'react';

import './GuiaEplano.scss';
import { IoClose, IoChevronDown, IoChevronUp, IoChevronRight } from 'react-icons/io5';
import { PiNewspaperBold } from 'react-icons/pi';
import { FaRegBuilding, FaToolbox, FaTimes } from 'react-icons/fa';
import { TbReportAnalytics } from 'react-icons/tb';
import ModalResumoExecutivo from './ModalResumoExecutivo';
import PassoBloco from './PassoBloco';
import ModalCadastreEmpresa from './ModalCadastreEmpresa';


const GuiaEplano = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResumoExecutivoModalOpen, setIsResumoExecutivoModalOpen] = useState(false);
  const [isCnpjModalOpen, setIsCnpjModalOpen] = useState(false);

  const [modalInputValue, setModalInputValue] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
    'Resumo Executivo',
    'Descrição da Empresa',
    'Produtos ou Serviços',
  ];

  const descriptions = [
    'Forneça os dados da empresa que vamos gerar um Plano de Negócio',
    'Seção crucial que fornece uma visão geral do seu empreendimento',
    'Fornece uma visão geral concisa da natureza da sua empresa.',
    'Produtos ou Serviços',
  ];

  const icones = [
    <FaRegBuilding />,
    <PiNewspaperBold />,
    <TbReportAnalytics />,
    <FaToolbox />,
    // Adicione ícones para os novos passos conforme necessário
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
        setIsResumoExecutivoModalOpen(true);
        break;
      // Adicione mais cases conforme necessário para outros passos
      default:
        break;
    }
  };
  
  
  // Estados para os inputs do resumo executivo
  const [empresaInfo, setEmpresaInfo] = useState({
    nome: '',
    missao: '',
    visao: '',
    descricao: '',
    setor: '',
  });

  // Função para atualizar os estados dos inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmpresaInfo((prevEmpresaInfo) => ({
      ...prevEmpresaInfo,
      [name]: value,
    }));
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
                  <button onClick={() => handleStartButtonClick(index)}>Começar</button>
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
