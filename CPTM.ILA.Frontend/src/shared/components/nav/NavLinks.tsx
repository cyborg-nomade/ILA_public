import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
    const { user, isLoggedIn, logout } = useContext(AuthContext);

    return (
        <React.Fragment>
            {isLoggedIn && !user.isComite && (
                <Nav.Link as={NavLink} to={`/${user.id}/`}>
                    Início
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && !user.isDPO && (
                <Nav.Link as={NavLink} to={`/comite/`}>
                    Início
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && user.isDPO && (
                <Nav.Link as={NavLink} to={`/dpo/`}>
                    Início
                </Nav.Link>
            )}
            {isLoggedIn && !user.isComite && (
                <Nav.Link as={NavLink} to={`${user.id}/cases/`}>
                    Meus Processos
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && !user.isDPO && (
                <Nav.Link as={NavLink} to={`comite/cases/`}>
                    Meus Processos
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && user.isDPO && (
                <Nav.Link as={NavLink} to={`dpo/cases/`}>
                    Inventário
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && user.isDPO && (
                <Nav.Link as={NavLink} to={`dpo/cases/pending`}>
                    Pendentes
                </Nav.Link>
            )}
            {isLoggedIn && !user.isComite && (
                <Nav.Link as={NavLink} to={`${user.id}/cases/register/`}>
                    Formulário
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && !user.isDPO && (
                <Nav.Link as={NavLink} to={`comite/cases/approve/`}>
                    Aprovar
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && !user.isDPO && (
                <Nav.Link as={NavLink} to={`/comite/access-requests/approve/`}>
                    Req. de Acesso
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && user.isDPO && (
                <Nav.Link as={NavLink} to={`/dpo/access-requests/approve/`}>
                    Req. de Acesso
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && user.isDPO && (
                <Nav.Link as={NavLink} to={`/dpo/alter-comite-members`}>
                    Gerir Comitê
                </Nav.Link>
            )}
            {isLoggedIn && user.isComite && user.isDPO && (
                <Nav.Link as={NavLink} to={`/dpo/alter-users`}>
                    Gerir Usuários
                </Nav.Link>
            )}
            {isLoggedIn && <Nav.Link onClick={logout}>Sair</Nav.Link>}
            {!isLoggedIn && (
                <Nav.Link as={NavLink} to="/login">
                    Login
                </Nav.Link>
            )}
        </React.Fragment>
    );
};

export default NavLinks;
