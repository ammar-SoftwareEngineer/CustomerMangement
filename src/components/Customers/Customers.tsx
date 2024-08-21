import Header from "@components/layout/Header/Header";
import CustomersTable from "@components/layout/Tables/CustomersTable/CustomersTable";
import { Container } from "react-bootstrap";
import { FallingLines } from 'react-loader-spinner'
import { useContext } from "react";
import { DataContext } from "@hooks/context/DataContext";
function Customers() {
  const { loadingCustomers, loadingTransactionsData } = useContext(DataContext)
  return (
    <div className="customer">

      {loadingCustomers == "pending" && loadingTransactionsData == "pending" ?
        <div className=" min-vh-100  w-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
          <FallingLines
            color="#021E87"
            width="100"
            height=""
            visible={true}
          />
        </div>
        : (<>
          <Header title="Customers" details={false} dataLink="" />
          <div className="table pt-4">
            <Container fluid>
              <CustomersTable />
            </Container>
          </div>
        </>)}

    </div>
  )
}

export default Customers
