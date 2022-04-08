import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import MainHeader from "./shared/components/nav/MainHeader";
import "./App.css";

const AllCasesListGetter = React.lazy(
  () => import("./cases/pages/AllCasesListGetter")
);
const ApproveCasesListGetter = React.lazy(
  () => import("./cases/pages/ApproveCasesListGetter")
);
const EditCase = React.lazy(() => import("./cases/pages/EditCase"));
const NewCase = React.lazy(() => import("./cases/pages/NewCase"));
const Login = React.lazy(() => import("./users/pages/Login"));
const UserCasesListGetter = React.lazy(
  () => import("./users/pages/UserCasesListGetter")
);
const UserPage = React.lazy(() => import("./users/pages/UserPage"));
const ApproveCaseGetter = React.lazy(
  () => import("./cases/pages/ApproveCaseGetter")
);
const ApproveCasesPage = React.lazy(
  () => import("./cases/pages/ApproveCasesPage")
);
const AllCasesPage = React.lazy(() => import("./cases/pages/AllCasesPage"));
const RequestAccess = React.lazy(() => import("./users/pages/RequestAccess"));
const AllAccessRequestsPage = React.lazy(
  () => import("./access-requests/pages/AllAccessRequestsPage")
);
const AcessRequestsListsCombiner = React.lazy(
  () => import("./access-requests/pages/AcessRequestsListsCombiner")
);
const ApproveAccessRequestGetter = React.lazy(
  () => import("./access-requests/pages/ApproveAccessRequestGetter")
);
const RequestGroupAccess = React.lazy(
  () => import("./access-requests/pages/RequestGroupAccess")
);
const Dashboards = React.lazy(() => import("./users/pages/Dashboards"));
const UserCasesLayout = React.lazy(
  () => import("./users/pages/UserCasesLayout")
);
const CaseRegisterOptions = React.lazy(
  () => import("./cases/pages/CaseRegisterOptions")
);
const ContinueCase = React.lazy(() => import("./cases/pages/ContinueCase"));
const ContinueCaseListGetter = React.lazy(
  () => import("./cases/pages/ContinueCaseListGetter")
);
const EditCaseListGetter = React.lazy(
  () => import("./cases/pages/EditCaseListGetter")
);

const App = () => {
  const {
    user,
    isDeveloper,
    token,
    currentGroup,
    areaTratamentoDados,
    login,
    logout,
    changeGroup,
  } = useAuth();

  let routes;

  if (!token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Login />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="*" element={<Navigate to="/" />} />
      </React.Fragment>
    );
  } else if (token && !user.isComite) {
    routes = (
      <React.Fragment>
        <Route path="/:uid" element={<UserPage />}>
          <Route index element={<Dashboards />} />
          <Route path="cases" element={<UserCasesLayout />}>
            <Route index element={<UserCasesListGetter />} />
            <Route path="register" element={<CaseRegisterOptions />} />
            <Route path="continue" element={<ContinueCaseListGetter />} />
            <Route path="edit" element={<EditCaseListGetter />} />
          </Route>
        </Route>
        <Route path="/:uid/cases/register/new" element={<NewCase />} />
        <Route path="/:uid/cases/continue/:cid" element={<ContinueCase />} />
        <Route path="/:uid/cases/edit/:cid" element={<EditCase />} />
        <Route path="/" element={<Navigate to={`../${user.id}/`} />} />
        <Route path="/*" element={<Navigate to={`../${user.id}/`} />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/comite/cases" element={<AllCasesPage />}>
          <Route index element={<AllCasesListGetter />} />
          <Route path=":cid" element={<EditCase />} />
        </Route>
        <Route path="/comite/cases/approve" element={<ApproveCasesPage />}>
          <Route index element={<ApproveCasesListGetter />} />
          <Route path=":cid" element={<ApproveCaseGetter />} />
        </Route>
        <Route
          path="/comite/access-requests/approve"
          element={<AllAccessRequestsPage />}
        >
          <Route index element={<AcessRequestsListsCombiner />} />
          <Route path=":arid" element={<ApproveAccessRequestGetter />} />
        </Route>
        <Route path="/request-group-access" element={<RequestGroupAccess />} />
        <Route path="/" element={<Navigate replace to="../comite/cases" />} />
        <Route path="*" element={<Navigate replace to="../comite/cases" />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isDeveloper,
        token,
        currentGroup,
        areaTratamentoDados,
        isLoggedIn: !!token,
        login,
        logout,
        changeGroup,
      }}
    >
      <MainHeader />
      <Container className="mt-5 swiss721" fluid>
        <Suspense
          fallback={
            <Row className="justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Row>
          }
        >
          <Routes>{routes}</Routes>
        </Suspense>
      </Container>
    </AuthContext.Provider>
  );
};

export default App;
