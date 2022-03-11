import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  FullCaseObject,
  tipoMedidaSegurancaPrivacidade,
} from "../../../shared/models/cases.model";

const Section12FormRow = (props: {
  label: string;
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<FullCaseObject>();

  const [descricaoControles, setDescricaoControles] = useState(
    getIn(values, `${props.name}.descricaoControles`)
  );

  const handleChangeDescricaoControles = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricaoControles(event.currentTarget.value);
  };
  const handleBlurDescricaoControles = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(`${props.name}.descricaoControles`, descricaoControles, true);
  };

  return (
    <Row className={props.className}>
      <Form.Label as={Col}>{props.label}</Form.Label>
      <Col>
        <Form.Select
          disabled={props.disabled}
          name={`${props.name}.tipo`}
          value={getIn(values, `${props.name}.tipo`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tipo`) &&
            !getIn(errors, `${props.name}.tipo`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tipo`)}
        >
          {Object.values(tipoMedidaSegurancaPrivacidade).map((mdd) => (
            <option value={mdd} key={mdd}>
              {mdd}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.descricaoControles`}
          value={descricaoControles}
          onChange={handleChangeDescricaoControles}
          onBlur={handleBlurDescricaoControles}
          isValid={
            getIn(touched, `${props.name}.descricaoControles`) &&
            !getIn(errors, `${props.name}.descricaoControles`)
          }
          isInvalid={!!getIn(errors, `${props.name}.descricaoControles`)}
        />
      </Col>
    </Row>
  );
};

export default Section12FormRow;
