import React from "react";
import _ from "lodash";
import { Controller, FieldPath, UseFormReturn } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";

const Section14FormRowSub = (props: {
  name: string;
  className: string;
  methods: UseFormReturn<Case, any>;
}) => {
  return (
    <Row className={props.className}>
      <Col></Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.numeroContrato` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.numeroContrato`
                )
              }
              ref={ref}
            />
          )}
        />
      </Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.numeroProcessoContratacao` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.numeroProcessoContratacao`
                )
              }
              ref={ref}
            />
          )}
        />
      </Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.objetoContrato` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.objetoContrato`
                )
              }
              ref={ref}
            />
          )}
        />
      </Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.emailGestorContrato` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.emailGestorContrato`
                )
              }
              ref={ref}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          Utilize um e-mail válido.
        </Form.Control.Feedback>
      </Col>
      <Col lg={1}></Col>
    </Row>
  );
};

export default Section14FormRowSub;
