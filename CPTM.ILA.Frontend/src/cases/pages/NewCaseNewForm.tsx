import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { diff } from "deep-object-diff";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import {
  emptyBaseCase,
  Case,
  emptyCase,
} from "./../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { ChangeLog } from "../../shared/models/change-logging/change-log.model";
import { CaseChange } from "../../shared/models/DTOs/case-change.model";
import { AgenteTratamento } from "../../shared/models/case-helpers/case-helpers.model";
import NewForm from "../components/NewForm";

const NewCaseNewForm = () => {
  const { token, user, currentGroup, areaTratamentoDados } =
    useContext(AuthContext);

  const [initialCase, setInitialCase] = useState<Case>(
    emptyCase(areaTratamentoDados)
  );

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  let navigate = useNavigate();

  useEffect(() => {
    const getComiteMembers = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/users/comite-members/${currentGroup.id}`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );
      const loadedComiteMember: AgenteTratamento = responseData.comiteMember;
      setInitialCase((prevCase) => ({
        ...prevCase,
        extensaoEncarregado: loadedComiteMember,
      }));
    };

    getComiteMembers().catch((error) => {
      console.log(error);
    });
  }, [currentGroup.id, sendRequest, token]);

  const saveProgressHandler = async (item: Case) => {
    console.log("Initial item: ", item);

    item.grupoCriadorId = currentGroup.id;
    const dateCriacaoParts = item.dataCriacao.split("/");
    const dateAtualizacaoParts = item.dataAtualizacao.split("/");
    item.dataCriacao = new Date(
      +dateCriacaoParts[2],
      +dateCriacaoParts[1] - 1,
      +dateCriacaoParts[0]
    ).toISOString();
    item.dataAtualizacao = new Date(
      +dateAtualizacaoParts[2],
      +dateAtualizacaoParts[1] - 1,
      +dateAtualizacaoParts[0]
    ).toISOString();
    item.area = currentGroup.nome;
    for (const value of Object.values(item.catDadosPessoaisSensiveis)) {
      if (value.length !== 0) {
        item.dadosPessoaisSensiveis = true;
      }
    }

    console.log("Altered item: ", item);

    const changeObj = diff(emptyBaseCase(), item);

    const changeLog: ChangeLog = {
      caseDiff: JSON.stringify(changeObj),
      caseId: 0,
      userId: user.id,
      changeDate: new Date(),
    };

    console.log("Change Log: ", changeLog);

    const caseChange: CaseChange = {
      case: item,
      changeLog: changeLog,
    };

    console.log("Case Change: ", caseChange);
  };

  const sendToApprovalHandler = async (item: Case) => {
    console.log("sah, Initial item: ", item);

    item.grupoCriadorId = currentGroup.id;
    item.area = currentGroup.nome;
    const dateCriacaoParts = item.dataCriacao.split("/");
    const dateAtualizacaoParts = item.dataAtualizacao.split("/");
    item.dataCriacao = new Date(
      +dateCriacaoParts[2],
      +dateCriacaoParts[1] - 1,
      +dateCriacaoParts[0]
    ).toISOString();
    item.dataAtualizacao = new Date(
      +dateAtualizacaoParts[2],
      +dateAtualizacaoParts[1] - 1,
      +dateAtualizacaoParts[0]
    ).toISOString();
    item.area = currentGroup.nome;
    for (const value of Object.values(item.catDadosPessoaisSensiveis)) {
      if (value.length !== 0) {
        item.dadosPessoaisSensiveis = true;
      }
    }

    console.log("sah, Altered item: ", item);

    const changeObj = diff(emptyBaseCase(), item);

    const changeLog: ChangeLog = {
      caseDiff: JSON.stringify(changeObj),
      caseId: 0,
      userId: user.id,
      changeDate: new Date(),
    };

    console.log("sah, Change Log: ", changeLog);

    const caseChange: CaseChange = {
      case: item,
      changeLog: changeLog,
    };

    console.log("sah, Case change: ", caseChange);
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
      <h1>Registrar Novo Processo</h1>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          Ocorreu um erro: {error}
        </Alert>
      )}
      <NewForm
        new={true}
        onSaveProgressSubmit={saveProgressHandler}
        onSendToApprovalSubmit={sendToApprovalHandler}
        item={initialCase}
      />
    </React.Fragment>
  );
};

export default NewCaseNewForm;
