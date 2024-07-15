import { Container, Table } from "react-bootstrap";

import { useContext } from "react";
import { DataContext } from "@hooks/context/DataContext";
interface DateTransition {
  date: string
}
function TransactionsTable({ date }: DateTransition) {
  // ################# Start Context #################################
  const { filteredData } = useContext(DataContext)
  // ################# End Context #################################

  const TransactionsList = filteredData.length > 0 ? filteredData.map(record => {
    const transactionsForDate = record.transactions.filter(transaction => transaction.date == date);
    return transactionsForDate.length > 0 ? (
      <tr key={record.id} className="py-3">
        <td>{record.name}</td>
        <td className="py-3 ">{transactionsForDate.map((t) => t.date)}</td>
      </tr>
    ) : ""
  }) : <tr>
  <td colSpan={4} className=" text-center fw-bolder fs-4">No Transactions</td>
</tr>




  return (
    <div className="bg-white shadow-sm py-3 px-2 rounded-3">
      <Container fluid>
        <h3 style={{ color: "#021E87", fontWeight: "600" }}>
          Latest Transactions
        </h3>
        <hr />

        <Table hover responsive className="table align-middle mb-0">
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
