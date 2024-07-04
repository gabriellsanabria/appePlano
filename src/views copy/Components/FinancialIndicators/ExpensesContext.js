import React, { createContext, useState, useContext } from 'react';

const ExpensesContext = createContext();

export const useExpenses = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
    const [structureExpenseTotal, setStructureExpenseTotal] = useState(0);

    return (
        <ExpensesContext.Provider value={{ structureExpenseTotal, setStructureExpenseTotal }}>
            {children}
        </ExpensesContext.Provider>
    );
};
