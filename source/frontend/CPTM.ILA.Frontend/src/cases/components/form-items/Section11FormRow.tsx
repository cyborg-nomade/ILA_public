import React, { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { Case } from "../../../shared/models/cases.model";
import { emptyItemCompatilhamentoDados } from "../../../shared/models/case-helpers/case-helpers.model";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import CreateCommentBox from "../../../threads-comments/components/CreateCommentBox";
import NewSection11FormRowSub from "./Section11FormRowSub";

const Section11FormRow = (props: {
    disabled: boolean;
    methods: UseFormReturn<Case>;
    radioCheckedHandler: (radioChackedName: string) => void;
    isNew: boolean;
}) => {
    const { fields, append, remove } = useFieldArray({
        control: props.methods.control, // control props comes from useForm
        name: "compartilhamentoDadosPessoais" as const, // unique name for your Field Array
    });

    const [trata, setTrata] = useState("INVALID");

    const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrata(event.currentTarget.value);
        if (event.currentTarget.value !== "INVALID") {
            props.radioCheckedHandler("compartilhamentoDadosPessoais");
        }
        if (event.currentTarget.value === "NÃO") {
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
                        checked={trata === "SIM"}
                        disabled={props.disabled}
                        onChange={handleTrataRadio}
                        isInvalid={trata === "INVALID"}
                    />
                    <Form.Check
                        type="radio"
                        name={`trata-compartilhamentoDadosPessoais`}
                        required
                        inline
                        label="Não"
                        value="NÃO"
                        checked={trata === "NÃO"}
                        disabled={props.disabled}
                        onChange={handleTrataRadio}
                        isInvalid={trata === "INVALID"}
                    />
                    <Form.Check
                        type="radio"
                        name={`trata-compartilhamentoDadosPessoais`}
                        required
                        inline
                        value="INVALID"
                        checked={trata === "INVALID"}
                        disabled={props.disabled}
                        onChange={handleTrataRadio}
                        style={{ display: "none" }}
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
                            item={
                                CaseIndexDictionary.compartilhamentoDadosPessoais
                            }
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
                                    index % 2 === 0
                                        ? "bg-primary bg-opacity-10"
                                        : ""
                                }`}
                                disabled={props.disabled}
                                name={`compartilhamentoDadosPessoais[${index}]`}
                                methods={props.methods}
                            />
                            <Row className="justify-content-center">
                                <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                >
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            append(
                                                emptyItemCompatilhamentoDados()
                                            )
                                        }
                                    >
                                        +
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => remove(index)}
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
                                    append(emptyItemCompatilhamentoDados())
                                }
                                disabled={!(trata === "SIM")}
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