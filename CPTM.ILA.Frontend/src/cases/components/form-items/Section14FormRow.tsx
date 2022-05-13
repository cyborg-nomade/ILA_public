import React, { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Section14FormRowSub from "./Section14FormRowSub";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { emptyItemContratoTI } from "../../../shared/models/case-helpers/case-helpers.model";
import CreateCommentBox from "./../../../threads-comments/components/CreateCommentBox";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import { Case } from "../../../shared/models/cases.model";

const Section14FormRow = (props: {
  disabled: boolean;
  methods: UseFormReturn<Case, any>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: props.methods.control, // control props comes from useForm
    name: "contratoServicosTITratamentoDados" as const, // unique name for your Field Array
  });

  const [trata, setTrata] = useState(false);

  const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "SIM") {
      setTrata(true);
    } else {
      setTrata(false);
      props.methods.setValue("contratoServicosTITratamentoDados", []);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="d-grid justify-content-center">
          <Form.Check
            type="radio"
            name="trata-contratoServicosTITratamentoDados"
            required
            label="Sim"
            value="SIM"
            checked={trata}
            disabled={props.disabled}
            onChange={handleTrataRadio}
          />
          <Form.Check
            type="radio"
            name="trata-contratoServicosTITratamentoDados"
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

      <React.Fragment>
        {fields && fields.length > 0 ? (
          fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Section14FormRowSub
                className={`mb-3 pt-2 pb-2 ${
                  index % 2 === 0 ? "bg-primary bg-opacity-10" : ""
                }`}
                name={`contratoServicosTITratamentoDados[${index}]`}
                methods={props.methods}
              />
              <Row className="justify-content-center">
                <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                  <Button
                    variant="primary"
                    onClick={() => append(emptyItemContratoTI())}
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
                disabled={!trata}
                onClick={() => append(emptyItemContratoTI())}
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

export default Section14FormRow;
