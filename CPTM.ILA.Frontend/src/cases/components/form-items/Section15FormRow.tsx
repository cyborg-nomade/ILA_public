import React from "react";
import _ from "lodash";
import { Controller, FieldPath, UseFormReturn } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import { tipoRiscoPrivacidade } from "../../../shared/models/case-helpers/enums.model";

const Section15FormRow = (props: {
  label: string;
  disabled: boolean;
  name: string;
  className: string;
  methods: UseFormReturn<Case>;
}) => {
  return (
    <Row className={props.className}>
      <Form.Label as={Col}>{props.label}</Form.Label>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.tipoRisco.value` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Select
              disabled={props.disabled}
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.tipoRisco.value`
                )
              }
            >
              {Object.values(tipoRiscoPrivacidade).map((tip) => (
                <option value={tip} key={tip}>
                  {tip}
                </option>
              ))}
            </Form.Select>
          )}
        />
      </Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.observacoes` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.observacoes`
                )
              }
              disabled={props.disabled}
              ref={ref}
            />
          )}
        />
      </Col>
      <Col lg={1}></Col>
    </Row>
  );
};

export default Section15FormRow;
