import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { invokeApig, s3Upload } from '../libs/awsLib';

import {
  PageHeader,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';

import config from '../config.js';

import './NewCity.css';

class NewCity extends Component {

  constructor(props) {
    super(props);
    
    this.file = null;

    this.state = {
      isLoading: false,
      content: ''
    }
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = (event) => {
    this.file = event.target.files[0];
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.file && this.file.size > config.s3.MAX_ATTACHMENT_SIZE) {
      alert('Please pick a file smaller than 5MB');
      return;
    }

    this.setState({ isLoading: true });

    try {
      const uploadedFilename = (this.file)
        ? (await s3Upload(this.file, this.props.userToken)).Location
        : null;

      await this.createCity({
        content: this.state.content,
        attachment: uploadedFilename
      });
      this.props.history.push('/');
    } catch(err) {
      alert(err);
      this.setState({ isLoading: false });
    }
  }

  createCity(city) {
    return invokeApig({
      path: '/cities',
      method: 'POST',
      body: city,
    }, this.props.userToken);
  }

  render() {
    return (
      <div className="NewNote">
        <PageHeader>Add New City</PageHeader>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea" />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl
              onChange={this.handleFileChange}
              type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={ ! this.validateForm() }
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…" />
        </form>
      </div>
    )
  }

}

export default withRouter(NewCity);
