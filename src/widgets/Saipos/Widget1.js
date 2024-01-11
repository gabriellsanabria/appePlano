import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const Widget1 = ({ width, height }) => {
  const [chartWidth, setChartWidth] = useState(width || 600);
  const [chartHeight, setChartHeight] = useState(height || 300);

  useEffect(() => {
    // Atualiza as dimensões do gráfico quando o tamanho do widget é alterado
    setChartWidth(width || 600);
    setChartHeight(height || 300);
  }, [width, height]);

  // Dados para o gráfico
  const data = [
    { name: 'Novos Clientes', value: 40 },
    { name: 'Segundo Pedido', value: 30 },
    { name: 'Terceiro Pedido ou mais', value: 30 },
  ];

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1'];

  return (
    <div className='palco'>
      <div className='titulo-grafico'>Taxa de Novos Clientes</div>
      <PieChart width={chartWidth} height={chartHeight}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Widget1;
