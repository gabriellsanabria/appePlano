import React from 'react';
import PropTypes from 'prop-types';

const SideFormProdutos = ({ closeSideForm }) => {
  const handleClose = () => {
    closeSideForm(); // Calling the closeSideForm function received via props
  };

  return (
    <>
      <div className='sideForm-header'>
          <h1>Cadastre um produto/serviço</h1>
      </div>
      <div className='sideForm-body'>
          <div className='form-content'>
              <label>Nome do Produto/Serviço</label>
              <input
                type='text'
                placeholder='Nome do Produto/Serviço' 
              />
          </div>            
          <div className='form-content'>
              <label>Descrição</label>
              <textarea rows='8' />
          </div>            
      </div>
      <div className='sideForm-footer'>
          <button className='cancelButton' onClick={handleClose}>Cancelar</button>
          <button className='saveButton'>Salvar</button>
      </div>
    </>
  );
};

SideFormProdutos.propTypes = {
  closeSideForm: PropTypes.func.isRequired,
};

export default SideFormProdutos;
