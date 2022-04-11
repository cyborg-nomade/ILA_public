import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import {
  tipoFontesRetencao,
  tipoTempoRetencao,
} from "../../../shared/models/case-helpers/enums.model";

const Section7FormRowSub = (props: {
  name: string;
  className: string;
  systems: string[];
}) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<Case>();

  const [isSystemSelect, setIsSystemSelect] = useState(false);

  const [descricao, setDescricao] = useState(
    getIn(values, `${props.name}.descricao`)
  );

  const handleChangeDescricao = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricao(event.currentTarget.value);
  };
  const handleBlurDescricao = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setFieldValue(`${props.name}.descricao`, descricao, true);
  };

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

  return (
    <Row className={props.className}>
      <Col lg={1}></Col>
      <Col></Col>
      <Col></Col>
      <Col>
        <Form.Control
          type="text"
          name={`${props.name}.descricao`}
          value={descricao}
          onChange={handleChangeDescricao}
          onBlur={handleBlurDescricao}
          isValid={
            getIn(touched, `${props.name}.descricao`) &&
            !getIn(errors, `${props.name}.descricao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.descricao`)}
        />
        <Form.Control.Feedback type="invalid">
          Esse campo é obrigatório
        </Form.Control.Feedback>
      </Col>
      <Col>
        <Form.Select
          name={`${props.name}.tempoRetencao.value`}
          value={getIn(values, `${props.name}.tempoRetencao.value`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tempoRetencao.value`) &&
            !getIn(errors, `${props.name}.tempoRetencao.value`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tempoRetencao.value`)}
        >
          {Object.values(tipoTempoRetencao).map((ttr) => (
            <option value={ttr} key={ttr}>
              {ttr}
            </option>
          ))}
        </Form.Select>
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
        >
          {Object.values(tipoFontesRetencao).map((tfr) => (
            <option value={tfr} key={tfr}>
              {tfr}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
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
          />
        ) : (
          <Form.Select
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
          </Form.Select>
        )}
      </Col>
      <Col lg={1}></Col>
    </Row>
  );
};

export default Section7FormRowSub;
