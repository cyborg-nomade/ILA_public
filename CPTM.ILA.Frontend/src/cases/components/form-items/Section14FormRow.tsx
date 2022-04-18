import React, { useState } from "react";

import { useFormikContext, getIn, FieldArray } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import Section14FormRowSub from "./Section14FormRowSub";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { emptyItemContratoTI } from "../../../shared/models/case-helpers/case-helpers.model";
import CreateCommentBox from "./../../../threads-comments/components/CreateCommentBox";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";

const Section14FormRow = (props: { disabled: boolean }) => {
  const { values, setFieldValue } = useFormikContext<Case>();

  const [trata, setTrata] = useState(false);

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
      setFieldValue("contratoServicosTITratamentoDados", []);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="d-grid justify-content-center">
          <Form.Check
            type="radio"
            name="trata"
            required
            label="Sim"
            value="SIM"
            checked={trata}
            disabled={props.disabled}
            onChange={handleTrataRadio}
          />
          <Form.Check
            type="radio"
            name="trata"
            required
            inline
            label="Não"
            value="NÃO"
            checked={!trata}
            disabled={props.disabled}
            onChange={handleTrataRadio}
          />
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col lg={1}>
          <Row>
            <CreateCommentBox
              item={CaseIndexDictionary.contratoServicosTITratamentoDados}
            />
          </Row>
        </Col>
      </Row>
      <FieldArray
        name="contratoServicosTITratamentoDados"
        render={(arrayHelpers) => (
          <React.Fragment>
            {values.contratoServicosTITratamentoDados &&
            values.contratoServicosTITratamentoDados.length > 0 ? (
              values.contratoServicosTITratamentoDados.map((item, index) => (
                <React.Fragment key={index}>
                  <Section14FormRowSub
                    className={`mb-3 pt-2 pb-2 ${
                      index % 2 === 0 ? "bg-primary bg-opacity-10" : ""
                    }`}
                    name={`contratoServicosTITratamentoDados[${index}]`}
                  />
                  <Row className="justify-content-center">
                    <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                      <Button
                        variant="primary"
                        onClick={() => arrayHelpers.push(emptyItemContratoTI())}
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
                    onClick={() => arrayHelpers.push(emptyItemContratoTI())}
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

export default Section14FormRow;
