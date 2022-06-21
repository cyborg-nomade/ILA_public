import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import PendingCasesCounter from "./PendingCasesCounter";

const GroupSelector = () => {
    const { changeGroup, user, currentGroup } = useContext(AuthContext);

    let navigate = useNavigate();

    const requestGroupAccessHandler = () => {
        navigate("/request-group-access");
    };

    return (
        <React.Fragment>
            <Card className="justify-content-center">
                <Card.Body>
                    <Card.Title className="mb-3 text-center">
                        Selecione o grupo desejado
                    </Card.Title>
                    <hr></hr>
                    <ButtonGroup
                        vertical
                        className="d-block align-content-center text-center"
                    >
                        {user.isComite && (
                            <Button
                                key={"TODOS"}
                                variant="outline-secondary"
                                onClick={() =>
                                    changeGroup({
                                        id: 0,
                                        nome: "TODOS",
                                        users: [],
                                    })
                                }
                                active={currentGroup.nome === "TODOS"}
                            >
                                TODOS
                            </Button>
                        )}
                        {user.groups.map((g) => (
                            <Button
                                key={g.id}
                                variant="outline-secondary"
                                onClick={() => changeGroup(g)}
                                active={g === currentGroup}
                            >
                                {g.nome}
                                {user.isComite && (
                                    <React.Fragment>
                                        - <PendingCasesCounter gid={g.id} />
                                    </React.Fragment>
                                )}
                            </Button>
                        ))}
                    </ButtonGroup>
                    {!user.isComite && <hr></hr>}
                    {!user.isComite && (
                        <Row>
                            <Button
                                variant="success"
                                onClick={requestGroupAccessHandler}
                            >
                                Solicitar Acesso a Novo Grupo
                            </Button>
                        </Row>
                    )}
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default GroupSelector;
