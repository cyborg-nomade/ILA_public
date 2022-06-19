import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../../cases/components/CasesList";

const ComiteCasesListGetter = () => {
    const [cases, setCases] = useState<CaseListItem[]>([]);

    const { token, currentGroup, user } = useContext(AuthContext);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    useEffect(() => {
        const getSelectedGroupApprovedCases = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/group/${currentGroup.id}/status/false/true/false`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedCases: CaseListItem[] = responseData.cases;
            console.log("loadedCases: ", loadedCases);
            setCases(loadedCases);
        };
        const getAllComiteApprovedCases = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/extensao-encarregado/${user.id}/status/false/true/false`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedCases: CaseListItem[] = responseData.cases;
            console.log("loadedCases: ", loadedCases);
            setCases(loadedCases);
        };

        if (user.isComite && currentGroup.nome === "TODOS") {
            getAllComiteApprovedCases().catch((error) => {
                console.log(error);
            });
        } else {
            getSelectedGroupApprovedCases().catch((error) => {
                console.log(error);
            });
        }
    }, [sendRequest, token, currentGroup.id]);

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
            <h1>
                Meus Processos - Todos os processos aprovados do grupo
                selecionado
            </h1>
            {error && (
                <Alert
                    variant={isWarning ? "warning" : "danger"}
                    onClose={clearError}
                    dismissible
                >
                    {error}
                </Alert>
            )}
            <CasesList items={cases} redirect={true} />
        </React.Fragment>
    );
};

export default ComiteCasesListGetter;
