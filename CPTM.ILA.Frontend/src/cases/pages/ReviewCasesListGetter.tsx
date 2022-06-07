import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../components/CasesList";

const ReviewCasesListGetter = () => {
    const [cases, setCases] = useState<CaseListItem[]>([]);

    const { token, currentGroup } = useContext(AuthContext);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    useEffect(() => {
        const getApprovedCases = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/group/${currentGroup.id}/status/false/true/false`,
                undefined,
                undefined,
                { Authorization: "Bearer " + token }
            );
            const loadedCases: CaseListItem[] = responseData.cases;
            console.log("currentGroup: ", currentGroup);
            console.log("loadedCases: ", loadedCases);

            const test = new Date(loadedCases[0].dataProxRevisao);
            const test2 = !!loadedCases[0].dataProxRevisao;
            console.log(test2);

            const filteredCases: CaseListItem[] = loadedCases.filter((c) =>
                c.dataProxRevisao
                    ? new Date(c.dataProxRevisao) > new Date()
                    : true
            );

            console.log("filteredCases: ", filteredCases);

            setCases(filteredCases);
        };

        getApprovedCases().catch((error) => {
            console.log(error);
        });
    }, [sendRequest, token, currentGroup]);

    if (isLoading) {
        return (
            <Row className="justify-content-center">
                <Spinner animation="border" role="status" variant="light">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Row>
        );
    }

    return (
        <React.Fragment>
            <h3 className="mb-4 mt-4">Processos aprovados a serem revistos:</h3>
            {error && (
                <Alert
                    variant={isWarning ? "warning" : "danger"}
                    onClose={clearError}
                    dismissible
                >
                    {error}
                </Alert>
            )}
            <CasesList items={cases} redirect={true} minimal={true} />
        </React.Fragment>
    );
};

export default ReviewCasesListGetter;
