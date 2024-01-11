// Grafico2.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Grafico2 = ({ totalAmount }) => {
  // Dados do gráfico de barras
  const data = [{ name: 'Total Amount', value: totalAmount }];

  return (
    <div>
      <h2>Grafico 2</h2>
      {/* Exibe o gráfico de barras */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      {/* Exibe o valor formatado como moeda brasileira (BRL) */}
      <p>Total Amount: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalAmount)}</p>
    </div>
  );
};

export default Grafico2;
