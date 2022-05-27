import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { useHttpClient } from "../../shared/hooks/http-hook";
import AccessRequestForm from "../../access-requests/components/AccessRequestForm";

import {
  AccessRequestDTO,
  emptyAccessRequestDTO,
} from "../../shared/models/DTOs/access-request-dto.model";
import {
  AccessRequest,
  tipoSolicitacaoAcesso,
} from "../../shared/models/access-control/access-request.model";

const RequestAccess = () => {
  const [message, setMessage] = useState("");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitRegisterHandler = async (accessRequest: AccessRequestDTO) => {
    try {
      accessRequest.groupNames = accessRequest.groupNames.map(
        (g: any) => g.value
      );
      // @ts-ignore
      accessRequest.usernameSuperior = accessRequest.usernameSuperior.value;

      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/require/${accessRequest.tipoSolicitacaoAcesso}`,
        "POST",
        JSON.stringify(accessRequest),
        {
          "Content-Type": "application/json",
        }
      );

      const savedAR: AccessRequest = responseData.accessRequest;
      console.log("savedAR: ", savedAR);

      if (
        accessRequest.tipoSolicitacaoAcesso ===
        tipoSolicitacaoAcesso.AcessoAoSistema
      ) {
        const emailFormData = new FormData();
        emailFormData.append("emailFile", accessRequest.emailFile as File);

        const responseDataEmailFile = await sendRequest(
          `${process.env.REACT_APP_CONNSTR}/access-requests/require/${tipoSolicitacaoAcesso.AcessoAoSistema}/save-file/${savedAR.id}`,
          "POST",
          emailFormData
        );
        console.log(
          "AR save file response message: ",
          responseDataEmailFile.message
        );
      }

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
        register={true}
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

export default RequestAccess;
