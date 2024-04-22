import React, { useState } from 'react';
import Select from 'react-select';

import { FaTimes } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { FaQuestionCircle } from 'react-icons/fa';

import './GuiaEplanoModal.scss';

const categoriasPrimarias = [
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educação', label: 'Educação' },
  { value: 'alimentos', label: 'Alimentos' },
  { value: 'moda', label: 'Moda' },
  { value: 'construcao', label: 'Construção' },
  { value: 'varejo', label: 'Varejo' },
  { value: 'automotivo', label: 'Automotivo' },
  { value: 'entretenimento', label: 'Entretenimento' },
  { value: 'financas', label: 'Finanças' },
  { value: 'viagens', label: 'Viagens' },
  { value: 'beleza', label: 'Beleza' },
  { value: 'meioambiente', label: 'Meio Ambiente' },
  { value: 'esportes', label: 'Esportes' },
  { value: 'agricultura', label: 'Agricultura' },
  { value: 'energia', label: 'Energia' },
  { value: 'imobiliario', label: 'Imobiliário' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'servicossociais', label: 'Serviços Sociais' },
  { value: 'logistica', label: 'Logística' },
  { value: 'telecomunicacoes', label: 'Telecomunicações' },
  { value: 'manufatura', label: 'Manufatura' },
  { value: 'arteecultura', label: 'Arte e Cultura' },
  { value: 'juridico', label: 'Jurídico' },
  { value: 'saudeanimal', label: 'Saúde Animal' },
  { value: 'tecnologiaeducacional', label: 'Tecnologia Educacional' },
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'restaurantes', label: 'Restaurantes' },
  { value: 'organizacaoeventos', label: 'Organização de Eventos' },
  { value: 'design', label: 'Design' },
];


const ModalResumoExecutivo = ({ isOpen, onClose, empresaInfo, onInputChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [missao, setMissao] = useState(''); // Adicione este estado
  const [visao, setVisao] = useState('');   // Adicione este estado
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };
  

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleCategoriaChange = (selectedOption) => {
    setSelectedCategoria(selectedOption);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onInputChange({ [name]: value });
  };
  
  const renderStepContent = () => {
    // Adicione o conteúdo para cada etapa aqui
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2>Qual é a categoria da empresa?</h2>
            <Select
              value={selectedCategoria}
              onChange={handleCategoriaChange}
              options={categoriasPrimarias}
              isSearchable
              placeholder="Selecione uma categoria..."
            />
          </div>
        );
        case 1:
          return (
            <div>
              <h2>Qual é o nome fantasia da empresa?</h2>
              <input
                type="text"
                name="nomeFantasia"
                onChange={(e) => setNomeFantasia(e.target.value)}
                placeholder="Digite o nome fantasia..."
              />
            </div>
          );        
          case 2:
            return (
              <div>
                <h2>Qual é a missão e visão da empresa?</h2>
                <div className="textarea-container">
                  <textarea
                    name="missao"
                    value={missao}
                    onChange={(e) => setMissao(e.target.value)}
                    placeholder="Digite a missão da empresa"
                  />
                  <div className="help-icon" onClick={toggleHelp}>
                    <FaQuestionCircle />
                  </div>
                </div>
                {showHelp && (
                  <p>
                    Aqui você pode fornecer informações sobre a missão da empresa.
                    Este campo é destinado a descrever os objetivos e propósitos fundamentais
                    que a empresa busca alcançar.
                  </p>
                )}
                <div className="textarea-container">
                  <textarea
                    name="visao"
                    value={visao}
                    onChange={(e) => setVisao(e.target.value)}
                    placeholder="Digite a visão da empresa"
                  />
                  <div className="help-icon" onClick={toggleHelp}>
                    <FaQuestionCircle />
                  </div>
                </div>
              </div>
            );
          
      case 3:
        return (
          <div>
            <h2>História da empresa?</h2>
            <div className="textarea-container">
              <textarea
                name="missao"
                value={missao}
                onChange={(e) => setMissao(e.target.value)}
                placeholder="Digite a missão da empresa"
              />
              <div className="help-icon" onClick={toggleHelp}>
                <FaQuestionCircle />
              </div>
            </div>
            
          </div>
        );
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
            Progresso: Passo {currentStep + 1}/5
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalResumoExecutivo;
