import React, { useContext } from "react";
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

import { BaseUser, User } from "./../../shared/models/users.model";
import { AuthContext } from "./../../shared/context/auth-context";
import { useHttpClient } from "./../../shared/hooks/http-hook";

const schema = yup.object().shape({
  username: yup.string().required(),
});

const initialValues: BaseUser = {
  username: "",
  password: "",
};

const Register = (props: any) => {
  const authContext = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let navigate = useNavigate();

  const submitRegisterHandler = async (request: any) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/requests/`,
        "POST",
        JSON.stringify(request),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const backToLoginHandler = () => {
    navigate("/");
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
        validationSchema={schema}
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
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.username && !errors.username}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Justificativa de acesso</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>E-mail com autorização do superior</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
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
    </React.Fragment>
  );
};

export default Register;
