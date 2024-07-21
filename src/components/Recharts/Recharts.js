import React from 'react';
import './Recharts.scss'; 
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const barChartData = [
  { name: 'Janeiro', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Fevereiro', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Março', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Abril', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Maio', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Junho', uv: 2390, pv: 3800, amt: 2500 },
];

const lineChartData = [
  { name: 'Janeiro', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Fevereiro', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Março', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Abril', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Maio', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Junho', uv: 2390, pv: 3800, amt: 2500 },
];

const pieChartData = [
  { name: 'Grupo A', value: 400 },
  { name: 'Grupo B', value: 300 },
  { name: 'Grupo C', value: 300 },
  { name: 'Grupo D', value: 200 },
];

const areaChartData = [
  { name: 'Janeiro', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Fevereiro', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Março', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Abril', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Maio', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Junho', uv: 2390, pv: 3800, amt: 2500 },
];

const scatterChartData = [
  { x: 10, y: 30, z: 20 },
  { x: 30, y: 40, z: 25 },
  { x: 45, y: 80, z: 60 },
  { x: 70, y: 10, z: 30 },
  { x: 100, y: 30, z: 40 },
];

const Recharts = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '80%', marginBottom: '40px' }}>
        <h2>Gráficos de Exemplo</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {/* Gráfico de Barras */}
          <div>
            <h3>Gráfico de Barras</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Linhas */}
          <div>
            <h3>Gráfico de Linhas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={lineChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pizza */}
          <div>
            <h3>Gráfico de Pizza</h3>
            <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="transparent" // Define o preenchimento como transparente
                    label
                    className="custom-pie" // Aplica a classe CSS personalizada
                    stroke="#8884d8" // Define a cor da borda
                    strokeWidth={6} // Define a largura da borda
                />
                <Tooltip />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Área */}
          <div>
            <h3>Gráfico de Área</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={areaChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="pv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="uv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Dispersão */}
          <div>
            <h3>Gráfico de Dispersão</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="x" />
                <YAxis type="number" dataKey="y" name="y" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="A scatter" data={scatterChartData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recharts;
