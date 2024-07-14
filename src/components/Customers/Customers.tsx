import Header from "@components/layout/Header/Header";
import CustomersTable from "@components/layout/Tables/CustomersTable/CustomersTable";
import { Container } from "react-bootstrap";
function Customers() {
  return (
  <div className="customer">
      <Header title="Customers" details={false} dataLink=""/>
      <div className="table pt-4">
        <Container fluid>
          <CustomersTable />
        </Container>
      </div>
    </div>
  )
}

export default Customers
