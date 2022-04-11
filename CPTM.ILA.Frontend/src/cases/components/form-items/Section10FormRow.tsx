import React, { useState } from "react";

import { useFormikContext, getIn } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import { tipoCategoriaTitulares } from "../../../shared/models/case-helpers/enums.model";
import CreateCommentBox from "./../../../threads-comments/components/CreateCommentBox";

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

  const [trata, setTrata] = useState(false);

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

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
    }
  };

  return (
    <Row className={props.className}>
      <Form.Label as={Col}>{props.label}</Form.Label>
      {props.full ? (
        <Col>
          <Form.Select
            disabled={props.disabled}
            name={`${props.name}.tipoCategoria`}
            value={getIn(values, `${props.name}.tipoCategoria`)}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={
              getIn(touched, `${props.name}.tipoCategoria`) &&
              !getIn(errors, `${props.name}.tipoCategoria`)
            }
            isInvalid={!!getIn(errors, `${props.name}.tipoCategoria`)}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
          disabled={
            props.disabled ||
            (getIn(values, `${props.name}.trataDados`) &&
              getIn(values, `${props.name}.trataDados`) !== "SIM")
          }
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
