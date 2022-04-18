import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import {
  AccessRequest,
  tipoSolicitacaoAcesso,
} from "../../shared/models/access-control/access-request.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AccessRequestsList from "./AccessRequestsList";
import { AccessRequestDTO } from "../../shared/models/DTOs/access-request-dto.model";

const ComiteAccessRequestsListGetter = () => {
  const [accessRequests, setAccessRequests] = useState<AccessRequestDTO[]>([]);

  const { token } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getComiteAccessRequests = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/type/${tipoSolicitacaoAcesso.AcessoComite}`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );
      const loadedAccessRequests: AccessRequestDTO[] = responseData.requests;
      setAccessRequests(loadedAccessRequests);
    };

    getComiteAccessRequests().catch((error) => {
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
      <h2>Requisições de Acesso ao Painel do Comitê LGPD</h2>
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

export default ComiteAccessRequestsListGetter;
