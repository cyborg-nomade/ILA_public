import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FullCaseObject } from "../../../shared/models/cases.model";

const Section11FormRow = (props: {
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleBlur, setFieldValue } =
    useFormikContext<FullCaseObject>();

  const [nomeInstituicao, setNomeInstituicao] = useState(
    getIn(values, `${props.name}.nomeInstituicao`)
  );
  const [dadosCompartilhados, setDadosCompartilhados] = useState(
    getIn(values, `${props.name}.dadosCompartilhados`)
  );
  const [finalidadeCompartilhamento, setFinalidadeCompartilhamento] = useState(
    getIn(values, `${props.name}.finalidadeCompartilhamento`)
  );

  const handleChangeNomeInstituicao = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNomeInstituicao(event.currentTarget.value);
  };
  const handleBlurNomeInstituicao = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(`${props.name}.nomeInstituicao`, nomeInstituicao, true);
  };

  const handleChangeDadosCompartilhados = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDadosCompartilhados(event.currentTarget.value);
  };
  const handleBlurDadosCompartilhados = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(
      `${props.name}.dadosCompartilhados`,
      dadosCompartilhados,
      true
    );
  };

  const handleChangeFinalidadeCompartilhamento = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFinalidadeCompartilhamento(event.currentTarget.value);
  };
  const handleBlurFinalidadeCompartilhamento = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(
      `${props.name}.finalidadeCompartilhamento`,
      finalidadeCompartilhamento,
      true
    );
  };

  return (
    <Row className={props.className}>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.nomeInstituicao`}
          value={nomeInstituicao}
          onChange={handleChangeNomeInstituicao}
          onBlur={handleBlurNomeInstituicao}
          isValid={
            getIn(touched, `${props.name}.nomeInstituicao`) &&
            !getIn(errors, `${props.name}.nomeInstituicao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.nomeInstituicao`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.dadosCompartilhados`}
          value={dadosCompartilhados}
          onChange={handleChangeDadosCompartilhados}
          onBlur={handleBlurDadosCompartilhados}
          isValid={
            getIn(touched, `${props.name}.dadosCompartilhados`) &&
            !getIn(errors, `${props.name}.dadosCompartilhados`)
          }
          isInvalid={!!getIn(errors, `${props.name}.dadosCompartilhados`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.finalidadeCompartilhamento`}
          value={finalidadeCompartilhamento}
          onChange={handleChangeFinalidadeCompartilhamento}
          onBlur={handleBlurFinalidadeCompartilhamento}
          isValid={
            getIn(touched, `${props.name}.finalidadeCompartilhamento`) &&
            !getIn(errors, `${props.name}.finalidadeCompartilhamento`)
          }
          isInvalid={
            !!getIn(errors, `${props.name}.finalidadeCompartilhamento`)
          }
        />
      </Col>
    </Row>
  );
};

export default Section11FormRow;
