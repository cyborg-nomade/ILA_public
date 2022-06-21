import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { AiFillQuestionCircle } from "react-icons/ai";

import {
    emptyItemCategoriaTitulares,
    emptyItemMedidaSegurancaPrivacidade,
    emptyItemObservacoesProcesso,
    emptyItemRiscoPrivacidade,
} from "../../shared/models/case-helpers/case-helpers.model";
import { Case } from "../../shared/models/cases.model";
import { CaseIndexDictionary } from "../../shared/models/case-index.dictionary";
import {
    hipotesesTratamento,
    tipoAbrangenciaGeografica,
    tipoFrequenciaTratamento,
} from "../../shared/models/case-helpers/enums.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useUtilities } from "../../shared/hooks/utilities-hook";
import CreateCommentBox from "../../threads-comments/components/CreateCommentBox";
import Section3FormRow from "./form-items/Section3FormRow";
import Section6FormRow from "./form-items/Section6FormRow";
import Section7FormRow from "./form-items/Section7FormRow";
import Section9QuantityRow from "./form-items/Section9QuantityRow";
import Section10FormRow from "./form-items/Section10FormRow";
import Section11FormRow from "./form-items/Section11FormRow";
import Section12FormRow from "./form-items/Section12FormRow";
import Section13FormRow from "./form-items/Section13FormRow";
import Section14FormRow from "./form-items/Section14FormRow";
import Section15FormRow from "./form-items/Section15FormRow";
import Section16FormRow from "./form-items/Section16FormRow";
import { useCountdown } from "../../shared/hooks/timer-hook";
import DeleteModal from "./modals/DeleteModal";
import _ from "lodash";
import LoadingModal from "./modals/LoadingModal";
import { usePrompt } from "../../shared/hooks/prompt-hook";

type onSubmitFn = (item: Case) => void;

const CaseForm = (props: {
    item: Case;
    new?: boolean;
    edit?: boolean;
    approve?: boolean;
    continue?: boolean;
    reprovado?: boolean;
    check?: boolean;
    onSaveProgressSubmit?: onSubmitFn;
    onSendToApprovalSubmit?: onSubmitFn;
    onApproveSubmit?: onSubmitFn;
    onReproveSubmit?: onSubmitFn;
}) => {
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(props.new || false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const [isFormAllTouched, setIsFormAllTouched] = useState({
        "0": true,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
        "7": false,
        "8": false,
        "9": false,
        "10": false,
        "11": false,
        "12": false,
        "13": false,
        "14": false,
        "15": false,
    });
    const [hasOperador, setHasOperador] = useState(
        props.item.operador.nome ||
            props.item.operador.area ||
            props.item.operador.telefone ||
            props.item.operador.email
            ? "SIM"
            : "NÃO"
    );
    const [isAllRadioClicked, setIsAllRadioClicked] = useState({
        fasesCicloTratamento: false,
        "categoriaDadosPessoais.identificacao.idPessoal": false,
        "categoriaDadosPessoais.identificacao.idGov": false,
        "categoriaDadosPessoais.identificacao.idEletronica": false,
        "categoriaDadosPessoais.identificacao.locEletronica": false,
        "categoriaDadosPessoais.financeiros.idFin": false,
        "categoriaDadosPessoais.financeiros.recursosFin": false,
        "categoriaDadosPessoais.financeiros.dividasDespesas": false,
        "categoriaDadosPessoais.financeiros.solvencia": false,
        "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito": false,
        "categoriaDadosPessoais.financeiros.assistenciaFin": false,
        "categoriaDadosPessoais.financeiros.apoliceSeguro": false,
        "categoriaDadosPessoais.financeiros.planoPensao": false,
        "categoriaDadosPessoais.financeiros.transacaoFin": false,
        "categoriaDadosPessoais.financeiros.compensacao": false,
        "categoriaDadosPessoais.financeiros.atividadeProfissional": false,
        "categoriaDadosPessoais.financeiros.acordosAjustes": false,
        "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos": false,
        "categoriaDadosPessoais.caracteristicas.detalhesPessoais": false,
        "categoriaDadosPessoais.caracteristicas.detalhesMilitares": false,
        "categoriaDadosPessoais.caracteristicas.situacaoImigracao": false,
        "categoriaDadosPessoais.caracteristicas.descricaoFisica": false,
        "categoriaDadosPessoais.habitos.habitosPessoais": false,
        "categoriaDadosPessoais.habitos.estiloVida": false,
        "categoriaDadosPessoais.habitos.viagensDeslocamento": false,
        "categoriaDadosPessoais.habitos.contatosSociais": false,
        "categoriaDadosPessoais.habitos.posses": false,
        "categoriaDadosPessoais.habitos.denunciasIncAcidentes": false,
        "categoriaDadosPessoais.habitos.distincoes": false,
        "categoriaDadosPessoais.habitos.usoMidia": false,
        "categoriaDadosPessoais.caracteristicasPsicologicas.descricaoPsi":
            false,
        "categoriaDadosPessoais.composicaoFamiliar.casamentoCoabitacao": false,
        "categoriaDadosPessoais.composicaoFamiliar.historicoConjugal": false,
        "categoriaDadosPessoais.composicaoFamiliar.membrosFamilia": false,
        "categoriaDadosPessoais.interessesLazer.atividadesInteressesLaz": false,
        "categoriaDadosPessoais.associacoes.outrasAssNaoSensiveis": false,
        "categoriaDadosPessoais.processoJudAdmCrim.suspeitas": false,
        "categoriaDadosPessoais.processoJudAdmCrim.condenacoesSentencas": false,
        "categoriaDadosPessoais.processoJudAdmCrim.acoesJud": false,
        "categoriaDadosPessoais.processoJudAdmCrim.penalidadesAdm": false,
        "categoriaDadosPessoais.habitosConsumo.dadosBensServicos": false,
        "categoriaDadosPessoais.residenciais.dadosResidencia": false,
        "categoriaDadosPessoais.educacaoTreinamento.academicosEscolares": false,
        "categoriaDadosPessoais.educacaoTreinamento.registroFinanceiro": false,
        "categoriaDadosPessoais.educacaoTreinamento.qualificacaoExperienciaProf":
            false,
        "categoriaDadosPessoais.profissaoEmprego.empregoAtual": false,
        "categoriaDadosPessoais.profissaoEmprego.recrutamento": false,
        "categoriaDadosPessoais.profissaoEmprego.rescisao": false,
        "categoriaDadosPessoais.profissaoEmprego.carreira": false,
        "categoriaDadosPessoais.profissaoEmprego.absenteismoDisciplina": false,
        "categoriaDadosPessoais.profissaoEmprego.avaliacaoDesempenho": false,
        "categoriaDadosPessoais.regVideoImgVoz.videoImagem": false,
        "categoriaDadosPessoais.regVideoImgVoz.imagemVigilancia": false,
        "categoriaDadosPessoais.regVideoImgVoz.voz": false,
        "categoriaDadosPessoais.outros.outrosItems": false,
        "catDadosPessoaisSensiveis.origemRacialEtnica": false,
        "catDadosPessoaisSensiveis.conviccaoReligiosa": false,
        "catDadosPessoaisSensiveis.opiniaoPolitica": false,
        "catDadosPessoaisSensiveis.filiacaoSindicato": false,
        "catDadosPessoaisSensiveis.filiacaoOrgReligiosa": false,
        "catDadosPessoaisSensiveis.filiacaoCrencaFilosofica": false,
        "catDadosPessoaisSensiveis.filiacaoPreferenciaPolitica": false,
        "catDadosPessoaisSensiveis.saudeVidaSexual": false,
        "catDadosPessoaisSensiveis.geneticos": false,
        "catDadosPessoaisSensiveis.biometricos": false,
        compartilhamentoDadosPessoais: false,
        transferenciaInternacional: false,
        contratoServicosTITratamentoDados: false,
    });

    const { token, tokenExpirationDate, user, changeGroup } =
        useContext(AuthContext);
    const { minutes } = useCountdown(tokenExpirationDate);
    const { sendRequest, error, isLoading } = useHttpClient();
    const { systems, countries, dpo, isLoadingUtilities } = useUtilities();
    let navigate = useNavigate();

    const methods = useForm<Case>({
        defaultValues: {
            ...props.item,
            controlador: {
                ...props.item.controlador,
                area: props.item.controlador.nome === "CPTM" ? dpo.area : "",
                email: props.item.controlador.nome === "CPTM" ? dpo.email : "",
                telefone:
                    props.item.controlador.nome === "CPTM" ? dpo.telefone : "",
            },
            encarregado: dpo,
        },
    });
    const { reset, getValues } = methods;
    useEffect(
        () =>
            reset({
                ...props.item,
                controlador: {
                    ...props.item.controlador,
                    area:
                        props.item.controlador.nome === "CPTM" ? dpo.area : "",
                    email:
                        props.item.controlador.nome === "CPTM" ? dpo.email : "",
                    telefone:
                        props.item.controlador.nome === "CPTM"
                            ? dpo.telefone
                            : "",
                },
                encarregado: dpo,
            }),
        [reset, props.item, dpo]
    );

    const categoriasTitularesCategorias = useFieldArray({
        control: methods.control,
        name: "categoriasTitulares.categorias",
    });
    const medidasSegurancaPrivacidade = useFieldArray({
        control: methods.control,
        name: "medidasSegurancaPrivacidade",
    });
    const riscosPrivacidade = useFieldArray({
        control: methods.control,
        name: "riscosPrivacidade",
    });
    const observacoesProcesso = useFieldArray({
        control: methods.control,
        name: "observacoesProcesso",
    });

    const toggleEnableOperador = (value: string) => {
        console.log("hasOperador: ", value);
        if (value === "NÃO") {
            methods.clearErrors(["operador"]);
        }
        setHasOperador(value);
    };

    const checkAllRadiosHandler = (radioCheckedName: string) => {
        setIsAllRadioClicked((prevState) => {
            return { ...prevState, [radioCheckedName]: true };
        });
    };

    const onStartEditing = () => {
        setIsEditing(true);
    };
    const onCancel = () => {
        navigate(-1);
    };
    const onDelete = async (itemId: number) => {
        console.log("itemId: ", itemId);

        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/delete/${itemId}`,
                "POST",
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            console.log("delete case response: ", responseData);
            setMessage(responseData.message);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSendToApprovalClick = async (item: Case) => {
        console.log("case form, send to approval, item: ", item);

        const isAllTouched = props.new
            ? Object.values(isFormAllTouched).reduce((t, n) => {
                  return t && n;
              })
            : true;

        const isAllRadioTouched = Object.values(isAllRadioClicked).reduce(
            (t, n) => {
                return t && n;
            }
        );
        const valid = await methods.trigger();
        if (valid && isAllTouched && isAllRadioTouched) {
            props.onSendToApprovalSubmit!(item);
        } else {
            console.log(methods.formState.errors);

            setIsFormAllTouched({
                "0": true,
                "1": true,
                "2": true,
                "3": true,
                "4": true,
                "5": true,
                "6": true,
                "7": true,
                "8": true,
                "9": true,
                "10": true,
                "11": true,
                "12": true,
                "13": true,
                "14": true,
                "15": true,
            });
            setFormIsValid(false);
        }
        // props.onSendToApprovalSubmit!(item);
    };

    // handle auto-save
    useEffect(() => {
        if (token && tokenExpirationDate && minutes === 10) {
            props.onSaveProgressSubmit!(getValues());
        }
        return () => {};
    }, [
        token,
        tokenExpirationDate,
        getValues,
        minutes,
        props.onSaveProgressSubmit,
    ]);

    return (
        <React.Fragment>
            <LoadingModal isLoading={isLoadingUtilities} />
            <DeleteModal
                item={props.item}
                onDeleteSubmit={onDelete}
                onDismissDeleteModal={onCancel}
                onHideDeleteModal={() => setShowDeleteModal(false)}
                showChildrenContent={isLoading || error || !!message}
                isLoading={isLoading}
                hasError={!!error}
                showDeleteModal={showDeleteModal}
            >
                <React.Fragment>
                    {isLoading && (
                        <Row className="justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </Spinner>
                        </Row>
                    )}
                    {error && (
                        <Row
                            className="justify-content-center mx-auto"
                            style={{ width: "28rem" }}
                        >
                            <Alert variant="danger">{error}</Alert>
                        </Row>
                    )}
                    {message && (
                        <Row
                            className="justify-content-center mx-auto"
                            style={{ width: "28rem" }}
                        >
                            <Alert variant="success">{message}</Alert>
                        </Row>
                    )}
                </React.Fragment>
            </DeleteModal>
            {methods.getValues().comentarioReprovacao && props.reprovado && (
                <Alert variant="danger">
                    Este processo foi reprovado pelo seguinte motivo:{" "}
                    {methods.getValues().comentarioReprovacao}
                </Alert>
            )}
            <Form>
                <Accordion
                    defaultActiveKey="0"
                    activeKey={
                        !formIsValid ? Object.keys(isFormAllTouched) : undefined
                    }
                    alwaysOpen={!formIsValid}
                >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>1 - Identificação</Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3 align-items-center">
                                <Col lg={1}>
                                    <p>{CaseIndexDictionary.nome.number}</p>
                                </Col>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik01"
                                >
                                    <Form.Label>
                                        {CaseIndexDictionary.nome.title}
                                    </Form.Label>
                                    <Controller
                                        rules={{
                                            required: true,
                                            maxLength: 250,
                                        }}
                                        control={methods.control}
                                        name="nome"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Control
                                                disabled={!isEditing}
                                                type="text"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .nome
                                                }
                                                placeholder="Insira o nome do processo"
                                            />
                                        )}
                                    />
                                    <Form.Text className="text-muted">
                                        Informar nome do serviço ofertado à
                                        sociedade ou nome do processo de negócio
                                        que realiza tratamento dos dados
                                        pessoais. Exemplo: Avaliações de
                                        Alimentos; Cancelamento e Renovação de
                                        Registros de Alimentos; e etc..
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Esse campo é obrigatório
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            {!props.new && (
                                <Row className="mb-3">
                                    <Col lg={1}>
                                        <p>{CaseIndexDictionary.id.number}</p>
                                    </Col>
                                    <Form.Group
                                        as={Col}
                                        controlId="validationFormik02"
                                    >
                                        <Form.Label>
                                            {CaseIndexDictionary.id.title}
                                        </Form.Label>
                                        <Controller
                                            control={methods.control}
                                            name="id"
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                    ref,
                                                },
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
                            {/* {!props.new && (
                                <Row className="mb-3">
                                    <Col lg={1}>
                                        <p>{CaseIndexDictionary.ref.number}</p>
                                    </Col>
                                    <Form.Group
                                        as={Col}
                                        controlId="validationFormik02"
                                    >
                                        <Form.Label>
                                            {CaseIndexDictionary.id.title}
                                        </Form.Label>
                                        <Controller
                                            control={methods.control}
                                            name="ref"
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                    ref,
                                                },
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
                            )} */}
                            <Row className="mb-3">
                                <Col lg={1}>
                                    <p>
                                        {CaseIndexDictionary.dataCriacao.number}
                                    </p>
                                </Col>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik03"
                                >
                                    <Form.Label>
                                        {CaseIndexDictionary.dataCriacao.title}
                                    </Form.Label>
                                    <Controller
                                        control={methods.control}
                                        name="dataCriacao"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
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
                            <Row className="mb-3">
                                <Col lg={1}>
                                    <p>
                                        {
                                            CaseIndexDictionary.dataAtualizacao
                                                .number
                                        }
                                    </p>
                                </Col>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik04"
                                >
                                    <Form.Label>
                                        {
                                            CaseIndexDictionary.dataAtualizacao
                                                .title
                                        }
                                    </Form.Label>
                                    <Controller
                                        control={methods.control}
                                        name="dataAtualizacao"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
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
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="1"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "1": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            2 - Agentes de Tratamento e Encarregado
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3">
                                <Form.Label as={Col} lg={1}></Form.Label>
                                <Form.Label as={Col}></Form.Label>
                                <Form.Label as={Col}>Nome</Form.Label>
                                <Form.Label as={Col}>Área</Form.Label>
                                <Form.Label as={Col}>Telefone</Form.Label>
                                <Form.Label as={Col}>E-mail</Form.Label>
                            </Row>
                            <Row className="mb-3">
                                <Col lg={1}>
                                    <p>
                                        {CaseIndexDictionary.controlador.number}
                                    </p>
                                </Col>
                                <Col>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip className="text-muted">
                                                Pessoa natural ou jurídica, de
                                                direito público ou privado, a
                                                quem competem as decisões
                                                referentes ao tratamento de
                                                dados pessoais (LGPD, art. 5º,
                                                IV). Informar o nome do órgão ou
                                                entidade.
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Label>
                                            {
                                                CaseIndexDictionary.controlador
                                                    .title
                                            }
                                        </Form.Label>
                                    </OverlayTrigger>
                                </Col>
                                <Col>
                                    <Controller
                                        rules={{
                                            required: true,
                                            maxLength: 250,
                                        }}
                                        control={methods.control}
                                        name="controlador.nome"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Control
                                                disabled={!isEditing}
                                                type="text"
                                                onChange={(event) => {
                                                    if (
                                                        event.currentTarget
                                                            .value === "CPTM"
                                                    ) {
                                                        methods.setValue(
                                                            "controlador.area",
                                                            dpo.area
                                                        );
                                                        methods.setValue(
                                                            "controlador.email",
                                                            dpo.email
                                                        );
                                                        methods.setValue(
                                                            "controlador.telefone",
                                                            dpo.telefone
                                                        );
                                                        methods.clearErrors([
                                                            "controlador",
                                                        ]);
                                                    }
                                                    if (
                                                        event.currentTarget
                                                            .value !== "CPTM" &&
                                                        methods.watch(
                                                            "controlador.area"
                                                        ) !== "" &&
                                                        methods.watch(
                                                            "controlador.email"
                                                        ) !== "" &&
                                                        methods.watch(
                                                            "controlador.telefone"
                                                        ) !== ""
                                                    ) {
                                                        methods.setValue(
                                                            "controlador.area",
                                                            ""
                                                        );
                                                        methods.setValue(
                                                            "controlador.email",
                                                            ""
                                                        );
                                                        methods.setValue(
                                                            "controlador.telefone",
                                                            ""
                                                        );
                                                    }

                                                    return onChange(
                                                        event.currentTarget.value.toUpperCase()
                                                    );
                                                }}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .controlador?.nome
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <Controller
                                        rules={{
                                            required: true,
                                            maxLength: 250,
                                        }}
                                        control={methods.control}
                                        name="controlador.area"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Control
                                                disabled={
                                                    methods.watch(
                                                        "controlador.nome"
                                                    ) === "CPTM"
                                                }
                                                type="text"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .controlador?.area
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <Controller
                                        rules={{
                                            required: true,
                                            maxLength: 250,
                                        }}
                                        control={methods.control}
                                        name="controlador.telefone"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Control
                                                disabled={
                                                    methods.watch(
                                                        "controlador.nome"
                                                    ) === "CPTM"
                                                }
                                                type="text"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .controlador?.telefone
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <Controller
                                        rules={{
                                            required: true,
                                            maxLength: 250,
                                        }}
                                        control={methods.control}
                                        name="controlador.email"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Control
                                                disabled={
                                                    methods.watch(
                                                        "controlador.nome"
                                                    ) === "CPTM"
                                                }
                                                type="text"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .controlador?.email
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg={1}>
                                    <p>
                                        {CaseIndexDictionary.encarregado.number}
                                    </p>
                                </Col>
                                <Col>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip className="text-muted">
                                                Pessoa indicada pelo controlador
                                                e operador para atuar como canal
                                                de comunicação entre o
                                                controlador, os titulares dos
                                                dados e a Autoridade Nacional de
                                                Proteção de Dados - ANPD (LGPD,
                                                art. 5º, VIII)
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Label>
                                            {
                                                CaseIndexDictionary.encarregado
                                                    .title
                                            }
                                        </Form.Label>
                                    </OverlayTrigger>
                                </Col>
                                <Col>
                                    <Controller
                                        control={methods.control}
                                        name="encarregado.nome"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
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
                                </Col>
                                <Col>
                                    <Controller
                                        control={methods.control}
                                        name="encarregado.area"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                    <p>
                                        {
                                            CaseIndexDictionary
                                                .extensaoEncarregado.number
                                        }
                                    </p>
                                </Col>
                                <Col>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip className="text-muted">
                                                Pessoa indicada pelo controlador
                                                e operador para atuar como canal
                                                de comunicação entre o
                                                controlador, os titulares dos
                                                dados e a Autoridade Nacional de
                                                Proteção de Dados - ANPD (LGPD,
                                                art. 5º, VIII)
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Label>
                                            {
                                                CaseIndexDictionary
                                                    .extensaoEncarregado.title
                                            }
                                        </Form.Label>
                                    </OverlayTrigger>
                                </Col>
                                <Col>
                                    <Controller
                                        control={methods.control}
                                        name="extensaoEncarregado.nome"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                    <p>
                                        {
                                            CaseIndexDictionary
                                                .areaTratamentoDados.number
                                        }
                                    </p>
                                </Col>
                                <Col>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip className="text-muted">
                                                Pessoa indicada pelo controlador
                                                e operador para atuar como canal
                                                de comunicação entre o
                                                controlador, os titulares dos
                                                dados e a Autoridade Nacional de
                                                Proteção de Dados - ANPD (LGPD,
                                                art. 5º, VIII)
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Label>
                                            {
                                                CaseIndexDictionary
                                                    .areaTratamentoDados.title
                                            }
                                        </Form.Label>
                                    </OverlayTrigger>
                                </Col>
                                <Col>
                                    <Controller
                                        control={methods.control}
                                        name="areaTratamentoDados.nome"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => {
                                            return props.new ||
                                                props.edit ||
                                                props.continue ||
                                                props.reprovado ? (
                                                <Form.Select
                                                    disabled={!isEditing}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                >
                                                    {user.groups.map((g) => (
                                                        <option
                                                            value={g.nome}
                                                            key={g.id}
                                                            onClick={() =>
                                                                changeGroup(g)
                                                            }
                                                        >
                                                            {g.nome}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            ) : (
                                                <Form.Control
                                                    disabled
                                                    type="text"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                    readOnly
                                                />
                                            );
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Controller
                                        control={methods.control}
                                        name="areaTratamentoDados.telefone"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                    <p>{CaseIndexDictionary.operador.number}</p>
                                </Col>
                                <Col className="d-flex justify-content-between">
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip className="text-muted">
                                                Pessoa natural ou jurídica, de
                                                direito público ou privado, que
                                                realiza o tratamento de dados
                                                pessoais em nome do controlador;
                                                (LGPD, art. 5º, VII)
                                            </Tooltip>
                                        }
                                    >
                                        <Form.Label>
                                            {CaseIndexDictionary.operador.title}
                                        </Form.Label>
                                    </OverlayTrigger>
                                    <ToggleButtonGroup
                                        type="radio"
                                        name="hasOperador"
                                        value={hasOperador}
                                        onChange={(val) => {
                                            toggleEnableOperador(val);
                                        }}
                                    >
                                        <ToggleButton
                                            id={`operador-toggle-1`}
                                            disabled={!isEditing}
                                            value="SIM"
                                        >
                                            SIM
                                        </ToggleButton>
                                        <ToggleButton
                                            id={`operador-toggle-2`}
                                            disabled={!isEditing}
                                            value="NÃO"
                                        >
                                            NÃO
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Col>
                                <Col>
                                    <Controller
                                        rules={
                                            hasOperador === "SIM"
                                                ? {
                                                      required: true,
                                                      maxLength: 250,
                                                  }
                                                : {}
                                        }
                                        control={methods.control}
                                        name="operador.nome"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Control
                                                disabled={
                                                    !isEditing ||
                                                    hasOperador === "NÃO"
                                                }
                                                type="text"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .operador?.nome
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <Controller
                                        rules={
                                            hasOperador === "SIM"
                                                ? {
                                                      required: true,
                                                      maxLength: 250,
                                                  }
                                                : {}
                                        }
                                        control={methods.control}
                                        name="operador.area"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Control
                                                disabled={
                                                    !isEditing ||
                                                    hasOperador === "NÃO"
                                                }
                                                type="text"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .operador?.area
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <Controller
                                        rules={
                                            hasOperador === "SIM"
                                                ? {
                                                      required: true,
                                                      maxLength: 250,
                                                  }
                                                : {}
                                        }
                                        control={methods.control}
                                        name="operador.telefone"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Control
                                                disabled={
                                                    !isEditing ||
                                                    hasOperador === "NÃO"
                                                }
                                                type="text"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .operador?.telefone
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <Controller
                                        rules={
                                            hasOperador === "SIM"
                                                ? {
                                                      required: true,
                                                      maxLength: 250,
                                                  }
                                                : {}
                                        }
                                        control={methods.control}
                                        name="operador.email"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Control
                                                disabled={
                                                    !isEditing ||
                                                    hasOperador === "NÃO"
                                                }
                                                type="text"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .operador?.email
                                                }
                                            />
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="2"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "2": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            3 - Fases do Ciclo de Vida do Tratamento de Dados
                            Pessoais
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
                            <Section3FormRow
                                disabled={!isEditing}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="3"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "3": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            4 - Fluxo de Tratamento de Dados Pessoais
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3">
                                <Col lg={1}>
                                    <p>
                                        {
                                            CaseIndexDictionary
                                                .descricaoFluxoTratamento.number
                                        }
                                    </p>
                                </Col>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                        <Tooltip className="text-muted">
                                            Descrever como (de que forma) os
                                            dados pessoais são coletados,
                                            retidos/armazenados, processados/
                                            usados e eliminados. Nessa seção,
                                            pode até ser colocado um desenho com
                                            um fluxo de dados. Abaixo, segue
                                            exemplo de descrição do fluxo de
                                            dados.
                                        </Tooltip>
                                    }
                                >
                                    <Form.Label as={Col}>
                                        {
                                            CaseIndexDictionary
                                                .descricaoFluxoTratamento.title
                                        }
                                    </Form.Label>
                                </OverlayTrigger>
                                <Col lg={8}>
                                    <Controller
                                        rules={{
                                            required: true,
                                            maxLength: 250,
                                        }}
                                        control={methods.control}
                                        name="descricaoFluxoTratamento"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
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
                                                    !!methods.formState.errors
                                                        .descricaoFluxoTratamento
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
                                            item={
                                                CaseIndexDictionary.descricaoFluxoTratamento
                                            }
                                        />
                                    </Row>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="4"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "4": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            5 - Escopo e Natureza dos Dados Pessoais
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3">
                                <Col lg={1}>
                                    <p>
                                        {
                                            CaseIndexDictionary
                                                .abrangenciaGeografica.number
                                        }
                                    </p>
                                </Col>
                                <Form.Label as={Col}>
                                    {
                                        CaseIndexDictionary
                                            .abrangenciaGeografica.title
                                    }
                                </Form.Label>
                                <Col lg={8}>
                                    <Controller
                                        rules={{ required: true }}
                                        control={methods.control}
                                        name="abrangenciaGeografica.value"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Select
                                                disabled={!isEditing}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .abrangenciaGeografica
                                                        ?.value
                                                }
                                                placeholder="Insira o nome do processo"
                                            >
                                                {Object.values(
                                                    tipoAbrangenciaGeografica
                                                ).map((tag) => (
                                                    <option
                                                        value={tag}
                                                        key={tag}
                                                    >
                                                        {tag}
                                                    </option>
                                                ))}
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
                                            item={
                                                CaseIndexDictionary.abrangenciaGeografica
                                            }
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg={1}>
                                    <p>
                                        {CaseIndexDictionary.fonteDados.number}
                                    </p>
                                </Col>
                                <Form.Label as={Col}>
                                    {CaseIndexDictionary.fonteDados.title}
                                </Form.Label>
                                <Col lg={8}>
                                    <Controller
                                        rules={{ required: true }}
                                        control={methods.control}
                                        name="fonteDados"
                                        render={({
                                            field: { onChange, value, ref },
                                        }) => (
                                            <Select
                                                ref={ref}
                                                options={systems.map((s) => ({
                                                    value: s,
                                                    label: s,
                                                }))}
                                                value={systems
                                                    .map((s) => ({
                                                        value: s,
                                                        label: s,
                                                    }))
                                                    .find(
                                                        (c) => c.value === value
                                                    )}
                                                onChange={(val) =>
                                                    onChange(val?.value)
                                                }
                                                isSearchable
                                                isDisabled={!isEditing}
                                                placeholder="Selecione a fonte de dados"
                                            />
                                        )}
                                    />
                                    {!!methods.formState.errors.fonteDados && (
                                        <div className="invalid-feedback-react-select">
                                            Esse campo é obrigatório
                                        </div>
                                    )}
                                </Col>
                                <Col lg={1}>
                                    <Row>
                                        <CreateCommentBox
                                            item={
                                                CaseIndexDictionary.fonteDados
                                            }
                                        />
                                    </Row>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="5"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "5": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            6 - Finalidade do Tratamento de Dados Pessoais
                        </Accordion.Header>
                        <Accordion.Body>
                            <Section6FormRow
                                tooltip={
                                    <p>
                                        As hipóteses de tratamento estão
                                        descritas nos arts. 7º e 11 da LGPD.
                                        <br />
                                        <b>
                                            Os órgãos e entidades da
                                            administração pública tem a
                                            prerrogativa de tratar os dados
                                            pessoais para o exercício de suas
                                            competências legais ou execução de
                                            políticas públicas sem a necessidade
                                            de obter consentimento do titular
                                            dos dados pessoais.
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
                                methods={methods}
                                rules={{ required: true }}
                            />
                            <Section6FormRow
                                tooltip={
                                    <p>
                                        Razão ou motivo pela qual se deseja
                                        tratar os dados pessoais. É
                                        importantíssimo estabelecer claramente a
                                        finalidade, import
                                        NewSection9QuantityRow from
                                        './new-form-import NewSection11FormRow
                                        fromimport LoadingModal from
                                        './modals/LoadingModal';
                                        './new-form-items/NewSection11FormRow';
                                        items/NewSection9QuantityRow'; pois é
                                        ela que justifica o tratamento de dados
                                        pessoais e fornece os elementos para
                                        informar o titular dos dados.
                                    </p>
                                }
                                disabled
                                name="finalidadeTratamento.descricaoFinalidade"
                                type="text"
                                invalid="Esse campo é obrigatório"
                                itemRef={
                                    CaseIndexDictionary.finalidadeTratamento
                                        .descricaoFinalidade
                                }
                                methods={methods}
                                rules={{ required: true }}
                            />
                            <Section6FormRow
                                tooltip={
                                    <p>
                                        Informar Lei, Decreto, normativo ou
                                        regulamento que respalda a finalidade do
                                        tratamento de dados pessoais realizado.
                                        <br />
                                        <br />
                                        <b>
                                            Exemplo fícitício de previsão legal
                                            considerando o Programa de
                                            Localização de Desaparecidos:
                                        </b>
                                        <br />• Decreto nº 8.956, de 25 de
                                        janeiro de 2218, institui o Programa de
                                        Localização de Desaparecidos.
                                    </p>
                                }
                                disabled={
                                    !isEditing ||
                                    methods.getValues().finalidadeTratamento
                                        .hipoteseTratamento.value !==
                                        hipotesesTratamento.obrigacaoLegal
                                }
                                name="finalidadeTratamento.previsaoLegal"
                                type="text"
                                invalid="Esse campo é obrigatório"
                                itemRef={
                                    CaseIndexDictionary.finalidadeTratamento
                                        .previsaoLegal
                                }
                                methods={methods}
                                rules={
                                    methods.getValues().finalidadeTratamento
                                        .hipoteseTratamento.value ===
                                    hipotesesTratamento.obrigacaoLegal
                                        ? { required: true }
                                        : { required: false }
                                }
                            />
                            <Section6FormRow
                                disabled={!isEditing}
                                name="finalidadeTratamento.resultadosTitular"
                                type="text"
                                invalid="Esse campo é obrigatório"
                                itemRef={
                                    CaseIndexDictionary.finalidadeTratamento
                                        .resultadosTitular
                                }
                                methods={methods}
                                rules={{ required: true }}
                            />
                            <Section6FormRow
                                disabled={!isEditing}
                                name="finalidadeTratamento.beneficiosEsperados"
                                type="text"
                                invalid="Esse campo é obrigatório"
                                itemRef={
                                    CaseIndexDictionary.finalidadeTratamento
                                        .beneficiosEsperados
                                }
                                methods={methods}
                                rules={{ required: true }}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="6"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "6": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            7 - Categoria de Dados Pessoais
                        </Accordion.Header>
                        <Accordion.Body>
                            <Accordion
                                defaultActiveKey={formIsValid ? "" : "0"}
                                activeKey={
                                    !formIsValid
                                        ? [
                                              "60",
                                              "61",
                                              "62",
                                              "63",
                                              "64",
                                              "65",
                                              "66",
                                              "67",
                                              "68",
                                              "69",
                                              "610",
                                              "611",
                                              "612",
                                              "613",
                                              "614",
                                          ]
                                        : undefined
                                }
                                alwaysOpen={!formIsValid}
                            >
                                <Accordion.Item eventKey="60">
                                    <Accordion.Header>
                                        7.1 - Dados de Identificação Pessoal
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a
                                                            href="http://intranet/adm/CADA/Paginas/default.aspx"
                                                            target={"_blank"}
                                                            rel="noreferrer"
                                                        >
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Nome, endereço
                                                    residencia, histórico de
                                                    endereços anteriores, número
                                                    de telefone fixo
                                                    residencial, número celular
                                                    pessoal, e-mail pessoal,
                                                    etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.identificacao.idPessoal"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .identificacao.idPessoal
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: CPF, RG, número do
                                                    passaporte, número da
                                                    carteira de motorista,
                                                    número da placa, número de
                                                    registro em conselho
                                                    profissional, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.identificacao.idGov"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .identificacao.idGov
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Endereços IP,
                                                    cookies, momentos de conexão
                                                    etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.identificacao.idEletronica"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .identificacao.idEletronica
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Informar se são tratados
                                                    dados: dados de comunicação
                                                    de torres de celulares (ex:
                                                    GSM), dados de GPS etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.identificacao.locEletronica"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .identificacao.locEletronica
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="61">
                                    <Accordion.Header>
                                        7.2 - Dados Financeiros
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Números de
                                                    identificação, números de
                                                    contas bancárias, números de
                                                    cartões de crédito ou
                                                    débito, códigos secretos.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.idFin"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.idFin
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Renda, posses,
                                                    investimentos, renda total,
                                                    renda profissional,
                                                    poupança, datas de início e
                                                    término dos investimentos,
                                                    receita de investimento,
                                                    dívidas sobre ativos.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.recursosFin"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.recursosFin
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Total de despesas,
                                                    aluguel, empréstimos,
                                                    hipotecas e outras formas de
                                                    crédito.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.dividasDespesas"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.dividasDespesas
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Avaliação do
                                                    rendimento e avaliação de
                                                    capacidade de pagamento.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.solvencia"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.solvencia
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Natureza do
                                                    empréstimo, valor
                                                    emprestado, saldo
                                                    remanescente, data de
                                                    início, período do
                                                    empréstimo, taxa de juros,
                                                    visão geral do pagamento,
                                                    detalhes sobre as garantias.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros
                                                    .emprestimosHipotecaCredito
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Benefícios,
                                                    assistência, bonificações,
                                                    subsídios, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.assistenciaFin"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.assistenciaFin
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Natureza da apólice
                                                    de seguro, detalhes sobre os
                                                    riscos cobertos, valores
                                                    segurados, período segurado,
                                                    data de rescisão, pagamentos
                                                    feitos, recebidos ou
                                                    perdidos, situação do
                                                    contrato, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.apoliceSeguro"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.apoliceSeguro
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Data efetiva do plano
                                                    de pensão, natureza do
                                                    plano, data de término do
                                                    plano, pagamentos recebidos
                                                    e efetuados, opções,
                                                    beneficiários, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.planoPensao"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.planoPensao
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Valores pagos e a
                                                    pagar pelo titular dos
                                                    dados, linhas de crédito
                                                    concedidas, avais, forma de
                                                    pagamento, visão geral do
                                                    pagamento, depósitos e
                                                    outras garantias, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.transacaoFin"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.transacaoFin
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Detalhes sobre
                                                    compensações reivindicadas,
                                                    valores pagos ou outros
                                                    tipos de compensação, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.compensacao"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.compensacao
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dado de atividades
                                                    profissionais executadas
                                                    pelo titular dos dados:
                                                    natureza da atividade,
                                                    natureza dos bens ou
                                                    serviços utilizados ou
                                                    entregues pela pessoa no
                                                    registro, relações
                                                    comerciais, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.atividadeProfissional"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros
                                                    .atividadeProfissional
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Detalhes sobre
                                                    acordos ou ajustes
                                                    comerciais; acordos sobre
                                                    representação ou acordos
                                                    legais, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.acordosAjustes"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros.acordosAjustes
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados de: Autorizações ou
                                                    consentimentos realizados
                                                    pelo titular de dados, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.financeiros.autorizacoesConsentimentos"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .financeiros
                                                    .autorizacoesConsentimentos
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="62">
                                    <Accordion.Header>
                                        7.3 - Características Pessoais
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Idade, sexo, data de
                                                    nascimento, local de
                                                    nascimento, estado civil,
                                                    nacionalidade.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.caracteristicas.detalhesPessoais"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .caracteristicas
                                                    .detalhesPessoais
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Situação militar,
                                                    patente militar, distinções
                                                    militares, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.caracteristicas.detalhesMilitares"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .caracteristicas
                                                    .detalhesMilitares
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Detalhes sobre o
                                                    visto, autorização de
                                                    trabalho, limitações de
                                                    residência ou movimentação,
                                                    condições especiais
                                                    relacionadas à autorização
                                                    de residência, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.caracteristicas.situacaoImigracao"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .caracteristicas
                                                    .situacaoImigracao
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Dados de descrição física
                                                    são informações físicas de
                                                    uma pessoa com possibilidade
                                                    de serem visivelmente
                                                    indetificadas. Descrever se
                                                    são tratados: Altura, peso,
                                                    cor do cabelo, cor dos
                                                    olhos, características
                                                    distintivas, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.caracteristicas.descricaoFisica"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .caracteristicas
                                                    .descricaoFisica
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="63">
                                    <Accordion.Header>
                                        7.4 - Hábitos Pessoais
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Uso de tabaco, uso de
                                                    álcool , hábito alimentar,
                                                    dieta alimentar etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.habitos.habitosPessoais"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .habitos.habitosPessoais
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Informações sobre o
                                                    uso de bens ou serviços,
                                                    comportamento dos titulares
                                                    dos dados, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.habitos.estiloVida"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .habitos.estiloVida
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: sobre antigas
                                                    residências e deslocamentos,
                                                    visto de viagem,
                                                    autorizações de trabalho,
                                                    etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.habitos.viagensDeslocamento"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .habitos.viagensDeslocamento
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Amigos, parceiros de
                                                    negócios, relacionamentos
                                                    com pessoas que não sejam
                                                    familiares próximos; etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.habitos.contatosSociais"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .habitos.contatosSociais
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Terra, propriedade ou
                                                    outros bens.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.habitos.posses"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .habitos.posses
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Informações sobre um
                                                    acidente, incidente ou
                                                    denúncia na qual o titular
                                                    dos dados está envolvido, a
                                                    natureza dos danos ou
                                                    ferimentos, pessoas
                                                    envolvidas, testemunhas,
                                                    etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.habitos.denunciasIncAcidentes"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .habitos
                                                    .denunciasIncAcidentes
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Distinções civis,
                                                    administrativas ou
                                                    militares.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.habitos.distincoes"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .habitos.distincoes
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: que definem o
                                                    comportamento de uso de
                                                    mídias e meios de
                                                    comunicação.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.habitos.usoMidia"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .habitos.usoMidia
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="64">
                                    <Accordion.Header>
                                        7.5 - Características Psicológicas
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre personalidade ou
                                                    caráter.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.caracteristicasPsicologicas.descricaoPsi"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .caracteristicasPsicologicas
                                                    .descricaoPsi
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="65">
                                    <Accordion.Header>
                                        7.6 - Composição Familiar
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados: Nome do cônjuge ou
                                                    companheiro(a), nome de
                                                    solteira do cônjuge ou
                                                    companheira, data do
                                                    casamento, data do contrato
                                                    de coabitação, número de
                                                    filhos, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.composicaoFamiliar.casamentoCoabitacao"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .composicaoFamiliar
                                                    .casamentoCoabitacao
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre casamentos ou
                                                    parcerias anteriores,
                                                    divórcios, separações, nomes
                                                    de parceiros anteriores.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.composicaoFamiliar.historicoConjugal"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .composicaoFamiliar
                                                    .historicoConjugal
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre Detalhes de
                                                    outros familiares ou membros
                                                    da família do titular de
                                                    dados.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.composicaoFamiliar.membrosFamilia"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .composicaoFamiliar
                                                    .membrosFamilia
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="66">
                                    <Accordion.Header>
                                        7.7 - Interesses de lazer
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre hobbies,
                                                    esportes, outros interesses.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.interessesLazer.atividadesInteressesLaz"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .interessesLazer
                                                    .atividadesInteressesLaz
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="67">
                                    <Accordion.Header>
                                        7.8 - Associações
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre participação em
                                                    organizações de caridade ou
                                                    benevolentes, clubes,
                                                    parcerias, organizações,
                                                    grupos, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.associacoes.outrasAssNaoSensiveis"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .associacoes
                                                    .outrasAssNaoSensiveis
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="68">
                                    <Accordion.Header>
                                        7.9 - Processo
                                        Judicial/Administrativo/Criminal
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre suspeitas de
                                                    violações, conexões
                                                    conspiratórias com
                                                    criminosos conhecidos.
                                                    Inquéritos ou ações
                                                    judiciais (civis ou
                                                    criminais) empreendidas por
                                                    ou contra o titular dos
                                                    dados, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.processoJudAdmCrim.suspeitas"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .processoJudAdmCrim
                                                    .suspeitas
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre condenações e
                                                    sentenças, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.processoJudAdmCrim.condenacoesSentencas"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .processoJudAdmCrim
                                                    .condenacoesSentencas
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre tutela, guarda
                                                    temporária ou definitiva,
                                                    interdição, adoção, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.processoJudAdmCrim.acoesJud"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .processoJudAdmCrim.acoesJud
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre multas, processo
                                                    disciplinar, advertências,
                                                    bem como qualquer outro tipo
                                                    de penalidade ou sanção
                                                    administrativa prevista em
                                                    leis, normas e regulamentos.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.processoJudAdmCrim.penalidadesAdm"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .processoJudAdmCrim
                                                    .penalidadesAdm
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="69">
                                    <Accordion.Header>
                                        7.10 - Hábitos de Consumo
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre bens e serviços
                                                    vendidos, alugados ou
                                                    emprestados ao titular dos
                                                    dados.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.habitosConsumo.dadosBensServicos"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .habitosConsumo
                                                    .dadosBensServicos
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="610">
                                    <Accordion.Header>
                                        7.11 - Dados Residenciais
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre natureza da
                                                    residência, propriedade
                                                    própria ou alugada, duração
                                                    da residência nesse
                                                    endereço, aluguel, custos,
                                                    classificação da residência,
                                                    detalhes sobre a avaliação,
                                                    nomes das pessoas que
                                                    possuem as chaves.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.residenciais.dadosResidencia"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .residenciais
                                                    .dadosResidencia
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="611">
                                    <Accordion.Header>
                                        7.12 - Educação e Treinamento
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre diplomas,
                                                    certificados obtidos,
                                                    resultados de exames,
                                                    avaliação do progresso dos
                                                    estudos, histórico escolar,
                                                    grau de formação, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.educacaoTreinamento.academicosEscolares"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .educacaoTreinamento
                                                    .academicosEscolares
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre taxas de
                                                    inscrição e custos pagos,
                                                    financiamento, formas de
                                                    pagamento, registros de
                                                    pagamento, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.educacaoTreinamento.registroFinanceiro"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .educacaoTreinamento
                                                    .registroFinanceiro
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre certificações
                                                    profissionais, interesses
                                                    profissionais, interesses
                                                    acadêmicos, interesses de
                                                    pesquisam experiência de
                                                    ensino, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.educacaoTreinamento.qualificacaoExperienciaProf"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .educacaoTreinamento
                                                    .qualificacaoExperienciaProf
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="612">
                                    <Accordion.Header>
                                        7.13 - Profissão e emprego
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre empregador,
                                                    descrição do cargo e função,
                                                    antiguidade, data de
                                                    recrutamento, local de
                                                    trabalho, especialização ou
                                                    tipo de empresa, modos e
                                                    condições de trabalho,
                                                    cargos anteriores e
                                                    experiência anterior de
                                                    trabalho no mesmo
                                                    empregador, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.profissaoEmprego.empregoAtual"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .profissaoEmprego
                                                    .empregoAtual
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre data de
                                                    recrutamento, método de
                                                    recrutamento, fonte de
                                                    recrutamento, referências,
                                                    detalhes relacionados com o
                                                    período de estágio, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.profissaoEmprego.recrutamento"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .profissaoEmprego
                                                    .recrutamento
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre data de
                                                    rescisão, motivo, período de
                                                    notificação, condições de
                                                    rescisão, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.profissaoEmprego.rescisao"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .profissaoEmprego.rescisao
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre emprego anterior
                                                    e empregadores, períodos sem
                                                    emprego, serviço militar,
                                                    etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.profissaoEmprego.carreira"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .profissaoEmprego.carreira
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre registos de
                                                    absentismo, motivos de
                                                    ausência, medidas
                                                    disciplinares, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.profissaoEmprego.absenteismoDisciplina"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .profissaoEmprego
                                                    .absenteismoDisciplina
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    dados sobre avaliação de
                                                    desempenho ou qualquer outro
                                                    tipo de análise de
                                                    qualificação ou habilidades
                                                    profissionais, etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.profissaoEmprego.avaliacaoDesempenho"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .profissaoEmprego
                                                    .avaliacaoDesempenho
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="613">
                                    <Accordion.Header>
                                        7.14 - Registros/gravações de vídeo,
                                        imagem e voz
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratados
                                                    arquivos de vídeos, fotos
                                                    digitais, fitas de vídeo,
                                                    etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.regVideoImgVoz.videoImagem"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .regVideoImgVoz.videoImagem
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratadas
                                                    imagens e/ou vídeos de
                                                    câmeras de
                                                    segurança/vigilância (ex:
                                                    CFTV), etc.
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.regVideoImgVoz.imagemVigilancia"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .regVideoImgVoz
                                                    .imagemVigilancia
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratadas
                                                    fitas e arquivos digitais de
                                                    voz, bem como outros
                                                    registros de gravações de
                                                    voz , etc
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.regVideoImgVoz.voz"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .regVideoImgVoz.voz
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="614">
                                    <Accordion.Header>
                                        7.15 - Outros
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label
                                                as={Col}
                                                className="d-grid justify-content-center"
                                            >
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <OverlayTrigger
                                                placement="top"
                                                trigger={"click"}
                                                overlay={
                                                    <Tooltip className="text-muted">
                                                        Para maiores informações
                                                        visite o{" "}
                                                        <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                            site da CADA
                                                        </a>
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Label as={Col}>
                                                    Tempo de Retenção dos Dados{" "}
                                                    <AiFillQuestionCircle />
                                                </Form.Label>
                                            </OverlayTrigger>
                                            <Form.Label as={Col}>
                                                Fonte Retenção
                                            </Form.Label>
                                            <Form.Label as={Col} lg={2}>
                                                Local de Armazenamento
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section7FormRow
                                            className="mb-3 pt-2 pb-2 bg-primary bg-opacity-10"
                                            tooltip={
                                                <p>
                                                    Descrever se são tratadas
                                                    fitas e arquivos digitais de
                                                    voz, bem como outros
                                                    registros de gravações de
                                                    voz , etc
                                                </p>
                                            }
                                            disabled={!isEditing}
                                            name="categoriaDadosPessoais.outros.outrosItems"
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriaDadosPessoais
                                                    .outros.outrosItems
                                            }
                                            systems={systems}
                                            methods={methods}
                                            radioCheckedHandler={
                                                checkAllRadiosHandler
                                            }
                                            isNew={props.new || false}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="7"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "7": true };
                            })
                        }
                    >
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
                                <Form.Label as={Col}>Descrição</Form.Label>
                                <OverlayTrigger
                                    placement="top"
                                    trigger={"click"}
                                    overlay={
                                        <Tooltip className="text-muted">
                                            Para maiores informações visite o{" "}
                                            <a href="http://intranet/adm/CADA/Paginas/default.aspx">
                                                site da CADA
                                            </a>
                                        </Tooltip>
                                    }
                                >
                                    <Form.Label as={Col}>
                                        Tempo de Retenção dos Dados{" "}
                                        <AiFillQuestionCircle />
                                    </Form.Label>
                                </OverlayTrigger>
                                <Form.Label as={Col}>Fonte Retenção</Form.Label>
                                <Form.Label as={Col} lg={2}>
                                    Local de Armazenamento
                                </Form.Label>
                                <Form.Label as={Col} lg={1}></Form.Label>
                            </Row>
                            <Section7FormRow
                                className="mb-3 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.origemRacialEtnica"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis
                                        .origemRacialEtnica
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                            <Section7FormRow
                                className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.conviccaoReligiosa"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis
                                        .conviccaoReligiosa
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                            <Section7FormRow
                                className="mb-3 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.opiniaoPolitica"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis
                                        .opiniaoPolitica
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                            <Section7FormRow
                                className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.filiacaoSindicato"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis
                                        .filiacaoSindicato
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                            <Section7FormRow
                                className="mb-3 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.filiacaoOrgReligiosa"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis
                                        .filiacaoOrgReligiosa
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                            <Section7FormRow
                                className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.filiacaoCrencaFilosofica"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis
                                        .filiacaoCrencaFilosofica
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                            <Section7FormRow
                                className="mb-3 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.filiacaoPreferenciaPolitica"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis
                                        .filiacaoPreferenciaPolitica
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                            <Section7FormRow
                                className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.saudeVidaSexual"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis
                                        .saudeVidaSexual
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                            <Section7FormRow
                                className="mb-3 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.geneticos"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis.geneticos
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                            <Section7FormRow
                                className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                                disabled={!isEditing}
                                name="catDadosPessoaisSensiveis.biometricos"
                                itemRef={
                                    CaseIndexDictionary
                                        .catDadosPessoaisSensiveis.biometricos
                                }
                                systems={systems}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="8"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "8": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            9 - Frequência e totalização das categorias de dados
                            pessoais tratados
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3">
                                <Col lg={1}>
                                    <p>
                                        {
                                            CaseIndexDictionary
                                                .frequenciaTratamento.number
                                        }
                                    </p>
                                </Col>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                        <Tooltip className="text-muted">
                                            Descrever em que frequência os dados
                                            são tratados. Isso representa a
                                            disponibilidade e horário de
                                            funcionamento do sistema
                                            automatizado ou processo manual que
                                            trata os dados pessoais. Abaixo
                                            segue exemplo fictício de descrição
                                            do Sistema Nacional de Desaparecidos
                                            -SND a ser preenchido no inventário.
                                            <br />
                                            <br />
                                            <b>Exemplo:</b> O SND está
                                            disponível no regime 24x7 (24 horas
                                            por dia nos 7 dias da semana) para
                                            comunicação (coleta) dos dados do
                                            desaparecimentos e as demais fases e
                                            operações de tratamento são
                                            realizadas no horário comercial em
                                            dias úteis.
                                        </Tooltip>
                                    }
                                >
                                    <Form.Label as={Col}>
                                        {
                                            CaseIndexDictionary
                                                .frequenciaTratamento.title
                                        }
                                    </Form.Label>
                                </OverlayTrigger>
                                <Col lg={8}>
                                    <Controller
                                        rules={{ required: true }}
                                        control={methods.control}
                                        name="frequenciaTratamento.value"
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <Form.Select
                                                disabled={!isEditing}
                                                value={value as string}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                ref={ref}
                                                isInvalid={
                                                    !!methods.formState.errors
                                                        .frequenciaTratamento
                                                        ?.value
                                                }
                                            >
                                                {Object.values(
                                                    tipoFrequenciaTratamento
                                                ).map((tft) => (
                                                    <option
                                                        value={tft}
                                                        key={tft}
                                                    >
                                                        {tft}
                                                    </option>
                                                ))}
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
                                            item={
                                                CaseIndexDictionary.frequenciaTratamento
                                            }
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <Section9QuantityRow
                                isEditing={isEditing}
                                methods={methods}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="9"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "9": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            10 - Categorias dos titulares de dados pessoais
                        </Accordion.Header>
                        <Accordion.Body>
                            <Accordion
                                defaultActiveKey={formIsValid ? "" : "0"}
                                alwaysOpen={!formIsValid}
                            >
                                <Accordion.Item eventKey="90">
                                    <Accordion.Header>
                                        10.1 - Categorias gerais
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label as={Col}>
                                                Tipo de Categoria
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Row>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label as={Col}></Form.Label>
                                            <Col lg={1}>
                                                <Row>
                                                    <CreateCommentBox
                                                        item={
                                                            CaseIndexDictionary
                                                                .categoriasTitulares
                                                                .categorias
                                                        }
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                        <React.Fragment>
                                            {categoriasTitularesCategorias.fields &&
                                            categoriasTitularesCategorias.fields
                                                .length > 0 ? (
                                                categoriasTitularesCategorias.fields.map(
                                                    (field, index) => (
                                                        <React.Fragment
                                                            key={field.id}
                                                        >
                                                            <Section10FormRow
                                                                className={`mb-3 pt-2 pb-2 ${
                                                                    index %
                                                                        2 ===
                                                                    0
                                                                        ? "bg-primary bg-opacity-10"
                                                                        : ""
                                                                }`}
                                                                label={`Categoria`}
                                                                disabled={
                                                                    !isEditing
                                                                }
                                                                name={
                                                                    `categoriasTitulares.categorias[${index}]` as const
                                                                }
                                                                full={true}
                                                                itemRef={
                                                                    CaseIndexDictionary
                                                                        .categoriasTitulares
                                                                        .categorias
                                                                }
                                                                methods={
                                                                    methods
                                                                }
                                                            />
                                                            <Row className="justify-content-center">
                                                                <ButtonGroup
                                                                    as={Col}
                                                                    className="mt-1 mb-3"
                                                                    lg={2}
                                                                >
                                                                    <Button
                                                                        disabled={
                                                                            !isEditing
                                                                        }
                                                                        variant="primary"
                                                                        onClick={() =>
                                                                            categoriasTitularesCategorias.append(
                                                                                emptyItemCategoriaTitulares()
                                                                            )
                                                                        }
                                                                    >
                                                                        +
                                                                    </Button>
                                                                    <Button
                                                                        disabled={
                                                                            !isEditing
                                                                        }
                                                                        variant="danger"
                                                                        onClick={() =>
                                                                            categoriasTitularesCategorias.remove(
                                                                                index
                                                                            )
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
                                                            disabled={
                                                                !isEditing
                                                            }
                                                            variant="primary"
                                                            onClick={() =>
                                                                categoriasTitularesCategorias.append(
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
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="91">
                                    <Accordion.Header>
                                        10.3 - Categorias que envolvam crianças
                                        e adolescentes
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label as={Col}>
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section10FormRow
                                            className={
                                                "mb-3 pt-2 pb-2 bg-primary bg-opacity-10"
                                            }
                                            label={
                                                "Categoria Crianças e Adolescentes"
                                            }
                                            disabled={!isEditing}
                                            name={
                                                "categoriasTitulares.criancasAdolescentes"
                                            }
                                            full={false}
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriasTitulares
                                                    .criancasAdolescentes
                                            }
                                            methods={methods}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="92">
                                    <Accordion.Header>
                                        10.4 - Categorias que envolvam outros
                                        grupos vulneráveis
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                            <Form.Label as={Col}></Form.Label>
                                            <Form.Label as={Col}>
                                                Trata?
                                            </Form.Label>
                                            <Form.Label as={Col}>
                                                Descrição
                                            </Form.Label>
                                            <Form.Label
                                                as={Col}
                                                lg={1}
                                            ></Form.Label>
                                        </Row>
                                        <Section10FormRow
                                            className={
                                                "mb-3 pt-2 pb-2 $ bg-primary bg-opacity-10"
                                            }
                                            label={
                                                "Categoria Outros Grupos Vulneráveis"
                                            }
                                            disabled={!isEditing}
                                            name={
                                                "categoriasTitulares.outrosGruposVulneraveis"
                                            }
                                            full={false}
                                            tooltip={
                                                "Idoso, pessoa em situação de rua, pessoa com deficiência, entre outros"
                                            }
                                            itemRef={
                                                CaseIndexDictionary
                                                    .categoriasTitulares
                                                    .outrosGruposVulneraveis
                                            }
                                            methods={methods}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="10"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "10": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            11 - Compartilhamento de Dados Pessoais
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                <Form.Label
                                    as={Col}
                                    className="d-grid justify-content-center"
                                >
                                    Compartilha?
                                </Form.Label>
                                <Form.Label as={Col}>
                                    Nome da Instituição Receptora
                                </Form.Label>
                                <Form.Label as={Col}>
                                    Público/Privado
                                </Form.Label>
                                <Form.Label as={Col}>
                                    Nível de Compartilhamento
                                </Form.Label>
                                <Form.Label as={Col}>
                                    Descrição do Nível
                                </Form.Label>
                                <Form.Label as={Col}>
                                    Finalidade do Compartilhamento
                                </Form.Label>
                                <Form.Label as={Col} lg={1}></Form.Label>
                            </Row>
                            <Section11FormRow
                                disabled={!isEditing}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="11"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "11": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            12 - Medidas de Segurança/Privacidade
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
                                <Form.Label as={Col} lg={1}></Form.Label>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col></Col>
                                <Col></Col>
                                <Col lg={1}>
                                    <Row>
                                        <CreateCommentBox
                                            item={
                                                CaseIndexDictionary.medidasSegurancaPrivacidade
                                            }
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <React.Fragment>
                                {medidasSegurancaPrivacidade.fields &&
                                medidasSegurancaPrivacidade.fields.length >
                                    0 ? (
                                    medidasSegurancaPrivacidade.fields.map(
                                        (field, index) => (
                                            <React.Fragment key={field.id}>
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
                                                    methods={methods}
                                                />
                                                <Row className="justify-content-center">
                                                    <ButtonGroup
                                                        as={Col}
                                                        className="mt-1 mb-3"
                                                        lg={2}
                                                    >
                                                        <Button
                                                            disabled={
                                                                !isEditing
                                                            }
                                                            variant="primary"
                                                            onClick={() =>
                                                                medidasSegurancaPrivacidade.append(
                                                                    emptyItemMedidaSegurancaPrivacidade()
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </Button>
                                                        <Button
                                                            disabled={
                                                                !isEditing
                                                            }
                                                            variant="danger"
                                                            onClick={() =>
                                                                medidasSegurancaPrivacidade.remove(
                                                                    index
                                                                )
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
                                                disabled={!isEditing}
                                                variant="primary"
                                                onClick={() =>
                                                    medidasSegurancaPrivacidade.append(
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
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="12"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "12": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            13 - Transferência Internacional de Dados Pessoais
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                <Form.Label
                                    as={Col}
                                    className="d-grid justify-content-center"
                                >
                                    Transfere?
                                </Form.Label>
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
                                <Col lg={1}></Col>
                            </Row>
                            <Section13FormRow
                                countries={countries}
                                disabled={!isEditing}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="13"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "13": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            14 - Contrato(s) de serviços e/ou soluções de TI que
                            trata(m) dados pessoais do serviço/processo de
                            negócio
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                <Form.Label
                                    as={Col}
                                    className="d-grid justify-content-center"
                                >
                                    Existe?
                                </Form.Label>
                                <Form.Label as={Col}>
                                    Número do Contrato
                                </Form.Label>
                                <Form.Label as={Col}>
                                    Nº Processo Contratação
                                </Form.Label>
                                <Form.Label as={Col}>
                                    Objeto do Contrato
                                </Form.Label>
                                <Form.Label as={Col}>
                                    E-mail do Gestor do Contrato
                                </Form.Label>
                                <Col lg={1}></Col>
                            </Row>
                            <Section14FormRow
                                disabled={!isEditing}
                                methods={methods}
                                radioCheckedHandler={checkAllRadiosHandler}
                                isNew={props.new || false}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="14"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "14": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            15 - Risco de Privacidade
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                <Form.Label as={Col}></Form.Label>
                                <Form.Label as={Col}>
                                    Tipo de Risco de Privacidade
                                </Form.Label>
                                <Form.Label as={Col}>Observações</Form.Label>
                                <Col lg={1}></Col>
                            </Row>
                            <Row className="mb-3 pt-2 pb-2">
                                <Form.Label as={Col}></Form.Label>
                                <Form.Label as={Col}></Form.Label>
                                <Form.Label as={Col}></Form.Label>
                                <Col lg={1}>
                                    <Row>
                                        <CreateCommentBox
                                            item={
                                                CaseIndexDictionary.riscosPrivacidade
                                            }
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <React.Fragment>
                                {riscosPrivacidade.fields &&
                                riscosPrivacidade.fields.length > 0 ? (
                                    riscosPrivacidade.fields.map(
                                        (field, index) => (
                                            <React.Fragment key={field.id}>
                                                <Section15FormRow
                                                    className={`mb-3 pt-2 pb-2 ${
                                                        index % 2 === 0
                                                            ? "bg-primary bg-opacity-10"
                                                            : ""
                                                    }`}
                                                    label={`Risco ${index + 1}`}
                                                    disabled={!isEditing}
                                                    name={`riscosPrivacidade[${index}]`}
                                                    methods={methods}
                                                />
                                                <Row className="justify-content-center">
                                                    <ButtonGroup
                                                        as={Col}
                                                        className="mt-1 mb-3"
                                                        lg={2}
                                                    >
                                                        <Button
                                                            disabled={
                                                                !isEditing
                                                            }
                                                            variant="primary"
                                                            onClick={() =>
                                                                riscosPrivacidade.append(
                                                                    emptyItemRiscoPrivacidade()
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </Button>
                                                        <Button
                                                            disabled={
                                                                !isEditing
                                                            }
                                                            variant="danger"
                                                            onClick={() =>
                                                                riscosPrivacidade.remove(
                                                                    index
                                                                )
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
                                                disabled={!isEditing}
                                                variant="primary"
                                                onClick={() =>
                                                    riscosPrivacidade.append(
                                                        emptyItemRiscoPrivacidade()
                                                    )
                                                }
                                            >
                                                +
                                            </Button>
                                        </ButtonGroup>
                                    </Row>
                                )}
                            </React.Fragment>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        eventKey="15"
                        onClick={() =>
                            setIsFormAllTouched((prevState) => {
                                return { ...prevState, "15": true };
                            })
                        }
                    >
                        <Accordion.Header>
                            16 - Observações sobre o Processo
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                                <Form.Label as={Col}>Observação</Form.Label>
                                <Col lg={1}></Col>
                            </Row>
                            <Row className="mb-3 pt-2 pb-2">
                                <Form.Label as={Col}></Form.Label>
                                <Col lg={1}>
                                    <Row>
                                        <CreateCommentBox
                                            item={
                                                CaseIndexDictionary.observacoesProcesso
                                            }
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <React.Fragment>
                                {observacoesProcesso.fields &&
                                observacoesProcesso.fields.length > 0 ? (
                                    observacoesProcesso.fields.map(
                                        (field, index) => (
                                            <React.Fragment key={field.id}>
                                                <Section16FormRow
                                                    className={`mb-3 pt-2 pb-2 ${
                                                        index % 2 === 0
                                                            ? "bg-primary bg-opacity-10"
                                                            : ""
                                                    }`}
                                                    label={`Observação ${
                                                        index + 1
                                                    }`}
                                                    disabled={!isEditing}
                                                    name={`observacoesProcesso[${index}]`}
                                                    methods={methods}
                                                />
                                                <Row className="justify-content-center">
                                                    <ButtonGroup
                                                        as={Col}
                                                        className="mt-1 mb-3"
                                                        lg={2}
                                                    >
                                                        <Button
                                                            disabled={
                                                                !isEditing
                                                            }
                                                            variant="primary"
                                                            onClick={() =>
                                                                observacoesProcesso.append(
                                                                    emptyItemObservacoesProcesso()
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </Button>
                                                        <Button
                                                            disabled={
                                                                !isEditing
                                                            }
                                                            variant="danger"
                                                            onClick={() =>
                                                                observacoesProcesso.remove(
                                                                    index
                                                                )
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
                                                disabled={!isEditing}
                                                variant="primary"
                                                onClick={() =>
                                                    observacoesProcesso.append(
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
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                {props.new && (
                    <Stack direction="horizontal" className="mt-3" gap={3}>
                        <Button variant="light" onClick={() => onCancel()}>
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            disabled={!methods.formState.isDirty}
                            variant="secondary"
                            className="ms-auto"
                            onClick={() =>
                                props.onSaveProgressSubmit!(methods.getValues())
                            }
                        >
                            Salvar Alterações
                        </Button>
                        <Button
                            type="button"
                            disabled={!methods.formState.isDirty}
                            variant="warning"
                            onClick={() =>
                                handleSendToApprovalClick(methods.getValues())
                            }
                        >
                            Encaminhar para aprovação
                        </Button>
                    </Stack>
                )}
                {props.approve && (
                    <Stack direction="horizontal" className="mt-3" gap={0}>
                        <Button variant="light" onClick={() => onCancel()}>
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            className="ms-auto"
                            onClick={() =>
                                props.onReproveSubmit!(methods.getValues())
                            }
                        >
                            Reprovar
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() =>
                                props.onApproveSubmit!(methods.getValues())
                            }
                        >
                            Aprovar
                        </Button>
                    </Stack>
                )}
                {props.edit && !isEditing && (
                    <Stack direction="horizontal" className="mt-3" gap={0}>
                        <Button variant="light" onClick={() => onCancel()}>
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            className="ms-auto"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Remover
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => onStartEditing()}
                        >
                            Editar
                        </Button>
                    </Stack>
                )}
                {props.edit && isEditing && (
                    <Stack direction="horizontal" className="mt-3" gap={3}>
                        <Button variant="light" onClick={() => onCancel()}>
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className="ms-auto"
                            onClick={() =>
                                props.onSaveProgressSubmit!(methods.getValues())
                            }
                        >
                            Salvar Alterações
                        </Button>
                        <Button
                            type="button"
                            disabled={!methods.formState.isDirty}
                            variant="warning"
                            onClick={() =>
                                handleSendToApprovalClick(methods.getValues())
                            }
                        >
                            Re-Encaminhar para aprovação
                        </Button>
                    </Stack>
                )}
                {props.continue && !isEditing && (
                    <Stack direction="horizontal" className="mt-3" gap={0}>
                        <Button variant="light" onClick={() => onCancel()}>
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            className="ms-auto"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Remover
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => onStartEditing()}
                        >
                            Editar
                        </Button>
                    </Stack>
                )}
                {props.continue && isEditing && (
                    <Stack direction="horizontal" className="mt-3" gap={3}>
                        <Button variant="light" onClick={() => onCancel()}>
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className="ms-auto"
                            onClick={() =>
                                props.onSaveProgressSubmit!(methods.getValues())
                            }
                        >
                            Salvar Alterações
                        </Button>
                        <Button
                            type="button"
                            disabled={_.isEmpty(
                                methods.formState.touchedFields
                            )}
                            variant="warning"
                            onClick={() =>
                                handleSendToApprovalClick(methods.getValues())
                            }
                        >
                            Encaminhar para aprovação
                        </Button>
                    </Stack>
                )}
                {props.check && (
                    <Stack direction="horizontal" className="mt-3" gap={0}>
                        <Button
                            variant="primary"
                            className="ms-auto"
                            onClick={() => onCancel()}
                        >
                            Voltar
                        </Button>
                    </Stack>
                )}
            </Form>
        </React.Fragment>
    );
};

export default CaseForm;