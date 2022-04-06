import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import NavLinks from "./NavLinks";

const MainHeader = () => {
  return (
    <Navbar
      bg="transparent"
      expand={"md"}
      collapseOnSelect
      style={{ background: "none" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {/* <img
              src={logo}
              alt="logo-cptm"
              width="30%"
              className="d-inline-block align-top"
            /> */}
          Inventário LGPD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3" variant="tabs">
            <NavLinks />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;
