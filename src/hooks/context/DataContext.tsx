import getCustomers from '@store/customer/getCustomers';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import getTransaction from '@store/transactions/getTransactions';
import React, { createContext, useEffect } from 'react';

interface Transaction {
  id: number;
  customer_id: number;
  date: string;
  amount: number;
}

interface Customer {
  id: number;
  name: string;
  transactions: Transaction[];
}

interface DataContextType {
  filteredData: Customer[];
}

const DataContext = createContext<DataContextType>({
  filteredData: [],
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatchCustomers = useAppDispatch();
  const dispatchTransaction = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions)
  const customers = useAppSelector((state) => state.customers)

  useEffect(() => {
    dispatchCustomers(getCustomers());
    dispatchTransaction(getTransaction());
  }, [dispatchCustomers, dispatchTransaction]);

  const filteredData = customers.records.map((customer) => {
    const customerTransactions = transactions.records.filter(transaction => transaction.customer_id == customer.id );
    return {
      ...customer,
      transactions: customerTransactions
    };
  });

  return (
    <DataContext.Provider value={{ filteredData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };