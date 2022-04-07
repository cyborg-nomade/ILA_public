import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import {
  emptyBaseCase,
  BaseCase,
  Case,
} from "./../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import CaseForm from "../components/CaseForm";
import {
  diff,
  addedDiff,
  deletedDiff,
  updatedDiff,
  detailedDiff,
} from "deep-object-diff";
import {
  BaseChangeLog,
  ChangeLog,
} from "../../shared/models/change-logging/change-log.model";
import { CaseChange } from "../../shared/models/DTOs/case-change.model";

const NewCase = () => {
  const [initialCase, setInitialCase] = useState<BaseCase | Case>(
    emptyBaseCase()
  );

  const { token, user, currentGroup } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  let navigate = useNavigate();

  const saveProgressHandler = async (item: BaseCase) => {
    console.log("Initial item: ", item);

    item.usuarioCriadorId = user.id;
    item.grupoCriadorId = currentGroup.id;
    item.area = item.extensaoEncarregado.area || "";
    for (const value of Object.values(item.categoriaDadosPessoaisSensiveis)) {
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

    try {
      await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/`,
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
      setInitialCase(item);
    }
  };

  const sendToApprovalHandler = async (item: BaseCase | Case) => {
    console.log("sah, Initial item: ", item);

    item.usuarioCriadorId = user.id;
    item.grupoCriadorId = currentGroup.id;
    item.area = item.extensaoEncarregado.area || "";
    for (const value of Object.values(item.categoriaDadosPessoaisSensiveis)) {
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

    console.log("sah, Case change: ", changeLog);

    try {
      const initialResponse = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/`,
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
      setInitialCase(item);
    }
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
      <h1>Registrar Novo Item</h1>
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
        new={true}
        onSaveProgressSubmit={saveProgressHandler}
        onSendToApprovalSubmit={sendToApprovalHandler}
        item={initialCase}
      />
    </React.Fragment>
  );
};

export default NewCase;
