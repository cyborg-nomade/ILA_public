import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import {
  BaseFullCaseObject,
  emptyBaseFullCaseObject,
} from "../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import CaseForm from "../components/CaseForm";

const EditCase = () => {
  const [fullCase, setFullCase] = useState<BaseFullCaseObject>(
    emptyBaseFullCaseObject()
  );

  const { userId: uid, token } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  const cid = useParams().cid || "";
  let navigate = useNavigate();

  useEffect(() => {
    const getCaseToEdit = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );
      let loadedCase = responseData.case;
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

  const submitFormHandler = async (item: BaseFullCaseObject) => {
    item.area = item.extensaoEncarregado.area || "";
    item.criador = uid;
    for (const value of Object.values(item.categoriaDadosPessoaisSensiveis)) {
      if (value.descricao !== "Não se aplica") {
        item.dadosPessoaisSensiveis = true;
      }
    }

    try {
      await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
        "PUT",
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

  return (
    <React.Fragment>
      <h1>Editar Item</h1>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          Ocorreu um erro: {error}
        </Alert>
      )}
      <CaseForm item={fullCase} edit={true} onSubmit={submitFormHandler} />
    </React.Fragment>
  );
};

export default EditCase;
