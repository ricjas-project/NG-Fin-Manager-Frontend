import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    
    return (
        <DataContext.Provider value={{ users, setUsers, transactions, setTransactions }}>
            {children}
        </DataContext.Provider>
    );
};