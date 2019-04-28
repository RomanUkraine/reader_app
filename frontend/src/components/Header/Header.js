import React from 'react';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  const authenticatedLinks = localStorage.getItem('userToken') !== 'undefined' ?
    <React.Fragment>
      <Nav.Item>
        <Nav.Link href="/my-books">My Books</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/add-book">Add a Book</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/stats">Statistics</Nav.Link>
      </Nav.Item>
    </React.Fragment>
  :
    null

  return(
    <div>
      <Nav>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        {authenticatedLinks}
      </Nav>
    </div>
  )
}

export default Header;
