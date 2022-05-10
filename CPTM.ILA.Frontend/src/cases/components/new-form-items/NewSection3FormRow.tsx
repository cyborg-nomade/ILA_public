import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Case } from "../../../shared/models/cases.model";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import CreateCommentBox from "../../../threads-comments/components/CreateCommentBox";

const NewSection3FormRow = (props: {
  disabled: boolean;
  methods: UseFormReturn<Case, any>;
}) => {
  const [trata, setTrata] = useState(false);

  useEffect(() => {
    const values = props.methods.getValues();
    for (const value of Object.values(values.fasesCicloTratamento)) {
      if (value) {
        setTrata(true);
      }
    }
    return () => {};
  }, [props.methods.getValues]);

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
      props.methods.setValue("fasesCicloTratamento.coleta", false);
      props.methods.setValue("fasesCicloTratamento.retencao", false);
      props.methods.setValue("fasesCicloTratamento.processamento", false);
      props.methods.setValue("fasesCicloTratamento.compartilhamento", false);
      props.methods.setValue("fasesCicloTratamento.eliminacao", false);
    }
  };

  return (
    <Row className="mb-3 align-items-center bg-primary bg-opacity-10">
      <Col lg={1}>
        <p>{CaseIndexDictionary.fasesCicloTratamento}</p>
      </Col>
      <Col>
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip className="text-muted">
              Informações sobre o ciclo de vida do tratamento de dados pessoais
              podem ser observadas no capítulo 3 do Guia de Boas Práticas LGPD,
              disponível em
              https://www.gov.br/governodigital/pt-br/governanca-de-dados/guia-de-boas-praticas-lei-geral-de-protecao-de-dados-lgpd
            </Tooltip>
          }
        >
          <Form.Label>
            Em qual fase do ciclo de vida o Operador atua?
          </Form.Label>
        </OverlayTrigger>
      </Col>
      <Col className="d-grid justify-content-center">
        <Form.Check
          type="radio"
          name="trata"
          required
          label="Sim"
          value="SIM"
          checked={trata}
          disabled={props.disabled}
          onChange={handleTrataRadio}
        />
        <Form.Check
          type="radio"
          name="trata"
          required
          inline
          label="Não"
          value="NÃO"
          checked={!trata}
          disabled={props.disabled}
          onChange={handleTrataRadio}
        />
      </Col>
      <Col className="d-grid justify-content-center">
        <Controller
          control={props.methods.control}
          name="fasesCicloTratamento.coleta"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Check
              disabled={!trata || props.disabled}
              type="checkbox"
              onChange={onChange}
              onBlur={onBlur}
              checked={value}
              ref={ref}
              isInvalid={
                props.methods.formState.errors.fasesCicloTratamento?.coleta
                  ? true
                  : false
              }
            />
          )}
        />
      </Col>
      <Col className="d-grid justify-content-center">
        <Controller
          control={props.methods.control}
          name="fasesCicloTratamento.retencao"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Check
              disabled={!trata || props.disabled}
              type="checkbox"
              onChange={onChange}
              onBlur={onBlur}
              checked={value}
              ref={ref}
              isInvalid={
                props.methods.formState.errors.fasesCicloTratamento?.coleta
                  ? true
                  : false
              }
            />
          )}
        />
      </Col>
      <Col className="d-grid justify-content-center">
        <Controller
          control={props.methods.control}
          name="fasesCicloTratamento.processamento"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Check
              disabled={!trata || props.disabled}
              type="checkbox"
              onChange={onChange}
              onBlur={onBlur}
              checked={value}
              ref={ref}
              isInvalid={
                props.methods.formState.errors.fasesCicloTratamento?.coleta
                  ? true
                  : false
              }
            />
          )}
        />
      </Col>
      <Col className="d-grid justify-content-center">
        <Controller
          control={props.methods.control}
          name="fasesCicloTratamento.compartilhamento"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Check
              disabled={!trata || props.disabled}
              type="checkbox"
              onChange={onChange}
              onBlur={onBlur}
              checked={value}
              ref={ref}
              isInvalid={
                props.methods.formState.errors.fasesCicloTratamento?.coleta
                  ? true
                  : false
              }
            />
          )}
        />
      </Col>
      <Col className="d-grid justify-content-center">
        <Controller
          control={props.methods.control}
          name="fasesCicloTratamento.eliminacao"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Check
              disabled={!trata || props.disabled}
              type="checkbox"
              onChange={onChange}
              onBlur={onBlur}
              checked={value}
              ref={ref}
              isInvalid={
                props.methods.formState.errors.fasesCicloTratamento?.coleta
                  ? true
                  : false
              }
            />
          )}
        />
      </Col>
      <Col lg={1} className="p-0">
        <CreateCommentBox item={CaseIndexDictionary.fasesCicloTratamento} />
      </Col>
    </Row>
  );
};

export default NewSection3FormRow;
