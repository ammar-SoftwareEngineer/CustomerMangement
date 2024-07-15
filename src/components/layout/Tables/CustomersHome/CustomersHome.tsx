import Table from "react-bootstrap/Table";
import { useContext } from "react";
import { DataContext } from "@hooks/context/DataContext";
import { Link } from "react-router-dom";


function CustomersHome() {
  // ################# Start Context #################################
  const { filteredData } = useContext(DataContext)
  // ################# End Context #################################

  const customersList = filteredData.length > 0 ? filteredData.map((record) => {
    return <tr key={record.id} onClick={() => window.location.href = `/customers/${record.id}`} style={{ cursor: 'pointer' }}>
      <td className="py-3 ">{record.id}</td>
      <td>{record.name}</td>
      <td className="text-center">${record.transactions.map((t) => t.amount).reduce((acc, amount) => acc + amount, 0)}</td>
      <td className="text-center">{record.transactions.length}</td>
    </tr>
  }) : <tr>
    <td colSpan={4} className=" text-center fw-bolder fs-4">No Customers</td>
  </tr>

  return (
    <div className="bg-white shadow-sm p-4 rounded-3">

      <div className="headTable d-flex justify-content-between ">
        <h3 style={{ color: "#021E87", fontWeight: "600" }}>Customers List</h3>
        <Link to="/customers" className=" text-decoration-none">
          <p className="px-3 fw-semibold text-primary " style={{ cursor: "pointer" }}>More</p>
        </Link>
      </div>
      <hr />
      <Table hover responsive className="table align-middle mb-0">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th className="text-center">Transaction amount</th>
            <th className="text-center">Length transactions</th>
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
