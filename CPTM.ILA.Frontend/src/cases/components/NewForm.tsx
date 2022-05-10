import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, FormProvider } from "react-hook-form";
import Select from "react-select";
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
  emptyItemCategoriaTitulares,
  emptyItemMedidaSegurancaPrivacidade,
  emptyItemObservacoesProcesso,
  emptyItemRiscoPrivacidade,
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
import { useUtilities } from "../../shared/hooks/utilities-hook";
import SelectFieldSearch from "../../shared/components/UI/SelectFieldSearch";
import NewSection3FormRow from "./new-form-items/NewSection3FormRow";
import NewSection6FormRow from "./new-form-items/NewSection6FormRow";

type onSubmitFn = (item: Case) => void;

const NewForm = (props: {
  item: Case;
  new?: boolean;
  edit?: boolean;
  approve?: boolean;
  continue?: boolean;
  onSaveProgressSubmit?: onSubmitFn;
  onSendToApprovalSubmit?: onSubmitFn;
  onApproveSubmit?: onSubmitFn;
  onReproveSubmit?: onSubmitFn;
}) => {
  const [isEditing, setIsEditing] = useState(props.new || false);
  const [itemValues, setItemValues] = useState<Case>(emptyCase());

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveProgressModal, setShowSaveProgressModal] = useState(false);
  const [showSendToApprovalModal, setShowSendToApprovalModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showReproveModal, setShowReproveModal] = useState(false);

  const { token } = useContext(AuthContext);

  const methods = useForm<Case>({ defaultValues: props.item });

  const { sendRequest, error, clearError, isLoading } = useHttpClient();

  const { systems, countries } = useUtilities();

  let navigate = useNavigate();
  const cid = useParams().cid || "";

  const onStartEditing = () => {
    setIsEditing(true);
  };
  const onCancel = () => {
    navigate(`/`);
  };
  const onDelete = async (itemId: string) => {
    console.log("Delete id=", itemId);
  };

  const handleSaveProgressClick = async (item: Case) => {
    setItemValues(item);
    const valid = await methods.trigger();
    if (valid) {
      setShowSaveProgressModal(true);
    }
  };
  const handleSendToApprovalClick = async (item: Case) => {
    setItemValues(item);
    const valid = await methods.trigger();
    if (valid) {
      setShowSaveProgressModal(true);
    }
  };
  const handleApprovalClick = (item: Case) => {
    setItemValues(item);
    setShowApproveModal(true);
  };
  const handleReprovalClick = (item: Case) => {
    setItemValues(item);
    setShowReproveModal(true);
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
      <Modal
        show={showApproveModal}
        onHide={() => setShowApproveModal(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Aprovar Processo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que deseja aprovar este processo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowApproveModal(false)}>
            Não
          </Button>
          <Button
            variant="primary"
            onClick={() => props.onApproveSubmit!(itemValues)}
          >
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showReproveModal}
        onHide={() => setShowReproveModal(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reprovar Processo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que deseja reprovar este processo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowReproveModal(false)}>
            Não
          </Button>
          <Button
            variant="primary"
            onClick={() => props.onReproveSubmit!(itemValues)}
          >
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          Ocorreu um erro ao enviar o processo: {error}
        </Alert>
      )}
      <FormProvider {...methods}>
        <Form>
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
                    <Controller
                      rules={{ required: true, maxLength: 250 }}
                      control={methods.control}
                      name="nome"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          isInvalid={
                            methods.formState.errors.nome ? true : false
                          }
                          placeholder="Insira o nome do processo"
                        />
                      )}
                    />
                    <Form.Text className="text-muted">
                      Informar nome do serviço ofertado à sociedade ou nome do
                      processo de negócio que realiza tratamento dos dados
                      pessoais. Exemplo: Avaliações de Alimentos; Cancelamento e
                      Renovação de Registros de Alimentos; e etc..
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
                      <Controller
                        control={methods.control}
                        name="id"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Form.Control
                            disabled
                            type="text"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            readOnly
                          />
                        )}
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
                    <Controller
                      control={methods.control}
                      name="dataCriacao"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Col lg={1}>
                    <p>{CaseIndexDictionary.dataAtualizacao}</p>
                  </Col>
                  <Form.Group as={Col} controlId="validationFormik04">
                    <Form.Label>Data Atualização do Inventário</Form.Label>
                    <Controller
                      control={methods.control}
                      name="dataAtualizacao"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
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
                    <Controller
                      control={methods.control}
                      name="controlador.nome"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
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
                          Pessoa indicada pelo controlador e operador para atuar
                          como canal de comunicação entre o controlador, os
                          titulares dos dados e a Autoridade Nacional de
                          Proteção de Dados - ANPD (LGPD, art. 5º, VIII)
                        </Tooltip>
                      }
                    >
                      <Form.Label>Encarregado</Form.Label>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="encarregado.nome"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="encarregado.area"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="encarregado.telefone"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="encarregado.email"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
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
                          Pessoa indicada pelo controlador e operador para atuar
                          como canal de comunicação entre o controlador, os
                          titulares dos dados e a Autoridade Nacional de
                          Proteção de Dados - ANPD (LGPD, art. 5º, VIII)
                        </Tooltip>
                      }
                    >
                      <Form.Label>Extensão Encarregado</Form.Label>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="extensaoEncarregado.nome"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="extensaoEncarregado.area"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="extensaoEncarregado.telefone"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="extensaoEncarregado.email"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
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
                          Pessoa indicada pelo controlador e operador para atuar
                          como canal de comunicação entre o controlador, os
                          titulares dos dados e a Autoridade Nacional de
                          Proteção de Dados - ANPD (LGPD, art. 5º, VIII)
                        </Tooltip>
                      }
                    >
                      <Form.Label>Área Tratamento Dados</Form.Label>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="areaTratamentoDados.nome"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="areaTratamentoDados.area"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="areaTratamentoDados.telefone"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
                    />
                  </Col>
                  <Col>
                    <Controller
                      control={methods.control}
                      name="areaTratamentoDados.email"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
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
                          privado, que realiza o tratamento de dados pessoais em
                          nome do controlador; (LGPD, art. 5º, VII)
                        </Tooltip>
                      }
                    >
                      <Form.Label>Operador</Form.Label>
                    </OverlayTrigger>
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
                <NewSection3FormRow disabled={!isEditing} />
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
                        desenho com um fluxo de dados. Abaixo, segue exemplo de
                        descrição do fluxo de dados.
                      </Tooltip>
                    }
                  >
                    <Form.Label as={Col}>Descrição do Fluxo</Form.Label>
                  </OverlayTrigger>
                  <Col lg={8}>
                    <Controller
                      rules={{ required: true, maxLength: 250 }}
                      control={methods.control}
                      name="descricaoFluxoTratamento"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          disabled={!isEditing}
                          as="textarea"
                          rows={5}
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          isInvalid={
                            methods.formState.errors.descricaoFluxoTratamento
                              ? true
                              : false
                          }
                          placeholder="Descreva o fluxo de tratamento..."
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col lg={1}>
                    <Row>
                      <CreateCommentBox
                        item={CaseIndexDictionary.descricaoFluxoTratamento}
                      />
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
                    <Controller
                      rules={{ required: true }}
                      control={methods.control}
                      name="abrangenciaGeografica.value"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Select
                          disabled={!isEditing}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          isInvalid={
                            methods.formState.errors.abrangenciaGeografica
                              ?.value
                              ? true
                              : false
                          }
                          placeholder="Insira o nome do processo"
                        >
                          {Object.values(tipoAbrangenciaGeografica).map(
                            (tag) => (
                              <option value={tag} key={tag}>
                                {tag}
                              </option>
                            )
                          )}
                        </Form.Select>
                      )}
                    />
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
                    <Controller
                      rules={{ required: true }}
                      control={methods.control}
                      name="fonteDados"
                      render={({ field: { onChange, value, name, ref } }) => (
                        <Select
                          ref={ref}
                          options={systems.map((s) => ({ value: s, label: s }))}
                          value={systems
                            .map((s) => ({ value: s, label: s }))
                            .find((c) => c.value === value)}
                          onChange={(val) => onChange(val?.value)}
                          isSearchable
                        />
                      )}
                    />
                  </Col>
                  <Col lg={1}>
                    <Row>
                      <CreateCommentBox item={CaseIndexDictionary.fonteDados} />
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
                <NewSection6FormRow
                  label="Hipótese de Tratamento"
                  tooltip={
                    <p>
                      As hipóteses de tratamento estão descritas nos arts. 7º e
                      11 da LGPD.
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
                    CaseIndexDictionary.finalidadeTratamento.hipoteseTratamento
                  }
                  methods={methods}
                  rules={{ required: true }}
                />
                <NewSection6FormRow
                  label="Finalidade"
                  tooltip={
                    <p>
                      Razão ou motivo pela qual se deseja tratar os dados
                      pessoais. É importantíssimo estabelecer claramente a
                      finalidade, pois é ela que justifica o tratamento de dados
                      pessoais e fornece os elementos para informar o titular
                      dos dados.
                    </p>
                  }
                  disabled
                  name="finalidadeTratamento.descricaoFinalidade"
                  type="text"
                  invalid="Esse campo é obrigatório"
                  itemRef={
                    CaseIndexDictionary.finalidadeTratamento.descricaoFinalidade
                  }
                  methods={methods}
                  rules={{ required: true }}
                />
                <NewSection6FormRow
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
                    methods.getValues().finalidadeTratamento.hipoteseTratamento
                      .value !== hipotesesTratamento.obrigacaoLegal
                  }
                  name="finalidadeTratamento.previsaoLegal"
                  type="text"
                  invalid="Esse campo é obrigatório"
                  itemRef={
                    CaseIndexDictionary.finalidadeTratamento.previsaoLegal
                  }
                  methods={methods}
                  rules={
                    methods.getValues().finalidadeTratamento.hipoteseTratamento
                      .value === hipotesesTratamento.obrigacaoLegal
                      ? { required: true }
                      : { required: false }
                  }
                />
                <NewSection6FormRow
                  label="Resultados pretendidos para o titular de dados"
                  disabled={!isEditing}
                  name="finalidadeTratamento.resultadosTitular"
                  type="text"
                  invalid="Esse campo é obrigatório"
                  itemRef={
                    CaseIndexDictionary.finalidadeTratamento.resultadosTitular
                  }
                  methods={methods}
                  rules={{ required: true }}
                />
                <NewSection6FormRow
                  label="Benefícios esperados para o órgão, entidade ou para a
                    sociedade como um todo"
                  disabled={!isEditing}
                  name="finalidadeTratamento.beneficiosEsperados"
                  type="text"
                  invalid="Esse campo é obrigatório"
                  itemRef={
                    CaseIndexDictionary.finalidadeTratamento.beneficiosEsperados
                  }
                  methods={methods}
                  rules={{ required: true }}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {props.new && (
            <Stack direction="horizontal" className="mt-3" gap={3}>
              <Button
                type="button"
                disabled={!methods.formState.isDirty}
                variant="secondary"
                className="ms-auto"
                onClick={() => handleSaveProgressClick(methods.getValues())}
              >
                Salvar Alterações
              </Button>
              <Button
                type="button"
                disabled={!methods.formState.isDirty}
                variant="warning"
                onClick={() => handleSendToApprovalClick(methods.getValues())}
              >
                Encaminhar para encarregado de Dados
              </Button>
            </Stack>
          )}
        </Form>
      </FormProvider>
    </React.Fragment>
  );
};

export default NewForm;
