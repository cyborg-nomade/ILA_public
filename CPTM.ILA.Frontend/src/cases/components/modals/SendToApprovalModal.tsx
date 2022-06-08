import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SendToApprovalModal = (props: {
    onSendToApprovalSubmit: () => void;
    onHideSendToApprovalModal: () => void;
    onDismissSendToApprovalModal: () => void;
    showSendToApprovalModal: boolean;
    children?: React.ReactNode;
    showChildrenContent: boolean;
    isLoading: boolean;
}) => {
    return (
        <Modal
            show={props.showSendToApprovalModal}
            onHide={props.onHideSendToApprovalModal}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {!props.showChildrenContent
                        ? "Enviar para o Encarregado de Dados!"
                        : "Enviando para o Encarregado de Dados..."}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!props.showChildrenContent &&
                    "Você tem certeza que deseja enviar as informações para validação do time de Privacidade de Dados?"}
                {props.showChildrenContent && props.children}
            </Modal.Body>
            <Modal.Footer>
                {!props.showChildrenContent && (
                    <React.Fragment>
                        <Button
                            variant="danger"
                            onClick={props.onHideSendToApprovalModal}
                        >
                            Não
                        </Button>
                        <Button
                            variant="primary"
                            onClick={props.onSendToApprovalSubmit}
                        >
                            Sim
                        </Button>
                    </React.Fragment>
                )}
                {props.showChildrenContent && (
                    <React.Fragment>
                        <Button
                            variant="primary"
                            onClick={props.onDismissSendToApprovalModal}
                            disabled={props.isLoading}
                        >
                            Voltar
                        </Button>
                    </React.Fragment>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default SendToApprovalModal;
