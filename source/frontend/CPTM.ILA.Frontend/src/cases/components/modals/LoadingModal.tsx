import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

const LoadingModal = (props: { isLoading: boolean }) => {
    return (
        <Modal show={props.isLoading} animation={false} centered size="sm">
            <Modal.Header>
                <Modal.Title>Carregando...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.isLoading && (
                    <Row className="justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default LoadingModal;
