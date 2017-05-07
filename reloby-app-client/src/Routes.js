import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppliedRoute from './components/AppliedRoute';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewCity from './containers/NewCity';
import Cities from './containers/Cities';
import NotFound from './containers/NotFound';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps}/>
    <AppliedRoute path="/login" exact component={Login} props={childProps}/>
    <AppliedRoute path="/signup" exact component={Signup} props={childProps}/>
    <AppliedRoute path="/new" exact component={NewCity} props={childProps}/>
    <AppliedRoute path="/cities/:id" exact component={Cities} props={childProps} />
    <Route component={NotFound} />
  </Switch>
);