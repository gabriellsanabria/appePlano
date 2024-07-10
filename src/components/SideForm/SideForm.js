import React from 'react';
import PropTypes from 'prop-types';

// Import different types of SideForm as needed
import SideFormProdutos from '../../views/Planejador/ProdutosServicos/SideFormProdutos';
import SideFormEstimarReceitas from '../../views/Planejador/EstimarReceitas/SideFormEstimarReceitas';
import SideFormEstimarDespesas from '../../views/Planejador/EstimarDespesas/SideFormEstimarDespesas';

const SideForm = ({ type, closeSideForm, onAdd }) => {
  switch (type) {
    case 'SideFormProdutos':
      return <SideFormProdutos closeSideForm={closeSideForm} onAdd={onAdd} />;
    case 'SideFormEstimarReceitas':
      return <SideFormEstimarReceitas closeSideForm={closeSideForm} onAdd={onAdd} />;
    case 'SideFormEstimarDespesas':
      return <SideFormEstimarDespesas closeSideForm={closeSideForm} onAdd={onAdd} />;
    default:
      return (
        <div>
          SideForm for '{type}' not found.
        </div>
      );
  }
};

SideForm.propTypes = {
  type: PropTypes.string.isRequired,
  closeSideForm: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired, // Ensure onAdd is required and of type function
};

export default SideForm;
