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
  const TransactionsList = filteredData.map((f) => f.transactions.map((t) => {
    // const lengthTransactions = t.date.length.toString().slice(0, length + 1)
    if (t.date.toString().includes(date)) {
      return (<tr >
        <td>{f.name}</td>
        <td>{t.date}</td>
      </tr>)
    }
  }
  ))

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
