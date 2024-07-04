// DynamicComponentLoader.js

import React, { useState, useEffect } from 'react';
import Grafico1 from '../widgets/Grafico1';
import Grafico2 from '../widgets/Grafico2';

const DynamicComponentLoader = ({ widgetId, chartType, ...props }) => {
  const [isReady, setIsReady] = useState(false);
  const [ComponentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      const component = getComponent(widgetId);

      if (component) {
        const defaultProps = component.defaultProps || {};

        if (chartType === 'linha') {
          defaultProps.chartType = 'linha';
        } else if (chartType === 'pizza') {
          defaultProps.chartType = 'pizza';
        }

        setComponentToRender(() => component);
        setIsReady(true);
      }
    };

    loadComponent();
  }, [widgetId, chartType]);

  const getComponent = (id) => {
    switch (id) {
      case 'g5a6vdtti7':
        return Grafico1;
      case '28kdn983j':
        return Grafico2;
      // Adicione mais casos conforme necessário
      default:
        return null; // Componente padrão ou tratamento de erro
    }
  };

  if (!isReady) {
    return <div>Carregando...</div>;
  }

  return <ComponentToRender {...props} />;
};

export default DynamicComponentLoader;
