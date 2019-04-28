import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Layout = (props) => {
  return(
    <div>
      <Header token={props.token}/>
        {props.children}
      <Footer />
    </div>
  )
}

export default Layout;
