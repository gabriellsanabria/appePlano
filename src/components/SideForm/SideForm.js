import React from 'react';
import PropTypes from 'prop-types';

// Importar diferentes tipos de SideForm conforme necessário
// Planejador
import SideFormProdutos from '../../views/Planejador/ProdutosServicos/SideFormProdutos';
import SideFormEstimarReceitas from '../../views/Planejador/EstimarReceitas/SideFormEstimarReceitas';
import SideFormEstimarDespesas from '../../views/Planejador/EstimarDespesas/SideFormEstimarDespesas';
import SideFormEstimarInvestimentos from '../../views/Planejador/EstimarInvestimentos/SideFormEstimarInvestimentos';
import SideFormImposto from '../../views/Planejador/Impostos/SideFormImpostos';

// Simulador
import SideFormEstimarCaixa from '../../views/Simulador/EstimarCaixa/SideFormEstimarCaixa';
import SideFormProdutosSimulador from '../../views/Simulador/ProdutosServicos/SideFormProdutos';
import SideFormEstimarReceitasSimulador from '../../views/Simulador/EstimarReceitas/SideFormEstimarReceitas';
import SideFormEstimarDespesasSimulador from '../../views/Simulador/EstimarDespesas/SideFormEstimarDespesas';

const SideForm = ({ type, closeSideForm, onAdd, actionType, idForEdit }) => {
  switch (type) {
    case 'SideFormProdutos':
      return <SideFormProdutos closeSideForm={closeSideForm} onAdd={onAdd} />;
    case 'SideFormEstimarReceitas':
      return <SideFormEstimarReceitas closeSideForm={closeSideForm} onAdd={onAdd} />;
    case 'SideFormEstimarDespesas':
      return <SideFormEstimarDespesas closeSideForm={closeSideForm} onAdd={onAdd} />;
    case 'SideFormEstimarInvestimentos':
      return <SideFormEstimarInvestimentos closeSideForm={closeSideForm} onAdd={onAdd} />;
    case 'SideFormImposto':
      return <SideFormImposto closeSideForm={closeSideForm} onAdd={onAdd} />;
    case 'SideFormEstimarCaixa':
      return <SideFormEstimarCaixa closeSideForm={closeSideForm} onAdd={onAdd} />;
    
    case 'SideFormProdutosSimulador':
      return (
        <SideFormProdutosSimulador 
          closeSideForm={closeSideForm} 
          onAdd={onAdd} 
          actionType={actionType}    
          idForEdit={idForEdit}
        />
    );    
    
    case 'SideFormEstimarReceitasSimulador':
      return (
        <SideFormEstimarReceitasSimulador 
          closeSideForm={closeSideForm} 
          onAdd={onAdd} 
          actionType={actionType}    
          idForEdit={idForEdit}
        />
    );    

    case 'SideFormEstimarDespesasSimulador':
      return <SideFormEstimarDespesasSimulador closeSideForm={closeSideForm} onAdd={onAdd} />;
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
  onAdd: PropTypes.func.isRequired,
  actionType: PropTypes.string,
  idForEdit: PropTypes.string,
};

export default SideForm;
