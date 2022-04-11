import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, FieldArray } from "formik";
// import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";

import {
  emptyItemCategoriaDadosPessoais,
  emptyItemCategoriaTitulares,
  emptyItemCompatilhamentoDados,
  emptyItemContratoTI,
  emptyItemMedidaSegurancaPrivacidade,
  emptyItemObservacoesProcesso,
  emptyItemRiscoPrivacidade,
  emptyItemTransferenciaInternacional,
} from "../../shared/models/case-helpers/case-helpers.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Section6FormRow from "./form-items/Section6FormRow";
import Section7FormRow from "./form-items/Section7FormRow";
import Section10FormRow from "./form-items/Section10FormRow";
import Section11FormRow from "./form-items/Section11FormRow";
import Section12FormRow from "./form-items/Section12FormRow";
import Section13FormRow from "./form-items/Section13FormRow";
import Section14FormRow from "./form-items/Section14FormRow";
import Section15FormRow from "./form-items/Section15FormRow";
import Section16FormRow from "./form-items/Section16FormRow";
import { Case, emptyCase } from "../../shared/models/cases.model";
import CreateCommentBox from "../../threads-comments/components/CreateCommentBox";
import { CaseIndexDictionary } from "./../../shared/models/case-index.dictionary";
import Section3FormRow from "./form-items/Section3FormRow";
import {
  hipotesesTratamento,
  tipoAbrangenciaGeografica,
  tipoFrequenciaTratamento,
} from "../../shared/models/case-helpers/enums.model";
import Section9QuantityRow from "./form-items/Section9QuantityRow";

type onSubmitFn = (item: Case) => void;

const CaseForm = (props: {
  item: Case;
  new?: boolean;
  edit?: boolean;
  approve?: boolean;
  continue?: boolean;
  onSaveProgressSubmit?: onSubmitFn;
  onSendToApprovalSubmit?: onSubmitFn;
}) => {
  const [isEditing, setIsEditing] = useState(props.new || false);
  const [itemValues, setItemValues] = useState<Case>(emptyCase());
  const [systems, setSystems] = useState<string[]>([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveProgressModal, setShowSaveProgressModal] = useState(false);
  const [showSendToApprovalModal, setShowSendToApprovalModal] = useState(false);

  const { token } = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getSystems = useCallback(async () => {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_CONNSTR}/utilities/systems`,
      undefined,
      undefined,
      { "Content-Type": "application/json", Authorization: "Bearer " + token }
    );

    const systems: string[] = responseData.systems;

    setSystems(systems);
  }, [sendRequest, token]);

  useEffect(() => {
    getSystems();

    return () => {};
  }, [getSystems]);

  let navigate = useNavigate();
  const cid = useParams().cid || "";

  const onStartEditing = () => {
    setIsEditing(true);
  };
  const onCancel = () => {
    navigate(`/`);
  };
  const onDelete = async (itemId: string) => {
    console.log(itemId);

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/${itemId}`,
        "DELETE",
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData);
      navigate(`/`);
    } catch (err) {
      console.log(err);
      setShowDeleteModal(false);
    }
  };

  const handleSaveProgressClick = (item: Case) => {
    setItemValues(item);
    setShowSaveProgressModal(true);
  };
  const handleSendToApprovalClick = (item: Case) => {
    setItemValues(item);
    setShowSendToApprovalModal(true);
  };

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  return (
    <React.Fragment>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remover Registro!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você está prestes a deletar o registro {props.item.nome}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => onDelete(cid)}>
            Prosseguir com Remoção
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSaveProgressModal}
        onHide={() => setShowSaveProgressModal(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Salvar Progresso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que deseja salvar o seu progresso?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setShowSaveProgressModal(false)}
          >
            Não
          </Button>
          <Button
            variant="primary"
            onClick={() => props.onSaveProgressSubmit!(itemValues)}
          >
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSendToApprovalModal}
        onHide={() => setShowSendToApprovalModal(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enviar para o Encarregado de Dados!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que deseja enviar as informações para validação do
          time de Privacidade de Dados?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setShowSendToApprovalModal(false)}
          >
            Não
          </Button>
          <Button
            variant="primary"
            onClick={() => props.onSendToApprovalSubmit!(itemValues)}
          >
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          Ocorreu um erro: {error}
        </Alert>
      )}
      <Formik
        // validationSchema={schema}
        enableReinitialize={true}
        onSubmit={(item: Case) => setItemValues(item)}
        initialValues={props.item}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          touched,
          isValid,
          errors,
          dirty,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>1 - Identificação</Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 align-items-center">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.nome}</p>
                    </Col>
                    <Form.Group as={Col} controlId="validationFormik01">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.nome && !errors.nome}
                        isInvalid={!!errors.nome}
                      />
                      <Form.Text className="text-muted">
                        Informar nome do serviço ofertado à sociedade ou nome do
                        processo de negócio que realiza tratamento dos dados
                        pessoais. Exemplo: Avaliações de Alimentos; Cancelamento
                        e Renovação de Registros de Alimentos; e etc..
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  {!props.new && (
                    <Row className="mb-3">
                      <Col lg={1}>
                        <p>{CaseIndexDictionary.id}</p>
                      </Col>
                      <Form.Group as={Col} controlId="validationFormik02">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                          disabled
                          type="text"
                          name="id"
                          value={values.id}
                          readOnly
                        />
                      </Form.Group>
                    </Row>
                  )}
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.dataCriacao}</p>
                    </Col>
                    <Form.Group as={Col} controlId="validationFormik03">
                      <Form.Label>Data de Criação do Inventário</Form.Label>
                      <Form.Control
                        disabled={false}
                        type="text"
                        name="dataCriacao"
                        defaultValue={values.dataCriacao}
                        value={values.dataCriacao}
                        readOnly
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.dataAtualizacao}</p>
                    </Col>
                    <Form.Group as={Col} controlId="validationFormik04">
                      <Form.Label>Data Atualização do Inventário</Form.Label>
                      <Form.Control
                        disabled
                        type="text"
                        name="dataAtualizacao"
                        value={values.dataAtualizacao}
                        readOnly
                      />
                    </Form.Group>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  2 - Agentes de Tratamento e Encarregado
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>Nome</Form.Label>
                    <Form.Label as={Col}>Área</Form.Label>
                    <Form.Label as={Col}>Telefone</Form.Label>
                    <Form.Label as={Col}>E-mail</Form.Label>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.controlador}</p>
                    </Col>
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa natural ou jurídica, de direito público ou
                            privado, a quem competem as decisões referentes ao
                            tratamento de dados pessoais (LGPD, art. 5º, IV).
                            Informar o nome do órgão ou entidade.
                          </Tooltip>
                        }
                      >
                        <Form.Label>Controlador</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="text"
                        name="controlador.nome"
                        value={values.controlador.nome}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.encarregado}</p>
                    </Col>
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa indicada pelo controlador e operador para
                            atuar como canal de comunicação entre o controlador,
                            os titulares dos dados e a Autoridade Nacional de
                            Proteção de Dados - ANPD (LGPD, art. 5º, VIII)
                          </Tooltip>
                        }
                      >
                        <Form.Label>Encarregado</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="text"
                        name="encarregado.nome"
                        value={values.encarregado.nome}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="text"
                        name="encarregado.area"
                        value={values.encarregado.area}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="tel"
                        name="encarregado.telefone"
                        value={values.encarregado.telefone}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="email"
                        name="encarregado.email"
                        value={values.encarregado.email}
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.extensaoEncarregado}</p>
                    </Col>
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa indicada pelo controlador e operador para
                            atuar como canal de comunicação entre o controlador,
                            os titulares dos dados e a Autoridade Nacional de
                            Proteção de Dados - ANPD (LGPD, art. 5º, VIII)
                          </Tooltip>
                        }
                      >
                        <Form.Label>Extensão Encarregado</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="text"
                        name="extensaoEncarregado.nome"
                        value={values.extensaoEncarregado.nome}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="text"
                        name="extensaoEncarregado.area"
                        value={values.extensaoEncarregado.area}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="tel"
                        name="extensaoEncarregado.telefone"
                        value={values.extensaoEncarregado.telefone}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="email"
                        name="extensaoEncarregado.email"
                        value={values.extensaoEncarregado.email}
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.areaTratamentoDados}</p>
                    </Col>
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa indicada pelo controlador e operador para
                            atuar como canal de comunicação entre o controlador,
                            os titulares dos dados e a Autoridade Nacional de
                            Proteção de Dados - ANPD (LGPD, art. 5º, VIII)
                          </Tooltip>
                        }
                      >
                        <Form.Label>Área Tratamento Dados</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="text"
                        name="areaTratamentoDados.nome"
                        value={values.areaTratamentoDados.nome}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="text"
                        name="areaTratamentoDados.area"
                        value={values.areaTratamentoDados.area}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="tel"
                        name="areaTratamentoDados.telefone"
                        value={values.areaTratamentoDados.telefone}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="email"
                        name="areaTratamentoDados.email"
                        value={values.areaTratamentoDados.email}
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.operador}</p>
                    </Col>
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa natural ou jurídica, de direito público ou
                            privado, que realiza o tratamento de dados pessoais
                            em nome do controlador; (LGPD, art. 5º, VII)
                          </Tooltip>
                        }
                      >
                        <Form.Label>Operador</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled
                        type="text"
                        name="operador.nome"
                        value={values.operador.nome}
                        readOnly
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  3 - Fases do Ciclo de Vida do Tratamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Label as={Col} lg={1}></Form.Label>
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Atua?
                    </Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Coleta
                    </Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Retenção
                    </Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Processamento
                    </Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Compartilhamento
                    </Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Eliminação
                    </Form.Label>
                    <Form.Label as={Col} lg={1}></Form.Label>
                  </Row>
                  <Section3FormRow />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  4 - Fluxo de Tratamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.descricaoFluxoTratamento}</p>
                    </Col>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Descrever como (de que forma) os dados pessoais são
                          coletados, retidos/armazenados, processados/ usados e
                          eliminados. Nessa seção, pode até ser colocado um
                          desenho com um fluxo de dados. Abaixo, segue exemplo
                          de descrição do fluxo de dados.
                        </Tooltip>
                      }
                    >
                      <Form.Label as={Col}>Descrição do Fluxo</Form.Label>
                    </OverlayTrigger>
                    <Col lg={8}>
                      <Form.Control
                        disabled={!isEditing}
                        as="textarea"
                        rows={5}
                        type="text"
                        name="descricaoFluxoTratamento"
                        value={values.descricaoFluxoTratamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.descricaoFluxoTratamento &&
                          !errors.descricaoFluxoTratamento
                        }
                        isInvalid={!!errors.descricaoFluxoTratamento}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={1}>
                      <Row>
                        <CreateCommentBox item={CaseIndexDictionary.nome} />
                      </Row>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  5 - Escopo e Natureza dos Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.abrangenciaGeografica}</p>
                    </Col>
                    <Form.Label as={Col}>
                      Abrangência da área geográfica do tratamento
                    </Form.Label>
                    <Col lg={8}>
                      <Form.Select
                        disabled={!isEditing}
                        name="abrangenciaGeografica.value"
                        value={values.abrangenciaGeografica.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.abrangenciaGeografica?.value &&
                          !errors.abrangenciaGeografica?.value
                        }
                        isInvalid={!!errors.abrangenciaGeografica?.value}
                      >
                        {Object.values(tipoAbrangenciaGeografica).map((tag) => (
                          <option value={tag} key={tag}>
                            {tag}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={1}>
                      <Row>
                        <CreateCommentBox
                          item={CaseIndexDictionary.abrangenciaGeografica}
                        />
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.fonteDados}</p>
                    </Col>
                    <Form.Label as={Col}>
                      Fonte de dados utilizada para obtenção dos dados pessoais
                    </Form.Label>
                    <Col lg={8}>
                      <Form.Select
                        disabled={!isEditing}
                        name="fonteDados"
                        value={values.fonteDados}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.fonteDados && !errors.fonteDados}
                        isInvalid={!!errors.fonteDados}
                      >
                        {Object.values(systems).map((s) => (
                          <option value={s} key={s}>
                            {s}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={1}>
                      <Row>
                        <CreateCommentBox
                          item={CaseIndexDictionary.fonteDados}
                        />
                      </Row>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  6 - Finalidade do Tratamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Section6FormRow
                    label="Hipótese de Tratamento"
                    tooltip={
                      <p>
                        As hipóteses de tratamento estão descritas nos arts. 7º
                        e 11 da LGPD.
                        <br />
                        <b>
                          Os órgãos e entidades da administração pública tem a
                          prerrogativa de tratar os dados pessoais para o
                          exercício de suas competências legais ou execução de
                          políticas públicas sem a necessidade de obter
                          consentimento do titular dos dados pessoais.
                        </b>
                      </p>
                    }
                    disabled={!isEditing}
                    name="finalidadeTratamento.hipoteseTratamento.value"
                    type="select"
                    invalid="Esse campo é obrigatório"
                    itemRef={
                      CaseIndexDictionary.finalidadeTratamento
                        .hipoteseTratamento
                    }
                  />
                  <Section6FormRow
                    label="Finalidade"
                    tooltip={
                      <p>
                        Razão ou motivo pela qual se deseja tratar os dados
                        pessoais. É importantíssimo estabelecer claramente a
                        finalidade, pois é ela que justifica o tratamento de
                        dados pessoais e fornece os elementos para informar o
                        titular dos dados.
                      </p>
                    }
                    disabled={!isEditing}
                    name="finalidadeTratamento.descricaoFinalidade"
                    type="text"
                    invalid="Esse campo é obrigatório"
                    itemRef={
                      CaseIndexDictionary.finalidadeTratamento
                        .descricaoFinalidade
                    }
                  />
                  <Section6FormRow
                    label="Previsão legal"
                    tooltip={
                      <p>
                        Informar Lei, Decreto, normativo ou regulamento que
                        respalda a finalidade do tratamento de dados pessoais
                        realizado.
                        <br />
                        <br />
                        <b>
                          Exemplo fícitício de previsão legal considerando o
                          Programa de Localização de Desaparecidos:
                        </b>
                        <br />• Decreto nº 8.956, de 25 de janeiro de 2218,
                        institui o Programa de Localização de Desaparecidos.
                      </p>
                    }
                    disabled={
                      !isEditing ||
                      values.finalidadeTratamento.hipoteseTratamento.value !==
                        hipotesesTratamento.obrigacaoLegal
                    }
                    name="finalidadeTratamento.previsaoLegal"
                    type="text"
                    invalid="Esse campo é obrigatório"
                    itemRef={
                      CaseIndexDictionary.finalidadeTratamento.previsaoLegal
                    }
                  />
                  <Section6FormRow
                    label="Resultados pretendidos para o titular de dados"
                    disabled={!isEditing}
                    name="finalidadeTratamento.resultadosTitular"
                    type="text"
                    invalid="Esse campo é obrigatório"
                    itemRef={
                      CaseIndexDictionary.finalidadeTratamento.resultadosTitular
                    }
                  />
                  <Section6FormRow
                    label="Benefícios esperados para o órgão, entidade ou para a
                    sociedade como um todo"
                    disabled={!isEditing}
                    name="finalidadeTratamento.beneficiosEsperados"
                    type="text"
                    invalid="Esse campo é obrigatório"
                    itemRef={
                      CaseIndexDictionary.finalidadeTratamento
                        .beneficiosEsperados
                    }
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  7 - Categoria de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey="60">
                      <Accordion.Header>
                        7.1 - Dados de Identificação Pessoal
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Informações de identificação pessoal"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Nome, endereço
                              residencia, histórico de endereços anteriores,
                              número de telefone fixo residencial, número
                              celular pessoal, e-mail pessoal, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.identificacao.idPessoal"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .identificacao.idPessoal
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Informações de identificação atribuídas por
                            instituições governamentais"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: CPF, RG, número
                              do passaporte, número da carteira de motorista,
                              número da placa, número de registro em conselho
                              profissional, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.identificacao.idGov"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .identificacao.idGov
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Dados de identificação eletrônica"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Endereços IP,
                              cookies, momentos de conexão etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.identificacao.idEletronica"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .identificacao.idEletronica
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Dados de localização eletrônica"
                          tooltip={
                            <p>
                              Informar se são tratados dados: dados de
                              comunicação de torres de celulares (ex: GSM),
                              dados de GPS etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.identificacao.locEletronica"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .identificacao.locEletronica
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="61">
                      <Accordion.Header>
                        7.2 - Dados Financeiros
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Dados de identificação financeira"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Números de
                              identificação, números de contas bancárias,
                              números de cartões de crédito ou débito, códigos
                              secretos.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.idFin"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.idFin
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Recursos financeiros"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Renda, posses,
                              investimentos, renda total, renda profissional,
                              poupança, datas de início e término dos
                              investimentos, receita de investimento, dívidas
                              sobre ativos.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.recursosFin"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.recursosFin
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Dívidas e despesas"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Total de
                              despesas, aluguel, empréstimos, hipotecas e outras
                              formas de crédito.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.dividasDespesas"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.dividasDespesas
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Situação financeira (Solvência)"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Avaliação do
                              rendimento e avaliação de capacidade de pagamento.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.solvencia"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.solvencia
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Empréstimos, hipotecas, linhas de crédito"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Natureza do
                              empréstimo, valor emprestado, saldo remanescente,
                              data de início, período do empréstimo, taxa de
                              juros, visão geral do pagamento, detalhes sobre as
                              garantias.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.emprestimosHipotecaCredito
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Assistência financeira"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Benefícios,
                              assistência, bonificações, subsídios, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.assistenciaFin"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.assistenciaFin
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Detalhes da apólice de seguro"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Natureza da
                              apólice de seguro, detalhes sobre os riscos
                              cobertos, valores segurados, período segurado,
                              data de rescisão, pagamentos feitos, recebidos ou
                              perdidos, situação do contrato, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.apoliceSeguro"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.apoliceSeguro
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Detalhes do plano de pensão"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Data efetiva do
                              plano de pensão, natureza do plano, data de
                              término do plano, pagamentos recebidos e
                              efetuados, opções, beneficiários, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.planoPensao"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.planoPensao
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Transações financeiras"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Valores pagos e a
                              pagar pelo titular dos dados, linhas de crédito
                              concedidas, avais, forma de pagamento, visão geral
                              do pagamento, depósitos e outras garantias, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.transacaoFin"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.transacaoFin
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Compensação"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Detalhes sobre
                              compensações reivindicadas, valores pagos ou
                              outros tipos de compensação, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.compensacao"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.compensacao
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Atividades profissionais"
                          tooltip={
                            <p>
                              Descrever se são tratados dado de atividades
                              profissionais executadas pelo titular dos dados:
                              natureza da atividade, natureza dos bens ou
                              serviços utilizados ou entregues pela pessoa no
                              registro, relações comerciais, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.atividadeProfissional"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.atividadeProfissional
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Acordos e ajustes"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Detalhes sobre
                              acordos ou ajustes comerciais; acordos sobre
                              representação ou acordos legais, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.acordosAjustes"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.acordosAjustes
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Autorizações ou consentimentos"
                          tooltip={
                            <p>
                              Descrever se são tratados dados de: Autorizações
                              ou consentimentos realizados pelo titular de
                              dados, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.autorizacoesConsentimentos"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .financeiros.autorizacoesConsentimentos
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="62">
                      <Accordion.Header>
                        7.3 - Características Pessoais
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Detalhes pessoais"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Idade, sexo, data
                              de nascimento, local de nascimento, estado civil,
                              nacionalidade.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.caracteristicas.detalhesPessoais"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .caracteristicas.detalhesPessoais
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Detalhes militares"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Situação militar,
                              patente militar, distinções militares, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.caracteristicas.detalhesMilitares"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .caracteristicas.detalhesMilitares
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Situação de Imigração"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Detalhes sobre o
                              visto, autorização de trabalho, limitações de
                              residência ou movimentação, condições especiais
                              relacionadas à autorização de residência, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.caracteristicas.situacaoImigracao"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .caracteristicas.situacaoImigracao
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Descrição Física"
                          tooltip={
                            <p>
                              Dados de descrição física são informações físicas
                              de uma pessoa com possibilidade de serem
                              visivelmente indetificadas. Descrever se são
                              tratados: Altura, peso, cor do cabelo, cor dos
                              olhos, características distintivas, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.caracteristicas.descricaoFisica"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .caracteristicas.descricaoFisica
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="63">
                      <Accordion.Header>
                        7.4 - Hábitos Pessoais
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Hábitos"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Uso de tabaco,
                              uso de álcool , hábito alimentar, dieta alimentar
                              etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.habitosPessoais"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais.habitos
                              .habitosPessoais
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Estilo de vida"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Informações sobre
                              o uso de bens ou serviços, comportamento dos
                              titulares dos dados, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.estiloVida"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais.habitos
                              .estiloVida
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Viagens e deslocamentos"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: sobre antigas
                              residências e deslocamentos, visto de viagem,
                              autorizações de trabalho, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.viagensDeslocamento"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais.habitos
                              .viagensDeslocamento
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Contatos sociais"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Amigos, parceiros
                              de negócios, relacionamentos com pessoas que não
                              sejam familiares próximos; etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.contatosSociais"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais.habitos
                              .contatosSociais
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Posses"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Terra,
                              propriedade ou outros bens.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.posses"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais.habitos
                              .posses
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Denúncias, incidentes ou acidentes"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Informações sobre
                              um acidente, incidente ou denúncia na qual o
                              titular dos dados está envolvido, a natureza dos
                              danos ou ferimentos, pessoas envolvidas,
                              testemunhas, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais.habitos
                              .denunciasIncAcidentes
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Distinções"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Distinções civis,
                              administrativas ou militares.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.distincoes"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais.habitos
                              .distincoes
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Uso de mídia"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: que definem o
                              comportamento de uso de mídias e meios de
                              comunicação.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.usoMidia"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais.habitos
                              .usoMidia
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="64">
                      <Accordion.Header>
                        7.5 - Características Psicológicas
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Descrição Psicológica"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre
                              personalidade ou caráter.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.caracteristicasPsicologicas.descricaoPsi"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .caracteristicasPsicologicas.descricaoPsi
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="65">
                      <Accordion.Header>
                        7.6 - Composição Familiar
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Casamento ou forma atual de coabitação"
                          tooltip={
                            <p>
                              Descrever se são tratados dados: Nome do cônjuge
                              ou companheiro(a), nome de solteira do cônjuge ou
                              companheira, data do casamento, data do contrato
                              de coabitação, número de filhos, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.composicaoFamiliar.casamentoCoabitacao"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .composicaoFamiliar.casamentoCoabitacao
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Histórico conjugal"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre casamentos
                              ou parcerias anteriores, divórcios, separações,
                              nomes de parceiros anteriores.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.composicaoFamiliar.historicoConjugal"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .composicaoFamiliar.historicoConjugal
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Familiares ou membros da família"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre Detalhes de
                              outros familiares ou membros da família do titular
                              de dados.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.composicaoFamiliar.membrosFamilia"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .composicaoFamiliar.membrosFamilia
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="66">
                      <Accordion.Header>
                        7.7 - Interesses de lazer
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Atividades e interesses de lazer"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre hobbies,
                              esportes, outros interesses.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.interessesLazer.atividadesInteressesLaz"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .interessesLazer.atividadesInteressesLaz
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="67">
                      <Accordion.Header>7.8 - Associações</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Associações (exceto profissionais, políticas, em sindicatos ou qualquer outra associação que se enquadre em dados pessoais sensíveis)"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre participação
                              em organizações de caridade ou benevolentes,
                              clubes, parcerias, organizações, grupos, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.associacoes.outrasAssNaoSensiveis"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .associacoes.outrasAssNaoSensiveis
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="68">
                      <Accordion.Header>
                        7.9 - Processo Judicial/Administrativo/Criminal
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Suspeitas"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre suspeitas de
                              violações, conexões conspiratórias com criminosos
                              conhecidos. Inquéritos ou ações judiciais (civis
                              ou criminais) empreendidas por ou contra o titular
                              dos dados, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.processoJudAdmCrim.suspeitas"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .processoJudAdmCrim.suspeitas
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Condenações e sentenças"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre condenações
                              e sentenças, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.processoJudAdmCrim.condenacoesSentencas"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .processoJudAdmCrim.condenacoesSentencas
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Ações judiciais"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre tutela,
                              guarda temporária ou definitiva, interdição,
                              adoção, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.processoJudAdmCrim.acoesJud"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .processoJudAdmCrim.acoesJud
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Penalidades Administrativas"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre multas,
                              processo disciplinar, advertências, bem como
                              qualquer outro tipo de penalidade ou sanção
                              administrativa prevista em leis, normas e
                              regulamentos.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.processoJudAdmCrim.penalidadesAdm"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .processoJudAdmCrim.penalidadesAdm
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="69">
                      <Accordion.Header>
                        7.10 - Hábitos de Consumo
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Dados de bens e serviços"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre bens e
                              serviços vendidos, alugados ou emprestados ao
                              titular dos dados.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitosConsumo.dadosBensServicos"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .habitosConsumo.dadosBensServicos
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="610">
                      <Accordion.Header>
                        7.11 - Dados Residenciais
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Residência"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre natureza da
                              residência, propriedade própria ou alugada,
                              duração da residência nesse endereço, aluguel,
                              custos, classificação da residência, detalhes
                              sobre a avaliação, nomes das pessoas que possuem
                              as chaves.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.residenciais.dadosResidencia"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .residenciais.dadosResidencia
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="611">
                      <Accordion.Header>
                        7.12 - Educação e Treinamento
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Dados acadêmicos/escolares"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre diplomas,
                              certificados obtidos, resultados de exames,
                              avaliação do progresso dos estudos, histórico
                              escolar, grau de formação, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.educacaoTreinamento.academicosEscolares"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .educacaoTreinamento.academicosEscolares
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Registros financeiros do curso/treinamento"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre taxas de
                              inscrição e custos pagos, financiamento, formas de
                              pagamento, registros de pagamento, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.educacaoTreinamento.registroFinanceiro"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .educacaoTreinamento.registroFinanceiro
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Qualificação e experiência profissional"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre
                              certificações profissionais, interesses
                              profissionais, interesses acadêmicos, interesses
                              de pesquisam experiência de ensino, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.educacaoTreinamento.qualificacaoExperienciaProf"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .educacaoTreinamento.qualificacaoExperienciaProf
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="612">
                      <Accordion.Header>
                        7.13 - Profissão e emprego
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Emprego atual"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre empregador,
                              descrição do cargo e função, antiguidade, data de
                              recrutamento, local de trabalho, especialização ou
                              tipo de empresa, modos e condições de trabalho,
                              cargos anteriores e experiência anterior de
                              trabalho no mesmo empregador, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.empregoAtual"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .profissaoEmprego.empregoAtual
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Recrutamento"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre data de
                              recrutamento, método de recrutamento, fonte de
                              recrutamento, referências, detalhes relacionados
                              com o período de estágio, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.recrutamento"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .profissaoEmprego.recrutamento
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Rescisão de trabalho"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre data de
                              rescisão, motivo, período de notificação,
                              condições de rescisão, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.rescisao"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .profissaoEmprego.rescisao
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Carreira"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre emprego
                              anterior e empregadores, períodos sem emprego,
                              serviço militar, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.carreira"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .profissaoEmprego.carreira
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Absentismo e disciplina"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre registos de
                              absentismo, motivos de ausência, medidas
                              disciplinares, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.absenteismoDisciplina"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .profissaoEmprego.absenteismoDisciplina
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Avaliação de Desempenho"
                          tooltip={
                            <p>
                              Descrever se são tratados dados sobre avaliação de
                              desempenho ou qualquer outro tipo de análise de
                              qualificação ou habilidades profissionais, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.avaliacaoDesempenho"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .profissaoEmprego.avaliacaoDesempenho
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="613">
                      <Accordion.Header>
                        7.14 - Registros/gravações de vídeo, imagem e voz
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Vídeo e imagem"
                          tooltip={
                            <p>
                              Descrever se são tratados arquivos de vídeos,
                              fotos digitais, fitas de vídeo, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.regVideoImgVoz.videoImagem"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .regVideoImgVoz.videoImagem
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Imagem de Vigilância"
                          tooltip={
                            <p>
                              Descrever se são tratadas imagens e/ou vídeos de
                              câmeras de segurança/vigilância (ex: CFTV), etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.regVideoImgVoz.imagemVigilancia"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .regVideoImgVoz.imagemVigilancia
                          }
                          systems={systems}
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Voz"
                          tooltip={
                            <p>
                              Descrever se são tratadas fitas e arquivos
                              digitais de voz, bem como outros registros de
                              gravações de voz , etc
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.regVideoImgVoz.voz"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais
                              .regVideoImgVoz.voz
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="614">
                      <Accordion.Header>7.15 - Outros</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col} lg={1}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Trata?
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Descrição
                          </Form.Label>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="text-muted">
                                Para maiores informações visite o
                                <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                  site da CADA
                                </a>
                              </Tooltip>
                            }
                          >
                            <Form.Label
                              as={Col}
                              className="d-grid justify-content-center"
                            >
                              Tempo Retenção dos Dados
                            </Form.Label>
                          </OverlayTrigger>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Fonte Retenção
                          </Form.Label>
                          <Form.Label
                            as={Col}
                            className="d-grid justify-content-center"
                          >
                            Local de Armazenamento
                          </Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2 bg-primary bg-opacity-10"
                          label="Outros (Especificar)"
                          tooltip={
                            <p>
                              Descrever se são tratadas fitas e arquivos
                              digitais de voz, bem como outros registros de
                              gravações de voz , etc
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.outros.outrosItems"
                          itemRef={
                            CaseIndexDictionary.categoriaDadosPessoais.outros
                              .outrosItems
                          }
                          systems={systems}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  8 - Categorias de Dados Pessoais Sensíveis
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col} lg={1}></Form.Label>
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Trata?
                    </Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Descrição
                    </Form.Label>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip className="text-muted">
                          Para maiores informações visite o
                          <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                            site da CADA
                          </a>
                        </Tooltip>
                      }
                    >
                      <Form.Label
                        as={Col}
                        className="d-grid justify-content-center"
                      >
                        Tempo Retenção dos Dados
                      </Form.Label>
                    </OverlayTrigger>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Fonte Retenção
                    </Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Local de Armazenamento
                    </Form.Label>
                    <Form.Label as={Col} lg={1}></Form.Label>
                  </Row>
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam origem racial ou étnica"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.origemRacialEtnica"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .origemRacialEtnica
                    }
                    systems={systems}
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados que revelam convicção religiosa"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.conviccaoReligiosa"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .conviccaoReligiosa
                    }
                    systems={systems}
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam opinião política"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.opiniaoPolitica"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .opiniaoPolitica
                    }
                    systems={systems}
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados que revelam filiação a sindicato"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoSindicato"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .filiacaoSindicato
                    }
                    systems={systems}
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam filiação a organização de caráter religioso"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoOrgReligiosa"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .filiacaoOrgReligiosa
                    }
                    systems={systems}
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados que revelam filiação ou crença filosófica"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoCrencaFilosofica"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .filiacaoCrencaFilosofica
                    }
                    systems={systems}
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam filiação ou preferências política"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoPreferenciaPolitica"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .filiacaoPreferenciaPolitica
                    }
                    systems={systems}
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados referentes à saúde ou à vida sexual"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.saudeVidaSexual"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .saudeVidaSexual
                    }
                    systems={systems}
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados genéticos"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.geneticos"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .geneticos
                    }
                    systems={systems}
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados biométricos"
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.biometricos"
                    itemRef={
                      CaseIndexDictionary.categoriaDadosPessoaisSensiveis
                        .biometricos
                    }
                    systems={systems}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header>
                  9 - Frequência e totalização das categorias de dados pessoais
                  tratados
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Col lg={1}>
                      <p>{CaseIndexDictionary.frequenciaTratamento}</p>
                    </Col>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Descrever em que frequência os dados são tratados.
                          Isso representa a disponibilidade e horário de
                          funcionamento do sistema automatizado ou processo
                          manual que trata os dados pessoais. Abaixo segue
                          exemplo fictício de descrição do Sistema Nacional de
                          Desaparecidos -SND a ser preenchido no inventário.
                          <br />
                          <br />
                          <b>Exemplo:</b> O SND está disponível no regime 24x7
                          (24 horas por dia nos 7 dias da semana) para
                          comunicação (coleta) dos dados do desaparecimentos e
                          as demais fases e operações de tratamento são
                          realizadas no horário comercial em dias úteis.
                        </Tooltip>
                      }
                    >
                      <Form.Label as={Col}>
                        Frequência de tratamento dos dados pessoais
                      </Form.Label>
                    </OverlayTrigger>
                    <Col lg={8}>
                      <Form.Select
                        disabled={!isEditing}
                        name="frequenciaTratamento.value"
                        value={values.frequenciaTratamento.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.frequenciaTratamento?.value &&
                          !errors.frequenciaTratamento?.value
                        }
                        isInvalid={!!errors.frequenciaTratamento?.value}
                      >
                        {Object.values(tipoFrequenciaTratamento).map((tft) => (
                          <option value={tft} key={tft}>
                            {tft}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={1}>
                      <Row>
                        <CreateCommentBox
                          item={CaseIndexDictionary.frequenciaTratamento}
                        />
                      </Row>
                    </Col>
                  </Row>
                  <Section9QuantityRow />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="9">
                <Accordion.Header>
                  10 - Categorias dos titulares de dados pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey="90">
                      <Accordion.Header>
                        10.1 - Categorias gerais
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Tipo de Categoria</Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Row>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}></Form.Label>
                          <Col lg={1}>
                            <Row>
                              <CreateCommentBox
                                item={
                                  CaseIndexDictionary.categoriasTitulares
                                    .categorias
                                }
                              />
                            </Row>
                          </Col>
                        </Row>
                        <FieldArray
                          name="categoriasTitulares.categorias"
                          render={(arrayHelpers) => (
                            <React.Fragment>
                              {values.categoriasTitulares.categorias &&
                              values.categoriasTitulares.categorias.length >
                                0 ? (
                                values.categoriasTitulares.categorias.map(
                                  (item, index) => (
                                    <React.Fragment key={index}>
                                      <Section10FormRow
                                        className={`mb-3 pt-2 pb-2 ${
                                          index % 2 === 0
                                            ? "bg-primary bg-opacity-10"
                                            : ""
                                        }`}
                                        label={`Categoria`}
                                        disabled={!isEditing}
                                        name={`categoriasTitulares.categorias[${index}]`}
                                        full={true}
                                        itemRef={
                                          CaseIndexDictionary
                                            .categoriasTitulares.categorias
                                        }
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
                                              arrayHelpers.push(
                                                emptyItemCategoriaTitulares()
                                              )
                                            }
                                          >
                                            +
                                          </Button>
                                          <Button
                                            variant="danger"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            -
                                          </Button>
                                        </ButtonGroup>
                                      </Row>
                                    </React.Fragment>
                                  )
                                )
                              ) : (
                                <Row className="justify-content-center">
                                  <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        arrayHelpers.push(
                                          emptyItemCategoriaTitulares()
                                        )
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
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="91">
                      <Accordion.Header>
                        10.3 - Categorias que envolvam crianças e adolescentes
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Trata?</Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section10FormRow
                          className={"mb-3 pt-2 pb-2 bg-primary bg-opacity-10"}
                          label={"Categoria Crianças e Adolescentes"}
                          disabled={!isEditing}
                          name={"categoriasTitulares.criancasAdolescentes"}
                          full={false}
                          itemRef={
                            CaseIndexDictionary.categoriasTitulares
                              .criancasAdolescentes
                          }
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="92">
                      <Accordion.Header>
                        10.4 - Categorias que envolvam outros grupos vulneráveis
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Trata?</Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col} lg={1}></Form.Label>
                        </Row>
                        <Section10FormRow
                          className={
                            "mb-3 pt-2 pb-2 $ bg-primary bg-opacity-10"
                          }
                          label={"Categoria Outros Grupos Vulneráveis"}
                          disabled={!isEditing}
                          name={"categoriasTitulares.outrosGruposVulneraveis"}
                          full={false}
                          tooltip={
                            "Idoso, pessoa em situação de rua, pessoa com deficiência, entre outros"
                          }
                          itemRef={
                            CaseIndexDictionary.categoriasTitulares
                              .outrosGruposVulneraveis
                          }
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="10">
                <Accordion.Header>
                  11 - Compartilhamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}>
                      Nome da Instituição Receptora
                    </Form.Label>
                    <Form.Label
                      as={Col}
                      className="d-grid justify-content-center"
                    >
                      Compartilha?
                    </Form.Label>
                    <Form.Label as={Col}>Público/Privado</Form.Label>
                    <Form.Label as={Col}>Nível de Compartilhamento</Form.Label>
                    <Form.Label as={Col}>Descrição do Nível</Form.Label>
                    <Form.Label as={Col}>
                      Finalidade do Compartilhamento
                    </Form.Label>
                    <Form.Label as={Col} lg={1}></Form.Label>
                  </Row>
                  <Section11FormRow disabled={!isEditing} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="11">
                <Accordion.Header>
                  Medidas de Segurança/Privacidade
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>
                      Tipo de medida de segurança e privacidade
                    </Form.Label>
                    <Form.Label as={Col}>
                      Descrição do(s) Controle(s)
                    </Form.Label>
                  </Row>
                  <FieldArray
                    name="medidasSegurancaPrivacidade"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.medidasSegurancaPrivacidade &&
                        values.medidasSegurancaPrivacidade.length > 0 ? (
                          values.medidasSegurancaPrivacidade.map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <Section12FormRow
                                  className={`mb-3 pt-2 pb-2 ${
                                    index % 2 === 0
                                      ? "bg-primary bg-opacity-10"
                                      : ""
                                  }`}
                                  label={`Medida de Segurança/Privacidade ${
                                    index + 1
                                  }`}
                                  disabled={!isEditing}
                                  name={`medidasSegurancaPrivacidade[${index}]`}
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
                                        arrayHelpers.push(
                                          emptyItemMedidaSegurancaPrivacidade()
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
                            )
                          )
                        ) : (
                          <Row className="justify-content-center">
                            <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  arrayHelpers.push(
                                    emptyItemMedidaSegurancaPrivacidade()
                                  )
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="12">
                <Accordion.Header>
                  Transferência Internacional de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}>
                      Nome da Organização Receptora
                    </Form.Label>
                    <Form.Label as={Col}>País</Form.Label>
                    <Form.Label as={Col}>
                      Dados pessoais transferidos
                    </Form.Label>
                    <Form.Label as={Col}>
                      Tipo de garantia para transferência
                    </Form.Label>
                  </Row>
                  <FieldArray
                    name="transferenciaInternacional"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.transferenciaInternacional &&
                        values.transferenciaInternacional.length > 0 ? (
                          values.transferenciaInternacional.map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <Section13FormRow
                                  className={`mb-3 pt-2 pb-2 ${
                                    index % 2 === 0
                                      ? "bg-primary bg-opacity-10"
                                      : ""
                                  }`}
                                  disabled={!isEditing}
                                  name={`transferenciaInternacional[${index}]`}
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
                            )
                          )
                        ) : (
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
                            </ButtonGroup>
                          </Row>
                        )}
                      </React.Fragment>
                    )}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="13">
                <Accordion.Header>
                  Contrato(s) de serviços e/ou soluções de TI que trata(m) dados
                  pessoais do serviço/processo de negócio
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}>Número do Contrato</Form.Label>
                    <Form.Label as={Col}>Nº Processo Contratação</Form.Label>
                    <Form.Label as={Col}>Objeto do Contrato</Form.Label>
                    <Form.Label as={Col}>
                      E-mail do Gestor do Contrato
                    </Form.Label>
                  </Row>
                  <FieldArray
                    name="contratoServicosTITratamentoDados"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.contratoServicosTITratamentoDados &&
                        values.contratoServicosTITratamentoDados.length > 0 ? (
                          values.contratoServicosTITratamentoDados.map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <Section14FormRow
                                  className={`mb-3 pt-2 pb-2 ${
                                    index % 2 === 0
                                      ? "bg-primary bg-opacity-10"
                                      : ""
                                  }`}
                                  disabled={!isEditing}
                                  name={`contratoServicosTITratamentoDados[${index}]`}
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
                                        arrayHelpers.push(emptyItemContratoTI())
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
                            )
                          )
                        ) : (
                          <Row className="justify-content-center">
                            <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  arrayHelpers.push(emptyItemContratoTI())
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="14">
                <Accordion.Header>Risco de Privacidade</Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>
                      Tipo de Risco de Privacidade
                    </Form.Label>
                    <Form.Label as={Col}>Observações</Form.Label>
                  </Row>
                  <FieldArray
                    name="riscosPrivacidade"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.riscosPrivacidade &&
                        values.riscosPrivacidade.length > 0 ? (
                          values.riscosPrivacidade.map((item, index) => (
                            <React.Fragment key={index}>
                              <Section15FormRow
                                className={`mb-3 pt-2 pb-2 ${
                                  index % 2 === 0
                                    ? "bg-primary bg-opacity-10"
                                    : ""
                                }`}
                                label={`Risco ${index + 1}`}
                                disabled={!isEditing}
                                name={`riscosPrivacidade[${index}]`}
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
                                      arrayHelpers.push(
                                        emptyItemRiscoPrivacidade()
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
                                onClick={() =>
                                  arrayHelpers.push(emptyItemRiscoPrivacidade())
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="15">
                <Accordion.Header>
                  Observações sobre o Processo
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}>Observação</Form.Label>
                  </Row>
                  <FieldArray
                    name="observacoesProcesso"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.observacoesProcesso &&
                        values.observacoesProcesso.length > 0 ? (
                          values.observacoesProcesso.map((item, index) => (
                            <React.Fragment key={index}>
                              <Section16FormRow
                                className={`mb-3 pt-2 pb-2 ${
                                  index % 2 === 0
                                    ? "bg-primary bg-opacity-10"
                                    : ""
                                }`}
                                label={`Observação ${index + 1}`}
                                disabled={!isEditing}
                                name={`observacoesProcesso[${index}]`}
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
                                      arrayHelpers.push(
                                        emptyItemObservacoesProcesso()
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
                                onClick={() =>
                                  arrayHelpers.push(
                                    emptyItemObservacoesProcesso()
                                  )
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {props.new && (
              <Stack direction="horizontal" className="mt-3" gap={3}>
                <Button
                  type="button"
                  disabled={!(isValid && dirty)}
                  variant="secondary"
                  className="ms-auto"
                  onClick={() => handleSaveProgressClick(values)}
                >
                  Salvar Alterações
                </Button>
                <Button
                  type="button"
                  disabled={!(isValid && dirty)}
                  variant="warning"
                  onClick={() => handleSendToApprovalClick(values)}
                >
                  Encaminhar para encarregado de Dados
                </Button>
              </Stack>
            )}
            {props.approve && (
              <Row className="float-end mt-3">
                <ButtonGroup as={Col} lg={2}>
                  <Button
                    variant="outline-secondary"
                    onClick={() => onCancel()}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Aprovar</Button>
                </ButtonGroup>
              </Row>
            )}
            {props.edit && isEditing && isValid && (
              <Button className="float-end mt-3" disabled={!(isValid && dirty)}>
                Salvar Alterações
              </Button>
            )}
            {props.edit && !isEditing && (
              <Row className="float-end mt-3">
                <ButtonGroup as={Col} lg={2}>
                  <Button
                    variant="outline-secondary"
                    onClick={() => onCancel()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Remover
                  </Button>
                  <Button variant="primary" onClick={() => onStartEditing()}>
                    Editar
                  </Button>
                </ButtonGroup>
              </Row>
            )}
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CaseForm;
