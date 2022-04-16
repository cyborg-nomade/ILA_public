import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CasesDashboard from "../../cases/components/CasesDashboard";
import { AuthContext } from "./../../shared/context/auth-context";

const Dashboards = () => {
  const { user } = useContext(AuthContext);

  return (
    <Row className="justify-content-evenly">
      <Col xs={12} sm={12} md={12} lg={9}>
        <CasesDashboard isComite={user.isComite} />
      </Col>
      {/* <Col xs={12} sm={12} md={12} lg={4} className="justify-content-center">
        <ThreadDashboard />
      </Col> */}
    </Row>
  );
};

export default Dashboards;
