import React from "react";
import { Controller, FieldPath, UseFormReturn } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import _ from "lodash";

const NewSection16FormRow = (props: {
  label: string;
  disabled: boolean;
  name: string;
  className: string;
  methods: UseFormReturn<Case, any>;
}) => {
  return (
    <Row className={props.className}>
      <Form.Label as={Col}>{props.label}</Form.Label>
      <Col lg={8}>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.descricaoObs` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.descricaoObs`
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

export default NewSection16FormRow;
