import SideBar from "@components/layout/SideBar/SideBar";
import { DataProvider } from "@hooks/context/DataContext";

import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <DataProvider>
      <Row className="g-0">
        <Col lg="2" xs="3">
          <SideBar />
        </Col>
        <Col lg="10" xs="9">
          <Outlet />
        </Col>
      </Row>
      </DataProvider>
  );




}

export default MainLayout;
