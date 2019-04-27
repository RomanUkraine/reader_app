import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout';
import Home from './components/Home/Home';
import Books from './components/Books/Books';
import CreateBook from './components/Books/CreateBook';

class Routes extends Component  {
render() {

  return (
    <Layout user={this.props.user} token={this.props.token}>
        <Switch>
          <Route path="/books" exact component={Books} />
          <Route path="/add-book" exact component={CreateBook} />
          <Route path="/" exact component={Home} />
          {/* { this.props.user ? authenticatedRoutes : guestRoute } */}
        </Switch>
    </Layout>
);
}

}

export default Routes;
