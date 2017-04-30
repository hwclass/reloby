import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Home from './containers/Home';
import RouteNavItem from './components/RouteNavItem';
import './App.css';

class App extends Component {

  handleNavItemOnClick = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Reloby</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <RouteNavItem href="/signup" onClick={this.handleNavItemOnClick}>Signup</RouteNavItem>
              <RouteNavItem href="/login" onClick={this.handleNavItemOnClick}>Login</RouteNavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Home/>
      </div>
    );
  }

}

export default withRouter(App);
