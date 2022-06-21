import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Case } from "../../../shared/models/cases.model";

const DeleteModal = (props: {
    onDeleteSubmit: (cid: number) => void;
    onHideDeleteModal: () => void;
    onDismissDeleteModal: () => void;
    showDeleteModal: boolean;
    children?: React.ReactNode;
    showChildrenContent: boolean;
    isLoading: boolean;
    hasError: boolean;
    item: Case;
}) => {
    return (
        <Modal
            show={props.showDeleteModal}
            onHide={props.onHideDeleteModal}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {!props.showChildrenContent
                        ? "Remover Registro!"
                        : "Removendo Registro..."}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!props.showChildrenContent &&
                    `Você está prestes a deletar o registro ${props.item.nome}`}
                {props.showChildrenContent && props.children}
            </Modal.Body>
            <Modal.Footer>
                {!props.showChildrenContent && (
                    <React.Fragment>
                        <Button
                            variant="danger"
                            onClick={() => props.onDeleteSubmit(props.item.id)}
                        >
                            Prosseguir com Remoção
                        </Button>
                        <Button
                            variant="primary"
                            onClick={props.onHideDeleteModal}
                        >
                            Cancelar
                        </Button>
                    </React.Fragment>
                )}
                {props.showChildrenContent && !props.hasError && (
                    <React.Fragment>
                        <Button
                            variant="primary"
                            onClick={props.onDismissDeleteModal}
                            disabled={props.isLoading}
                        >
                            OK
                        </Button>
                    </React.Fragment>
                )}
                {props.showChildrenContent && props.hasError && (
                    <React.Fragment>
                        <Button
                            variant="danger"
                            onClick={props.onHideDeleteModal}
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

export default DeleteModal;
