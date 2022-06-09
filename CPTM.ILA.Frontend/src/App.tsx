import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import MainHeader from "./shared/components/nav/MainHeader";
import "./App.css";
import Footer from "./shared/components/footer/Footer";
import CMGroupMgmtCockpit from "./access-requests/pages/CMGroupMgmtCockpit";
import ReprovadosCaseListGetter from "./cases/pages/ReprovadosCaseListGetter";
import ReprovadosEditCase from "./cases/pages/ReprovadosEditCase";
import DpoInventarioCasesListGetter from "./users/pages/DpoInventarioCasesListGetter";
import CheckCase from "./cases/pages/CheckCase";
import UsersMgmtCockpit from "./access-requests/pages/UsersMgmtCockpit";

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
const ComiteCasesListGetter = React.lazy(
    () => import("./users/pages/ComiteCasesListGetter")
);
const ComiteHomePage = React.lazy(() => import("./users/pages/ComiteHomePage"));
const DpoPage = React.lazy(() => import("./users/pages/DpoPage"));
const DpoCasesListGetter = React.lazy(
    () => import("./users/pages/DpoCasesListGetter")
);
const AlterComiteMemberCockpit = React.lazy(
    () => import("./access-requests/pages/AlterComiteMemberCockpit")
);
const DpoHomePage = React.lazy(() => import("./users/pages/DpoHomePage"));

const App = () => {
    const {
        user,
        isDeveloper,
        token,
        tokenExpirationDate,
        currentGroup,
        currentComiteMember,
        areaTratamentoDados,
        login,
        logout,
        changeGroup,
        changeComiteMember,
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
    } else if (token && !user.isComite && !user.isDPO) {
        routes = (
            <React.Fragment>
                <Route path="/:uid" element={<UserPage />}>
                    <Route index element={<Dashboards />} />
                    <Route path="cases" element={<UserCasesLayout />}>
                        <Route index element={<UserCasesListGetter />} />
                        <Route
                            path="register"
                            element={<CaseRegisterOptions />}
                        />
                        <Route
                            path="continue"
                            element={<ContinueCaseListGetter />}
                        />
                        <Route path="edit" element={<EditCaseListGetter />} />
                        <Route
                            path="reprovados"
                            element={<ReprovadosCaseListGetter />}
                        />
                    </Route>
                </Route>
                <Route path="/:uid/cases/register/new" element={<NewCase />} />
                <Route
                    path="/:uid/cases/continue/:cid"
                    element={<ContinueCase />}
                />
                <Route path="/:uid/cases/edit/:cid" element={<EditCase />} />
                <Route
                    path="/:uid/cases/reprovados/:cid"
                    element={<ReprovadosEditCase />}
                />
                <Route
                    path="/request-group-access"
                    element={<RequestGroupAccess />}
                />
                <Route path="/" element={<Navigate to={`../${user.id}/`} />} />
                <Route path="/*" element={<Navigate to={`../${user.id}/`} />} />
            </React.Fragment>
        );
    } else if (token && user.isComite && !user.isDPO) {
        routes = (
            <React.Fragment>
                <Route path="/comite/" element={<UserPage />}>
                    <Route index element={<Dashboards />} />
                    <Route path="cases" element={<ComiteHomePage />}>
                        <Route index element={<ComiteCasesListGetter />} />
                        <Route
                            path="approve"
                            element={<ApproveCasesListGetter />}
                        />
                    </Route>
                </Route>
                <Route
                    path="/comite/cases/approve/:cid"
                    element={<ApproveCaseGetter />}
                />
                <Route path="/comite/cases/:cid" element={<CheckCase />} />
                <Route
                    path="/comite/access-requests/approve"
                    element={<AllAccessRequestsPage />}
                >
                    <Route index element={<AcessRequestsListsCombiner />} />
                    <Route
                        path=":arid"
                        element={<ApproveAccessRequestGetter />}
                    />
                </Route>
                <Route
                    path="/request-group-access"
                    element={<RequestGroupAccess />}
                />
                <Route
                    path="/"
                    element={<Navigate replace to="../comite/" />}
                />
                <Route
                    path="/*"
                    element={<Navigate replace to="../comite/" />}
                />
            </React.Fragment>
        );
    } else if (token && user.isComite && user.isDPO) {
        routes = (
            <React.Fragment>
                <Route path="/dpo" element={<DpoHomePage />}>
                    <Route
                        path="cases"
                        element={<DpoInventarioCasesListGetter />}
                    >
                        <Route path=":cid" element={<CheckCase />} />
                    </Route>
                </Route>
                <Route path="/dpo" element={<DpoPage />}>
                    <Route index element={<Dashboards />} />
                    <Route path="cases" element={<UserCasesLayout />}>
                        <Route
                            path="pending"
                            element={<DpoCasesListGetter />}
                        />
                    </Route>
                </Route>
                <Route
                    path="/dpo/access-requests/approve"
                    element={<AllAccessRequestsPage />}
                >
                    <Route index element={<AcessRequestsListsCombiner />} />
                    <Route
                        path=":arid"
                        element={<ApproveAccessRequestGetter />}
                    />
                </Route>
                <Route path="/dpo/alter-users" element={<UsersMgmtCockpit />} />
                <Route
                    path="/dpo/alter-comite-members"
                    element={<AlterComiteMemberCockpit />}
                />
                <Route
                    path="/dpo/alter-cm-groups/:cmid"
                    element={<CMGroupMgmtCockpit />}
                />
                <Route path="/" element={<Navigate replace to="../dpo/" />} />
                <Route path="/*" element={<Navigate replace to="../dpo/" />} />
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
                currentComiteMember,
                areaTratamentoDados,
                isLoggedIn: !!token,
                tokenExpirationDate,
                login,
                logout,
                changeGroup,
                changeComiteMember,
            }}
        >
            <MainHeader />
            <Container
                className="mt-5 swiss721"
                style={{ paddingBottom: "70px" }}
                fluid
            >
                <Suspense
                    fallback={
                        <Row className="justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </Spinner>
                        </Row>
                    }
                >
                    <Routes>{routes}</Routes>
                </Suspense>
            </Container>
            {tokenExpirationDate && token && <Footer />}
        </AuthContext.Provider>
    );
};

export default App;
