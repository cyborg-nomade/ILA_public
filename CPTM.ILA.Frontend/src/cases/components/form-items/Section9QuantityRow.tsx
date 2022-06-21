import React, { useEffect } from "react";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";

import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import { Case } from "../../../shared/models/cases.model";
import CreateCommentBox from "../../../threads-comments/components/CreateCommentBox";

const Section9QuantityRow = (props: {
  isEditing: boolean;
  methods: UseFormReturn<Case>;
}) => {
  const { getValues, setValue, watch } = props.methods;
  const categoriaDadosPessoaisWatch = useWatch({
    control: props.methods.control,
    name: "categoriaDadosPessoais",
  });
  const catDadosPessoaisSensiveisWatch = useWatch({
    control: props.methods.control,
    name: "catDadosPessoaisSensiveis",
  });

  useEffect(() => {
    if (props.isEditing) {
      let totalDadosTratados = 0;
      let totalDadosSensiveisTratados = 0;

      for (const categoria of Object.values(watch("categoriaDadosPessoais"))) {
        for (const item of Object.values(categoria)) {
          if (Array.isArray(item)) {
            totalDadosTratados += item.length;
          }
        }
      }

      for (const item of Object.values(watch("catDadosPessoaisSensiveis"))) {
        if (Array.isArray(item)) {
          totalDadosSensiveisTratados += item.length;
        }
      }

      totalDadosTratados += totalDadosSensiveisTratados;

      setValue("qtdeDadosSensiveisTratados", totalDadosSensiveisTratados);
      setValue("qtdeDadosTratados", totalDadosTratados);
    }

    return () => {};
  }, [
    catDadosPessoaisSensiveisWatch,
    categoriaDadosPessoaisWatch,
    getValues,
    props.isEditing,
    setValue,
    watch,
  ]);

  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col lg={1}>
          <p>{CaseIndexDictionary.qtdeDadosTratados.number}</p>
        </Col>
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip className="text-muted">
              Informar a quantidade total de dados pessoais e dados pessoais
              sensíveis descritos no invetário.
              <br />
              <b>Exemplo:</b>
              <br />
              Tratamento de dados pessoais de detalhes pessoais como Idade,
              sexo, data de nascimento, local de nascimento, estado civil,
              nacionalidade.
              <br />
              Tratamento de dados pessoais de saúde como CID10 e data de último
              exame médico
              <br />A informação que deve ser preenchida no inventário é:
              <br />
              <b>
                São tratados 6 dados pessoais e 2 dados pessoais sensíveis,
                totalizando 8 dados pessoais tratados pelo serviço.
              </b>
            </Tooltip>
          }
        >
          <Form.Label as={Col}>
            {CaseIndexDictionary.qtdeDadosTratados.title}
          </Form.Label>
        </OverlayTrigger>
        <Col lg={8}>
          <Controller
            rules={{ required: true }}
            control={props.methods.control}
            name="qtdeDadosTratados"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                disabled
                type="text"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                readOnly
              />
            )}
          />
        </Col>
        <Col lg={1}>
          <Row>
            <CreateCommentBox item={CaseIndexDictionary.qtdeDadosTratados} />
          </Row>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg={1}>
          <p>{CaseIndexDictionary.qtdeDadosSensiveisTratados.number}</p>
        </Col>
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip className="text-muted">
              Informar a quantidade total de dados pessoais e dados pessoais
              sensíveis descritos no invetário.
              <br />
              <b>Exemplo:</b>
              <br />
              Tratamento de dados pessoais de detalhes pessoais como Idade,
              sexo, data de nascimento, local de nascimento, estado civil,
              nacionalidade.
              <br />
              Tratamento de dados pessoais de saúde como CID10 e data de último
              exame médico
              <br />A informação que deve ser preenchida no inventário é:
              <br />
              <b>
                São tratados 6 dados pessoais e 2 dados pessoais sensíveis,
                totalizando 8 dados pessoais tratados pelo serviço.
              </b>
            </Tooltip>
          }
        >
          <Form.Label as={Col}>
            {CaseIndexDictionary.qtdeDadosSensiveisTratados.title}
          </Form.Label>
        </OverlayTrigger>
        <Col lg={8}>
          <Controller
            rules={{ required: true }}
            control={props.methods.control}
            name="qtdeDadosSensiveisTratados"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                disabled
                type="text"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                readOnly
              />
            )}
          />
        </Col>
        <Col lg={1}>
          <Row>
            <CreateCommentBox
              item={CaseIndexDictionary.qtdeDadosSensiveisTratados}
            />
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section9QuantityRow;
