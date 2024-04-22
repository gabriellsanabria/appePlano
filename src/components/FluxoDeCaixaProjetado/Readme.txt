/src
  /components
    /FluxoDeCaixaProjetado
      - index.jsx                     # Componente principal que monta a página do fluxo de caixa
      - FluxoDeCaixaContext.jsx       # Contexto de React para gerenciamento de estado global do fluxo de caixa
      /components
        - TabelaInvestimento.jsx      # Tabela para "Investimentos Estimados" e suas subcategorias
        - TabelaReceitaBruta.jsx      # Tabela para "Receita Bruta (Estimada)"
        - TabelaDespesas.jsx          # Tabela para "Despesas Estimadas"
        - TabelaCaixaInicial.jsx      # Componente para mostrar o "Caixa Inicial"
        - TabelaFluxoDeCaixa.jsx      # Componente para o "Fluxo de Caixa"
        - TabelaLucroLiquido.jsx      # Componente para "Lucro Líquido Mensal" e "Lucro Líquido Acumulado"
        - TabelaCaixa.jsx             # Componente para o "Caixa"
      /styles
        - FluxoDeCaixaProjetado.scss  # Estilos específicos para o fluxo de caixa
      /hooks
        - useFluxoDeCaixa.js          # Hook personalizado para lógicas específicas de cálculo e manipulação de dados
