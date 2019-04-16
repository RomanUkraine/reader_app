import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

class Login extends Component {
  render() {

    const responseFacebook = (response) => {
      axios.post('http://localhost:3000/users', response)
      .then(response => {
        console.log(response)
      })
    }

    return (
      <div>
        <FacebookLogin
          appId="853438291662050"
          autoLoad={true}
          fields="first_name,last_name,email"
          // onClick={componentClicked}
          responseType="code"
          callback={responseFacebook}
        />
      </div>
    );
  }
}

export default Login;
