import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./styles/navBar.css"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlices';

const NavBar = () => {
  const { isAuth, userInfo} = useSelector(state => state.users)
  const dispatch = useDispatch()

  return (
    <Navbar bg="light" expand="lg" className="navContainer">
    <Container>
      <Navbar.Brand >
      <Link to="/" className="brand" >GAMES</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
         {isAuth ?  <>
         <Link to="/profile" className="navLink">{userInfo.name}</Link>
         <Link to="/login" className="navLink" onClick={() => dispatch(logout())}>Logout</Link> 
        </>
          :
            <>
            <Link to="/login" className="navLink" >Login</Link>
            <Link to="/register" className="navLink">Register</Link>
            </>
 }
 
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar