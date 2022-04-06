import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../components/CasesList";
import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";

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
      console.log(currentGroup);
      console.log(loadedCases);

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
      <h1>Página Inicial - Todos os Itens Aprovados</h1>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          {error}
        </Alert>
      )}
      <CasesList items={cases} />
    </React.Fragment>
  );
};

export default ContinueCaseListGetter;
