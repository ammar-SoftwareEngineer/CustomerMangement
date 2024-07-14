import Table from "react-bootstrap/Table";
import { useContext } from "react";
import { DataContext } from "@hooks/context/DataContext";


function CustomersHome() {
  // ################# Start Context #################################
  const { filteredData } = useContext(DataContext)
  // ################# End Context #################################
  
  const customersList = filteredData.length > 0 ? filteredData.map((record) => {
    return <tr key={record.id} onClick={() => window.location.href = `/customers/${record.id}`} style={{ cursor: 'pointer' }}>
      <td className="py-3 ">{record.id}</td>
      <td>{record.name}</td>
      <td className="text-center">{record.transactions.map((t) => t.amount).reduce((acc, amount) => acc + amount, 0)}</td>
      <td className="text-center">{record.transactions.length}</td>
    </tr>
  }) : "Not Customers"

  return (
    <div className="bg-white shadow-sm p-4 rounded-3">


      <h3 style={{ color: "#021E87", fontWeight: "600" }}>Customers List</h3>
      <hr />

      <Table hover responsive className="table align-middle mb-0">
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
