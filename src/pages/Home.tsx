import Cards from "@components/layout/Cards/Cards";
import Header from "@components/layout/Header/Header";
import { Col, Container, Row } from "react-bootstrap";
import Calender from "@components/layout/Calender/Calender";

import CustomersHome from "@components/layout/Tables/CustomersHome/CustomersHome";


function Home() {
  return (

    <div className="home">
      <Header title="Dashboard" details={false} dataLink=""/>
      <div className="cards pt-4">
        <Cards />
      </div>
      <div className="table pt-4 ">
        <Container fluid>
          <Row className="gx-0">
            <Col lg="8" className="bg-transparent ">
              <CustomersHome />
            </Col>
            <Col lg="4" className="bg-transparent">
              <div className="calender">
                <Calender />
              </div>
        
            </Col>
          </Row>
        </Container>
      </div>
    </div>

  );
}

export default Home;
