import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  FullCaseObject,
  tipoGarantiaTranferenciaInternacional,
} from "../../../shared/models/cases.model";

const Section13FormRow = (props: {
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<FullCaseObject>();

  const [nomeOrganizacao, setNomeOrganizacao] = useState(
    getIn(values, `${props.name}.nomeOrganizacao`)
  );
  const [pais, setPais] = useState(getIn(values, `${props.name}.pais`));
  const [dadosTransferidos, setDadosTransferidos] = useState(
    getIn(values, `${props.name}.dadosTransferidos`)
  );

  const handleChangeNomeOrganizacao = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNomeOrganizacao(event.currentTarget.value);
  };
  const handleBlurNomeOrganizacao = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(`${props.name}.nomeOrganizacao`, nomeOrganizacao, true);
  };

  const handleChangePais = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPais(event.currentTarget.value);
  };
  const handleBlurPais = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setFieldValue(`${props.name}.pais`, pais, true);
  };

  const handleChangeDadosTransferidos = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDadosTransferidos(event.currentTarget.value);
  };
  const handleBlurDadosTransferidos = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    handleBlur(event);
    setFieldValue(`${props.name}.dadosTransferidos`, dadosTransferidos, true);
  };

  return (
    <Row className={props.className}>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.nomeOrganizacao`}
          value={nomeOrganizacao}
          onChange={handleChangeNomeOrganizacao}
          onBlur={handleBlurNomeOrganizacao}
          isValid={
            getIn(touched, `${props.name}.nomeOrganizacao`) &&
            !getIn(errors, `${props.name}.nomeOrganizacao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.nomeOrganizacao`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.pais`}
          value={pais}
          onChange={handleChangePais}
          onBlur={handleBlurPais}
          isValid={
            getIn(touched, `${props.name}.pais`) &&
            !getIn(errors, `${props.name}.pais`)
          }
          isInvalid={!!getIn(errors, `${props.name}.pais`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.dadosTransferidos`}
          value={dadosTransferidos}
          onChange={handleChangeDadosTransferidos}
          onBlur={handleBlurDadosTransferidos}
          isValid={
            getIn(touched, `${props.name}.dadosTransferidos`) &&
            !getIn(errors, `${props.name}.dadosTransferidos`)
          }
          isInvalid={!!getIn(errors, `${props.name}.dadosTransferidos`)}
        />
      </Col>
      <Col>
        <Form.Select
          disabled={props.disabled}
          name={`${props.name}.tipoGarantia`}
          value={getIn(values, `${props.name}.tipoGarantia`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tipoGarantia`) &&
            !getIn(errors, `${props.name}.tipoGarantia`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tipoGarantia`)}
        >
          {Object.values(tipoGarantiaTranferenciaInternacional).map((tip) => (
            <option value={tip} key={tip}>
              {tip}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Section13FormRow;
