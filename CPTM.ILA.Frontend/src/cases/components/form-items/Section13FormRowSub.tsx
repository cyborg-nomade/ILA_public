import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";

const Section13FormRowSub = (props: {
  name: string;
  className: string;
  countries: string[];
}) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<Case>();

  const [nomeOrganizacao, setNomeOrganizacao] = useState(
    getIn(values, `${props.name}.nomeOrganizacao`)
  );
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
      <Col></Col>
      <Col>
        <Form.Control
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
        <Form.Select
          name={`${props.name}.pais`}
          value={getIn(values, `${props.name}.pais`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.pais`) &&
            !getIn(errors, `${props.name}.pais`)
          }
          isInvalid={!!getIn(errors, `${props.name}.pais`)}
        >
          {Object.values(props.countries).map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form.Control
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
        <Form.Control
          name={`${props.name}.tipoGarantia`}
          value={getIn(values, `${props.name}.tipoGarantia`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tipoGarantia`) &&
            !getIn(errors, `${props.name}.tipoGarantia`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tipoGarantia`)}
        />
      </Col>
      <Col lg={1}></Col>
    </Row>
  );
};

export default Section13FormRowSub;
