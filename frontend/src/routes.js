import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout';
import Home from './components/Home/Home';
import CreateBook from './components/Books/CreateBook';

const Routes = () =>  {
  return (
      <Layout>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/add-book" exact component={CreateBook} />
          </Switch>
      </Layout>
  );
}

export default Routes;
