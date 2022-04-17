import React, { useEffect, useState, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../../cases/components/CasesList";
import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";

const DpoCasesListGetter = () => {
  const [cases, setCases] = useState<CaseListItem[]>([]);

  const { token, currentComiteMember } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getApprovedCases = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/extensao-encarregado/${currentComiteMember.id}`,
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

    getApprovedCases().catch((error) => {
      console.log(error);
    });
  }, [sendRequest, token, currentComiteMember.id]);

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
      <h1>Processos Pendentes do Membro Selecionado</h1>
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

export default DpoCasesListGetter;
