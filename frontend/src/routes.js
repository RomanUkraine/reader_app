import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout';
import Home from './components/Home/Home';
import Books from './components/Books/Books';
import CreateBook from './components/Books/CreateBook';

class Routes extends Component  {
//   componentDidMount = () => {
//     const user = this.props.user


// console.log(Object.keys(user).length === 0)


//     if (Object.keys(user).length === 0) {
//       this.props.history.push("/")
//     }
//   }
render() {

  // const authenticatedRoutes = (
  //   <React.Fragment>
  //     <Route path="/books" exact component={Books} />
  //     <Route path="/add-book" exact component={CreateBook} />
  //   </React.Fragment>
  // )

  // const guestRoute = (
  //   <Route path="/" exact component={Home} />
  // )



  return (
    <Layout user={console.log(this.props.user)}>
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
