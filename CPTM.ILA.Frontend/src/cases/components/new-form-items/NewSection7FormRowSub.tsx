import React, { useState } from "react";
import {
  Controller,
  UseFormReturn,
  FieldPath,
  RegisterOptions,
} from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import {
  tipoFontesRetencao,
  tipoTempoRetencao,
} from "../../../shared/models/case-helpers/enums.model";
import { Options } from "../../../access-requests/components/AccessRequestForm";
import SelectFieldSearch from "../../../shared/components/UI/SelectFieldSearch";
import _ from "lodash";

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
    handleChange(event);
  };

  const selectOptions: Options[] = props.systems.map((s) => ({
    value: s,
    label: s,
  }));

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
        <Form.Select
          name={`${props.name}.fonteRetencao.value`}
          value={getIn(values, `${props.name}.fonteRetencao.value`)}
          onChange={handleChangeFonteRetencao}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.fonteRetencao.value`) &&
            !getIn(errors, `${props.name}.fonteRetencao.value`)
          }
          isInvalid={!!getIn(errors, `${props.name}.fonteRetencao.value`)}
          disabled={props.disabled}
        >
          {Object.values(tipoFontesRetencao).map((tfr) => (
            <option value={tfr} key={tfr}>
              {tfr}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col lg={2}>
        {!isSystemSelect ? (
          <Form.Control
            type="text"
            name={`${props.name}.localArmazenamento`}
            value={getIn(values, `${props.name}.localArmazenamento`)}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={
              getIn(touched, `${props.name}.localArmazenamento`) &&
              !getIn(errors, `${props.name}.localArmazenamento`)
            }
            isInvalid={!!getIn(errors, `${props.name}.localArmazenamento`)}
            disabled={props.disabled}
          />
        ) : (
          <React.Fragment>
            {/* <Form.Select
              name={`${props.name}.localArmazenamento`}
              value={getIn(values, `${props.name}.localArmazenamento`)}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={
                getIn(touched, `${props.name}.localArmazenamento`) &&
                !getIn(errors, `${props.name}.localArmazenamento`)
              }
              isInvalid={!!getIn(errors, `${props.name}.localArmazenamento`)}
            >
              {Object.values(props.systems).map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </Form.Select> */}
            <Field
              component={SelectFieldSearch}
              name={`${props.name}.localArmazenamento`}
              options={selectOptions}
              disabled={props.disabled}
            />
          </React.Fragment>
        )}
      </Col>
      <Col lg={1}></Col>
    </Row>
  );
};

export default NewSection7FormRowSub;
