import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { diff } from "deep-object-diff";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { Case, emptyCase } from "../../shared/models/cases.model";
import { ChangeLog } from "../../shared/models/change-logging/change-log.model";
import { CaseChange } from "../../shared/models/DTOs/case-change.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CaseForm from "../components/CaseForm";
import SaveProgressModal from "../components/modals/SaveProgressModal";
import SendToApprovalModal from "../components/modals/SendToApprovalModal";
import LoadingModal from "./../components/modals/LoadingModal";
import { AgenteTratamento } from "../../shared/models/case-helpers/case-helpers.model";
import { usePrompt } from "../../shared/hooks/prompt-hook";

const EditCase = () => {
    const { user, token, currentGroup, areaTratamentoDados } =
        useContext(AuthContext);

    const [message, setMessage] = useState("");
    const [showSaveProgressModal, setShowSaveProgressModal] = useState(false);
    const [showSendToApprovalModal, setShowSendToApprovalModal] =
        useState(false);
    const [fullCase, setFullCase] = useState<Case>(
        emptyCase(areaTratamentoDados)
    );
    const [isLoadingUseStateData, setIsLoadingUseStateData] = useState(false);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    const cid = +(useParams().cid || "");
    let navigate = useNavigate();

    usePrompt(
        "Tem certeza que deseja sair? Você perderá todos o dados! Clique em Cancelar e depois em Salvar Alterações",
        !showSaveProgressModal && !showSendToApprovalModal
    );

    useEffect(() => {
        const getCaseToEdit = async () => {
            setIsLoadingUseStateData(true);
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
                undefined,
                undefined,
                { Authorization: "Bearer " + token }
            );
            let loadedCase: Case = responseData.uniqueCase;
            console.log("loadedCase: ", loadedCase);

            loadedCase.dataCriacao = new Date(
                loadedCase.dataCriacao
            ).toLocaleDateString();
            loadedCase.dataAtualizacao = new Date().toLocaleDateString();
            console.log("loadedCase, dates altered: ", loadedCase);

            setFullCase(loadedCase);
            setIsLoadingUseStateData(false);
        };

        getCaseToEdit().catch((error) => {
            console.log(error);
        });

        return () => {
            setFullCase(emptyCase(areaTratamentoDados));
        };
    }, [areaTratamentoDados, cid, sendRequest, token]);

    useEffect(() => {
        const getComiteMembers = async () => {
            try {
                setIsLoadingUseStateData(true);
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_CONNSTR}/users/comite-members/${currentGroup.id}`,
                    undefined,
                    undefined,
                    { Authorization: "Bearer " + token }
                );
                const loadedComiteMember: AgenteTratamento =
                    responseData.comiteMember;
                console.log("loadedComiteMember: ", loadedComiteMember);
                setFullCase((prevCase) => ({
                    ...prevCase,
                    extensaoEncarregado: loadedComiteMember,
                    areaTratamentoDados: {
                        ...prevCase.areaTratamentoDados,
                        area: currentGroup.nome,
                    },
                }));
                setIsLoadingUseStateData(false);
            } catch (e) {
                console.log(e);
            }
        };

        getComiteMembers().catch((error) => {
            console.log(error);
        });

        return () => {
            setFullCase(emptyCase(areaTratamentoDados));
        };
    }, [
        areaTratamentoDados,
        currentGroup.id,
        currentGroup.nome,
        sendRequest,
        token,
    ]);

    const dismissModalHandler = () => {
        navigate(-1);
    };

    const showSaveProgressModalHandler = useCallback((item: Case) => {
        setFullCase(item);
        setShowSaveProgressModal(true);
    }, []);

    const hideSaveProgressModalHandler = () => {
        setShowSaveProgressModal(false);
    };

    const saveProgressHandler = async () => {
        console.log("save progress, Initial item: ", fullCase);
        setFullCase(fullCase);

        fullCase.grupoCriadorId = currentGroup.id;
        fullCase.usernameResponsavel = user.username;
        fullCase.area = fullCase.areaTratamentoDados.area!;

        const dateCriacaoParts = fullCase.dataCriacao.split("/");
        const dateAtualizacaoParts = fullCase.dataAtualizacao.split("/");
        fullCase.dataCriacao = new Date(
            +dateCriacaoParts[2],
            +dateCriacaoParts[1] - 1,
            +dateCriacaoParts[0]
        ).toISOString();
        fullCase.dataAtualizacao = new Date(
            +dateAtualizacaoParts[2],
            +dateAtualizacaoParts[1] - 1,
            +dateAtualizacaoParts[0]
        ).toISOString();

        fullCase.aprovado = false;
        fullCase.encaminhadoAprovacao = false;
        fullCase.reprovado = false;

        for (const value of Object.values(fullCase.catDadosPessoaisSensiveis)) {
            if (value.length !== 0) {
                fullCase.dadosPessoaisSensiveis = true;
            }
        }

        console.log("save progress, Altered item: ", fullCase);

        const changeObj = diff(fullCase, fullCase);

        const changeLog: ChangeLog = {
            caseDiff: JSON.stringify(changeObj),
            caseId: fullCase.id,
            caseRef: fullCase.ref,
            userId: user.id,
            usernameResp: user.username,
            changeDate: new Date(),
        };

        console.log("save progress, Change Log: ", changeLog);

        const caseChange: CaseChange = {
            case: fullCase,
            changeLog: changeLog,
        };

        console.log("save progress, Case Change: ", caseChange);

        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
                "POST",
                JSON.stringify(caseChange),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );
            console.log("case saved, response data: ", responseData);
            setMessage(responseData.message);
        } catch (err) {
            console.log(err);
        }
    };

    const showSendToApprovalModalHandler = useCallback((item: Case) => {
        setFullCase(item);
        setShowSendToApprovalModal(true);
    }, []);

    const hideSendToApprovalModalHandler = () => {
        setShowSendToApprovalModal(false);
    };

    const sendToApprovalHandler = async () => {
        console.log("send to approval, Initial item: ", fullCase);
        setFullCase(fullCase);

        fullCase.grupoCriadorId = currentGroup.id;
        fullCase.usernameResponsavel = user.username;
        fullCase.area = fullCase.areaTratamentoDados.area!;

        const dateCriacaoParts = fullCase.dataCriacao.split("/");
        const dateAtualizacaoParts = fullCase.dataAtualizacao.split("/");
        fullCase.dataCriacao = new Date(
            +dateCriacaoParts[2],
            +dateCriacaoParts[1] - 1,
            +dateCriacaoParts[0]
        ).toISOString();
        fullCase.dataAtualizacao = new Date(
            +dateAtualizacaoParts[2],
            +dateAtualizacaoParts[1] - 1,
            +dateAtualizacaoParts[0]
        ).toISOString();

        fullCase.aprovado = false;
        fullCase.encaminhadoAprovacao = true;
        fullCase.reprovado = false;

        for (const value of Object.values(fullCase.catDadosPessoaisSensiveis)) {
            if (value.length !== 0) {
                fullCase.dadosPessoaisSensiveis = true;
            }
        }

        console.log("send to approval, Altered item: ", fullCase);

        const changeObj = diff(fullCase, fullCase);

        const changeLog: ChangeLog = {
            caseDiff: JSON.stringify(changeObj),
            caseId: fullCase.id,
            caseRef: fullCase.ref,
            userId: user.id,
            usernameResp: user.username,
            changeDate: new Date(),
        };

        console.log("send to approval, Change Log: ", changeLog);

        const caseChange: CaseChange = {
            case: fullCase,
            changeLog: changeLog,
        };

        console.log("send to approval, Case change: ", caseChange);

        try {
            const initialResponse = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
                "POST",
                JSON.stringify(caseChange),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const savedCase: Case = initialResponse.caseToSave;
            console.log("send to approval, caseSaved", savedCase);

            const alteredSavedCase = savedCase;
            alteredSavedCase.dataCriacao = new Date(
                savedCase.dataCriacao
            ).toLocaleDateString();
            alteredSavedCase.dataAtualizacao = new Date().toLocaleDateString();
            console.log("send to approval, alteredSavedCase", savedCase);

            const resp2 = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/request-approval/${savedCase.id}`,
                "POST",
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );
            console.log("send to approval, request approval response: ", resp2);
            setMessage(resp2.message);
        } catch (err) {
            console.log(err);
        }
    };

    const contentChildren = (
        <React.Fragment>
            {isLoading && (
                <Row className="justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
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
    );

    return (
        <React.Fragment>
            <h1>Alterar Processo Aprovado</h1>
            {error && (
                <Alert
                    variant={isWarning ? "warning" : "danger"}
                    onClose={clearError}
                    dismissible
                >
                    Ocorreu um erro: {error}
                </Alert>
            )}
            <LoadingModal isLoading={isLoadingUseStateData} />
            <SaveProgressModal
                onHideSaveProgressModal={hideSaveProgressModalHandler}
                onSaveProgressSubmit={saveProgressHandler}
                onDismissSaveProgressModal={dismissModalHandler}
                showSaveProgressModal={showSaveProgressModal}
                showChildrenContent={isLoading || error || !!message}
                isLoading={isLoading}
                hasError={!!error}
            >
                {contentChildren}
            </SaveProgressModal>
            <SendToApprovalModal
                isLoading={isLoading}
                onDismissSendToApprovalModal={dismissModalHandler}
                onHideSendToApprovalModal={hideSendToApprovalModalHandler}
                onSendToApprovalSubmit={sendToApprovalHandler}
                showChildrenContent={isLoading || error || !!message}
                showSendToApprovalModal={showSendToApprovalModal}
                hasError={!!error}
            >
                {contentChildren}
            </SendToApprovalModal>
            <CaseForm
                item={fullCase}
                edit={true}
                onSaveProgressSubmit={showSaveProgressModalHandler}
                onSendToApprovalSubmit={showSendToApprovalModalHandler}
            />
        </React.Fragment>
    );
};

export default EditCase;