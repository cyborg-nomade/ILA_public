import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";

import { ComiteMember } from "../../shared/models/DTOs/comite-member";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const AlterComiteMemberCockpit = () => {
  const { token } = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [comiteMembers, setComiteMembers] = useState<ComiteMember[]>([]);
  const [memberToAdd, setMemberToAdd] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getComiteMembers = async () => {
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

      setComiteMembers(loadedMembers);
    };

    getComiteMembers().catch((error) => {
      console.log(error);
    });

    return () => {
      setComiteMembers([]);
    };
  }, [sendRequest, token]);

  const handleMemberToAddChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMemberToAdd(event.currentTarget.value);
  };

  const handleAddMember = async () => {
    console.log(memberToAdd);

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/add-comite-member`,
        "POST",
        JSON.stringify(memberToAdd),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData);
      setMessage(responseData.message);

      const responseDataComiteMembers = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/users/comite-members`,
        undefined,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      const loadedMembers: ComiteMember[] =
        responseDataComiteMembers.comiteMembers;

      setComiteMembers(loadedMembers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveMember = async (id: number) => {
    console.log(id);

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/remove-comite-member/${id}`,
        "POST",
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData);
      setMessage(responseData.message);

      const responseDataComiteMembers = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/users/comite-members`,
        undefined,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      const loadedMembers: ComiteMember[] =
        responseDataComiteMembers.comiteMembers;

      setComiteMembers(loadedMembers);
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
      <h2>Alterar Membros do Comitê</h2>
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
      <Card
        className="justify-content-center mx-auto mt-4"
        style={{ width: "28rem" }}
      >
        <Card.Title className="pt-3 px-3">Adicionar Membro</Card.Title>
        <Card.Body>
          <InputGroup className="justify-content-center">
            <InputGroup.Text>Login do Novo Membro: </InputGroup.Text>
            <Form.Control
              type="text"
              value={memberToAdd}
              onChange={handleMemberToAddChange}
            />
            <Button onClick={handleAddMember}>Adicionar</Button>
          </InputGroup>
        </Card.Body>
      </Card>
      <Card
        className="justify-content-center mx-auto mt-4"
        style={{ width: "28rem" }}
      >
        <Card.Title className="pt-3 px-3">Membros Atuais</Card.Title>
        <Card.Body>
          <ListGroup>
            {comiteMembers.map((cm) => (
              <ListGroup.Item className="p-0" key={cm.id}>
                <InputGroup>
                  <InputGroup.Text key={cm.id} as={Col} lg={9}>
                    {cm.nome}
                  </InputGroup.Text>
                  <Col lg={3} className="m-0">
                    <Button
                      className="w-100"
                      variant="danger"
                      onClick={async () => {
                        await handleRemoveMember(cm.id);
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

export default AlterComiteMemberCockpit;
