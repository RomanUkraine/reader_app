import React from 'react';
import Header from '../components/Header/Header';

const Layout = (props) => {
  return(
    <div>
      <Header token={props.token}/>
        {props.children}
    </div>
  )
}

export default Layout;
