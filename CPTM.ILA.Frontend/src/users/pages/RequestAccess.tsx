import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import {
  BaseAccessRequest,
  tipoSolicitacaoAcesso,
} from "../../shared/models/access-request.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

// const schema = yup.object().shape({
//   username: yup.string().required(),
// });

const initialValues: BaseAccessRequest = {
  usernameSolicitante: "",
  usernameSuperior: "",
  justificativa: "",
  tipoSolicitacaoAcesso: tipoSolicitacaoAcesso.AcessoAoSistema,
};

const RequestAccess = () => {
  const [message, setMessage] = useState("");

  const authContext = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let navigate = useNavigate();

  const submitRegisterHandler = async (accessRequest: BaseAccessRequest) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/initial`,
        "POST",
        JSON.stringify(accessRequest),
        {
          "Content-Type": "application/json",
        }
      );

      setMessage(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const backToLoginHandler = () => {
    navigate("/");
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
      <Formik
        // validationSchema={schema}
        onSubmit={submitRegisterHandler}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          dirty,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Card className="mx-auto" style={{ width: "28rem" }}>
              <Card.Title className="pt-3 px-3">
                Solicitação de Acesso
              </Card.Title>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Usuário AD</Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameSolicitante"
                      value={values.usernameSolicitante}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.usernameSolicitante &&
                        !errors.usernameSolicitante
                      }
                      isInvalid={!!errors.usernameSolicitante}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Usuário AD do Superior</Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameSuperior"
                      value={values.usernameSuperior}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.usernameSuperior && !errors.usernameSuperior
                      }
                      isInvalid={!!errors.usernameSuperior}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik03">
                    <Form.Label>Justificativa de acesso</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="justificativa"
                      value={values.justificativa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.justificativa && !errors.justificativa}
                      isInvalid={!!errors.justificativa}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>E-mail com autorização do superior</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group> */}
                </Row>
                <Button
                  type="submit"
                  className="float-end mt-3"
                  variant="success"
                  disabled={!(isValid && dirty)}
                >
                  Solicitar
                </Button>
                <Button
                  type="button"
                  className="float-start mt-3"
                  onClick={backToLoginHandler}
                >
                  Fazer Login
                </Button>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
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
