import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { AuthContext } from "../../shared/context/auth-context";
import CasesDashboard from "../../cases/components/CasesDashboard";
import GroupCasesByStatusDashboard from "../../cases/components/GroupCasesByStatusDashboard";
import ReviewCasesListGetter from "../../cases/pages/ReviewCasesListGetter";

const Dashboards = () => {
    const { user } = useContext(AuthContext);

    return (
        <Row className="justify-content-evenly">
            <Col xs={12} sm={12} md={12} lg={user.isComite ? 11 : 5}>
                <CasesDashboard />
            </Col>
            {!user.isComite && (
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={5}
                    className="justify-content-center"
                >
                    <GroupCasesByStatusDashboard />
                    <ReviewCasesListGetter />
                </Col>
            )}
        </Row>
    );
};

export default Dashboards;
