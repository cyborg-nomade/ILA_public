import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FullCaseObject } from "../../../shared/models/cases.model";

const Section16FormRow = (props: {
  label: string;
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleBlur, setFieldValue } =
    useFormikContext<FullCaseObject>();

  const [descricaoObs, setDescricaoObs] = useState(
    getIn(values, `${props.name}.descricaoObs`)
  );

  const handleChangeDescricaoObs = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricaoObs(event.currentTarget.value);
  };
  const handleBlurDescricaoObs = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(`${props.name}.descricaoObs`, descricaoObs, true);
  };

  return (
    <Row className={props.className}>
      <Form.Label as={Col}>{props.label}</Form.Label>
      <Col lg={8}>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.descricaoObs`}
          value={descricaoObs}
          onChange={handleChangeDescricaoObs}
          onBlur={handleBlurDescricaoObs}
          isValid={
            getIn(touched, `${props.name}.descricaoObs`) &&
            !getIn(errors, `${props.name}descricaoObs`)
          }
          isInvalid={!!getIn(errors, `${props.name}.descricaoObs`)}
        />
      </Col>
    </Row>
  );
};

export default Section16FormRow;
