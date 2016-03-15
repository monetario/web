
'use strict';

import React from 'react';
import {Router, Route, Link, History} from 'react-router'

import Formsy from 'formsy-react';

import Actions from './actions';
import InputField from '../../components/input_field';


var SignInForm = React.createClass({
  mixins: [History],

  componentWillMount() {
  },

  componentWillUnmount() {
  },

  getInitialState: function () {
    return {
      canSubmit: false,
      email: undefined,
      password: undefined
    }
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
    Actions.reset();
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    });
    Actions.reset();
  },
  handleSubmit: function (model) {
    Actions.signIn(model, this.history, this.props.location.state.nextPathname);
  },
  renderSubmitButton() {
    return (
      <button type="submit"
              className="btn btn-lg btn-primary btn-block btn-flat"
              disabled={!this.state.canSubmit}>
        Sign In
      </button>
    )
  },

  renderValidationErrors() {
    if (this.props.validationErrors.length === 0) {
      return '';
    }

    return this.props.validationErrors.map((error, i) => {
      return (
        <div key={`signin_error_${i}`} className="callout callout-danger">
          <p>{error}</p>
        </div>
      );
    });

  },
  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a><b>Monetar</b>Io</a>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          {this.renderValidationErrors()}
          <Formsy.Form onValidSubmit={this.handleSubmit}
                         onValid={this.enableButton}
                         onInvalid={this.disableButton}>
            <div className="form-group has-feedback">
              <InputField name="email"
                          type="email"
                          placeholder="Email"
                          validations="isEmail"
                          validationError="This is not a valid email"
                          required />
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <InputField name="password"
                          type="password"
                          placeholder="Password"
                          validations="minLength:3"
                          validationError="Password is too small"
                          required />
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-4">
                {this.renderSubmitButton()}
              </div>
            </div>
          </Formsy.Form>

          <Link to="/signup" className="text-center">Register a new membership</Link>

        </div>
      </div>
    );
  }
});

export default SignInForm;
