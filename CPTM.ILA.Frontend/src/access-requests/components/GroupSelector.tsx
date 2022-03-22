import React from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const groups = ["GGDC", "HFPD", "XPTY", "ZYPD"];

const GroupSelector = () => {
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
                <Button variant="outline-secondary">{g}</Button>
              ))}
            </ButtonGroup>
          </Card.Text>
          <hr></hr>
          <Button variant="success">Solicitar Acesso a Novo Group</Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default GroupSelector;
