import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useHttpClient } from "../../shared/hooks/http-hook";
import AccessRequestForm from "../../access-requests/components/AccessRequestForm";

import {
    AccessRequestDTO,
    emptyAccessRequestDTO,
} from "../../shared/models/DTOs/access-request-dto.model";
import {
    AccessRequest,
    tipoSolicitacaoAcesso,
} from "../../shared/models/access-control/access-request.model";

const RequestAccess = () => {
    const [message, setMessage] = useState("");
    const [showTransactionModal, setShowTransactionModal] = useState(false);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    let navigate = useNavigate();

    const dismissTransactionModal = () => {
        setShowTransactionModal(false);
        navigate("/");
    };

    const submitRegisterHandler = async (accessRequest: AccessRequestDTO) => {
        try {
            setShowTransactionModal(true);
            accessRequest.groupNames = accessRequest.groupNames.map(
                (g: any) => g.value
            );

            accessRequest.usernameSuperior =
                // @ts-ignore
                accessRequest.usernameSuperior.value;

            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/access-requests/require/${accessRequest.tipoSolicitacaoAcesso}`,
                "POST",
                JSON.stringify(accessRequest),
                {
                    "Content-Type": "application/json",
                }
            );

            const savedAR: AccessRequest = responseData.accessRequest;
            console.log("savedAR: ", savedAR);

            if (
                accessRequest.tipoSolicitacaoAcesso ===
                tipoSolicitacaoAcesso.AcessoAoSistema
            ) {
                const emailFormData = new FormData();
                emailFormData.append(
                    "emailFile",
                    accessRequest.emailFile as File
                );

                const responseDataEmailFile = await sendRequest(
                    `${process.env.REACT_APP_CONNSTR}/access-requests/require/${tipoSolicitacaoAcesso.AcessoAoSistema}/save-file/${savedAR.id}`,
                    "POST",
                    emailFormData
                );
                console.log(
                    "AR save file response message: ",
                    responseDataEmailFile.message
                );
            }

            setMessage(responseData.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Modal
                show={showTransactionModal}
                onHide={() => setShowTransactionModal(false)}
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title>Processando sua requisição...!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading && (
                        <Row className="justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={dismissTransactionModal}
                        disabled={isLoading}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
            <AccessRequestForm
                item={emptyAccessRequestDTO()}
                register={true}
                onSubmit={submitRegisterHandler}
            />
        </React.Fragment>
    );
};

export default RequestAccess;
