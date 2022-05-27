import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { ComiteMember } from "../../shared/models/DTOs/comite-member";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const ComiteMemberSelector = () => {
  const { changeComiteMember, token, currentComiteMember } =
    useContext(AuthContext);

  const [comiteMembers, setComiteMembers] = useState<ComiteMember[]>([]);

  const { isLoading, error, sendRequest, clearError, isWarning } =
    useHttpClient();

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
      console.log("loadedMembers: ", loadedMembers);

      setComiteMembers(loadedMembers);
    };

    getComiteMembers().catch((error) => {
      console.log(error);
    });

    return () => {
      setComiteMembers([]);
    };
  }, [sendRequest, token]);

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
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          {error}
        </Alert>
      )}
      <Card className="justify-content-center">
        <Card.Body>
          <Card.Title className="mb-3 text-center">
            Selecione o membro desejado
          </Card.Title>
          <hr></hr>
          <ButtonGroup
            vertical
            className="d-block align-content-center text-center"
          >
            {comiteMembers.map((cm) => (
              <Button
                key={cm.id}
                variant="outline-secondary"
                onClick={() => changeComiteMember(cm)}
                active={cm === currentComiteMember}
              >
                {cm.nome}
              </Button>
            ))}
          </ButtonGroup>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ComiteMemberSelector;
