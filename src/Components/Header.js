import {Link} from "react-router-dom";
import {Navbar, Container, Nav} from "react-bootstrap";
import Buscador from "./Buscador";

function Header() {
 return (
    <Navbar className="navBg" bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand to="#home">Movies by Shei</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                
                <Nav.Link as={Link}to="/listado">Movies</Nav.Link>
                <Nav.Link as={Link}to="/contacto">Contact</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            <Buscador/>
        </Container>
    </Navbar>
              
 );
  
}

export default Header;