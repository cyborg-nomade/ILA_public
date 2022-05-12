import React, { useState } from "react";
import { Controller, UseFormReturn, FieldPath } from "react-hook-form";
import _ from "lodash";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import {
  tipoCompartilhamentoDados,
  tipoFinalidadeCompartilhamento,
  tipoNivelCompartilhamento,
} from "../../../shared/models/case-helpers/enums.model";

const Section11FormRowSub = (props: {
  disabled: boolean;
  name: string;
  className: string;
  methods: UseFormReturn<Case, any>;
}) => {
  const [isCompartilhamentoParcial, setIsCompartilhamentoParcial] =
    useState(false);

  const [isCompatilhamentoPrivado, setIsCompartilhamentoPrivado] =
    useState(false);

  const handleChangeNivelCompartilhamento = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value === tipoNivelCompartilhamento.parcial) {
      setIsCompartilhamentoParcial(true);
    } else {
      setIsCompartilhamentoParcial(false);
    }
  };

  const handleChangeTipoCompatilhamento = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value === tipoCompartilhamentoDados.privado) {
      setIsCompartilhamentoPrivado(true);
    } else {
      setIsCompartilhamentoPrivado(false);
    }
  };

  return (
    <Row className={props.className}>
      <Col></Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.nomeInstituicao` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                _.get(
                  props.methods.formState.errors,
                  `${props.name}.nomeInstituicao`
                )
                  ? true
                  : false
              }
              disabled={props.disabled}
              ref={ref}
            />
          )}
        />
      </Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.tipoCompDados.value` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Select
              disabled={props.disabled}
              value={value as string}
              onChange={(e) => {
                handleChangeTipoCompatilhamento(e);
                onChange(e);
              }}
              onBlur={onBlur}
              ref={ref}
              isInvalid={
                _.get(
                  props.methods.formState.errors,
                  `${props.name}.tipoCompDados.value`
                )
                  ? true
                  : false
              }
            >
              {Object.values(tipoCompartilhamentoDados).map((tcd) => (
                <option value={tcd} key={tcd}>
                  {tcd}
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
          name={`${props.name}.nivelCompartilhamento.value` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Select
              disabled={props.disabled}
              value={value as string}
              onChange={(e) => {
                handleChangeNivelCompartilhamento(e);
                onChange(e.target.value);
              }}
              onBlur={onBlur}
              ref={ref}
              isInvalid={
                _.get(
                  props.methods.formState.errors,
                  `${props.name}.nivelCompartilhamento.value`
                )
                  ? true
                  : false
              }
            >
              {Object.values(tipoNivelCompartilhamento).map((tnc) => (
                <option value={tnc} key={tnc}>
                  {tnc}
                </option>
              ))}
            </Form.Select>
          )}
        />
      </Col>
      <Col>
        <Controller
          rules={
            isCompartilhamentoParcial ? { required: true } : { required: false }
          }
          control={props.methods.control}
          name={`${props.name}.descricaoDadosCompartilhados` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                _.get(
                  props.methods.formState.errors,
                  `${props.name}.descricaoDadosCompartilhados`
                )
                  ? true
                  : false
              }
              disabled={props.disabled || !isCompartilhamentoParcial}
              ref={ref}
            />
          )}
        />
      </Col>
      {isCompatilhamentoPrivado ? (
        <Col>
          <Controller
            rules={{ required: true }}
            control={props.methods.control}
            name={`${props.name}.finalidadeComp.value` as FieldPath<Case>}
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
                    `${props.name}.finalidadeComp.value`
                  )
                    ? true
                    : false
                }
              >
                {Object.values(tipoFinalidadeCompartilhamento).map((tfc) => (
                  <option value={tfc} key={tfc}>
                    {tfc}
                  </option>
                ))}
              </Form.Select>
            )}
          />
        </Col>
      ) : (
        <Col>
          <Controller
            rules={{ required: true }}
            control={props.methods.control}
            name={`${props.name}.descricaoFinalidadeComp` as FieldPath<Case>}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                type="text"
                value={value as string}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={
                  _.get(
                    props.methods.formState.errors,
                    `${props.name}.descricaoFinalidadeComp`
                  )
                    ? true
                    : false
                }
                disabled={props.disabled}
                ref={ref}
              />
            )}
          />
        </Col>
      )}
      <Col lg={1}></Col>
    </Row>
  );
};

export default Section11FormRowSub;
