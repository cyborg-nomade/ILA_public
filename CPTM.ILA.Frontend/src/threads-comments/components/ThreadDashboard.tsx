import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { ThreadStatusTotals } from "./../../shared/models/DTOs/thread-status-totals.model";

const ThreadDashboard = () => {
  const [pendentes, setPendentes] = useState(0);
  const [respondidos, setRespondidos] = useState(0);
  const [novos, setNovos] = useState(0);

  const {
    userId: uid,
    token,
    username,
    areaTratamentoDados,
    currentGroup,
  } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getGroupThreadTotals = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/threads/group/${currentGroup.id}/status/totals`,
        undefined,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData.totals);

      const loadedTotals: ThreadStatusTotals[] = responseData.totals;
      if (loadedTotals.length === 0) {
        setRespondidos(0);
        setPendentes(0);
        setNovos(0);
      } else {
        setRespondidos(loadedTotals[0].quantityInStatus);
        setPendentes(loadedTotals[1].quantityInStatus);
        setNovos(loadedTotals[2].quantityInStatus);
      }
    };

    getGroupThreadTotals().catch((error) => {
      console.log(error);
    });
  }, [sendRequest, token, currentGroup.id]);

  return (
    <React.Fragment>
      <Row>
        <h3 className="mb-4">Visão de Comentários</h3>
      </Row>
      <Row>
        <CardGroup>
          <Card border="danger">
            <Card.Header>Pendentes</Card.Header>
            <Card.Body>
              <h1 className="text-center">
                <Badge bg="danger">{pendentes}</Badge>
              </h1>
            </Card.Body>
          </Card>
          <Card border="secondary">
            <Card.Header>Respondidos</Card.Header>
            <Card.Body>
              <h1 className="text-center">
                <Badge bg="secondary">{respondidos}</Badge>
              </h1>
            </Card.Body>
          </Card>
          <Card border="warning">
            <Card.Header>Novos</Card.Header>
            <Card.Body>
              <h1 className="text-center">
                <Badge bg="warning">{novos}</Badge>
              </h1>
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
      <Row>
        <Button
          variant="success"
          className="mt-4 mx-auto"
          style={{ width: "8rem", height: "2.5rem" }}
          href="https://www.cptm.sp.gov.br/LGPD/Paginas/Perguntas-e-Respostas.aspx"
          target="blank"
        >
          Ajuda
        </Button>
      </Row>
    </React.Fragment>
  );
};

export default ThreadDashboard;
