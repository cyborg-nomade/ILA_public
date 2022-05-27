import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../components/CasesList";

const ContinueCaseListGetter = () => {
  const [cases, setCases] = useState<CaseListItem[]>([]);

  const { token, currentGroup } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getUnfinishedCases = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/group/${currentGroup.id}/status/false/false`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );
      const loadedCases: CaseListItem[] = responseData.cases;
      console.log("currentGroup: ", currentGroup);
      console.log("loadedCases: ", loadedCases);

      setCases(loadedCases);
    };

    getUnfinishedCases().catch((error) => {
      console.log(error);
    });
  }, [sendRequest, token, currentGroup]);

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
      <h2>Continuar Processo - Todos os seus processos iniciados</h2>
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

export default ContinueCaseListGetter;
