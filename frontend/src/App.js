import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Login from './components/Login/Login'
import axios from 'axios';
import Home from './components/Home/Home';
import Books from './components/Books/Books';
import Auth from 'j-toker';
import PubSub from 'pubsub-js'
import $ from 'jquery'
import { BASE_URL } from './helpers';

import './App.css';

Auth.configure({
  apiUrl: `${BASE_URL}`,
  tokenValidationPath: '/auth/validate_token',
  authProviderPaths: {
    facebook:  '/omniauth/facebook'
  },
  // handleLoginResponse: (resp) => {
  //   debugger;
  //   console.log(resp.data)
  // },

  handleTokenValidationResponse(resp) {

    // https://github.com/lynndylanhurley/j-toker/issues/10
    PubSub.publish("auth.validation.success", resp.data)
    console.log(resp.data)
  },

  handleTokenValidationResponse: (resp) => {
    return resp.data;
  },

});

$.ajaxSetup({beforeSend: Auth.appendAuthHeaders})
$(document).ajaxComplete(Auth.updateAuthCredentials)

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        user: {}
      };
  }

  componentWillMount() {
    PubSub.subscribe('auth', function() {
      this.setState({user: Auth.user})
    }.bind(this))
  }

  // componentDidMount() {
  //   Auth.oAuthSignIn({
  //     provider: 'facebook',
  //     params: {resource_class: 'User'}
  //   }).then((resp) => {
  //       console.log(resp)
  //   })

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
  // }

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
