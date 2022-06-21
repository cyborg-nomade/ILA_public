import React from "react";
import _ from "lodash";
import {
  Controller,
  FieldPath,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Case } from "../../../shared/models/cases.model";
import { hipotesesTratamento } from "../../../shared/models/case-helpers/enums.model";
import CreateCommentBox from "../../../threads-comments/components/CreateCommentBox";

const Section6FormRow = (props: {
  tooltip?: JSX.Element;
  disabled: boolean;
  name: FieldPath<Case>;
  type: string;
  invalid: string;
  itemRef: { number: string; title: string };
  methods: UseFormReturn<Case>;
  rules: RegisterOptions;
}) => {
  return (
    <Row className="mb-3">
      <Col lg={1}>
        <p>{props.itemRef.number}</p>
      </Col>
      {props.tooltip ? (
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip className="text-muted">{props.tooltip}</Tooltip>}
        >
          <Form.Label as={Col}>{props.itemRef.title}</Form.Label>
        </OverlayTrigger>
      ) : (
        <Form.Label as={Col}>{props.itemRef.title}</Form.Label>
      )}
      <Col lg={8}>
        {props.type === "select" && (
          <Controller
            rules={props.rules}
            control={props.methods.control}
            name={props.name}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Select
                disabled={props.disabled}
                value={value as string}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                isInvalid={!!_.get(props.methods.formState.errors, props.name)}
              >
                {Object.values(hipotesesTratamento).map((hip) => (
                  <option value={hip} key={hip}>
                    {hip}
                  </option>
                ))}
              </Form.Select>
            )}
          />
        )}
        {props.type === "text" && (
          <Controller
            rules={props.rules}
            control={props.methods.control}
            name={props.name}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                disabled={props.disabled}
                type="text"
                value={value as string}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={!!_.get(props.methods.formState.errors, props.name)}
                ref={ref}
              />
            )}
          />
        )}
        <Form.Control.Feedback type="invalid">
          {props.invalid}
        </Form.Control.Feedback>
      </Col>
      <Col lg={1}>
        <Row>
          <CreateCommentBox item={props.itemRef} />
        </Row>
      </Col>
    </Row>
  );
};

export default Section6FormRow;