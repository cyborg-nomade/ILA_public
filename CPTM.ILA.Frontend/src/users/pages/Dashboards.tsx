import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CasesDashboard from "../../cases/components/CasesDashboard";
import ThreadDashboard from "../../threads-comments/components/ThreadDashboard";

const Dashboards = () => {
  return (
    <Row className="justify-content-evenly">
      <Col xs={12} sm={12} md={12} lg={4} className="d-grid">
        <ThreadDashboard />
      </Col>
      <Col xs={12} sm={12} md={12} lg={4}>
        <CasesDashboard />
      </Col>
    </Row>
  );
};

export default Dashboards;
