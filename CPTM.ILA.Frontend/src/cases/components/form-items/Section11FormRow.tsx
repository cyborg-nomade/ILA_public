import React, { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";
import CreateCommentBox from "../../../threads-comments/components/CreateCommentBox";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { emptyItemCompatilhamentoDados } from "../../../shared/models/case-helpers/case-helpers.model";
import NewSection11FormRowSub from "./Section11FormRowSub";

const Section11FormRow = (props: {
  disabled: boolean;
  methods: UseFormReturn<Case, any>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: props.methods.control, // control props comes from useForm
    name: "compartilhamentoDadosPessoais" as const, // unique name for your Field Array
  });

  const [trata, setTrata] = useState(false);

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
      props.methods.setValue("compartilhamentoDadosPessoais", []);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="d-grid justify-content-center">
          <Form.Check
            type="radio"
            name={`trata-compartilhamentoDadosPessoais`}
            required
            label="Sim"
            value="SIM"
            checked={trata}
            disabled={props.disabled}
            onChange={handleTrataRadio}
          />
          <Form.Check
            type="radio"
            name={`trata-compartilhamentoDadosPessoais`}
            required
            inline
            label="Não"
            value="NÃO"
            checked={!trata}
            disabled={props.disabled}
            onChange={handleTrataRadio}
          />
        </Col>
        <Form.Label as={Col}></Form.Label>
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
      <React.Fragment>
        {fields && fields.length > 0 ? (
          fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <NewSection11FormRowSub
                className={`mb-3 pt-2 pb-2 ${
                  index % 2 === 0 ? "bg-primary bg-opacity-10" : ""
                }`}
                disabled={props.disabled}
                name={`compartilhamentoDadosPessoais[${index}]`}
                methods={props.methods}
              />
              <Row className="justify-content-center">
                <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                  <Button
                    variant="primary"
                    onClick={() => append(emptyItemCompatilhamentoDados())}
                  >
                    +
                  </Button>
                  <Button variant="danger" onClick={() => remove(index)}>
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
                onClick={() => append(emptyItemCompatilhamentoDados())}
                disabled={!trata}
              >
                +
              </Button>
            </ButtonGroup>
          </Row>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default Section11FormRow;
