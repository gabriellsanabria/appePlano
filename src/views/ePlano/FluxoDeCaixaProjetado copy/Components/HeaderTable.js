import React from 'react';

const HeaderTable = ({ meses }) => {

  return (
    <div className='table header'>
      <div className='row'>
        <div className='cellCol primary-color'>Cálculo</div>
        <div className='cell primary-color'>Total</div>
        {meses.map((mes, index) => (
          <div key={index} className='cell primary-color'>{mes}</div>
        ))}
      </div>
    </div>
  );
};

export default HeaderTable;
