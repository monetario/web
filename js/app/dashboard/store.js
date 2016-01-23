
'use strict';

import React from 'react';
import Reflux from 'reflux';
import async from 'async';
import axios from 'axios';

import API from '../../api';
import Actions from './actions';


var Store = Reflux.createStore({
  listenables: [
    Actions
  ],

  init() {
    this.balance = {
      cash_flow: 0,
      end_balance: 0,
      income: 0,
      outcome: 0,
      start_balance: 0
    };
  },

  getDefaultData() {
    return {
      balance: this.balance,
    };
  },

  getAll() {
    return this.balance;
  },

  onLoad() {
    var curDate = new Date();
    API.get(`/API/v1/balance/${curDate.getFullYear()}/${curDate.getMonth() + 1}/`).then((data) => {
      console.log('!!!!!!!', data);
      this.balance = data;
      this.trigger({balance: this.balance});
    });
  },

});

module.exports = Store;
