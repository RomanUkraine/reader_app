import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {
  // TODO make pure
  render() {
    return (
      <div>
        <FacebookLogin
          appId="853438291662050"
          autoLoad={true}
          fields="first_name,last_name,email"
          // onClick={componentClicked}
          responseType="code"
          callback={this.props.handleChange}
        />
      </div>
    );
  }
}

export default Login;
