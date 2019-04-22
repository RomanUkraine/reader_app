import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props)
  }
// TODO make pure component
// TODO: style header
  render() {
    // debugger;
    return(
      <div>
        HEADER
        <Link to={"/"}>Home</Link>
        {/* {Object.keys(this.props.user).length > 0 && <Link to={"/add-book"}>Add Book</Link>} */}
      </div>
    )
  }
}

export default Header;
