import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Reloby</h1>
          <p>Choose your city to relocate</p>
        </div>
      </div>
    );
  }
}

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
);