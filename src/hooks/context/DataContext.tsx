import getCustomers from '@store/customer/getCustomers';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import getTransaction from '@store/transactions/getTransactions';
import React, { createContext, useEffect, useState } from 'react';

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
  setSelectedDate: (date: string | null) => void;
  selectedDate: string | null;
}

const DataContext = createContext<DataContextType>({
  filteredData: [],
  setSelectedDate: () => {},
  selectedDate: null
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatchCustomers = useAppDispatch();
  const dispatchTransaction = useAppDispatch();
  const { loading: loadingCustomers, error: errorCustomers, records: customers } = useAppSelector((state) => state.customers);
  const { loading: loadingTransactions, error: errorTransactions, records: transactions } = useAppSelector((state) => state.transactions);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    dispatchCustomers(getCustomers());
    dispatchTransaction(getTransaction());
  }, [dispatchCustomers, dispatchTransaction]);

  const filteredData = customers.map((customer) => {
    const customerTransactions = transactions.filter(transaction => transaction.customer_id === customer.id && (!selectedDate || transaction.date === selectedDate));
    return {
      ...customer,
      transactions: customerTransactions
    };
  });

  return (
    <DataContext.Provider value={{ filteredData, setSelectedDate, selectedDate }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };