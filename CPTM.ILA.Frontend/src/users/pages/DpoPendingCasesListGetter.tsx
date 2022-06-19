import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../../cases/components/CasesList";

const DpoPendingCasesListGetter = () => {
    const [cases, setCases] = useState<CaseListItem[]>([]);

    const { token, currentComiteMember, user } = useContext(AuthContext);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    useEffect(() => {
        const getPendingCases = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/extensao-encarregado/${currentComiteMember.id}/status/true/false/false`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedCases: CaseListItem[] = responseData.caseListItems;
            console.log("loadedCases: ", loadedCases);
            setCases(loadedCases);
        };

        const getAllPendingCases = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/status/true/false/false`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedCases: CaseListItem[] = responseData.caseListItems;
            console.log("loadedCases: ", loadedCases);
            setCases(loadedCases);
        };

        if (user.isDPO && currentComiteMember.nome === "TODOS") {
            getAllPendingCases().catch((error) => {
                console.log(error);
            });
        } else {
            getPendingCases().catch((error) => {
                console.log(error);
            });
        }
    }, [
        sendRequest,
        token,
        currentComiteMember.id,
        user.isDPO,
        currentComiteMember.nome,
    ]);

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
            {currentComiteMember.nome !== "TODOS" && (
                <h1>Processos Pendentes do Membro Selecionado</h1>
            )}
            {currentComiteMember.nome === "TODOS" && (
                <h1>Processos de Todo o Comitê LGPD</h1>
            )}
            {error && (
                <Alert
                    variant={isWarning ? "warning" : "danger"}
                    onClose={clearError}
                    dismissible
                >
                    {error}
                </Alert>
            )}
            <CasesList items={cases} redirect={false} />
        </React.Fragment>
    );
};

export default DpoPendingCasesListGetter;
