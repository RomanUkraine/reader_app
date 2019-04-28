import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout';
import Home from './components/Home/Home';
import Books from './components/Books/Books';
import MyBooks from './components/Books/MyBooks';
import CreateBook from './components/Books/CreateBook';
import Stats from './components/Stats/Stats';

class Routes extends Component  {
  render() {
    return (
      <Layout user={this.props.user} token={this.props.token}>
          <Switch>
            <Route path="/books" exact component={Books} />
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
