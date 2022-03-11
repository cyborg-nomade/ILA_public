import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  FullCaseObject,
  tipoRiscoPrivacidade,
} from "../../../shared/models/cases.model";

const Section15FormRow = (props: {
  label: string;
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<FullCaseObject>();

  const [observacoes, setObservacoes] = useState(
    getIn(values, `${props.name}.observacoes`)
  );

  const handleChangeObservacoes = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setObservacoes(event.currentTarget.value);
  };
  const handleBlurObservacoes = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setFieldValue(`${props.name}.observacoes`, observacoes, true);
  };

  return (
    <Row className={props.className}>
      <Form.Label as={Col}>{props.label}</Form.Label>
      <Col>
        <Form.Select
          disabled={props.disabled}
          name={`${props.name}.tipoRisco`}
          value={getIn(values, `${props.name}.tipoRisco`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tipoRisco`) &&
            !getIn(errors, `${props.name}.tipoRisco`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tipoRisco`)}
        >
          {Object.values(tipoRiscoPrivacidade).map((tip) => (
            <option value={tip} key={tip}>
              {tip}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.observacoes`}
          value={observacoes}
          onChange={handleChangeObservacoes}
          onBlur={handleBlurObservacoes}
          isValid={
            getIn(touched, `${props.name}.observacoes`) &&
            !getIn(errors, `${props.name}.observacoes`)
          }
          isInvalid={!!getIn(errors, `${props.name}.observacoes`)}
        />
      </Col>
    </Row>
  );
};

export default Section15FormRow;
