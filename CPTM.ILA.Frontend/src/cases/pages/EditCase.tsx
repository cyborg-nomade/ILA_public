import React, { useContext, useEffect, useState } from "react";
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

const EditCase = () => {
    const [fullCase, setFullCase] = useState<Case>(emptyCase());

    const { user, token, currentGroup } = useContext(AuthContext);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    const cid = +(useParams().cid || "");
    let navigate = useNavigate();

    useEffect(() => {
        const getCaseToEdit = async () => {
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
        };

        getCaseToEdit().catch((error) => {
            console.log(error);
        });
    }, [cid, sendRequest, token]);

    const saveProgressHandler = async (item: Case) => {
        console.log("save progress, Initial item: ", item);
        setFullCase(item);

        const dateCriacaoParts = item.dataCriacao.split("/");
        const dateAtualizacaoParts = item.dataAtualizacao.split("/");
        item.dataCriacao = new Date(
            +dateCriacaoParts[2],
            +dateCriacaoParts[1] - 1,
            +dateCriacaoParts[0]
        ).toISOString();
        item.dataAtualizacao = new Date(
            +dateAtualizacaoParts[2],
            +dateAtualizacaoParts[1] - 1,
            +dateAtualizacaoParts[0]
        ).toISOString();
        item.area = currentGroup.nome;
        item.aprovado = false;
        item.encaminhadoAprovacao = false;

        for (const value of Object.values(item.catDadosPessoaisSensiveis)) {
            if (value.length !== 0) {
                item.dadosPessoaisSensiveis = true;
            }
        }

        console.log("save progress, Altered item: ", item);

        const changeObj = diff(fullCase, item);

        const changeLog: ChangeLog = {
            caseDiff: JSON.stringify(changeObj),
            caseId: item.id,
            caseRef: item.ref,
            userId: user.id,
            usernameResp: user.username,
            changeDate: new Date(),
        };

        console.log("save progress, Change Log: ", changeLog);

        const caseChange: CaseChange = {
            case: item,
            changeLog: changeLog,
        };

        console.log("save progress, Case Change: ", caseChange);

        try {
            await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
                "POST",
                JSON.stringify(caseChange),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );
            console.log("case saved");

            navigate(`/`);
        } catch (err) {
            console.log(err);
        }
    };

    const sendToApprovalHandler = async (item: Case) => {
        console.log("send to approval, Initial item: ", item);
        setFullCase(item);

        const dateCriacaoParts = item.dataCriacao.split("/");
        const dateAtualizacaoParts = item.dataAtualizacao.split("/");
        item.dataCriacao = new Date(
            +dateCriacaoParts[2],
            +dateCriacaoParts[1] - 1,
            +dateCriacaoParts[0]
        ).toISOString();
        item.dataAtualizacao = new Date(
            +dateAtualizacaoParts[2],
            +dateAtualizacaoParts[1] - 1,
            +dateAtualizacaoParts[0]
        ).toISOString();
        item.area = currentGroup.nome;

        for (const value of Object.values(item.catDadosPessoaisSensiveis)) {
            if (value.length !== 0) {
                item.dadosPessoaisSensiveis = true;
            }
        }

        console.log("send to approval, Altered item: ", item);

        const changeObj = diff(fullCase, item);

        const changeLog: ChangeLog = {
            caseDiff: JSON.stringify(changeObj),
            caseId: item.id,
            caseRef: item.ref,
            userId: user.id,
            usernameResp: user.username,
            changeDate: new Date(),
        };

        console.log("send to approval, Change Log: ", changeLog);

        const caseChange: CaseChange = {
            case: item,
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
            console.log(
                "send to approva, request case approval response",
                resp2
            );

            navigate(`/`);
        } catch (err) {
            console.log(err);
        }
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
            <CaseForm
                item={fullCase}
                edit={true}
                onSaveProgressSubmit={saveProgressHandler}
                onSendToApprovalSubmit={sendToApprovalHandler}
            />
        </React.Fragment>
    );
};

export default EditCase;
