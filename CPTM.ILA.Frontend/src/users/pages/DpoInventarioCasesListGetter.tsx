import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../../cases/components/CasesList";

const DpoInventarioCasesListGetter = () => {
    const [cases, setCases] = useState<CaseListItem[]>([]);

    const { token } = useContext(AuthContext);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    useEffect(() => {
        const getAllCases = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedCases: CaseListItem[] = responseData.caseListItems;
            console.log("loadedCases: ", loadedCases);
            const filteredCases: CaseListItem[] = loadedCases.filter(
                (c) => c.aprovado
            );
            console.log("filteredCases: ", filteredCases);
            setCases(filteredCases);
        };

        getAllCases().catch((error) => {
            console.log(error);
        });
    }, [sendRequest, token]);

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
            <h1>Inventário - Todos os processos aprovados</h1>
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

export default DpoInventarioCasesListGetter;
