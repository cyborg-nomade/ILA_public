import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
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
}) => {
  const { values, touched, errors, handleBlur, handleChange, setFieldValue } =
    useFormikContext<Case>();

  const [nomeInstituicao, setNomeInstituicao] = useState(
    getIn(values, `${props.name}.nomeInstituicao`)
  );
  const [descricaoDadosCompartilhados, setDescricaoDadosCompartilhados] =
    useState(getIn(values, `${props.name}.descricaoDadosCompartilhados`));
  const [descricaoFinalidadeComp, setDescricaoFinalidadeComp] = useState(
    getIn(values, `${props.name}.descricaoFinalidadeComp`)
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

  const handleChangeDescricaoDadosCompartilhados = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricaoDadosCompartilhados(event.currentTarget.value);
  };
  const handleBlurDescricaoDadosCompartilhados = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(
      `${props.name}.descricaoDadosCompartilhados`,
      descricaoDadosCompartilhados,
      true
    );
  };

  const handleChangeDescricaoFinalidadeComp = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricaoFinalidadeComp(event.currentTarget.value);
  };
  const handleBlurDescricaoFinalidadeComp = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(
      `${props.name}.descricaoFinalidadeComp`,
      descricaoFinalidadeComp,
      true
    );
  };

  return (
    <Row className={props.className}>
      <Col></Col>
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
        <Form.Select
          name={`${props.name}.tipoCompDados.value`}
          value={getIn(values, `${props.name}.tipoCompDados.value`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tipoCompDados.value`) &&
            !getIn(errors, `${props.name}.tipoCompDados.value`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tipoCompDados.value`)}
        >
          {Object.values(tipoCompartilhamentoDados).map((tcd) => (
            <option value={tcd} key={tcd}>
              {tcd}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form.Select
          name={`${props.name}.nivelCompartilhamento.value`}
          value={getIn(values, `${props.name}.nivelCompartilhamento.value`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.nivelCompartilhamento.value`) &&
            !getIn(errors, `${props.name}.nivelCompartilhamento.value`)
          }
          isInvalid={
            !!getIn(errors, `${props.name}.nivelCompartilhamento.value`)
          }
        >
          {Object.values(tipoNivelCompartilhamento).map((tnc) => (
            <option value={tnc} key={tnc}>
              {tnc}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form.Control
          disabled={
            props.disabled ||
            getIn(values, `${props.name}.nivelCompartilhamento.value`) !==
              tipoNivelCompartilhamento.parcial
          }
          type="text"
          name={`${props.name}.descricaoDadosCompartilhados`}
          value={descricaoDadosCompartilhados}
          onChange={handleChangeDescricaoDadosCompartilhados}
          onBlur={handleBlurDescricaoDadosCompartilhados}
          isValid={
            getIn(touched, `${props.name}.descricaoDadosCompartilhados`) &&
            !getIn(errors, `${props.name}.descricaoDadosCompartilhados`)
          }
          isInvalid={
            !!getIn(errors, `${props.name}.descricaoDadosCompartilhados`)
          }
        />
      </Col>
      {getIn(values, `${props.name}.tipoCompDados.value`) ===
      tipoCompartilhamentoDados.privado ? (
        <Col>
          <Form.Select
            name={`${props.name}.finalidadeComp.value`}
            value={getIn(values, `${props.name}.finalidadeComp.value`)}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={
              getIn(touched, `${props.name}.finalidadeComp.value`) &&
              !getIn(errors, `${props.name}.finalidadeComp.value`)
            }
            isInvalid={!!getIn(errors, `${props.name}.finalidadeComp.value`)}
          >
            {Object.values(tipoFinalidadeCompartilhamento).map((tfc) => (
              <option value={tfc} key={tfc}>
                {tfc}
              </option>
            ))}
          </Form.Select>
        </Col>
      ) : (
        <Col>
          <Form.Control
            disabled={props.disabled}
            type="text"
            name={`${props.name}.descricaoFinalidadeComp`}
            value={descricaoFinalidadeComp}
            onChange={handleChangeDescricaoFinalidadeComp}
            onBlur={handleBlurDescricaoFinalidadeComp}
            isValid={
              getIn(touched, `${props.name}.descricaoFinalidadeComp`) &&
              !getIn(errors, `${props.name}.descricaoFinalidadeComp`)
            }
            isInvalid={!!getIn(errors, `${props.name}.descricaoFinalidadeComp`)}
          />
        </Col>
      )}
      <Col lg={1}></Col>
    </Row>
  );
};

export default Section11FormRowSub;
