import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Header = () => {
  const authenticatedLinks = localStorage.getItem('userToken') !== 'undefined' ?
    <React.Fragment>
      <Nav.Item>
        <Link to="/my-books"> My books </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/add-book"> Add a book </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/stats"> Statistics </Link>
      </Nav.Item>
    </React.Fragment>
  :
    null

  return(
    <div>
      <Nav>
        <Nav.Item>
          <Link to="/"> Home </Link>
        </Nav.Item>
        {authenticatedLinks}
      </Nav>
    </div>
  )
}

export default Header;
