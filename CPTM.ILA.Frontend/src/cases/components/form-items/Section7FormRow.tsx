import React, { useState } from "react";

import { useFormikContext, getIn, FieldArray } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Case } from "../../../shared/models/cases.model";
import CreateCommentBox from "./../../../threads-comments/components/CreateCommentBox";
import { tipoFontesRetencao } from "../../../shared/models/case-helpers/enums.model";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {
  emptyItemCategoriaDadosPessoais,
  itemCategoriaDadosPessoais,
} from "../../../shared/models/case-helpers/case-helpers.model";
import Section7FormRowSub from "./Section7FormRowSub";

const Section7FormRow = (props: {
  tooltip?: JSX.Element;
  label: string;
  disabled: boolean;
  name: string;
  className: string;
  itemRef: string;
  systems: string[];
}) => {
  const { values, setFieldValue } = useFormikContext<Case>();

  const [trata, setTrata] = useState(false);

  const categoriaAray: itemCategoriaDadosPessoais[] = getIn(
    values,
    `${props.name}`
  );

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
      setFieldValue(`${props.name}`, []);
    }
  };

  return (
    <React.Fragment>
      <Row className={props.className}>
        <Col lg={1}>
          <p>{props.itemRef}</p>
        </Col>
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
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col lg={1}>
          <Row>
            <CreateCommentBox item={props.itemRef} />
          </Row>
        </Col>
      </Row>
      <FieldArray
        name={props.name}
        render={(arrayHelpers) => (
          <React.Fragment>
            {categoriaAray && categoriaAray.length > 0 ? (
              categoriaAray.map((item, index) => (
                <React.Fragment key={index}>
                  <Section7FormRowSub
                    systems={props.systems}
                    className={props.className}
                    name={`${props.name}[${index}]`}
                  />
                  <Row className="justify-content-center">
                    <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                      <Button
                        variant="primary"
                        onClick={() =>
                          arrayHelpers.push(emptyItemCategoriaDadosPessoais())
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </Button>
                    </ButtonGroup>
                  </Row>
                </React.Fragment>
              ))
            ) : (
              <Row className="justify-content-center">
                <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                  <Button
                    variant="primary"
                    disabled={!trata}
                    onClick={() =>
                      arrayHelpers.push(emptyItemCategoriaDadosPessoais())
                    }
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Row>
            )}
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );
};

export default Section7FormRow;
