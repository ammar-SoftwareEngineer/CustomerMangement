import Cards from "@components/layout/Cards/Cards";
import Header from "@components/layout/Header/Header";
import { Col, Container, Row } from "react-bootstrap";
import Calender from "@components/layout/Calender/Calender";
import CustomersHome from "@components/layout/Tables/CustomersHome/CustomersHome";
import { useContext } from "react";
import { DataContext } from "@hooks/context/DataContext";
import { FallingLines } from 'react-loader-spinner'
function Home() {
  // ################# Start Context #################################
  const { customersData,transactionsData } = useContext(DataContext)
  // ################# End Context #################################
  

  return (
    <div className="home">
      {customersData.loading == "pending"&&transactionsData.loading == "pending" ? 
      <div className=" min-vh-100  w-100 d-flex justify-content-center align-items-center" style={{backgroundColor:"rgba(0,0,0,0.3)"}}>
      <FallingLines
        color="#021E87"
        width="100"
        height=""
        visible={true}
      />
    </div>
      :(<>
      <Header title="Dashboard" details={false} dataLink="" />
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
        </>
        )}
       
      


    </div>
  )
}

export default Home;
