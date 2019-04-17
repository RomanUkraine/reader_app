import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Login from './components/Login/Login'
import axios from 'axios';
import Home from './components/Home/Home';
import Books from './components/Books/Books';
import Auth from 'j-toker';
import $ from 'jquery'

import './App.css';

Auth.configure({
  apiUrl: 'http://localhost:3000',
  tokenValidationPath: '/auth/validate_token',
  authProviderPaths: {
    facebook:  '/auth/facebook'
  },
  handleLoginResponse: (resp) => {
    return resp.data;
  },

  handleTokenValidationResponse: (resp) => {
    return resp.data;
  },

});

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        user: {}
      };
  }
  componentDidMount() {
    Auth.oAuthSignIn({
      provider: 'facebook',
      params: {resource_class: 'User'}
    })

    // Auth.validateToken()
    //   .then(function(user) {
    //     this.setState({
    //       username: user.username
    //     })
    //   }.bind(this))
    //   .fail(function() {
    //     console.log("SMTH WENT WRONG")
    //     // Transition.redirect('login');
    //   });
//  .then(resp => {
//    debugger;
//  })
  }

  // handleAuthChange = (response) => {
  //   axios.post('http://localhost:3000/users', response)
  //   .then(res => {

  //     this.setState({
  //       user: res.data
  //     })
  //   })
  //   debugger;

  // }


  render() {
// debugger;
    return (
      <div>
        {Object.keys(this.state.user).length === 0 && <Home />}
        {this.state.user && <Books user={this.state.user} />}

        {/* <Login handleChange={this.handleAuthChange}/> */}
        <BrowserRouter>
          <Routes user={this.state}/>
        </BrowserRouter>
      </div>
    );
  }

};

export default App;
