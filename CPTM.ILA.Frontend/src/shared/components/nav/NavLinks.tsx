import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import { AuthContext } from "./../../context/auth-context";

const NavLinks = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <React.Fragment>
      {isLoggedIn && !user.isComite && (
        <Nav.Link as={NavLink} to={`/${user.id}/`}>
          Página Inicial
        </Nav.Link>
      )}
      {isLoggedIn && user.isComite && !user.isDPO && (
        <Nav.Link as={NavLink} to={`/comite/`}>
          Página Inicial
        </Nav.Link>
      )}
      {isLoggedIn && user.isComite && user.isDPO && (
        <Nav.Link as={NavLink} to={`/dpo/`}>
          Página Inicial
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
          Processos Pendentes
        </Nav.Link>
      )}
      {isLoggedIn && !user.isComite && (
        <Nav.Link as={NavLink} to={`${user.id}/cases/register/`}>
          Formulário
        </Nav.Link>
      )}
      {isLoggedIn && user.isComite && !user.isDPO && (
        <Nav.Link as={NavLink} to={`comite/cases/approve/`}>
          Aprovar Processos
        </Nav.Link>
      )}
      {isLoggedIn && user.isComite && !user.isDPO && (
        <Nav.Link as={NavLink} to={`/comite/access-requests/approve/`}>
          Aprovar Requisições de Acesso
        </Nav.Link>
      )}
      {isLoggedIn && user.isComite && user.isDPO && (
        <Nav.Link as={NavLink} to={`/dpo/access-requests/approve/`}>
          Aprovar Requisições de Acesso
        </Nav.Link>
      )}
      {isLoggedIn && user.isComite && user.isDPO && (
        <Nav.Link as={NavLink} to={`/dpo/alter-comite-members`}>
          Alterar Membros Comitê
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
