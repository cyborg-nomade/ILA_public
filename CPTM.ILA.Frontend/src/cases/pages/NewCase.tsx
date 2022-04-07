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
import { ChangeLog } from "../../shared/models/change-logging/change-log.model";

const NewCase = () => {
  const [initialCase, setInitialCase] = useState<BaseCase | Case>(
    emptyBaseCase()
  );

  const { token, user } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  let navigate = useNavigate();

  const saveProgressHandler = async (item: BaseCase) => {
    item.usuarioCriador = user;
    item.area = item.extensaoEncarregado.area || "";
    for (const value of Object.values(item.categoriaDadosPessoaisSensiveis)) {
      if (value.length !== 0) {
        item.dadosPessoaisSensiveis = true;
      }
    }

    const changeObj = diff(emptyBaseCase(), item);

    const changeLog: ChangeLog = {
      caseDiff: JSON.stringify(changeObj),
      caseId: 0,
      userId: user.id,
      changeDate: new Date(),
    };

    try {
      await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/`,
        "POST",
        JSON.stringify(item),
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
    item.area = item.extensaoEncarregado.area || "";
    for (const value of Object.values(item.categoriaDadosPessoaisSensiveis)) {
      if (value.length !== 0) {
        item.dadosPessoaisSensiveis = true;
      }
    }

    try {
      const initialResponse = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/`,
        "POST",
        JSON.stringify(item),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      const savedCase: Case = initialResponse.case;

      await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/request-approval/${savedCase.id}`,
        "POST",
        JSON.stringify(item),
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
        item={initialCase}
      />
    </React.Fragment>
  );
};

export default NewCase;
