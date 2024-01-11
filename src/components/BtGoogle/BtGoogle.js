import React from 'react';
import './BtGoogle.scss';

const BtGoogle = ({ onGoogleClick }) => {
  return (
    <div className="google-button" onClick={onGoogleClick}>
      <img src="https://eplano.s3.sa-east-1.amazonaws.com/google-logo-on.jpg" alt="Logo do Google" className="google-logo" />
      
      <span className="button-text">Entre com o Google</span>
    </div>
  );
};

export default BtGoogle;
