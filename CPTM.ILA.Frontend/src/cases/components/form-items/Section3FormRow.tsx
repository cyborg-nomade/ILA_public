import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Case } from "../../../shared/models/cases.model";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import CreateCommentBox from "../../../threads-comments/components/CreateCommentBox";

const Section3FormRow = (props: {
    disabled: boolean;
    methods: UseFormReturn<Case>;
    radioCheckedHandler: (radioChackedName: string) => void;
    isNew: boolean;
}) => {
    const { getValues } = props.methods;
    const [atua, setAtua] = useState("INVALID");

    useEffect(() => {
        const values = getValues();
        for (const value of Object.values(values.fasesCicloTratamento)) {
            if (value) {
                setAtua("SIM");
            } else if (props.isNew) {
                setAtua("INVALID");
            } else {
                setAtua("NÃO");
            }
        }
        return () => {};
    }, [getValues, props.isNew]);

    const handleTrataRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === "SIM") {
            setAtua("SIM");
        }
        if (event.currentTarget.value === "NÃO") {
            setAtua("NÃO");
            props.methods.setValue("fasesCicloTratamento.coleta", false);
            props.methods.setValue("fasesCicloTratamento.retencao", false);
            props.methods.setValue("fasesCicloTratamento.processamento", false);
            props.methods.setValue(
                "fasesCicloTratamento.compartilhamento",
                false
            );
            props.methods.setValue("fasesCicloTratamento.eliminacao", false);
        }
        if (event.currentTarget.value !== "INVALID") {
            props.radioCheckedHandler("fasesCicloTratamento");
        }
    };

    return (
        <Row className="mb-3 align-items-center bg-primary bg-opacity-10">
            <Col lg={1}>
                <p>{CaseIndexDictionary.fasesCicloTratamento.number}</p>
            </Col>
            <Col>
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip className="text-muted">
                            Informações sobre o ciclo de vida do tratamento de
                            dados pessoais podem ser observadas no capítulo 3 do
                            Guia de Boas Práticas LGPD, disponível em
                            https://www.gov.br/governodigital/pt-br/governanca-de-dados/guia-de-boas-praticas-lei-geral-de-protecao-de-dados-lgpd
                        </Tooltip>
                    }
                >
                    <Form.Label>
                        {CaseIndexDictionary.fasesCicloTratamento.title}
                    </Form.Label>
                </OverlayTrigger>
            </Col>
            <Col className="d-grid justify-content-center">
                <Form.Check
                    type="radio"
                    name="atua"
                    required
                    label="Sim"
                    value="SIM"
                    checked={atua === "SIM"}
                    disabled={props.disabled}
                    onChange={handleTrataRadio}
                    isInvalid={atua === "INVALID"}
                />
                <Form.Check
                    type="radio"
                    name="atua"
                    required
                    inline
                    label="Não"
                    value="NÃO"
                    checked={atua === "NÃO"}
                    disabled={props.disabled}
                    onChange={handleTrataRadio}
                    isInvalid={atua === "INVALID"}
                />
                <Form.Check
                    type="radio"
                    name="atua"
                    required
                    inline
                    value="INVALID"
                    checked={atua === "INVALID"}
                    disabled={props.disabled}
                    onChange={handleTrataRadio}
                    style={{ display: "none" }}
                />
            </Col>
            <Col className="d-grid justify-content-center">
                <Controller
                    control={props.methods.control}
                    name="fasesCicloTratamento.coleta"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Check
                            disabled={!atua || props.disabled}
                            type="checkbox"
                            onChange={onChange}
                            onBlur={onBlur}
                            checked={value}
                            ref={ref}
                            isInvalid={
                                !!props.methods.formState.errors
                                    .fasesCicloTratamento?.coleta
                            }
                        />
                    )}
                />
            </Col>
            <Col className="d-grid justify-content-center">
                <Controller
                    control={props.methods.control}
                    name="fasesCicloTratamento.retencao"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Check
                            disabled={!atua || props.disabled}
                            type="checkbox"
                            onChange={onChange}
                            onBlur={onBlur}
                            checked={value}
                            ref={ref}
                            isInvalid={
                                !!props.methods.formState.errors
                                    .fasesCicloTratamento?.coleta
                            }
                        />
                    )}
                />
            </Col>
            <Col className="d-grid justify-content-center">
                <Controller
                    control={props.methods.control}
                    name="fasesCicloTratamento.processamento"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Check
                            disabled={!atua || props.disabled}
                            type="checkbox"
                            onChange={onChange}
                            onBlur={onBlur}
                            checked={value}
                            ref={ref}
                            isInvalid={
                                !!props.methods.formState.errors
                                    .fasesCicloTratamento?.coleta
                            }
                        />
                    )}
                />
            </Col>
            <Col className="d-grid justify-content-center">
                <Controller
                    control={props.methods.control}
                    name="fasesCicloTratamento.compartilhamento"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Check
                            disabled={!atua || props.disabled}
                            type="checkbox"
                            onChange={onChange}
                            onBlur={onBlur}
                            checked={value}
                            ref={ref}
                            isInvalid={
                                !!props.methods.formState.errors
                                    .fasesCicloTratamento?.coleta
                            }
                        />
                    )}
                />
            </Col>
            <Col className="d-grid justify-content-center">
                <Controller
                    control={props.methods.control}
                    name="fasesCicloTratamento.eliminacao"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Check
                            disabled={!atua || props.disabled}
                            type="checkbox"
                            onChange={onChange}
                            onBlur={onBlur}
                            checked={value}
                            ref={ref}
                            isInvalid={
                                !!props.methods.formState.errors
                                    .fasesCicloTratamento?.coleta
                            }
                        />
                    )}
                />
            </Col>
            <Col lg={1} className="p-0">
                <CreateCommentBox
                    item={CaseIndexDictionary.fasesCicloTratamento}
                />
            </Col>
        </Row>
    );
};

export default Section3FormRow;
