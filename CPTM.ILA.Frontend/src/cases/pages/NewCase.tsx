import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import {
  emptyBaseFullCaseObject,
  BaseFullCaseObject,
} from "./../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import CaseForm from "../components/CaseForm";

const NewCase = () => {
  const [fullCase, setFullCase] = useState<BaseFullCaseObject>(
    emptyBaseFullCaseObject()
  );

  const { token } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  let navigate = useNavigate();

  const submitFormHandler = async (item: BaseFullCaseObject) => {
    item.area = item.extensaoEncarregado.area || "";
    for (const value of Object.values(item.categoriaDadosPessoaisSensiveis)) {
      if (value.descricao !== "Não se aplica") {
        item.dadosPessoaisSensiveis = true;
      }
    }

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
      setFullCase(item);
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
      <CaseForm new={true} onSubmit={submitFormHandler} item={fullCase} />
    </React.Fragment>
  );
};

export default NewCase;
