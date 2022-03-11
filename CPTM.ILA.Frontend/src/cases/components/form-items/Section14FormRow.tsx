import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FullCaseObject } from "../../../shared/models/cases.model";

const Section14FormRow = (props: {
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleBlur, setFieldValue } =
    useFormikContext<FullCaseObject>();

  const [numeroContrato, setNumeroContrato] = useState(
    getIn(values, `${props.name}.numeroContrato`)
  );
  const [numeroProcessoContratacao, setNumeroProcessoContratacao] = useState(
    getIn(values, `${props.name}.numeroProcessoContratacao`)
  );
  const [objetoContrato, setObjetoContrato] = useState(
    getIn(values, `${props.name}.objetoContrato`)
  );
  const [emailGestorContrato, setEmailGestorContrato] = useState(
    getIn(values, `${props.name}.emailGestorContrato`)
  );

  const handleChangeNumeroContrato = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumeroContrato(event.currentTarget.value);
  };
  const handleBlurNumeroContrato = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(`${props.name}.numeroContrato`, numeroContrato, true);
  };

  const handleChangeNumeroProcessoContratacao = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumeroProcessoContratacao(event.currentTarget.value);
  };
  const handleBlurNumeroProcessoContratacao = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(
      `${props.name}.numeroProcessoContratacao`,
      numeroProcessoContratacao,
      true
    );
  };

  const handleChangeObjetoContrato = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setObjetoContrato(event.currentTarget.value);
  };
  const handleBlurObjetoContrato = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(`${props.name}.objetoContrato`, objetoContrato, true);
  };

  const handleChangeEmailGestorContrato = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailGestorContrato(event.currentTarget.value);
  };
  const handleBlurEmailGestorContrato = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(
      `${props.name}.emailGestorContrato`,
      emailGestorContrato,
      true
    );
  };

  return (
    <Row className={props.className}>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.numeroContrato`}
          value={numeroContrato}
          onChange={handleChangeNumeroContrato}
          onBlur={handleBlurNumeroContrato}
          isValid={
            getIn(touched, `${props.name}.numeroContrato`) &&
            !getIn(errors, `${props.name}.numeroContrato`)
          }
          isInvalid={!!getIn(errors, `${props.name}.numeroContrato`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.numeroProcessoContratacao`}
          value={numeroProcessoContratacao}
          onChange={handleChangeNumeroProcessoContratacao}
          onBlur={handleBlurNumeroProcessoContratacao}
          isValid={
            getIn(touched, `${props.name}.numeroProcessoContratacao`) &&
            !getIn(errors, `${props.name}.numeroProcessoContratacao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.numeroProcessoContratacao`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.objetoContrato`}
          value={objetoContrato}
          onChange={handleChangeObjetoContrato}
          onBlur={handleBlurObjetoContrato}
          isValid={
            getIn(touched, `${props.name}.objetoContrato`) &&
            !getIn(errors, `${props.name}.objetoContrato`)
          }
          isInvalid={!!getIn(errors, `${props.name}.objetoContrato`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="email"
          name={`${props.name}.emailGestorContrato`}
          value={emailGestorContrato}
          onChange={handleChangeEmailGestorContrato}
          onBlur={handleBlurEmailGestorContrato}
          isValid={
            getIn(touched, `${props.name}.emailGestorContrato`) &&
            !getIn(errors, `${props.name}.emailGestorContrato`)
          }
          isInvalid={!!getIn(errors, `${props.name}.emailGestorContrato`)}
        />
        <Form.Control.Feedback type="invalid">
          Utilize um e-mail válido.
        </Form.Control.Feedback>
      </Col>
    </Row>
  );
};

export default Section14FormRow;
