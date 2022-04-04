import React, { useState } from "react";
import * as yup from "yup";
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

// const schema = yup.object().shape({
//   username: yup.string().required(),
// });

const RequestAccess = () => {
  const [message, setMessage] = useState("");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitRegisterHandler = async (accessRequest: AccessRequestDTO) => {
    try {
      accessRequest.tipoSolicitacaoAcesso =
        tipoSolicitacaoAcesso.AcessoAoSistema;
      console.log(accessRequest.emailFile);

      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/require/${tipoSolicitacaoAcesso.AcessoAoSistema}`,
        "POST",
        JSON.stringify(accessRequest),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData.message);

      const savedAR: AccessRequest = responseData.accessRequest;
      const emailFormData = new FormData();
      emailFormData.append("emailFile", accessRequest.emailFile);

      const responseDataEmailFile = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/require/${tipoSolicitacaoAcesso.AcessoAoSistema}/save-file/${savedAR.id}`,
        "POST",
        emailFormData
      );

      setMessage(responseDataEmailFile.message);
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
