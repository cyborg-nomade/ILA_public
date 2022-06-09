import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ApproveCaseModal = (props: {
    onApproveSubmit: () => void;
    onHideApproveModal: () => void;
    onDismissApproveModal: () => void;
    showApproveModal: boolean;
    children?: React.ReactNode;
    showChildrenContent: boolean;
    isLoading: boolean;
}) => {
    return (
        <Modal
            show={props.showApproveModal}
            onHide={props.onHideApproveModal}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {!props.showChildrenContent
                        ? "Aprovar Processo!"
                        : "Aprovando Processo..."}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!props.showChildrenContent &&
                    "Você tem certeza que deseja aprovar este processo e adicioná-lo ao inventário?"}
                {props.showChildrenContent && props.children}
            </Modal.Body>
            <Modal.Footer>
                {!props.showChildrenContent && (
                    <React.Fragment>
                        <Button
                            variant="danger"
                            onClick={props.onHideApproveModal}
                        >
                            Não
                        </Button>
                        <Button
                            variant="primary"
                            onClick={props.onApproveSubmit}
                        >
                            Sim
                        </Button>
                    </React.Fragment>
                )}
                {props.showChildrenContent && (
                    <React.Fragment>
                        <Button
                            variant="primary"
                            onClick={props.onDismissApproveModal}
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

export default ApproveCaseModal;
