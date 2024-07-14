import { Container, Table } from "react-bootstrap";
import getTransaction from "@store/transactions/getTransactions";
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { useEffect } from "react";
import getCustomers from "@store/customer/getCustomers";


interface DateTransition {
  date: string
}
function TransactionsTable({ date }: DateTransition) {


  const dispatchCustomers = useAppDispatch();
  const dispatchTransaction = useAppDispatch()
  const { loading: loadingCustomers, error: errorCustomers, records: customers } = useAppSelector((state) => state.customers);
  const { loading: loadingTransactions, error: errorTransactions, records: transactions } = useAppSelector((state) => state.transactions);

  useEffect(() => {
    dispatchCustomers(getCustomers())
    dispatchTransaction(getTransaction())
  }, [dispatchCustomers, dispatchTransaction]);

  const filteredData = customers.map((customer) => {
    const customerTransactions = transactions.filter(transaction => transaction.customer_id == customer.id);
    return {
      ...customer,
      transactions: customerTransactions
    };
  });
  const TransactionsList = filteredData.length > 0 ? filteredData.map(record => {
    const transactionsForDate = record.transactions.filter(transaction => transaction.date === date);

    return transactionsForDate.length > 0 ? (
      <tr key={record.id}>
        <td>{record.name}</td>
        <td className="py-3 ">{transactionsForDate.map((t)=>t.date)}</td>
      </tr>
    ): ""
  }) : "No Transactions"


  return (
    <div className="bg-white shadow-sm py-3 px-2 rounded-3">
      <Container fluid>
        <h3 style={{ color: "#021E87", fontWeight: "600" }}>
          Latest Transactions
        </h3>
        <hr />

        <Table bordered hover responsive className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {TransactionsList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default TransactionsTable;
