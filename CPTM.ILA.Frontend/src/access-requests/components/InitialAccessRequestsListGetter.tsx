import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { AccessRequest } from "../../shared/models/access-control/access-request.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AccessRequestsList from "./AccessRequestsList";

const InitialAccessRequestsListGetter = () => {
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);

  const { token } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getInitialAccessRequests = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/initial`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );
      const loadedAccessRequests: AccessRequest[] =
        responseData.initialRequests;
      setAccessRequests(loadedAccessRequests);
    };

    getInitialAccessRequests().catch((error) => {
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
      <h1>Requisições de Acesso ao Inventário LGPD Automatizado</h1>
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
