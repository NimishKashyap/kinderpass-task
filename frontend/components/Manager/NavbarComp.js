import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Link from "next/link";

function NavbarComp() {
  const handleSignout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="font-weight-bold">
          KinderPass
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <li className="mx-4">
              <Link href="/">Home</Link>
            </li>
            <li className="mx-4">
              <Link href="/auth/signin">Login</Link>
            </li>
            <li className="mx-4">
              <Link href="/auth/signup">SignUp</Link>
            </li>
            <li onClick={handleSignout} className="mx-4">
              <Link href={"/"}>SignOut</Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
