import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { AuthContext } from "../../context/auth-context";
import { useCountdown } from "../../hooks/timer-hook";

const Footer = () => {
  const { user, currentGroup, tokenExpirationDate } = useContext(AuthContext);

  const { hours, minutes, seconds } = useCountdown(tokenExpirationDate);

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
            Sua sessão expira em: {hours < 10 && "0"}
            {hours}:{minutes < 10 && "0"}
            {minutes}:{seconds < 10 && "0"}
            {seconds}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
