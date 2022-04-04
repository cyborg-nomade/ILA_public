import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { groups } from "./GroupSelector";
import { AccessRequestDTO } from "./../../shared/models/DTOs/access-request-dto.model";

type onSubmitFn = (item: AccessRequestDTO) => void;

const schema = yup.object().shape({
  usernameSolicitante: yup.string().required(),
  usernameSuperior: yup.string().required(),
  justificativa: yup.string().required(),
  emailFile: yup.mixed().required(),
});

const AccessRequestForm = (props: {
  item: AccessRequestDTO;
  register?: boolean;
  approve?: boolean;
  groups?: boolean;
  onSubmit: onSubmitFn;
  onReject?: onSubmitFn;
}) => {
  let navigate = useNavigate();
  const backToHomepageHandler = () => {
    navigate("/");
  };
  const backOneHandler = () => {
    navigate(-1);
  };

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize={true}
      onSubmit={props.onSubmit}
      initialValues={props.item}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
        touched,
        isValid,
        errors,
        dirty,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Card className="mx-auto" style={{ width: "28rem" }}>
            <Card.Title className="pt-3 px-3">
              Solicitação de Acesso{" "}
              {props.register || props.approve ? "true" : "falsex"}{" "}
            </Card.Title>
            <Card.Body>
              {(props.register || props.approve) && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Usuário AD do Solicitante</Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameSolicitante"
                      value={values.usernameSolicitante}
                      disabled={props.approve}
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
              )}
              {(props.register || props.approve) && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Usuário AD do Superior</Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameSuperior"
                      value={values.usernameSuperior}
                      disabled={props.approve}
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
              )}
              {props.groups && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik03">
                    <Form.Label>Groupo a ser acessado</Form.Label>
                    <Form.Select
                      disabled={props.approve}
                      name={"groups"}
                      value={values.groupNames}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.groupNames && !errors.groupNames}
                      isInvalid={!!errors.groupNames}
                    >
                      {Object.values(groups).map((g) => (
                        <option value={g} key={g}>
                          {g}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              )}
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationFormik03">
                  <Form.Label>Justificativa de acesso</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="justificativa"
                    value={values.justificativa}
                    disabled={props.approve}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.justificativa && !errors.justificativa}
                    isInvalid={!!errors.justificativa}
                  />
                  <Form.Control.Feedback type="invalid">
                    Esse campo é obrigatório
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>E-mail com autorização do superior</Form.Label>
                  <Form.Control
                    type="file"
                    name="emailFile"
                    onChange={(event) => {
                      const target = event.currentTarget as HTMLInputElement;
                      const files = target.files as FileList;

                      setFieldValue("emailFile", files[0]);
                    }}
                  />
                </Form.Group>
              </Row>
              {props.register && (
                <React.Fragment>
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
                    onClick={backToHomepageHandler}
                  >
                    Fazer Login
                  </Button>
                </React.Fragment>
              )}
              {props.approve && (
                <React.Fragment>
                  <ButtonGroup className="float-end mt-3">
                    <Button
                      variant="danger"
                      onClick={() => props.onReject!(values)}
                    >
                      Reprovar
                    </Button>
                    <Button type="submit">Aprovar</Button>
                  </ButtonGroup>
                  <Button
                    type="button"
                    className="float-start mt-3"
                    onClick={backOneHandler}
                  >
                    Voltar
                  </Button>
                </React.Fragment>
              )}
              {props.groups && (
                <React.Fragment>
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
                    onClick={backToHomepageHandler}
                  >
                    Página Inicial
                  </Button>
                </React.Fragment>
              )}
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default AccessRequestForm;
