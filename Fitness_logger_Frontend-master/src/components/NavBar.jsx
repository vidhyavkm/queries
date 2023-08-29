import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.jpg';
import { PersonCircle } from "react-bootstrap-icons";
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    window.sessionStorage.clear();
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="border border-5" style={{backgroundColor:"#270c42", borderBlockEnd:"#866abd"}}>
      <Container className='fw-bold'>
        <Navbar.Brand className='fw-bold text-white'><img src={logo} style={{width:"35px", marginTop:"-7px"}}></img> FITNESS LOGGER</Navbar.Brand>&nbsp;&nbsp;&nbsp;
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='text-white bg-white' variant='white'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home" className='fw-bold text-white'>Home</Nav.Link>
          </Nav>
         <Nav className='me-auto'>
            <Nav.Link href="/exercises" className='fw-bold text-white'>Exercises</Nav.Link>
          </Nav>
          {/* <Nav className='me-auto'>
            <Nav.Link href="/recordActivity">Record Activity</Nav.Link>
          </Nav> */}
          <Nav className='me-auto'>
            <Nav.Link href="/track-progress" className='fw-bold text-white'>Track Progress</Nav.Link>
          </Nav>
          <Nav className='me-auto'>
            <Nav.Link href="/fitness-summary" className='fw-bold text-white fw-bold'>Fitness Summary</Nav.Link>
          </Nav> 
          <Nav>
            <NavDropdown title={<PersonCircle size={25} className='fw-bold text-white' id="basic-nav-dropdown"/>}>
                <NavDropdown.Item>
                    <Link to="/user-profile" className='text-decoration-none text-dark'>UserProfile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <Link  className='text-decoration-none text-dark' onClick={handleLogout}>Logout</Link>
                </NavDropdown.Item>
            </NavDropdown> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;