import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import {
    AccessRequestDTO,
    emptyAccessRequestDTO,
} from "../../shared/models/DTOs/access-request-dto.model";
import {
    AccessRequest,
    tipoSolicitacaoAcesso,
} from "../../shared/models/access-control/access-request.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AccessRequestForm from "../../access-requests/components/AccessRequestForm";

const RequestGroupAccess = () => {
    const [message, setMessage] = useState("");
    const [showTransactionModal, setShowTransactionModal] = useState(false);

    const { token, user } = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    let navigate = useNavigate();

    const dismissTransactionModal = () => {
        setShowTransactionModal(false);
        navigate("/");
    };

    const submitRegisterHandler = async (accessRequest: AccessRequestDTO) => {
        try {
            setShowTransactionModal(true);
            // accessRequest.groupNames = accessRequest.groupNames.map(
            //   (g: any) => g.value
            // );
            accessRequest.usernameSuperior =
                // @ts-ignore
                accessRequest.usernameSuperior.value;
            accessRequest.usernameSolicitante = user.username;

            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/access-requests/require/${tipoSolicitacaoAcesso.AcessoAGrupos}`,
                "POST",
                JSON.stringify(accessRequest),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const savedAR: AccessRequest = responseData.accessRequest;
            console.log("savedAR: ", savedAR);

            const emailFormData = new FormData();
            emailFormData.append("emailFile", accessRequest.emailFile);
            await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/access-requests/require/${tipoSolicitacaoAcesso.AcessoAGrupos}/save-file/${savedAR.id}`,
                "POST",
                emailFormData,
                {
                    Authorization: "Bearer " + token,
                }
            );
            console.log("AR file saved");

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
                groups={true}
                onSubmit={submitRegisterHandler}
            />
        </React.Fragment>
    );
};

export default RequestGroupAccess;
