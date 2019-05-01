import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout';
import Home from './components/Home/Home';
import MyBooks from './components/Books/MyBooks';
import CreateBook from './components/Books/CreateBook';
import Stats from './components/Stats/Stats';

class Routes extends Component  {
  render() {
    return (
      <Layout  token={this.props.token}>
          <Switch>
            <Route path="/my-books" exact render={(props) => <MyBooks {...props} token={this.props.token} />} />
            <Route path="/add-book" exact component={CreateBook} />
            <Route path="/stats" exact component={Stats} />
            <Route path="/" exact component={Home} />
          </Switch>
      </Layout>
    );
  }
}

export default Routes;
