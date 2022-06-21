import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const RepproveCaseModal = (props: {
    onRepproveSubmit: (comentarioReprovacao: string) => void;
    onHideRepproveModal: () => void;
    onDismissRepproveModal: () => void;
    showRepproveModal: boolean;
    children?: React.ReactNode;
    showChildrenContent: boolean;
    isLoading: boolean;
    hasError: boolean;
}) => {
    const [comentarioReprovacao, setComentarioReprovacao] = useState("");
    return (
        <Modal
            show={props.showRepproveModal}
            onHide={props.onHideRepproveModal}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {!props.showChildrenContent
                        ? "Reprovar Processo!"
                        : "Reprovando Processo..."}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!props.showChildrenContent && (
                    <React.Fragment>
                        <p>
                            Você tem certeza que deseja reprovar este processo e
                            devolvê-lo à área responsável para revisão?
                        </p>
                        <Form.Control
                            disabled={props.isLoading}
                            as="textarea"
                            rows={5}
                            type="text"
                            onChange={(event) =>
                                setComentarioReprovacao(event.target.value)
                            }
                            value={comentarioReprovacao}
                            placeholder="Descreva o motivo da reprovação..."
                        />
                    </React.Fragment>
                )}
                {props.showChildrenContent && props.children}
            </Modal.Body>
            <Modal.Footer>
                {!props.showChildrenContent && (
                    <React.Fragment>
                        <Button
                            variant="danger"
                            onClick={props.onHideRepproveModal}
                        >
                            Não
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() =>
                                props.onRepproveSubmit(comentarioReprovacao)
                            }
                        >
                            Sim
                        </Button>
                    </React.Fragment>
                )}
                {props.showChildrenContent && !props.hasError && (
                    <React.Fragment>
                        <Button
                            variant="primary"
                            onClick={props.onDismissRepproveModal}
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
                            onClick={props.onHideRepproveModal}
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

export default RepproveCaseModal;
