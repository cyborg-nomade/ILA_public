import React from "react";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import GroupSelector from "../../access-requests/components/GroupSelector";

const AllCasesPage = () => {
  return (
    <Row className="justify-content-between">
      <Col lg={2}>
        <GroupSelector />
      </Col>
      <Col lg={7}>
        <Outlet />
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
};

export default AllCasesPage;
