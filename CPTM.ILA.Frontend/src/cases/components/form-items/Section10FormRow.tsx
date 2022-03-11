import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  categoriaTitulares,
  FullCaseObject,
} from "../../../shared/models/cases.model";

const Section10FormRow = (props: {
  label: string;
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<FullCaseObject>();

  const [descricao, setDescricao] = useState(
    getIn(values, `${props.name}.descricao`)
  );

  const handleChangeDescricao = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricao(event.currentTarget.value);
  };
  const handleBlurDescricao = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setFieldValue(`${props.name}.descricao`, descricao, true);
  };

  return (
    <Row className={props.className}>
      <Form.Label as={Col}>{props.label}</Form.Label>
      <Col>
        <Form.Select
          disabled={props.disabled}
          name={`${props.name}.tipoCategoria`}
          value={getIn(values, `${props.name}.tipoCategoria`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tipoCategoria`) &&
            !getIn(errors, `${props.name}.tipoCategoria`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tipoCategoria`)}
        >
          {Object.values(categoriaTitulares).map((ctg) => (
            <option value={ctg} key={ctg}>
              {ctg}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.descricao`}
          value={descricao}
          onChange={handleChangeDescricao}
          onBlur={handleBlurDescricao}
          isValid={
            getIn(touched, `${props.name}.descricao`) &&
            !getIn(errors, `${props.name}.descricao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.descricao`)}
        />
      </Col>
    </Row>
  );
};

export default Section10FormRow;
