
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

  onSignIn(model, history, nextPathname) {
    API.login(model.email, model.password).then((data) => {
      history.pushState(null, nextPathname, {});
    }).catch((response) => {
      if (response.status === 400) {
        this.validationErrors = ['Login or password is incorrect'];
        this.trigger({validationErrors: this.validationErrors});
      }
    });
  },
  onReset() {
    this.validationErrors = [];
    this.trigger({validationErrors: this.validationErrors});
  }

});

export default Store;
