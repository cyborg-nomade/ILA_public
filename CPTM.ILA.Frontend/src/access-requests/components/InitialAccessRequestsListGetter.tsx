import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { tipoSolicitacaoAcesso } from "../../shared/models/access-control/access-request.model";
import { AccessRequestDTO } from "../../shared/models/DTOs/access-request-dto.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AccessRequestsList from "./AccessRequestsList";

const InitialAccessRequestsListGetter = () => {
  const [accessRequests, setAccessRequests] = useState<AccessRequestDTO[]>([]);

  const { token } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getInitialAccessRequests = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/type/${tipoSolicitacaoAcesso.AcessoAoSistema}`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );
      const loadedAccessRequests: AccessRequestDTO[] = responseData.requests;
      console.log("loadedAccessRequests: ", loadedAccessRequests);
      setAccessRequests(loadedAccessRequests);
    };

    getInitialAccessRequests().catch((error) => {
      console.log(error);
    });

    return () => {
      setAccessRequests([]);
    };
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
      <h2>Requisições de Acesso ao Inventário LGPD Automatizado</h2>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          {error}
        </Alert>
      )}
      <AccessRequestsList items={accessRequests} />
    </React.Fragment>
  );
};

export default InitialAccessRequestsListGetter;
