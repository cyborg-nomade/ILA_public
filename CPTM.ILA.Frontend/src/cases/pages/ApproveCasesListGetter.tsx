import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../components/CasesList";
import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";

const ApproveCasesListGetter = () => {
  const [cases, setCases] = useState<CaseListItem[]>([]);

  const { token } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getAllCases = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );
      const loadedCases: CaseListItem[] = responseData.cases;
      setCases(loadedCases);
    };

    getAllCases().catch((error) => {
      console.log(error);
    });
  }, [sendRequest, token]);

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  return (
    <React.Fragment>
      <h1>Aprovações Pendentes</h1>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          {error}
        </Alert>
      )}
      <CasesList items={cases} redirect={true} />
    </React.Fragment>
  );
};

export default ApproveCasesListGetter;
