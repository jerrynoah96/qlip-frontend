import React from 'react';
import logo from '../images/logo.svg';
import { Navbar, Nav} from 'react-bootstrap';
import '../styles/nav.css';


const NavBar = ()=> {

    return(
        <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="#home" className="brand">
        <img src={logo} alt="logo" className="brand-logo"/>{' '}
            QLIP
            </Navbar.Brand>
           
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto nav-links">
                <Nav.Link className="nav-link" to="about" smooth={true} duration={1000}>Explore</Nav.Link>
                <Nav.Link className="nav-link" to="tokenEcons" smooth={true} duration={1000}>Live Auctions</Nav.Link>
                <Nav.Link className="nav-link" to="roadmap" smooth={true} duration={1000}>CLIP NFTs</Nav.Link>
                <Nav.Link className="nav-link" to="team" smooth={true} duration={1000} >Community</Nav.Link>
                <Nav.Link className="nav-link" to="contact" smooth={true} duration={1000}>Mint Store</Nav.Link>
                <Nav.Link className="nav-link launch-link" href="#">Connect Wallet</Nav.Link>   
            </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavBar;