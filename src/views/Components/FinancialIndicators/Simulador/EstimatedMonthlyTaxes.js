import React, { Component } from 'react';

class EstimatedMonthlyTaxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyTax: null
    };
  }

  componentDidMount() {
    fetch('https://api.eplano.com.br/listar_impostos_mensais')
      .then(response => response.json())
      .then(data => {
        // Supondo que a resposta é um array e você quer o primeiro elemento
        const monthlyTax = parseFloat(data[0].valor_imposto_mensal); // Convertendo para número
        this.setState({ monthlyTax });
      })
      .catch(error => console.error('Erro ao buscar impostos mensais:', error));
  }

  render() {
    const { monthlyTax } = this.state;
    const formattedMonthlyTax = monthlyTax !== null ? `${monthlyTax.toFixed(0)}%` : "-";
    return (
      <div>
        {formattedMonthlyTax}
      </div>
    );
  }
}

export default EstimatedMonthlyTaxes;