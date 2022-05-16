import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { diff } from "deep-object-diff";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { Case, emptyCase } from "../../shared/models/cases.model";
import { ChangeLog } from "../../shared/models/change-logging/change-log.model";
import { CaseChange } from "../../shared/models/DTOs/case-change.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CaseForm from "../components/CaseForm";

const EditCase = () => {
  const [fullCase, setFullCase] = useState<Case>(emptyCase());

  const { user, token, currentGroup } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  const cid = +(useParams().cid || "");
  let navigate = useNavigate();

  useEffect(() => {
    const getCaseToEdit = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );
      let loadedCase: Case = responseData.uniqueCase;
      loadedCase.dataCriacao = new Date(
        loadedCase.dataCriacao
      ).toLocaleDateString();
      loadedCase.dataAtualizacao = new Date().toLocaleDateString();
      setFullCase(loadedCase);
    };

    getCaseToEdit().catch((error) => {
      console.log(error);
    });
  }, [cid, sendRequest, token]);

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  const saveProgressHandler = async (item: Case) => {
    console.log("Initial item: ", item);

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
    item.aprovado = false;
    item.encaminhadoAprovacao = false;

    for (const value of Object.values(item.catDadosPessoaisSensiveis)) {
      if (value.length !== 0) {
        item.dadosPessoaisSensiveis = true;
      }
    }

    console.log("Altered item: ", item);

    const changeObj = diff(fullCase, item);

    const changeLog: ChangeLog = {
      caseDiff: JSON.stringify(changeObj),
      caseId: cid,
      userId: user.id,
      changeDate: new Date(),
    };

    console.log("Change Log: ", changeLog);

    const caseChange: CaseChange = {
      case: item,
      changeLog: changeLog,
    };

    console.log("Case Change: ", caseChange);

    try {
      await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
        "POST",
        JSON.stringify(caseChange),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      navigate(`/`);
    } catch (err) {
      console.log(err);
      item.dataCriacao = new Date(item.dataCriacao).toLocaleDateString();
      item.dataAtualizacao = new Date().toLocaleDateString();
      setFullCase(item);
    }
  };

  const sendToApprovalHandler = async (item: Case) => {
    console.log("sah, Initial item: ", item);

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

    const changeObj = diff(fullCase, item);

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

    console.log("sah, Case change: ", changeLog);

    try {
      const initialResponse = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
        "POST",
        JSON.stringify(caseChange),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      const savedCase: Case = initialResponse.caseToSave;

      const resp2 = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/request-approval/${savedCase.id}`,
        "POST",
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );
      console.log(resp2);

      navigate(`/`);
    } catch (err) {
      console.log(err);
      item.dataCriacao = new Date(item.dataCriacao).toLocaleDateString();
      item.dataAtualizacao = new Date().toLocaleDateString();
      setFullCase(item);
    }
  };

  return (
    <React.Fragment>
      <h1>Alterar Processo Aprovado</h1>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          Ocorreu um erro: {error}
        </Alert>
      )}
      <CaseForm
        item={fullCase}
        edit={true}
        onSaveProgressSubmit={saveProgressHandler}
        onSendToApprovalSubmit={sendToApprovalHandler}
      />
    </React.Fragment>
  );
};

export default EditCase;
