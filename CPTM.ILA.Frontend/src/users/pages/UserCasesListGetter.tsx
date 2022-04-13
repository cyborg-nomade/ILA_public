import React, { useEffect, useState, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../../cases/components/CasesList";
import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";

const UserCasesListGetter = () => {
  const [cases, setCases] = useState<CaseListItem[]>([]);

  const { token, currentGroup } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getUserCases = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/group/${currentGroup.id}`,
        undefined,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData.cases);

      const loadedCases: CaseListItem[] = responseData.cases;
      setCases(loadedCases);
    };

    getUserCases().catch((error) => {
      console.log(error);
    });
  }, [sendRequest, token, currentGroup.id]);

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
      <h1>Meus Processos - Todos os seus itens</h1>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          {error}
        </Alert>
      )}
      <CasesList items={cases} redirect={false} />
    </React.Fragment>
  );
};

export default UserCasesListGetter;
