import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CasesList from "../components/CasesList";
import { CaseListItem } from "../../shared/models/DTOs/case-list-item.model";

const ApproveCasesListGetter = () => {
    const [cases, setCases] = useState<CaseListItem[]>([]);

    const { token, currentGroup, user } = useContext(AuthContext);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    useEffect(() => {
        const getSelectedGroupCasesToApprove = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/group/${currentGroup.id}/status/true/false/false`,
                undefined,
                undefined,
                { Authorization: "Bearer " + token }
            );
            const loadedCases: CaseListItem[] = responseData.cases;
            console.log("loadedCases: ", loadedCases);
            setCases(loadedCases);
        };
        const getAllCasesToApprove = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/extensao-encarregado/${user.id}/status/true/false/false`,
                undefined,
                undefined,
                { Authorization: "Bearer " + token }
            );
            const loadedCases: CaseListItem[] = responseData.cases;
            console.log("loadedCases: ", loadedCases);
            setCases(loadedCases);
        };

        if (user.isComite && currentGroup.nome === "TODOS") {
            getAllCasesToApprove().catch((error) => {
                console.log(error);
            });
        } else {
            getSelectedGroupCasesToApprove().catch((error) => {
                console.log(error);
            });
        }
    }, [
        currentGroup.id,
        currentGroup.nome,
        sendRequest,
        token,
        user.id,
        user.isComite,
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
            <h1>Aprovações Pendentes</h1>
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

export default ApproveCasesListGetter;
