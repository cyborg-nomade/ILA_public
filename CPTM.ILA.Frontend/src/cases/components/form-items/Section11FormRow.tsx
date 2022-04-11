import React, { useState } from "react";

import { useFormikContext, getIn, FieldArray } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import CreateCommentBox from "../../../threads-comments/components/CreateCommentBox";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { emptyItemCompatilhamentoDados } from "../../../shared/models/case-helpers/case-helpers.model";
import Section11FormRowSub from "./Section11FormRowSub";

const Section11FormRow = (props: { disabled: boolean }) => {
  const { values, setFieldValue } = useFormikContext<Case>();

  const [trata, setTrata] = useState(false);

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
      setFieldValue("compartilhamentoDadosPessoais", []);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Form.Label as={Col}></Form.Label>
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
        <Form.Label as={Col}></Form.Label>
        <Form.Label as={Col}></Form.Label>
        <Form.Label as={Col}></Form.Label>
        <Form.Label as={Col}></Form.Label>
        <Col lg={1}>
          <Row>
            <CreateCommentBox
              item={CaseIndexDictionary.compartilhamentoDadosPessoais}
            />
          </Row>
        </Col>
      </Row>
      <FieldArray
        name="compartilhamentoDadosPessoais"
        render={(arrayHelpers) => (
          <React.Fragment>
            {values.compartilhamentoDadosPessoais &&
            values.compartilhamentoDadosPessoais.length > 0 ? (
              values.compartilhamentoDadosPessoais.map((item, index) => (
                <React.Fragment key={index}>
                  <Section11FormRowSub
                    className={`mb-3 pt-2 pb-2 ${
                      index % 2 === 0 ? "bg-primary bg-opacity-10" : ""
                    }`}
                    disabled={props.disabled}
                    name={`compartilhamentoDadosPessoais[${index}]`}
                  />
                  <Row className="justify-content-center">
                    <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                      <Button
                        variant="primary"
                        onClick={() =>
                          arrayHelpers.push(emptyItemCompatilhamentoDados())
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
                    onClick={() =>
                      arrayHelpers.push(emptyItemCompatilhamentoDados())
                    }
                    disabled={!trata}
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

export default Section11FormRow;
