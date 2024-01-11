import React from 'react';
import './ContatoComp.scss'; // Importe o arquivo SCSS
import FormularioContato from '../../components/Formularios/FormularioContato';

const ContatoComp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para lidar com o envio do formulário
  };

  return (
    <section className="contact-section">
      <div className="form-container">
        <h2 className="title">Fale com a gente</h2>
        <FormularioContato />
      </div>
    </section>
  );
};

export default ContatoComp;
