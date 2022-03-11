import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import {
  emptyFullCaseObject,
  BaseFullCaseObject,
} from "../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CaseForm from "../components/CaseForm";

const ApproveCase = () => {
  const [fullCase, setFullCase] = useState<BaseFullCaseObject>(
    emptyFullCaseObject()
  );

  const { token } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  const cid = useParams().cid;
  let navigate = useNavigate();

  useEffect(() => {
    const getCaseToApprove = async () => {
      console.log(token);

      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/${cid}`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );

      let loadedCase = responseData.case;

      setFullCase(loadedCase);
    };

    getCaseToApprove().catch((error) => {
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
    item.aprovado = true;

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

      navigate(`/comite/cases`);
    } catch (err) {
      console.log(err);
      setFullCase(item);
    }
  };

  return (
    <React.Fragment>
      <h1>Aprovar Item</h1>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          Ocorreu um erro: {error}
        </Alert>
      )}
      <CaseForm item={fullCase} approve={true} onSubmit={submitFormHandler} />
    </React.Fragment>
  );
};

export default ApproveCase;
