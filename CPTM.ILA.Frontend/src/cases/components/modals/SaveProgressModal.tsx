import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SaveProgressModal = (props: {
    onSaveProgressSubmit: () => void;
    onHideSaveProgressModal: () => void;
    onDismissSaveProgressModal: () => void;
    showSaveProgressModal: boolean;
    children?: React.ReactNode;
    showChildrenContent: boolean;
    isLoading: boolean;
}) => {
    return (
        <Modal
            show={props.showSaveProgressModal}
            onHide={props.onHideSaveProgressModal}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {!props.showChildrenContent
                        ? "Salvar Progresso!"
                        : "Salvando Progresso..."}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!props.showChildrenContent &&
                    "Você tem certeza que deseja salvar o seu progresso?"}
                {props.showChildrenContent && props.children}
            </Modal.Body>
            <Modal.Footer>
                {!props.showChildrenContent && (
                    <React.Fragment>
                        <Button
                            variant="danger"
                            onClick={props.onHideSaveProgressModal}
                        >
                            Não
                        </Button>
                        <Button
                            variant="primary"
                            onClick={props.onSaveProgressSubmit}
                        >
                            Sim
                        </Button>
                    </React.Fragment>
                )}
                {props.showChildrenContent && (
                    <React.Fragment>
                        <Button
                            variant="primary"
                            onClick={props.onDismissSaveProgressModal}
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

export default SaveProgressModal;
