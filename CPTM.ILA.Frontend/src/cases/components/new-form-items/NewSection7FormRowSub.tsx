import React, { useState } from "react";
import { Controller, UseFormReturn, FieldPath } from "react-hook-form";
import _ from "lodash";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import {
  tipoFontesRetencao,
  tipoTempoRetencao,
} from "../../../shared/models/case-helpers/enums.model";

const NewSection7FormRowSub = (props: {
  name: FieldPath<Case>;
  className: string;
  systems: string[];
  disabled: boolean;
  methods: UseFormReturn<Case, any>;
}) => {
  const [isSystemSelect, setIsSystemSelect] = useState(false);

  const handleChangeFonteRetencao = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value === tipoFontesRetencao.sistema) {
      setIsSystemSelect(true);
    } else {
      setIsSystemSelect(false);
    }
  };

  return (
    <Row className={props.className}>
      <Col lg={1}></Col>
      <Col></Col>
      <Col></Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.descricao` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                _.get(props.methods.formState.errors, `${props.name}.descricao`)
                  ? true
                  : false
              }
              disabled={props.disabled}
              ref={ref}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          Esse campo é obrigatório
        </Form.Control.Feedback>
      </Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.tempoRetencao.value` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Select
              disabled={props.disabled}
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              isInvalid={
                _.get(
                  props.methods.formState.errors,
                  `${props.name}.tempoRetencao.value`
                )
                  ? true
                  : false
              }
            >
              {Object.values(tipoTempoRetencao).map((ttr) => (
                <option value={ttr} key={ttr}>
                  {ttr}
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
          name={`${props.name}.fonteRetencao.value` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Select
              disabled={props.disabled}
              value={value as string}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChangeFonteRetencao(e);
                onChange(e.target.value);
              }}
              onBlur={onBlur}
              ref={ref}
              isInvalid={
                _.get(
                  props.methods.formState.errors,
                  `${props.name}.fonteRetencao.value`
                )
                  ? true
                  : false
              }
            >
              {Object.values(tipoFontesRetencao).map((tfr) => (
                <option value={tfr} key={tfr}>
                  {tfr}
                </option>
              ))}
            </Form.Select>
          )}
        />
      </Col>
      <Col lg={2}>
        {!isSystemSelect ? (
          <Controller
            rules={{ required: true }}
            control={props.methods.control}
            name={`${props.name}.localArmazenamento` as FieldPath<Case>}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                type="text"
                value={value as string}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={
                  _.get(
                    props.methods.formState.errors,
                    `${props.name}.localArmazenamento`
                  )
                    ? true
                    : false
                }
                disabled={props.disabled}
                ref={ref}
              />
            )}
          />
        ) : (
          <React.Fragment>
            <Controller
              rules={{ required: true }}
              control={props.methods.control}
              name={`${props.name}.localArmazenamento` as FieldPath<Case>}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  ref={ref}
                  options={props.systems.map((s) => ({ value: s, label: s }))}
                  value={props.systems
                    .map((s) => ({ value: s, label: s }))
                    .find((c) => c.value === value)}
                  onChange={(val) => onChange(val?.value)}
                  isSearchable
                  isDisabled={props.disabled}
                />
              )}
            />
          </React.Fragment>
        )}
      </Col>
      <Col lg={1}></Col>
    </Row>
  );
};

export default NewSection7FormRowSub;
