import getCustomers from "@store/customer/getCustomers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import getTransaction from "@store/transactions/getTransactions";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";

function CustomersHome() {
  const dispatchCustomers = useAppDispatch();
  const dispatchTransaction = useAppDispatch()
  const { loading: loadingCustomers, error: errorCustomers, records: customers } = useAppSelector((state) => state.customers);
  const { loading: loadingTransactions, error: errorTransactions, records: transactions } = useAppSelector((state) => state.transactions);

  useEffect(() => {
    dispatchCustomers(getCustomers())
    dispatchTransaction(getTransaction())
  }, [dispatchCustomers, dispatchTransaction])



    ;
  const filteredData = customers.map((customer) => {
    const customerTransactions = transactions.filter(transaction => transaction.customer_id == customer.id);
    return {
      ...customer,
      transactions: customerTransactions
    };
  });
 



  const customersList = filteredData.length > 0 ? filteredData.map((record) => {
    return <tr key={record.id} onClick={() => window.location.href = `/customers/${record.id}`} style={{ cursor: 'pointer' }}>
      <td className="py-3 ">{record.id}</td>
      <td>{record.name}</td>
      <td className="text-center">{record.transactions.reduce((totalAmount, transaction) => totalAmount + transaction.amount, 0)}</td>
      <td className="text-center">{record.transactions.length}</td>
    </tr>
  }) : "Not Customers"

  return (
    <div className="bg-white shadow-sm p-4 rounded-3">
      <h3 style={{ color: "#021E87", fontWeight: "600" }}>Customers List</h3>
      <hr />

      <Table  hover responsive className="table align-middle mb-0">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Transaction amount</th>
            <th>Number of transactions</th>
          </tr>
        </thead>
        <tbody>
         {customersList}
      
        </tbody>
      </Table>
    </div>
  );
}

export default CustomersHome;
