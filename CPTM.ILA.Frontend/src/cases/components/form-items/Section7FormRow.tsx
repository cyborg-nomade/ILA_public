import React, { useEffect, useState } from "react";
import {
    FieldArrayPath,
    FieldPath,
    useFieldArray,
    UseFormReturn,
} from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { Case } from "../../../shared/models/cases.model";
import {
    emptyItemCategoriaDadosPessoais,
    itemCategoriaDadosPessoais,
} from "../../../shared/models/case-helpers/case-helpers.model";
import CreateCommentBox from "../../../threads-comments/components/CreateCommentBox";
import Section7FormRowSub from "./Section7FormRowSub";

const Section7FormRow = (props: {
    tooltip?: JSX.Element;
    disabled: boolean;
    name: FieldPath<Case>;
    className: string;
    itemRef: { number: string; title: string };
    systems: string[];
    methods: UseFormReturn<Case>;
}) => {
    const { getValues } = props.methods;

    const { fields, append, remove } = useFieldArray({
        control: props.methods.control, // control props comes from useForm
        name: props.name as FieldArrayPath<Case>, // unique name for your Field Array
    });

    const [trata, setTrata] = useState(false);

    useEffect(() => {
        const categoriaArrayUseEffect: itemCategoriaDadosPessoais[] = getValues(
            props.name
        ) as itemCategoriaDadosPessoais[];

        if (categoriaArrayUseEffect && categoriaArrayUseEffect.length > 0) {
            setTrata(true);
        } else {
            setTrata(false);
        }
        return () => {};
    }, [getValues, props.name]);

    const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === "SIM") {
            setTrata(true);
        } else {
            setTrata(false);
            props.methods.setValue(props.name, []);
        }
    };

    return (
        <React.Fragment>
            <Row className={props.className}>
                <Col lg={1}>
                    <p>{props.itemRef.number}</p>
                </Col>
                {props.tooltip ? (
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip className="text-muted">
                                {props.tooltip}
                            </Tooltip>
                        }
                    >
                        <Form.Label as={Col}>{props.itemRef.title}</Form.Label>
                    </OverlayTrigger>
                ) : (
                    <Form.Label as={Col}>{props.itemRef.title}</Form.Label>
                )}
                <Col className="d-grid justify-content-center">
                    <Form.Check
                        type="radio"
                        name={`trata-${props.itemRef.number}`}
                        required
                        label="Sim"
                        value="SIM"
                        checked={trata}
                        disabled={props.disabled}
                        onChange={handleTrataRadio}
                    />
                    <Form.Check
                        type="radio"
                        name={`trata-${props.itemRef.number}`}
                        required
                        inline
                        label="Não"
                        value="NÃO"
                        checked={!trata}
                        disabled={props.disabled}
                        onChange={handleTrataRadio}
                    />
                    <Form.Check
                        type="radio"
                        name={`trata-${props.itemRef.number}`}
                        required
                        inline
                        value="INITIAL"
                        checked={!trata}
                        disabled={props.disabled}
                        onChange={handleTrataRadio}
                        style={{ display: "none" }}
                    />
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col lg={2}></Col>
                <Col lg={1}>
                    <Row>
                        <CreateCommentBox item={props.itemRef} />
                    </Row>
                </Col>
            </Row>
            <React.Fragment>
                {fields && fields.length > 0 ? (
                    fields.map((field, index) => (
                        <React.Fragment key={field.id}>
                            <Section7FormRowSub
                                systems={props.systems}
                                className={props.className}
                                name={
                                    `${props.name}[${index}]` as FieldPath<Case>
                                }
                                disabled={props.disabled}
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
                                                emptyItemCategoriaDadosPessoais()
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
                                disabled={!trata}
                                onClick={() =>
                                    append(emptyItemCategoriaDadosPessoais())
                                }
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

export default Section7FormRow;
