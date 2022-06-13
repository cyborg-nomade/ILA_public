import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { Case, emptyCase } from "../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CaseForm from "../components/CaseForm";
import LoadingModal from "../components/modals/LoadingModal";

const CheckCase = () => {
    const [fullCase, setFullCase] = useState<Case>(emptyCase());
    const [isLoadingUseStateData, setIsLoadingUseStateData] = useState(false);

    const { token } = useContext(AuthContext);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    const cid = useParams().cid;

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
            <CaseForm item={fullCase} check={true} />
        </React.Fragment>
    );
};

export default CheckCase;
