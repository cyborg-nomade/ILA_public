import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { emptyCase, BaseCase } from "../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AccessRequestForm from "./../components/AccessRequestForm";
import {
  AccessRequest,
  BaseAccessRequest,
  emptyAccessRequest,
} from "../../shared/models/access-control/access-request.model";

const ApproveAccessRequestGetter = () => {
  const [accessRequest, setAccessRequest] = useState<
    BaseAccessRequest | AccessRequest
  >(emptyAccessRequest);

  const { token } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  const arid = useParams().arid;
  let navigate = useNavigate();

  useEffect(() => {
    const getCaseToApprove = async () => {
      console.log(token);

      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/${arid}`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );

      let loadedAccessRequest = responseData.accessRequest;

      setAccessRequest(loadedAccessRequest);
      console.log(loadedAccessRequest);
    };

    getCaseToApprove().catch((error) => {
      console.log(error);
    });
  }, [arid, sendRequest, token]);

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  const approveHandler = async (item: BaseAccessRequest | AccessRequest) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/approve/${arid}`,
        "POST",
        JSON.stringify(true),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      navigate(`/comite/access-requests/approve`);
    } catch (err) {
      console.log(err);
      setAccessRequest(item);
    }
  };

  const rejectHandler = async (item: BaseAccessRequest | AccessRequest) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/access-requests/approve/${arid}`,
        "POST",
        JSON.stringify(false),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      navigate(`/comite/access-requests/approve`);
    } catch (err) {
      console.log(err);
      setAccessRequest(item);
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
      <AccessRequestForm
        item={accessRequest}
        approve={true}
        onSubmit={approveHandler}
        onReject={rejectHandler}
      />
    </React.Fragment>
  );
};

export default ApproveAccessRequestGetter;
