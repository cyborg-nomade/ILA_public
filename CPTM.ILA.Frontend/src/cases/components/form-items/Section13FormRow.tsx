import React, { useState } from "react";

import { useFormikContext, FieldArray } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { emptyItemTransferenciaInternacional } from "../../../shared/models/case-helpers/case-helpers.model";
import CreateCommentBox from "./../../../threads-comments/components/CreateCommentBox";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import Section13FormRowSub from "./Section13FormRowSub";

const Section13FormRow = (props: { countries: string[] }) => {
  const { values, setFieldValue } = useFormikContext<Case>();

  const [trata, setTrata] = useState(false);

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
      setFieldValue("transferenciaInternacional", []);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col></Col>
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
        <Col lg={1}>
          <Row>
            <CreateCommentBox
              item={CaseIndexDictionary.transferenciaInternacional}
            />
          </Row>
        </Col>
      </Row>
      <FieldArray
        name="transferenciaInternacional"
        render={(arrayHelpers) => (
          <React.Fragment>
            {values.transferenciaInternacional &&
            values.transferenciaInternacional.length > 0 ? (
              values.transferenciaInternacional.map((item, index) => (
                <React.Fragment key={index}>
                  <Section13FormRowSub
                    className={`mb-3 pt-2 pb-2 ${
                      index % 2 === 0 ? "bg-primary bg-opacity-10" : ""
                    }`}
                    name={`transferenciaInternacional[${index}]`}
                    countries={props.countries}
                  />
                  <Row className="justify-content-center">
                    <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                      <Button
                        variant="primary"
                        onClick={() =>
                          arrayHelpers.push(
                            emptyItemTransferenciaInternacional()
                          )
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
                      arrayHelpers.push(emptyItemTransferenciaInternacional())
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

export default Section13FormRow;
