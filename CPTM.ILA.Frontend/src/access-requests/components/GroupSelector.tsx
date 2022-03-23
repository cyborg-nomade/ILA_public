import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";

export const groups = ["GGDC", "HFPD", "XPTY", "ZYPD"];

const GroupSelector = () => {
  const { changeGroup } = useContext(AuthContext);

  let navigate = useNavigate();

  const requestGroupAccessHandler = () => {
    navigate("/request-group-access");
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <Card.Title className="mb-3 text-center">
            Selecione o grupo desejado
          </Card.Title>
          <hr></hr>
          <Card.Text className="align-content-center text-center">
            <ButtonGroup vertical className="d-block">
              {groups.map((g) => (
                <Button
                  variant="outline-secondary"
                  onClick={() => changeGroup(g)}
                >
                  {g}
                </Button>
              ))}
            </ButtonGroup>
          </Card.Text>
          <hr></hr>
          <Button variant="success" onClick={requestGroupAccessHandler}>
            Solicitar Acesso a Novo Grupo
          </Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default GroupSelector;
