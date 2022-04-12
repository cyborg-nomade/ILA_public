import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import { tipoCategoriaTitulares } from "../../../shared/models/case-helpers/enums.model";
import CreateCommentBox from "./../../../threads-comments/components/CreateCommentBox";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Section10FormRow = (props: {
  label: string;
  disabled: boolean;
  name: string;
  className: string;
  full: boolean;
  tooltip?: string;
  itemRef: string;
}) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<Case>();

  const [descricao, setDescricao] = useState(
    getIn(values, `${props.name}.descricao`)
  );
  const [isDescricaoEnabled, setIsDescricaoEnabled] = useState(
    false || props.full
  );

  const handleChangeDescricao = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricao(event.currentTarget.value);
  };
  const handleBlurDescricao = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setFieldValue(`${props.name}.descricao`, descricao);
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    if (event.currentTarget.value === "NÃO") {
      setIsDescricaoEnabled(false);
    } else {
      setIsDescricaoEnabled(true);
    }
  };

  return (
    <Row className={props.className}>
      {props.tooltip ? (
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip className="text-muted">{props.tooltip}</Tooltip>}
        >
          <Form.Label as={Col}>{props.label}</Form.Label>
        </OverlayTrigger>
      ) : (
        <Form.Label as={Col}>{props.label}</Form.Label>
      )}
      {props.full ? (
        <Col>
          <Form.Select
            disabled={props.disabled}
            name={`${props.name}.tipoCategoria.value`}
            value={getIn(values, `${props.name}.tipoCategoria.value`)}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={
              getIn(touched, `${props.name}.tipoCategoria.value`) &&
              !getIn(errors, `${props.name}.tipoCategoria.value`)
            }
            isInvalid={!!getIn(errors, `${props.name}.tipoCategoria.value`)}
          >
            {Object.values(tipoCategoriaTitulares).map((ctg) => (
              <option value={ctg} key={ctg}>
                {ctg}
              </option>
            ))}
          </Form.Select>
        </Col>
      ) : (
        <Col>
          <Form.Check
            type="radio"
            name={`${props.name}.trataDados`}
            required
            label="Sim"
            value="SIM"
            onChange={handleChangeRadio}
            onBlur={handleBlur}
            isValid={
              getIn(touched, `${props.name}.trataDados`) &&
              !getIn(errors, `${props.name}.trataDados`)
            }
            isInvalid={!!getIn(errors, `${props.name}.trataDados`)}
          />
          <Form.Check
            type="radio"
            name={`${props.name}.trataDados`}
            required
            label="Não"
            value="NÃO"
            onChange={handleChangeRadio}
            onBlur={handleBlur}
            isValid={
              getIn(touched, `${props.name}.trataDados`) &&
              !getIn(errors, `${props.name}.trataDados`)
            }
            isInvalid={!!getIn(errors, `${props.name}.trataDados`)}
          />
        </Col>
      )}
      <Col>
        <Form.Control
          disabled={props.disabled || !isDescricaoEnabled}
          type="text"
          name={`${props.name}.descricao`}
          value={
            getIn(values, `${props.name}.trataDados`) === "NÃO" ? "" : descricao
          }
          onChange={handleChangeDescricao}
          onBlur={handleBlurDescricao}
          isValid={
            getIn(touched, `${props.name}.descricao`) &&
            !getIn(errors, `${props.name}.descricao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.descricao`)}
        />
      </Col>
      <Col lg={1}>
        {!props.full && (
          <Row>
            <CreateCommentBox item={props.itemRef} />
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Section10FormRow;
