import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props)
  }
// TODO make pure component
// TODO: style header
  render() {
    const authenticatedLinks = localStorage.getItem('userToken') !== 'undefined' ?
      <React.Fragment>
        <Link to={"/my-books"}>My Books</Link>
        <Link to={"/add-book"}>Add Book</Link>
        <Link to={"/stats"}>Read statistics</Link>
      </React.Fragment>
    :
      null

    return(
      <div>
        <Link to={"/"}>Home</Link>
        {authenticatedLinks}
      </div>
    )
  }
}

export default Header;
