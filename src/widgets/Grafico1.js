// Grafico1.js
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const Grafico1 = ({ totalAmount }) => {
  // Configuração do gráfico de pizza
  const data = [{ name: 'Total Amount', value: totalAmount }];
  const COLORS = ['#FF6384']; // Cor de preenchimento

  return (
    <div>
      <h2>Grafico 1</h2>
      {/* Exibe o gráfico de pizza */}
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" cx={200} cy={200} outerRadius={80} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      {/* Exibe o valor formatado como moeda brasileira (BRL) */}
      <p>Total Amount: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalAmount)}</p>
    </div>
  );
};

export default Grafico1;
