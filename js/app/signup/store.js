
'use strict';

import React from 'react';
import Reflux from 'reflux';

import API from '../../api';
import Actions from './actions';


var Store = Reflux.createStore({
  listenables: [
    Actions
  ],

  init() {
    this.validationErrors = [];
  },

  getDefaultData() {
    return {
      validationErrors: this.validationErrors
    };
  },

  onSignUp(model, history) {
    let postData = {
      first_name: model.first_name,
      last_name: model.last_name,
      email: model.email,
      password: model.password
    };

    API.post('/API/v1/users/', postData).then((data) => {
      history.pushState(null, `/signin/`, {});
    });
  },

  onReset() {
    this.validationErrors = [];
    this.trigger({validationErrors: this.validationErrors});
  }

});

export default Store;
