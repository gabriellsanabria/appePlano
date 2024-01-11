import React, { useState } from 'react';
import './FormularioContato.scss'; // Certifique-se de importar o arquivo de estilo

const FormularioContato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    mensagem: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para lidar com o envio do formulário
    console.log('Formulário enviado:', formData);
  };

  return (
    <div className="formulario-contato">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp:</label>
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={10}
              value={formData.mensagem}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
            <div className='send-form'>
                <button type="submit">Enviar</button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioContato;
