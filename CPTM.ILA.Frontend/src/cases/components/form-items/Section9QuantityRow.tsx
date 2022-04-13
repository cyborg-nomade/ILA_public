import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";
import { CaseIndexDictionary } from "../../../shared/models/case-index.dictionary";
import { Case } from "../../../shared/models/cases.model";
import CreateCommentBox from "./../../../threads-comments/components/CreateCommentBox";

const Section9QuantityRow = (props: { isEditing: boolean }) => {
  const { values, setFieldValue } = useFormikContext<Case>();

  useEffect(() => {
    if (props.isEditing) {
      let totalDadosTratados = 0;
      let totalDadosSensiveisTratados = 0;

      for (const categoria of Object.values(values.categoriaDadosPessoais)) {
        for (const item of Object.values(categoria)) {
          if (Array.isArray(item)) {
            totalDadosTratados += item.length;
          }
        }
      }

      for (const item of Object.values(values.catDadosPessoaisSensiveis)) {
        if (Array.isArray(item)) {
          totalDadosSensiveisTratados += item.length;
        }
      }

      totalDadosTratados += totalDadosSensiveisTratados;

      setFieldValue("qtdeDadosSensiveisTratados", totalDadosSensiveisTratados);
      setFieldValue("qtdeDadosTratados", totalDadosTratados);
    }

    return () => {};
  }, [props.isEditing, setFieldValue, values]);

  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col lg={1}>
          <p>{CaseIndexDictionary.qtdeDadosTratados}</p>
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
            Quantidade de dados pessoais totais tratados
          </Form.Label>
        </OverlayTrigger>
        <Col lg={8}>
          <Form.Control
            disabled
            type="text"
            name="qtdeDadosTratados"
            value={values.qtdeDadosTratados}
            readOnly
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
          <p>{CaseIndexDictionary.qtdeDadosSensiveisTratados}</p>
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
            Quantidade de dados pessoais sensíveis tratados
          </Form.Label>
        </OverlayTrigger>
        <Col lg={8}>
          <Form.Control
            disabled
            type="text"
            name="qtdeDadosSensiveisTratados"
            value={values.qtdeDadosSensiveisTratados}
            readOnly
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
