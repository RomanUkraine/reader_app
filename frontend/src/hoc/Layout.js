import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


class Layout extends Component {
  // make pure
  render() {
    return(
      <div>
        <Header token={this.props.token}/>
          {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Layout;
