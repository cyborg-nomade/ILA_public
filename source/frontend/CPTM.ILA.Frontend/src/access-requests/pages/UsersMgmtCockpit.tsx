import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { ComiteMember } from "../../shared/models/DTOs/comite-member";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { ActionMeta, OptionsOrGroups, SingleValue } from "react-select";
import { useNavigate } from "react-router-dom";
import { UserDto } from "../../shared/models/DTOs/user-dto";

const UsersMgmtCockpit = () => {
    const { token } = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [users, setUsers] = useState<UserDto[]>([]);
    const [showUsers, setShowUsers] = useState<UserDto[]>([]);
    const [userSearch, setUserSearch] = useState("");
    const [message, setMessage] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const getAllUsers = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/users/`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedUsers: UserDto[] = responseData.users;
            console.log("loadedUsers: ", loadedUsers);
            setUsers(loadedUsers);
            setShowUsers(loadedUsers);
        };

        getAllUsers().catch((error) => {
            console.log(error);
        });

        return () => {
            setUsers([]);
            setShowUsers([]);
        };
    }, [sendRequest, token]);

    const handleRemoveUser = async (id: number) => {
        console.log(id);

        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/users/delete/${id}`,
                "POST",
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            console.log("remove member response: ", responseData);
            setMessage(responseData.message);

            const responseDataUsers = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/users/`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedUsers: UserDto[] = responseDataUsers.users;
            console.log("loadedUsers: ", loadedUsers);
            setUsers(loadedUsers);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserSearch(event.target.value);
        console.log("target value", event.target.value);
        if (event.target.value === "") {
            setShowUsers(users);
        } else {
            setShowUsers((prevUsers) =>
                prevUsers.filter(
                    (u) =>
                        u.nome.includes(event.target.value.toUpperCase()) ||
                        u.username.includes(event.target.value.toUpperCase())
                )
            );
        }
        console.log("users: ", users);
        console.log("show users: ", showUsers);
    };

    const clearMessage = () => {
        setMessage("");
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
            <h2>Alterar Usuários do Sistema</h2>
            {error && (
                <Row className="justify-content-center mx-auto">
                    <Alert variant="danger" onClose={clearError} dismissible>
                        {error}
                    </Alert>
                </Row>
            )}
            {message && (
                <Row className="justify-content-center mx-auto">
                    <Alert variant="success" onClose={clearMessage} dismissible>
                        {message}
                    </Alert>
                </Row>
            )}
            <Card className="mx-auto mt-4" style={{ width: "28rem" }}>
                <Card.Title className="pt-3 px-3">Adicionar Grupo</Card.Title>
                <Card.Body>
                    <InputGroup>
                        <InputGroup.Text>Pesquisar usuários: </InputGroup.Text>
                        <div className="form-control p-0">
                            <Form.Control
                                onChange={handleSearchUsers}
                                value={userSearch}
                                placeholder="Pesquisar usuários..."
                            />
                        </div>
                    </InputGroup>
                </Card.Body>
            </Card>
            <Card
                className="justify-content-center mx-auto mt-4"
                style={{ width: "28rem" }}
            >
                <Card.Title className="pt-3 px-3">Usuários Atuais</Card.Title>
                <Card.Body>
                    <ListGroup>
                        {showUsers.map((u) => (
                            <ListGroup.Item className="p-0" key={u.id}>
                                <InputGroup>
                                    <InputGroup.Text key={u.id} as={Col} lg={9}>
                                        <div>{u.nome}</div>
                                    </InputGroup.Text>
                                    <Col lg={3} className="m-0">
                                        <Button
                                            className="w-100"
                                            variant="danger"
                                            onClick={async () => {
                                                await handleRemoveUser(u.id);
                                            }}
                                        >
                                            Remover
                                        </Button>
                                    </Col>
                                </InputGroup>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default UsersMgmtCockpit;
