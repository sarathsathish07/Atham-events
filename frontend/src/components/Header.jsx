import { Navbar, Nav } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/images/Atham Logo2.png';

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" collapseOnSelect className="navbar-white-text" style={{ padding: '10px 80px' }}>
        <Navbar.Brand className="d-flex align-items-center">
          <LinkContainer to="/">
            <div className="d-flex align-items-center">
              <img
                src={logo}
                alt="Atham Logo"
                style={{ height: '50px', marginRight: '10px' }}
              />
            </div>
          </LinkContainer>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login">
              <Nav.Link>
                <FaSignInAlt /> Our Services
              </Nav.Link>
            </LinkContainer>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
