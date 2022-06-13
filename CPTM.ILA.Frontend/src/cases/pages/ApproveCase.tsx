import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { Case, emptyCase } from "../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CaseForm from "../components/CaseForm";
import ApproveCaseModal from "../components/modals/ApproveCaseModal";
import RepproveCaseModal from "../components/modals/RepproveCaseModal";
import LoadingModal from "../components/modals/LoadingModal";

const ApproveCaseGetter = () => {
    const { token } = useContext(AuthContext);

    const [message, setMessage] = useState("");
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRepproveModal, setShowRepproveModal] = useState(false);
    const [fullCase, setFullCase] = useState<Case>(emptyCase());
    const [isLoadingUseStateData, setIsLoadingUseStateData] = useState(false);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    const cid = useParams().cid;
    let navigate = useNavigate();

    useEffect(() => {
        const getCaseToApprove = async () => {
            setIsLoadingUseStateData(true);
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
                undefined,
                undefined,
                { Authorization: "Bearer " + token }
            );

            let loadedCase = responseData.uniqueCase;
            console.log("loadedCase: ", loadedCase);

            loadedCase.dataCriacao = new Date(
                loadedCase.dataCriacao
            ).toLocaleDateString();
            loadedCase.dataAtualizacao = new Date().toLocaleDateString();

            console.log("loadedCase dates altered: ", loadedCase);
            setFullCase(loadedCase);
            setIsLoadingUseStateData(false);
        };

        getCaseToApprove().catch((error) => {
            console.log(error);
        });
    }, [cid, sendRequest, token]);

    const dismissModalHandler = () => {
        navigate(-1);
    };

    const showApproveModalHandler = useCallback((item: Case) => {
        setFullCase(item);
        setShowApproveModal(true);
    }, []);

    const hideApproveHandler = () => {
        setShowApproveModal(false);
    };

    const approveCaseHandler = async () => {
        fullCase.aprovado = true;
        fullCase.encaminhadoAprovacao = false;
        fullCase.reprovado = false;

        try {
            const approveRespose = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/approve/${cid}/${fullCase.aprovado}`,
                "POST",
                JSON.stringify(fullCase.comentarioReprovacao),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );
            console.log("Case approved, response: ", approveRespose);
            setMessage(approveRespose.message);
        } catch (err) {
            console.log(err);
            setFullCase(fullCase);
        }
    };

    const showRepproveModalHandler = useCallback((item: Case) => {
        setFullCase(item);
        setShowRepproveModal(true);
    }, []);

    const hideRepproveModalHandler = () => {
        setShowRepproveModal(false);
    };

    const reproveCaseHandler = async (comentarioReprovado: string) => {
        fullCase.aprovado = false;
        fullCase.reprovado = true;
        fullCase.encaminhadoAprovacao = false;
        fullCase.comentarioReprovacao = comentarioReprovado;

        try {
            const repproveResponse = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/approve/${cid}/${fullCase.aprovado}`,
                "POST",
                JSON.stringify(fullCase.comentarioReprovacao),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );
            console.log("Case approved, response: ", repproveResponse);
            setMessage(repproveResponse.message);
        } catch (err) {
            console.log(err);
            setFullCase(fullCase);
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
            <h1>Aprovar Item</h1>
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
            <ApproveCaseModal
                onApproveSubmit={approveCaseHandler}
                onHideApproveModal={hideApproveHandler}
                onDismissApproveModal={dismissModalHandler}
                showApproveModal={showApproveModal}
                showChildrenContent={isLoading || error || !!message}
                isLoading={isLoading}
                hasError={!!error}
            >
                {contentChildren}
            </ApproveCaseModal>
            <RepproveCaseModal
                isLoading={isLoading}
                onDismissRepproveModal={dismissModalHandler}
                onHideRepproveModal={hideRepproveModalHandler}
                onRepproveSubmit={reproveCaseHandler}
                showChildrenContent={isLoading || error || !!message}
                showRepproveModal={showRepproveModal}
                hasError={!!error}
            >
                {contentChildren}
            </RepproveCaseModal>
            <CaseForm
                item={fullCase}
                approve={true}
                onApproveSubmit={showApproveModalHandler}
                onReproveSubmit={showRepproveModalHandler}
            />
        </React.Fragment>
    );
};

export default ApproveCaseGetter;
