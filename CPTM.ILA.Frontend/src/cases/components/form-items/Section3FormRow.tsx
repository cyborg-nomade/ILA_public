import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Case } from "../../../shared/models/cases.model";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";

const Section3FormRow = () => {
  const { values, touched, errors, setFieldValue, handleBlur } =
    useFormikContext<Case>();

  const [trata, setTrata] = useState(false);
  const [coleta, setColeta] = useState(
    getIn(values, "fasesCicloTratamento.coleta")
  );
  const [retencao, setRetencao] = useState(
    getIn(values, "fasesCicloTratamento.retencao")
  );
  const [processamento, setProcessamento] = useState(
    getIn(values, "fasesCicloTratamento.processamento")
  );
  const [compartilhamento, setCompartilhamento] = useState(
    getIn(values, "fasesCicloTratamento.compatilhamento")
  );
  const [eliminacao, setEliminacao] = useState(
    getIn(values, "fasesCicloTratamento.eliminacao")
  );

  const handleChangeColeta = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColeta(event.currentTarget.value);
  };
  const handleBlurColeta = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setFieldValue("fasesCicloTratamento.coleta", coleta, true);
  };

  const handleChangeRetencao = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetencao(event.currentTarget.value);
  };
  const handleBlurRetencao = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setFieldValue("fasesCicloTratamento.retencao", retencao, true);
  };

  const handleChangeProcessamento = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProcessamento(event.currentTarget.value);
  };
  const handleBlurProcessamento = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue("fasesCicloTratamento.processamento", processamento, true);
  };

  const handleChangeCompartilhamento = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompartilhamento(event.currentTarget.value);
  };
  const handleBlurCompartilhamento = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(
      "fasesCicloTratamento.compartilhamento",
      compartilhamento,
      true
    );
  };

  const handleChangeEliminacao = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEliminacao(event.currentTarget.value);
  };
  const handleBlurEliminacao = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setFieldValue("fasesCicloTratamento.eliminacao", eliminacao, true);
  };

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
    }
  };

  return (
    <Row className="mb-3">
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
      <Col>
        <Form.Check
          type="radio"
          name="trata"
          required
          inline
          label="Sim"
          value="SIM"
          onChange={handleTrataRadio}
        />
        <Form.Check
          type="radio"
          name="trata"
          required
          inline
          label="Não"
          value="NÃO"
          onChange={handleTrataRadio}
        />
      </Col>
      <Col>
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.coleta"
          name="fasesCicloTratamento.coleta"
          checked={values.fasesCicloTratamento.coleta}
          onChange={handleChangeColeta}
          onBlur={handleBlurColeta}
          isValid={
            getIn(touched, "fasesCicloTratamento.coleta") &&
            !getIn(errors, "fasesCicloTratamento.coleta")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.coleta")}
        />
      </Col>
      <Col>
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.retencao"
          name="fasesCicloTratamento.retencao"
          checked={values.fasesCicloTratamento.retencao}
          onChange={handleChangeRetencao}
          onBlur={handleBlurRetencao}
          isValid={
            getIn(touched, "fasesCicloTratamento.retencao") &&
            !getIn(errors, "fasesCicloTratamento.retencao")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.retencao")}
        />
      </Col>
      <Col>
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.processamento"
          name="fasesCicloTratamento.processamento"
          checked={values.fasesCicloTratamento.processamento}
          onChange={handleChangeProcessamento}
          onBlur={handleBlurProcessamento}
          isValid={
            getIn(touched, "fasesCicloTratamento.processamento") &&
            !getIn(errors, "fasesCicloTratamento.processamento")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.processamento")}
        />
      </Col>
      <Col>
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.compartilhamento"
          name="fasesCicloTratamento.compartilhamento"
          checked={values.fasesCicloTratamento.compartilhamento}
          onChange={handleChangeCompartilhamento}
          onBlur={handleBlurCompartilhamento}
          isValid={
            getIn(touched, "fasesCicloTratamento.compartilhamento") &&
            !getIn(errors, "fasesCicloTratamento.compartilhamento")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.compartilhamento")}
        />
      </Col>
      <Col>
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.eliminacao"
          name="fasesCicloTratamento.eliminacao"
          checked={values.fasesCicloTratamento.eliminacao}
          onChange={handleChangeEliminacao}
          onBlur={handleBlurEliminacao}
          isValid={
            getIn(touched, "fasesCicloTratamento.eliminacao") &&
            !getIn(errors, "fasesCicloTratamento.eliminacao")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.eliminacao")}
        />
      </Col>
    </Row>
  );
};

export default Section3FormRow;
