import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Select, { ActionMeta, GroupBase, MultiValue } from "react-select";
import { useParams } from "react-router-dom";
import { Group } from "../../shared/models/access-control/group.model";
import {
    ComiteMember,
    emptyComiteMember,
} from "../../shared/models/DTOs/comite-member";

const CMGroupMgmtCockpit = () => {
    const { token } = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [comiteMemberEditing, setComiteMemberEditing] = useState(
        emptyComiteMember()
    );
    const [groups, setGroups] = useState<
        GroupBase<{
            value: string;
            label: string;
        }>[]
    >([]);
    const [cmGroups, setCmGroups] = useState<Group[]>([]);
    const [cmGroupsToAdd, setCmGroupsToAdd] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    const cmid = useParams().cmid;

    useEffect(() => {
        const getComiteMemberEditing = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/users/comite-members`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedMembers: ComiteMember[] = responseData.comiteMembers;
            console.log("loadedMembers", loadedMembers);

            const cmEditing = loadedMembers.find(
                (cm) => cm.id.toString() === cmid
            );
            console.log("cmEditing", cmEditing);

            if (cmEditing) setComiteMemberEditing(cmEditing);
            else setComiteMemberEditing(emptyComiteMember());
        };

        getComiteMemberEditing().catch((error) => {
            console.log(error);
        });

        return () => {
            setComiteMemberEditing(emptyComiteMember());
        };
    }, [cmid, sendRequest, token]);

    useEffect(() => {
        const getCmGroups = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/access-requests/groups/user/${cmid}`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const cmLoadedGroups: Group[] = responseData.userGroups;
            console.log("cmLoadedGroups", cmLoadedGroups);

            setCmGroups(cmLoadedGroups);
        };

        getCmGroups().catch((error) => {
            console.log(error);
        });

        return () => {
            setCmGroups([]);
        };
    }, [cmid, sendRequest, token]);

    const handleGroupsToAddChange = (
        options: MultiValue<{ value: string; label: string }>,
        actionMeta: ActionMeta<{ value: string; label: string }>
    ) => {
        if (actionMeta.action === "clear") setCmGroupsToAdd([]);
        const values = options.map((o) => o.value);
        if (options) setCmGroupsToAdd(values);
    };

    useEffect(() => {
        const getGroups = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/groups`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                }
            );

            const groupedOptions: GroupBase<{
                value: string;
                label: string;
            }>[] = [
                {
                    label: "Diretorias",
                    options: responseData.diretorias.map((d: string) => ({
                        value: d,
                        label: d,
                    })),
                },
                {
                    label: "Gerencias",
                    options: responseData.gerencias.map((g: string) => ({
                        value: g,
                        label: g,
                    })),
                },
                {
                    label: "Departamentos",
                    options: responseData.deptos.map((dpto: string) => ({
                        value: dpto,
                        label: dpto,
                    })),
                },
            ];

            console.log("groupedOptions: ", groupedOptions);

            setGroups(groupedOptions);
        };

        getGroups().catch((error) => {
            console.log(error);
        });

        return () => {
            setGroups([]);
        };
    }, [sendRequest]);

    const handleAddCmGroups = async () => {
        console.log(cmGroupsToAdd);

        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/access-requests/groups/user/${cmid}/add`,
                "POST",
                JSON.stringify(cmGroupsToAdd),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            console.log("add cm groups response: ", responseData);
            setMessage(responseData.message);

            const responseDataCmGroups = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/access-requests/groups/user/${cmid}`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const cmLoadedGroups: Group[] = responseDataCmGroups.userGroups;
            console.log("cmLoadedGroups: ", cmLoadedGroups);

            setCmGroups(cmLoadedGroups);
            setCmGroupsToAdd([]);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveCmGroups = async (gid: number) => {
        console.log("gid to remove: ", gid);

        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/access-requests/groups/user/${cmid}/remove`,
                "POST",
                JSON.stringify(gid),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            console.log("remove cm group response: ", responseData);
            setMessage(responseData.message);

            const responseDataCmGroups = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/access-requests/groups/user/${cmid}`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const cmLoadedGroups: Group[] = responseDataCmGroups.userGroups;
            console.log("cmLoadedGroups: ", cmLoadedGroups);

            setCmGroups(cmLoadedGroups);
        } catch (err) {
            console.log(err);
        }
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
            <h2>
                Alterar Grupos do Membro do Comitê - {comiteMemberEditing.nome}{" "}
            </h2>
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
                        <InputGroup.Text>Novos Grupos: </InputGroup.Text>
                        <div className="form-control p-0">
                            <Select
                                options={groups}
                                value={cmGroupsToAdd.map((v) => ({
                                    value: v,
                                    label: v,
                                }))}
                                onChange={handleGroupsToAddChange}
                                isSearchable
                                isClearable
                                isMulti
                                placeholder="Selecione os grupos a serem acessados"
                            />
                        </div>
                        <Button onClick={handleAddCmGroups}>Adicionar</Button>
                    </InputGroup>
                </Card.Body>
            </Card>
            <Card
                className="justify-content-center mx-auto mt-4"
                style={{ width: "28rem" }}
            >
                <Card.Title className="pt-3 px-3">Grupos Atuais</Card.Title>
                <Card.Body>
                    <ListGroup>
                        {cmGroups.map((cm) => (
                            <ListGroup.Item className="p-0" key={cm.id}>
                                <InputGroup>
                                    <InputGroup.Text
                                        key={cm.id}
                                        as={Col}
                                        lg={9}
                                    >
                                        {cm.nome}
                                    </InputGroup.Text>
                                    <Col lg={3} className="m-0">
                                        <Button
                                            className="w-100"
                                            variant="danger"
                                            onClick={async () => {
                                                await handleRemoveCmGroups(
                                                    cm.id
                                                );
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

export default CMGroupMgmtCockpit;
