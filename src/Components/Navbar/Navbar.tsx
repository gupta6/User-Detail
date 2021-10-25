import { Navbar, Container, Nav } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOutUser } from "../../store/actions";

const NavbarCon = () => {
  const User = useAppSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  function logout() {
    dispatch(logOutUser());
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="md">
        <Container>
          <Navbar.Brand>User Detail POC</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="">
                Welcome {User}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarCon;
