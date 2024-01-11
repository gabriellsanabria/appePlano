import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Layout from '../../components/Layout/layout';

const RegistroBanco = () => {
  const generateRandomWidgetId = () => {
    // Gera um ID de widget aleatório com 9 caracteres
    return Math.random().toString(36).substr(2, 9);
  };

  const [chartType, setChartType] = useState('');
  const [componentId, setComponentId] = useState('');
  const [description, setDescription] = useState('');
  const [label, setLabel] = useState('');
  const [type, setType] = useState('');
  const [widgetId, setWidgetId] = useState(generateRandomWidgetId());

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const db = getFirestore();
      const widgetsBaseCollection = collection(db, 'widgetsBase');

      // Adiciona os dados do formulário ao Firestore
      await addDoc(widgetsBaseCollection, {
        chartType,
        componentId,
        description,
        label,
        type,
        widgetId,
      });

      // Limpa o formulário após o envio
      setChartType('');
      setComponentId('');
      setDescription('');
      setLabel('');
      setType('');
      setWidgetId(generateRandomWidgetId());

      console.log('Dados do widget cadastrados com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar dados do widget:', error);
    }
  };

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <form onSubmit={handleFormSubmit}>
            <label>
              Chart Type:
              <input type='text' value={chartType} onChange={(e) => setChartType(e.target.value)} />
            </label>
            <label>
              Component ID:
              <input type='text' value={componentId} onChange={(e) => setComponentId(e.target.value)} />
            </label>
            <label>
              Description:
              <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
              Label:
              <input type='text' value={label} onChange={(e) => setLabel(e.target.value)} />
            </label>
            <label>
              Type:
              <input type='text' value={type} onChange={(e) => setType(e.target.value)} />
            </label>
            <label>
              Widget ID:
              <input type='text' value={widgetId} readOnly />
            </label>
            <button type='submit'>Cadastrar Widget</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegistroBanco;
