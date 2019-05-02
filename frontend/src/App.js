import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import Routes from './routes';
import { BASE_URL } from './helpers';
import queryString from 'query-string';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      token: ''
    };
  }

  componentDidMount() {
    const token = queryString.parse(window.location.search).token

    if (token !== undefined) {
      window.localStorage.setItem('userToken', token);
    }

    let isAuthenticated = localStorage.getItem('userToken') == null || localStorage.getItem('userToken') == 'undefined' ? false : true

    this.setState({
      isAuthenticated: isAuthenticated,
      token: token
    })
  }

  componentWillUnmount () {
    localStorage.setItem('userToken', this.state.token)
  }

  oauthAuthorize = () => {
    const client_id = '3e8776599bf94d013259';
    // const redirect_uri = `${BASE_URL}/users/auth/github/callback`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=https://reader-app-strongsd.herokuapp.com/users/auth/github/callback&scope=user:email`
  }

  render() {

    const routes = this.state.isAuthenticated ?
      <div>
        <BrowserRouter>
          <Routes token={this.state.token}/>
        </BrowserRouter>
      </div>
    :
    <div className='text-center'>
      <Jumbotron>
        <h1>Please authorize in order to get access</h1>
        <p>
          <Button onClick={this.oauthAuthorize.bind(this)}
                  variant="secondary">Sign in with GITHUB
          </Button>
        </p>
      </Jumbotron>
    </div>

    return (
      <div>
        { routes }
      </div>
    );
  }

};

export default App;
