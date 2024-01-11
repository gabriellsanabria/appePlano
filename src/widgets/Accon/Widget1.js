import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LabelList } from 'recharts';

const Widget2 = ({ width, height }) => {
  const [chartWidth, setChartWidth] = useState(width || 600);
  const [chartHeight, setChartHeight] = useState(height || 300);

  useEffect(() => {
    // Atualiza as dimensões do gráfico quando o tamanho do widget é alterado
    setChartWidth(width || 600);
    setChartHeight(height || 300);
  }, [width, height]);

  // Dados para o gráfico
  const data = [
    { name: 'Indaiatuba', Vendas: 20000 },
    { name: 'Pinheiros', Vendas: 15000 },
    { name: 'Campinas', Vendas: 10000 },
    { name: 'Jundiaí', Vendas: 5000 },
    // Adicione mais unidades conforme necessário
  ];

  return (
    <div className='palco'>
      <div className='titulo-grafico'>Vendas por Unidade (Gráfico de Barras)</div>
      <BarChart width={chartWidth} height={chartHeight} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='Vendas' fill='#8884d8'>
          <LabelList dataKey='Vendas' position='top' />
        </Bar>
      </BarChart>
    </div>
  );
};

export default Widget2;
