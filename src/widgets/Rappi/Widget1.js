import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Widget1 = ({ width, height }) => {
  const [chartWidth, setChartWidth] = useState(width || 600);
  const [chartHeight, setChartHeight] = useState(height || 300);

  useEffect(() => {
    // Atualiza as dimensões do gráfico quando o tamanho do widget é alterado
    setChartWidth(width || 600);
    setChartHeight(height || 300);
  }, [width, height]);

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    // ... adicione seus dados aqui
  ];

  return (
    <div className='palco'>
    <div className='titulo-grafico'>Faturamento Mensal (R$)</div>
      <BarChart width={chartWidth} height={chartHeight} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        {/* Adicione mais barras conforme necessário */}
      </BarChart>
    </div>
  );
};

export default Widget1;
