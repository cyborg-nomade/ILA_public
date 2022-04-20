import React, { useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { useHttpClient } from "../../shared/hooks/http-hook";
import AccessRequestForm from "../../access-requests/components/AccessRequestForm";
import {
  AccessRequestDTO,
  emptyAccessRequestDTO,
} from "./../../shared/models/DTOs/access-request-dto.model";
import {
  AccessRequest,
  tipoSolicitacaoAcesso,
} from "../../shared/models/access-control/access-request.model";
import { AuthContext } from "../../shared/context/auth-context";

const RequestGroupAccess = () => {
  const [message, setMessage] = useState("");

  const { token, user } = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitRegisterHandler = async (accessRequest: AccessRequestDTO) => {
    try {
      accessRequest.usernameSolicitante = user.username;
      console.log(accessRequest);

      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/require/${tipoSolicitacaoAcesso.AcessoAGrupos}`,
        "POST",
        JSON.stringify(accessRequest),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );
      console.log(responseData.message);

      const savedAR: AccessRequest = responseData.accessRequest;

      const emailFormData = new FormData();
      emailFormData.append("emailFile", accessRequest.emailFile);

      const responseDataEmailFile = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/require/${tipoSolicitacaoAcesso.AcessoAGrupos}/save-file/${savedAR.id}`,
        "POST",
        emailFormData,
        {
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseDataEmailFile.message);

      setMessage(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const clearMessage = () => {
    setMessage("");
  };

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
      <AccessRequestForm
        item={emptyAccessRequestDTO()}
        groups={true}
        onSubmit={submitRegisterHandler}
      />
      {error && (
        <Row
          className="justify-content-center mx-auto"
          style={{ width: "28rem" }}
        >
          <Alert variant="danger" onClose={clearError} dismissible>
            {error}
          </Alert>
        </Row>
      )}
      {message && (
        <Row
          className="justify-content-center mx-auto"
          style={{ width: "28rem" }}
        >
          <Alert variant="success" onClose={clearMessage} dismissible>
            {message}
          </Alert>
        </Row>
      )}
    </React.Fragment>
  );
};

export default RequestGroupAccess;
