import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CasesDashboard from "../../cases/components/CasesDashboard";

const ComiteDashboards = () => {
  return (
    <Row className="justify-content-evenly">
      <Col xs={12} sm={12} md={12} lg={9}>
        <CasesDashboard />
      </Col>
      {/* <Col xs={12} sm={12} md={12} lg={4} className="justify-content-center">
            <ThreadDashboard />
          </Col> */}
    </Row>
  );
};

export default ComiteDashboards;
