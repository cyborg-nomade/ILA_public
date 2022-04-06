import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";

const GroupSelector = () => {
  const { changeGroup, userGroups } = useContext(AuthContext);

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
            {userGroups.map((g) => (
              <Button
                key={g.id}
                variant="outline-secondary"
                onClick={() => changeGroup(g)}
              >
                {g.nome}
              </Button>
            ))}
          </ButtonGroup>
          <hr></hr>
          <Row>
            <Button variant="success" onClick={requestGroupAccessHandler}>
              Solicitar Acesso a Novo Grupo
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default GroupSelector;
