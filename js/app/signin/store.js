
'use strict';

import React from 'react';
import Reflux from 'reflux';
import Cookies from 'js-cookie';

import API from '../../api';
import Actions from './actions';

import {APP_SECRET_KEY} from '../../constants';


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

  onSignIn(model, history) {
    let postData = {
      email: model.email,
      password: model.password,
      secret: APP_SECRET_KEY
    };

    API.post('/API/v1/token/', postData).then((data) => {
      Cookies.set('token', data.token);
      history.pushState(null, '/', {});
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
