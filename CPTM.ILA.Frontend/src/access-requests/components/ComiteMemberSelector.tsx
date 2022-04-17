import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import {
  emptyUser,
  User,
} from "../../shared/models/access-control/users.model";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { ComiteMember } from "../../shared/models/DTOs/comite-member";

const ComiteMemberSelector = () => {
  const { changeComiteMember, user, token } = useContext(AuthContext);

  const [comiteMembers, setComiteMembers] = useState<ComiteMember[]>([]);

  let navigate = useNavigate();

  const requestGroupAccessHandler = () => {
    navigate("/request-group-access");
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getGroups = async () => {
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

    getGroups().catch((error) => {
      console.log(error);
    });

    return () => {
      setComiteMembers([]);
    };
  }, [sendRequest, token]);

  return (
    <React.Fragment>
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
