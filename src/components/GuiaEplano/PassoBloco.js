// PassoBloco.js

import React from 'react';

const PassoBloco = ({ step, description, icon, progress, onClickStart }) => {
  return (
    <div className={`block ${progress ? 'completed' : ''}`}>
      <div className='contBox'>
        <div className='ttlBox'>
          <div className='icone-box-guia'>{icon}</div>
          <div className='titulo-box-guia'>{step}</div>
        </div>
        <div className='body-box'>
          <p>{description}</p>
        </div>
        <div className='footer-box'>
          <button onClick={onClickStart}>Começar</button>
        </div>
      </div>
    </div>
  );
};

export default PassoBloco;
