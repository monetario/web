
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';


import Store from './store';
import SignInForm from './components';


var SignInHandler = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onStoreUpdate')
  ],

  getInitialState() {
    var storeData = Store.getDefaultData();
    return {
      validationErrors: storeData.validationErrors
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.validationErrors !== undefined) {
      this.setState({validationErrors: storeData.validationErrors});
    }
  },

  render() {
    return (
      <SignInForm validationErrors={this.state.validationErrors} />
    );
  }
});

export default SignInHandler;
