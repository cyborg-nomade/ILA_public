import { Outlet } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DpoHomePage = () => {
  return (
    <Row className="justify-content-between">
      <Col xs={12} sm={12} md={12} lg={12}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default DpoHomePage;
