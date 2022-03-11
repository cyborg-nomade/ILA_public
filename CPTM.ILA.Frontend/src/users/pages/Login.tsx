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
  password: yup
    .string()
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/),
});

const initialValues: BaseUser = {
  username: "",
  password: "",
};

const Login = () => {
  const authContext = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let navigate = useNavigate();

  const submitLoginHandler = async (user: BaseUser) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/users/login`,
        "POST",
        JSON.stringify(user),
        {
          "Content-Type": "application/json",
        }
      );

      const receivedUser: User = responseData.user;

      authContext.login(
        receivedUser.id,
        receivedUser.username,
        receivedUser.isComite,
        responseData.token
      );

      navigate(`/${receivedUser.id}/cases`);
    } catch (error) {
      console.log(error);
    }
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
        onSubmit={submitLoginHandler}
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
              <Card.Title className="pt-3 px-3">Login</Card.Title>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Usuário</Form.Label>
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
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      A senha deve ter pelo menos 8 caracteres, um caracter
                      especial, uma letra maiúscula e um número
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button
                  type="submit"
                  className="float-end mt-3"
                  disabled={!(isValid && dirty)}
                >
                  Login
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

export default Login;
