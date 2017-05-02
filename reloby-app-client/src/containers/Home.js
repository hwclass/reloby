import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  PageHeader,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import { invokeApig } from '../libs/awsLib';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: false,
      cities: []
    }
  }

  async componentDidMount() {
    if (this.props.userToken === null) {
      return;
    }

    this.setState({ isLoading: true });

    try {
      const results = await this.cities();
      this.setState({ cities: results });
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  cities() {
    return invokeApig({ path: '/cities' }, this.props.userToken);
  }

  renderLander() {
    <div className="lander">
      <h1>Reloby</h1>
      <p>Choose your city to relocate</p>
    </div>
  }

  renderCitiesList(cities) {
    return [{}].concat(cities).map((city, idx) => {
      idx !== 0
      ? (
          <ListGroupItem
            key={city.cityId}
            href={`/cities/${city.cityId}`}
            onClick={this.handleCityClick}
            header={city.content.trim().split('\n')[0]}>
              { "Created: " + (new Date(city.createdAt)).toLocaleString() }
          </ListGroupItem>
        )
      : (
          <ListGroupItem
            key="new"
            href="/cities/new"
            onClick={this.handleCityClick}>
              <h4><b>{'\uFF0B'}</b> Create a new city</h4>
          </ListGroupItem>
        )
    });
  }

  renderCities() {
    return (
      <div>
        <PageHeader>Cities</PageHeader>
        <ListGroup>
          {this.renderCitiesList(this.state.cities)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        { this.props.userToken === null
          ? this.renderLander()
          : this.renderCities() }
      </div>
    );
  }
}

export default withRouter(Home);