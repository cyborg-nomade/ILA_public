import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import { AuthContext } from "./../../context/auth-context";

const NavLinks = () => {
  const authContext = useContext(AuthContext);

  return (
    <React.Fragment>
      {authContext.isLoggedIn && (
        <Nav.Link as={NavLink} to="/">
          Página Inicial
        </Nav.Link>
      )}
      {authContext.isLoggedIn && !authContext.isComite && (
        <Nav.Link as={NavLink} to={`${authContext.userId}/cases/new`}>
          Novo
        </Nav.Link>
      )}
      {authContext.isLoggedIn && authContext.isComite && (
        <Nav.Link as={NavLink} to={`comite/cases/approve`}>
          Aprovações Pendentes
        </Nav.Link>
      )}
      {authContext.isLoggedIn && (
        <Nav.Link onClick={authContext.logout}>Sair</Nav.Link>
      )}
      {!authContext.isLoggedIn && (
        <Nav.Link as={NavLink} to="/login">
          Login
        </Nav.Link>
      )}
    </React.Fragment>
  );
};

export default NavLinks;
