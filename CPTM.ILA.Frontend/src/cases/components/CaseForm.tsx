import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, getIn, FieldArray } from "formik";
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

import {
  emptyItemCategoriaDadosPessoais,
  emptyItemCategoriaTitulares,
  emptyItemCompatilhamentoDados,
  emptyItemContratoTI,
  emptyItemMedidaSegurancaPrivacidade,
  emptyItemObservacoesProcesso,
  emptyItemRiscoPrivacidade,
  emptyItemTransferenciaInternacional,
  BaseFullCaseObject,
  verbosTratamento,
} from "../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TagPicker from "../../shared/components/UI/TagPicker";
import Section6FormRow from "./form-items/Section6FormRow";
import Section7FormRow from "./form-items/Section7FormRow";
import Section10FormRow from "./form-items/Section10FormRow";
import Section11FormRow from "./form-items/Section11FormRow";
import Section12FormRow from "./form-items/Section12FormRow";
import Section13FormRow from "./form-items/Section13FormRow";
import Section14FormRow from "./form-items/Section14FormRow";
import Section15FormRow from "./form-items/Section15FormRow";
import Section16FormRow from "./form-items/Section16FormRow";

type onSubmitFn = (item: BaseFullCaseObject) => void;

// const schema = yup.object().shape({
//   nome: yup.string().required(),
//   id: yup.number().required(),
//   ref: yup.string().required(),
//   dataCriacao: yup.date().required(),
//   dataAtualizacao: yup.date().required(),
//   controlador: yup.object().shape({
//     nome: yup.string().required(),
//     area: yup.string().optional(),
//     telefone: yup.string().optional(),
//     email: yup.string().email().optional(),
//   }),
//   encarregado: yup.object().shape({
//     nome: yup.string().required(),
//     area: yup.string().optional(),
//     telefone: yup.string().optional(),
//     email: yup.string().email().optional(),
//   }),
//   extensaoEncarregado: yup.object().shape({
//     nome: yup.string().required(),
//     area: yup.string().required(),
//     telefone: yup.string().required(),
//     email: yup.string().email().required(),
//   }),
//   areaTratamentoDados: yup.object().shape({
//     nome: yup.string().optional(),
//     area: yup.string().optional(),
//     telefone: yup.string().optional(),
//     email: yup.string().email().optional(),
//   }),
//   operador: yup.object().shape({
//     nome: yup.string().required(),
//     area: yup.string().optional(),
//     telefone: yup.string().optional(),
//     email: yup.string().email().optional(),
//   }),
//   fasesCicloTratamento: yup.object({
//     coleta: yup.boolean(),
//     retencao: yup.boolean(),
//     processamento: yup.boolean(),
//     compartilhamento: yup.boolean(),
//     eliminacao: yup.boolean(),
//     verbos: yup.array().optional(),
//   }),
//   descricaoFluxoTratamento: yup.string().required(),
//   abrangenciaGeografica: yup.string().required(),
//   fonteDados: yup.string().required(),
//   finalidadeTratamento: yup.object().shape({
//     hipoteseTratamento: yup.string().required(),
//     descricaoFinalidade: yup.string().required(),
//     previsaoLegal: yup.string().required(),
//     resultadosTitular: yup.string().required(),
//     beneficiosEsperados: yup.string().required(),
//   }),
//   categoriaDadosPessoais: yup.object().shape({
//     identificacao: yup.object().shape({
//       idPessoal: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       idGov: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       idEletronica: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       locEletronica: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     financeiros: yup.object().shape({
//       idFin: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       recursosFin: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       dividasDespesas: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       solvencia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       emprestimosHipotecaCredito: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       assistenciaFin: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       apoliceSeguro: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       planoPensao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       transacaoFin: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       compensacao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       atividadeProfissional: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       acordosAjustes: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       autorizacoesConsentimentos: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     caracteristicas: yup.object().shape({
//       detalhesPessoais: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       detalhesMilitares: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       situacaoImigracao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       descricaoFisica: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     habitos: yup.object().shape({
//       habitos: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       estiloVida: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       viagensDeslocamento: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       contatosSociais: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       posses: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       denunciasIncidentesAcidentes: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       distincoes: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       usoMidia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     caracteristicasPsicologicas: yup.object().shape({
//       descricaoPsi: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     composicaoFamiliar: yup.object().shape({
//       casamentoCoabitacao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       historicoConjugal: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       membrosFamilia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     interessesLazer: yup.object().shape({
//       atividadesInteressesLaz: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     associacoes: yup.object().shape({
//       outrasAssociacoesNaoSensiveis: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     processoJudAdmCrim: yup.object().shape({
//       suspeitas: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       condenacoesSentencas: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       acoesJud: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       penalidadesAdm: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     habitosConsumo: yup.object().shape({
//       dadosBensServicos: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     residenciais: yup.object().shape({
//       dadosResidencia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     educacaoTreinamento: yup.object().shape({
//       academicosEscolares: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       registroFinanceiro: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       qualificacaoExperienciaProf: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     profissaoEmprego: yup.object().shape({
//       empregoAtual: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       recrutamento: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       rescisao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       carreira: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       absenteismoDisciplina: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       avaliacaoDesempenho: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     regVideoImgVoz: yup.object().shape({
//       videoImagem: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       imagemVigilancia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       voz: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     outros: yup.object().shape({
//       outros: yup.array(),
//     }),
//   }),
//   categoriaDadosPessoaisSensiveis: yup.object().shape({
//     origemRacialEtnica: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     conviccaoReligiosa: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     opiniaoPolitica: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     filiacaoSindicato: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     filiacaoOrganizacaoReligiosa: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     filiacaoCrencaFilosofica: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     filiacaoPreferenciaPolitica: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     saudeVidaSexual: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     geneticos: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     biometricos: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//   }),
//   frequenciaTratamento: yup.string().required(),
//   quantidadeDadosTratados: yup.string().required(),
//   categoriasTitulares: yup.object().shape({
//     categorias: yup
//       .array()
//       .required()
//       .of(
//         yup.object().shape({
//           tipoCategoria: yup.string().required(),
//           descricao: yup.string().optional(),
//         })
//       ),
//     criancasAdolescentes: yup
//       .array()
//       .optional()
//       .of(
//         yup.object().shape({
//           tipoCategoria: yup.string().required(),
//           descricao: yup.string().optional(),
//         })
//       ),
//     outrosGruposVulneraveis: yup
//       .array()
//       .optional()
//       .of(
//         yup.object().shape({
//           tipoCategoria: yup.string().required(),
//           descricao: yup.string().optional(),
//         })
//       ),
//   }),
//   compartilhamentoDadosPessoais: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         nomeInstituicao: yup.string().required(),
//         dadosCompartilhados: yup.string().optional(),
//         finalidadeCompartilhamento: yup.string().optional(),
//       })
//     ),
//   medidasSegurancaPrivacidade: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         tipo: yup.string().required(),
//         descricaoControles: yup.string().optional(),
//       })
//     ),
//   transferenciaInternacional: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         nomeOrganizacao: yup.string().required(),
//         pais: yup.string().required(),
//         dadosTransferidos: yup.string().required(),
//         tipoGarantia: yup.string().required(),
//       })
//     ),
//   contratoServicosTITratamentoDados: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         numeroContrato: yup.string().required(),
//         numeroProcessoContratacao: yup.string().optional(),
//         objetoContrato: yup.string().required(),
//         emailGestorContrato: yup.string().required(),
//       })
//     ),
//   riscosPrivacidade: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         tipoRisco: yup.string().required(),
//         observacoes: yup.string().optional(),
//       })
//     ),
//   observacoesProcesso: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         descricaoObs: yup.string().required(),
//       })
//     ),
// });

const CaseForm = (props: {
  item: BaseFullCaseObject;
  new?: boolean;
  edit?: boolean;
  approve?: boolean;
  onSubmit: onSubmitFn;
}) => {
  const [isEditing, setIsEditing] = useState(props.new || false);
  const [showModal, setShowModal] = useState(false);

  const { token } = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
      handleCloseModal();
    }
  };

  const handleShowDeleteModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
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
      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Remover Registro!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você está prestes a deletar o registro {props.item.nome}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => onDelete(cid)}>
            Prosseguir com Remoção
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
        onSubmit={props.onSubmit!}
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
                <Accordion.Header>Identificação</Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
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
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik02">
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="ref"
                        value={values.ref}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.ref && !errors.ref}
                        isInvalid={!!errors.ref}
                      />
                      <Form.Text className="text-muted">
                        Digite o Número ou um ID para identificação da atividade
                        de tratamento de dados pessoais relacionada ao serviço /
                        processo de negócio. Exemplo de Número de Referência:
                        0001. 0002 e etc. Exemplo de ID adotando Sigla do
                        Serviço informado no campo "Nome do serviço/ Processo de
                        Negócio: AVA, CRRA e etc.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik03">
                      <Form.Label>Data de Criação do Inventário</Form.Label>
                      <Form.Control
                        disabled={!isEditing}
                        type="date"
                        name="dataCriacao"
                        value={values.dataCriacao}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.dataCriacao && !errors.dataCriacao}
                        isInvalid={!!errors.dataCriacao}
                      />
                      <Form.Text className="text-muted">
                        Informar data de criação do inventário de dados
                        pessoais.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Informe uma data válida
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik04">
                      <Form.Label>Data Atualização do Inventário</Form.Label>
                      <Form.Control
                        disabled={!isEditing}
                        type="date"
                        name="dataAtualizacao"
                        value={values.dataAtualizacao}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.dataAtualizacao && !errors.dataAtualizacao
                        }
                        isInvalid={!!errors.dataAtualizacao}
                      />
                      <Form.Text className="text-muted">
                        Informar data da última atualização do inventário.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Informe uma data válida
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Agentes de Tratamento e Encarregado
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
                        disabled={!isEditing}
                        type="text"
                        name="controlador.nome"
                        value={values.controlador.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "controlador.nome") &&
                          !getIn(errors, "controlador.nome")
                        }
                        isInvalid={!!getIn(errors, "controlador.nome")}
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
                  <Row className="mb-3">
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
                        disabled={!isEditing}
                        type="text"
                        name="encarregado.nome"
                        value={values.encarregado.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "encarregado.nome") &&
                          !getIn(errors, "encarregado.nome")
                        }
                        isInvalid={!!getIn(errors, "encarregado.nome")}
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
                  <Row className="mb-3">
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
                        disabled={!isEditing}
                        type="text"
                        name="extensaoEncarregado.nome"
                        value={values.extensaoEncarregado.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "extensaoEncarregado.nome") &&
                          !getIn(errors, "extensaoEncarregado.nome")
                        }
                        isInvalid={!!getIn(errors, "extensaoEncarregado.nome")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="extensaoEncarregado.area"
                        value={values.extensaoEncarregado.area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "extensaoEncarregado.area") &&
                          !getIn(errors, "extensaoEncarregado.area")
                        }
                        isInvalid={!!getIn(errors, "extensaoEncarregado.area")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="tel"
                        name="extensaoEncarregado.telefone"
                        value={values.extensaoEncarregado.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "extensaoEncarregado.telefone") &&
                          !getIn(errors, "extensaoEncarregado.telefone")
                        }
                        isInvalid={
                          !!getIn(errors, "extensaoEncarregado.telefone")
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="email"
                        name="extensaoEncarregado.email"
                        value={values.extensaoEncarregado.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "extensaoEncarregado.email") &&
                          !getIn(errors, "extensaoEncarregado.email")
                        }
                        isInvalid={!!getIn(errors, "extensaoEncarregado.email")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Utilize um e-mail válido.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
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
                        disabled={!isEditing}
                        type="text"
                        name="areaTratamentoDados.nome"
                        value={values.areaTratamentoDados.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "areaTratamentoDados.nome") &&
                          !getIn(errors, "areaTratamentoDados.nome")
                        }
                        isInvalid={!!getIn(errors, "areaTratamentoDados.nome")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="areaTratamentoDados.area"
                        value={values.areaTratamentoDados.area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "areaTratamentoDados.area") &&
                          !getIn(errors, "areaTratamentoDados.area")
                        }
                        isInvalid={!!getIn(errors, "areaTratamentoDados.area")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="tel"
                        name="areaTratamentoDados.telefone"
                        value={values.areaTratamentoDados.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "areaTratamentoDados.telefone") &&
                          !getIn(errors, "areaTratamentoDados.telefone")
                        }
                        isInvalid={
                          !!getIn(errors, "areaTratamentoDados.telefone")
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="email"
                        name="areaTratamentoDados.email"
                        value={values.areaTratamentoDados.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "areaTratamentoDados.email") &&
                          !getIn(errors, "areaTratamentoDados.email")
                        }
                        isInvalid={!!getIn(errors, "areaTratamentoDados.email")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Utilize um e-mail válido
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
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
                        disabled={!isEditing}
                        type="text"
                        name="operador.nome"
                        value={values.operador.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "operador.nome") &&
                          !getIn(errors, "operador.nome")
                        }
                        isInvalid={!!getIn(errors, "operador.nome")}
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
                  Fases do Ciclo de Vida do Tratamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>Coleta</Form.Label>
                    <Form.Label as={Col}>Retenção</Form.Label>
                    <Form.Label as={Col}>Processamento</Form.Label>
                    <Form.Label as={Col}>Compartilhamento</Form.Label>
                    <Form.Label as={Col}>Eliminação</Form.Label>
                  </Row>
                  <Row className="mb-3">
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
                          Em qual fase do ciclo de vida o Operador atua?
                        </Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.coleta"
                        name="fasesCicloTratamento.coleta"
                        checked={values.fasesCicloTratamento.coleta}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.retencao"
                        name="fasesCicloTratamento.retencao"
                        checked={values.fasesCicloTratamento.retencao}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.processamento"
                        name="fasesCicloTratamento.processamento"
                        checked={values.fasesCicloTratamento.processamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.compartilhamento"
                        name="fasesCicloTratamento.compartilhamento"
                        checked={values.fasesCicloTratamento.compartilhamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.eliminacao"
                        name="fasesCicloTratamento.eliminacao"
                        checked={values.fasesCicloTratamento.eliminacao}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Verbos de Tratamento</Form.Label>
                      <br />
                      <Form.Text className="text-muted">
                        {Object.values(verbosTratamento).map(
                          (verbo) => `${verbo}, `
                        )}
                      </Form.Text>
                    </Col>
                    <Col lg={8}>
                      <TagPicker
                        disabled={!isEditing}
                        name="fasesCicloTratamento.verbos"
                        onChange={(tags) =>
                          setFieldValue("fasesCicloTratamento.verbos", tags)
                        }
                        value={values.fasesCicloTratamento.verbos}
                      />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  Fluxo de Tratamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
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
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  Escopo e Natureza dos Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Label as={Col}>
                      Abrangência da área geográfica do tratamento
                    </Form.Label>
                    <Col lg={8}>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="abrangenciaGeografica"
                        value={values.abrangenciaGeografica}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.abrangenciaGeografica &&
                          !errors.abrangenciaGeografica
                        }
                        isInvalid={!!errors.abrangenciaGeografica}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label as={Col}>
                      Fonte de dados utilizada para obtenção dos dados pessoais
                    </Form.Label>
                    <Col lg={8}>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="fonteDados"
                        value={values.fonteDados}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.fonteDados && !errors.fonteDados}
                        isInvalid={!!errors.fonteDados}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  Finalidade do Tratamento de Dados Pessoais
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
                    name="finalidadeTratamento.hipoteseTratamento"
                    type="select"
                    invalid="Esse campo é obrigatório"
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
                    disabled={!isEditing}
                    name="finalidadeTratamento.previsaoLegal"
                    type="text"
                    invalid="Esse campo é obrigatório"
                  />
                  <Section6FormRow
                    label="Resultados pretendidos para o titular de dados"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="finalidadeTratamento.resultadosTitular"
                    type="text"
                    invalid="Esse campo é obrigatório"
                  />
                  <Section6FormRow
                    label="Benefícios esperados para o órgão, entidade ou para a
                    sociedade como um todo"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="finalidadeTratamento.beneficiosEsperados"
                    type="text"
                    invalid="Esse campo é obrigatório"
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>Categoria de Dados Pessoais</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey="60">
                      <Accordion.Header>
                        Dados de Identificação Pessoal
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="61">
                      <Accordion.Header>Dados Financeiros</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="62">
                      <Accordion.Header>
                        Características Pessoais
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="63">
                      <Accordion.Header>Hábitos Pessoais</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                          name="categoriaDadosPessoais.habitos.habitos"
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="64">
                      <Accordion.Header>
                        Características Psicológicas
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                          name="categoriaDadosPessoais.habitos.distincoes"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="65">
                      <Accordion.Header>Composição Familiar</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="66">
                      <Accordion.Header>Interesses de lazer</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="67">
                      <Accordion.Header>Associações</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                          name="categoriaDadosPessoais.associacoes.outrasAssociacoesNaoSensiveis"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="68">
                      <Accordion.Header>
                        Processo Judicial/Administrativo/Criminal
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="69">
                      <Accordion.Header>Hábitos de Consumo</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="610">
                      <Accordion.Header>Dados Residenciais</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="611">
                      <Accordion.Header>
                        Educação e Treinamento
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="612">
                      <Accordion.Header>Profissão e emprego</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="613">
                      <Accordion.Header>
                        Registros/gravações de vídeo, imagem e voz
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
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
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="614">
                      <Accordion.Header>Outros</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Retenção dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Retenção</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <FieldArray
                          name="categoriaDadosPessoais.outros.outros"
                          render={(arrayHelpers) => (
                            <React.Fragment>
                              {values.categoriaDadosPessoais.outros.outros &&
                              values.categoriaDadosPessoais.outros.outros
                                .length > 0 ? (
                                values.categoriaDadosPessoais.outros.outros.map(
                                  (item, index) => (
                                    <React.Fragment key={index}>
                                      <Section7FormRow
                                        className={`mb-3 pt-2 pb-2 ${
                                          index % 2 === 0
                                            ? "bg-primary bg-opacity-10"
                                            : ""
                                        }`}
                                        label="Outros (Especificar)"
                                        tooltip={<React.Fragment />}
                                        disabled={!isEditing}
                                        name={`categoriaDadosPessoais.outros.outros[${index}]`}
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
                                                emptyItemCategoriaDadosPessoais()
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
                                          emptyItemCategoriaDadosPessoais()
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  Categorias de Dados Pessoais Sensíveis
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>Descrição</Form.Label>
                    <Form.Label as={Col}>Tempo Retenção dos Dados</Form.Label>
                    <Form.Label as={Col}>Fonte Retenção</Form.Label>
                    <Form.Label as={Col}>
                      Caminho Rede e/ou Sistema CPTM
                    </Form.Label>
                  </Row>
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam origem racial ou étnica"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.origemRacialEtnica"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados que revelam convicção religiosa"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.conviccaoReligiosa"
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam opinião política"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.opiniaoPolitica"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados que revelam filiação a sindicato"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoSindicato"
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam filiação a organização de caráter religioso"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoOrganizacaoReligiosa"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados que revelam filiação ou crença filosófica"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoCrencaFilosofica"
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam filiação ou preferências política"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoPreferenciaPolitica"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados referentes à saúde ou à vida sexual"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.saudeVidaSexual"
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados genéticos"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.geneticos"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados biométricos"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.biometricos"
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header>
                  Frequência e totalização das categorias de dados pessoais
                  tratados
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
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
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="frequenciaTratamento"
                        value={values.frequenciaTratamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.frequenciaTratamento &&
                          !errors.frequenciaTratamento
                        }
                        isInvalid={!!errors.frequenciaTratamento}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Informar a quantidade total de dados pessoais e dados
                          pessoais sensíveis descritos no invetário.
                          <br />
                          <b>Exemplo:</b>
                          <br />
                          Tratamento de dados pessoais de detalhes pessoais como
                          Idade, sexo, data de nascimento, local de nascimento,
                          estado civil, nacionalidade.
                          <br />
                          Tratamento de dados pessoais de saúde como CID10 e
                          data de último exame médico
                          <br />A informação que deve ser preenchida no
                          inventário é:
                          <br />
                          <b>
                            São tratados 6 dados pessoais e 2 dados pessoais
                            sensíveis, totalizando 8 dados pessoais tratados
                            pelo serviço.
                          </b>
                        </Tooltip>
                      }
                    >
                      <Form.Label as={Col}>
                        Quantidade de dados pessoais e dados pessoais sensíveis
                        tratados
                      </Form.Label>
                    </OverlayTrigger>
                    <Col lg={8}>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="quantidadeDadosTratados"
                        value={values.quantidadeDadosTratados}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.quantidadeDadosTratados &&
                          !errors.quantidadeDadosTratados
                        }
                        isInvalid={!!errors.quantidadeDadosTratados}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo é obrigatório
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="9">
                <Accordion.Header>
                  Categorias dos titulares de dados pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey="90">
                      <Accordion.Header>Categorias gerais</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Tipo de Categoria</Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
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
                                        label={`Categoria ${index + 1}`}
                                        disabled={!isEditing}
                                        name={`categoriasTitulares.categorias[${index}]`}
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
                        Categorias que envolvam crianças e adolescentes
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Tipo de Categoria</Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                        </Row>
                        <FieldArray
                          name="categoriasTitulares.criancasAdolescentes"
                          render={(arrayHelpers) => (
                            <React.Fragment>
                              {values.categoriasTitulares
                                .criancasAdolescentes &&
                              values.categoriasTitulares.criancasAdolescentes
                                .length > 0 ? (
                                values.categoriasTitulares.criancasAdolescentes.map(
                                  (item, index) => (
                                    <React.Fragment key={index}>
                                      <Section10FormRow
                                        className={`mb-3 pt-2 pb-2 ${
                                          index % 2 === 0
                                            ? "bg-primary bg-opacity-10"
                                            : ""
                                        }`}
                                        label={`Categoria Crianças e Adolescentes ${
                                          index + 1
                                        }`}
                                        disabled={!isEditing}
                                        name={`categoriasTitulares.criancasAdolescentes[${index}]`}
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
                    <Accordion.Item eventKey="92">
                      <Accordion.Header>
                        Categorias que envolvam outros grupos vulneráveis
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Tipo de Categoria</Form.Label>
                          <Form.Label as={Col}>Descrição</Form.Label>
                        </Row>
                        <FieldArray
                          name="categoriasTitulares.outrosGruposVulneraveis"
                          render={(arrayHelpers) => (
                            <React.Fragment>
                              {values.categoriasTitulares
                                .outrosGruposVulneraveis &&
                              values.categoriasTitulares.outrosGruposVulneraveis
                                .length > 0 ? (
                                values.categoriasTitulares.outrosGruposVulneraveis.map(
                                  (item, index) => (
                                    <React.Fragment key={index}>
                                      <Section10FormRow
                                        className={`mb-3 pt-2 pb-2 ${
                                          index % 2 === 0
                                            ? "bg-primary bg-opacity-10"
                                            : ""
                                        }`}
                                        label={`Categoria Outros Grupos Vulneráveis ${
                                          index + 1
                                        }`}
                                        disabled={!isEditing}
                                        name={`categoriasTitulares.outrosGruposVulneraveis[${index}]`}
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
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="10">
                <Accordion.Header>
                  Compartilhamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}>Nome da Instituição</Form.Label>
                    <Form.Label as={Col}>
                      Dados pessoais compartilhados
                    </Form.Label>
                    <Form.Label as={Col}>
                      Finalidade do compartilhamento
                    </Form.Label>
                  </Row>
                  <FieldArray
                    name="compartilhamentoDadosPessoais"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.compartilhamentoDadosPessoais &&
                        values.compartilhamentoDadosPessoais.length > 0 ? (
                          values.compartilhamentoDadosPessoais.map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <Section11FormRow
                                  className={`mb-3 pt-2 pb-2 ${
                                    index % 2 === 0
                                      ? "bg-primary bg-opacity-10"
                                      : ""
                                  }`}
                                  disabled={!isEditing}
                                  name={`compartilhamentoDadosPessoais[${index}]`}
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
                                          emptyItemCompatilhamentoDados()
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
                                    emptyItemCompatilhamentoDados()
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
              <Button
                type="submit"
                className="float-end mt-3"
                disabled={!(isValid && dirty)}
              >
                Registrar Novo
              </Button>
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
              <Button
                type="submit"
                className="float-end mt-3"
                disabled={!(isValid && dirty)}
              >
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
                  <Button variant="danger" onClick={handleShowDeleteModal}>
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
