import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';

class Header extends Component {
// TODO make pure component
// TODO: style header
  render() {
    return(
      <div>
        HEADER
        <Link to={"/"}>Home</Link>
        <Link to={"/add-book"}>Add Book</Link>
        <Login />
      </div>
    )
  }
}

export default Header;
