import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { AuthContext } from "../../context/auth-context";

const Footer = () => {
  const { user, currentGroup, tokenExpirationDate } = useContext(AuthContext);
  const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();

  return (
    <Navbar
      bg="transparent"
      variant="dark"
      expand={"md"}
      collapseOnSelect
      style={{ background: "none" }}
      className="swiss721"
      fixed="bottom"
    >
      <Container fluid>
        <Nav
          className="justify-content-around flex-grow-1 pe-3"
          variant="pills"
        >
          <Nav.Link>Usuário: {user.username}</Nav.Link>
          <Nav.Link>Grupo: {currentGroup.nome}</Nav.Link>
          <Nav.Link>
            Sua sessão expira em: {remainingTime.toLocaleString()}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
