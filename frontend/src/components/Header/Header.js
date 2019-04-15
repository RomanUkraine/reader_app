import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // TODO: style header
  return(
    <div>
      <Link to={"/add-book"}>Add Book</Link>
      HEADER
    </div>
  )
}

export default Header;
