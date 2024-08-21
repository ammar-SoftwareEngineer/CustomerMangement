import React, { createContext, useEffect,useMemo } from 'react';
import getCustomers from '@store/customer/getCustomers';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import getTransaction from '@store/transactions/getTransactions';

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
  loadingCustomers: string
  loadingTransactionsData: string,
  error: string | null
}

const DataContext = createContext<DataContextType>({
  filteredData: [],
  loadingCustomers: 'idle',
  loadingTransactionsData: 'idle',
  error: null,
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatchCustomers = useAppDispatch();
  const dispatchTransaction = useAppDispatch();
  const customers = useAppSelector((state) => state.customers)
  const transactions = useAppSelector((state) => state.transactions)

  useEffect(() => {
    dispatchCustomers(getCustomers());
    dispatchTransaction(getTransaction());
  }, [dispatchCustomers, dispatchTransaction]);

  const filteredData = useMemo(() => customers.records.map((customer) => {    
    const customerTransactions = transactions.records.filter(transaction => transaction.customer_id == customer.id);
    return {
      ...customer,
      transactions: customerTransactions
    };
  }), [customers.records, transactions.records]
  )
  // Loading Data
  const loadingCustomers = customers.loading
  const loadingTransactionsData = transactions.loading

  // Error Data
  const errorCustomers = customers.error
  const errorTransactions = transactions.error
  // DataContext provider
  return (
    <DataContext.Provider value={{ filteredData, loadingCustomers, loadingTransactionsData, error: errorCustomers || errorTransactions }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };