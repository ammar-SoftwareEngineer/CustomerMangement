import customerImg from "@assets/users.svg";
import { Card, Col, Container, Row } from "react-bootstrap";
import getCustomers from "@store/customer/getCustomers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import getTransaction from "@store/transactions/getTransactions";
import { useEffect } from "react";
import money from "@assets/money.svg";
import coin from "@assets/coin.svg";
function Cards() {
  const dispatchCustomers = useAppDispatch();
  const dispatchTransaction = useAppDispatch()
  const { loading: loadingCustomers, error: errorCustomers, records: customers } = useAppSelector((state) => state.customers);
  const { loading: loadingTransactions, error: errorTransactions, records: transactions } = useAppSelector((state) => state.transactions);

  useEffect(() => {
    dispatchCustomers(getCustomers())
    dispatchTransaction(getTransaction())
  }, [dispatchCustomers, dispatchTransaction])

  const totalAmount=transactions.map((t)=>t.amount).reduce((acc, amount) => acc + amount, 0)
  const totalTransactions=transactions.length
  const totalCustomers=customers.length

  
  return (
    <div>
      <Container fluid>
        <Row className="gx-4 gy-4">
          <Col>
            <Card className=" rounded-4 shadow-lg text-center  p-4">
              <div>
                <img width={50} src={customerImg} alt="" />
              </div>
              <Card.Body className=" d-flex justify-content-between ">
                <Card.Title className="mt-2">Customers Total </Card.Title>
                <Card.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {totalCustomers}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className=" rounded-4 shadow-lg text-center p-4">
              <div>
                <img width={50} src={money} alt="" />
              </div>
              <Card.Body className=" d-flex justify-content-between">
                <Card.Title className="mt-2">Transaction Total </Card.Title>
                <Card.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                 {totalTransactions}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className=" rounded-4 shadow-lg text-center p-4">
              <div>
                <img width={50} src={coin} alt="" />
              </div>
              <Card.Body className=" d-flex justify-content-between">
                <Card.Title className="mt-2">Amount Total</Card.Title>
                <Card.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                  ${totalAmount}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cards;
