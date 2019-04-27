import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import axios from 'axios';
import Home from './components/Home/Home';
import Books from './components/Books/Books';
// import { BASE_URL } from './helpers';
import queryString from 'query-string';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isAuthenticated: false
    };
  }

  componentDidMount() {
    const token = queryString.parse(window.location.search).token
    localStorage.setItem('userToken', token);

    let isAuthenticated = token && token.length > 0 ? true : false

    this.setState({
      isAuthenticated
    })

    this.getUser(token);
  }

  getUser = () => {
    axios.get(`http://localhost:3000/current_user`,
    {
      headers: {
        'X-User-Token': localStorage.getItem('userToken')
      }
    }).then(res => {
        const user = res.data;
        this.setState({ user });
      })
  }

  oauthAuthorize = () => {
    const client_id = '3e8776599bf94d013259';
    const redirect_uri = 'http://localhost:3000/users/auth/github/callback'; // TODO base url
    window.location.href = "https://github.com/login/oauth/authorize?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=user:email"
  }

  render() {
    return (
      <div>
        { this.state.isAuthenticated && <Home />}
        { this.state.isAuthenticated && <Books user={this.state.user} />}

        <button onClick={this.oauthAuthorize.bind(this)}>Github authenticate</button>

        <BrowserRouter>
          <Routes user={this.state.user}/>
        </BrowserRouter>
      </div>
    );
  }

};

export default App;
