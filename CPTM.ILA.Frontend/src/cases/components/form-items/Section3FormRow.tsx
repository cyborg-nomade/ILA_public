import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Case } from "../../../shared/models/cases.model";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import CreateCommentBox from "./../../../threads-comments/components/CreateCommentBox";

const Section3FormRow = () => {
  const { values, touched, errors, setFieldValue, handleBlur, handleChange } =
    useFormikContext<Case>();

  const [trata, setTrata] = useState(false);

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
      setFieldValue("fasesCicloTratamento.coleta", false);
      setFieldValue("fasesCicloTratamento.retencao", false);
      setFieldValue("fasesCicloTratamento.processamento", false);
      setFieldValue("fasesCicloTratamento.compartilhamento", false);
      setFieldValue("fasesCicloTratamento.eliminacao", false);
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
      <Col className="d-grid justify-content-center">
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.coleta"
          name="fasesCicloTratamento.coleta"
          checked={values.fasesCicloTratamento.coleta}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, "fasesCicloTratamento.coleta") &&
            !getIn(errors, "fasesCicloTratamento.coleta")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.coleta")}
        />
      </Col>
      <Col className="d-grid justify-content-center">
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.retencao"
          name="fasesCicloTratamento.retencao"
          checked={values.fasesCicloTratamento.retencao}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, "fasesCicloTratamento.retencao") &&
            !getIn(errors, "fasesCicloTratamento.retencao")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.retencao")}
        />
      </Col>
      <Col className="d-grid justify-content-center">
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.processamento"
          name="fasesCicloTratamento.processamento"
          checked={values.fasesCicloTratamento.processamento}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, "fasesCicloTratamento.processamento") &&
            !getIn(errors, "fasesCicloTratamento.processamento")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.processamento")}
        />
      </Col>
      <Col className="d-grid justify-content-center">
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.compartilhamento"
          name="fasesCicloTratamento.compartilhamento"
          checked={values.fasesCicloTratamento.compartilhamento}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, "fasesCicloTratamento.compartilhamento") &&
            !getIn(errors, "fasesCicloTratamento.compartilhamento")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.compartilhamento")}
        />
      </Col>
      <Col className="d-grid justify-content-center">
        <Form.Check
          disabled={!trata}
          type="checkbox"
          id="fasesCicloTratamento.eliminacao"
          name="fasesCicloTratamento.eliminacao"
          checked={values.fasesCicloTratamento.eliminacao}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, "fasesCicloTratamento.eliminacao") &&
            !getIn(errors, "fasesCicloTratamento.eliminacao")
          }
          isInvalid={!!getIn(errors, "fasesCicloTratamento.eliminacao")}
        />
      </Col>
      <Col lg={1} className="p-0">
        <CreateCommentBox item={CaseIndexDictionary.fasesCicloTratamento} />
      </Col>
    </Row>
  );
};

export default Section3FormRow;
