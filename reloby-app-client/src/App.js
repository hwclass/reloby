import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';
import config from './config.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
      isLoadingUserToken: false
    };
  } 

  async componentDidMount() {
    const currentUser = this.getCurrentUser();
    this.setState({isLoadingUserToken: true});
    if (currentUser === null) {
      this.setState({
        isLoadingUserToken: false
      });
      return;
    }

    try {
      const userToken = await this.getUserToken(currentUser);
      this.updateUserToken(userToken);
    } catch(err) {
      alert(err);
    }

    this.setState({isLoadingUserToken: false});
  }

  getCurrentUser() {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    return userPool.getCurrentUser();
  }

  getUserToken(currentUser) {
    return new Promise((resolve, reject) => {
      currentUser.getSession(function(err, session) {
        if (!!err) {
          reject(err);
          return
        }
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }

  updateUserToken = (userToken) => {
    this.setState({
      userToken: userToken
    });
  }

  handleLogout = (event) => {
    const currentUser = this.getCurrentUser();

    if (currentUser !== null) {
      currentUser.signOut();
    }

    this.updateUserToken(null);

    this.props.history.push('/login');
  }

  handleNavItemOnClick = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  render() {
    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this.updateUserToken,
    };

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
              { this.state.userToken
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : [ <RouteNavItem key={1} onClick={this.handleNavItemOnClick} href="/signup">Signup</RouteNavItem>,
                    <RouteNavItem key={2} onClick={this.handleNavItemOnClick} href="/login">Login</RouteNavItem> ] }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }

}

export default withRouter(App);
