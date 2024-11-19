import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = ({ userType }) => {
  const validUserTypes = ["guest", "pegawai", "admin"];
  if (!validUserTypes.includes(userType)) {
    userType = "guest";
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Asset Integrity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {userType === "guest" && (
              <>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact Us</Nav.Link>
                </LinkContainer>
              </>
            )}
            {userType === "pegawai" && (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/report">
                  <Nav.Link>Report</Nav.Link>
                </LinkContainer>
              </>
            )}
            {userType === "admin" && (
              <LinkContainer to="/admin-dashboard">
                <Nav.Link>Admin Dashboard</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          {userType === "guest" ? (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <Nav.Link href="/logout">Logout</Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
