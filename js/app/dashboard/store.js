
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
      expense: 0,
      start_balance: 0
    };
    this.categories = {};
    this.loaded = false;
  },

  getDefaultData() {
    return {
      loaded: this.loaded,
      balance: this.balance,
      categories: this.categories
    };
  },

  callFunc(func, callback) {
    func(callback);
  },

  loadCategories(callback) {
    API.get('/API/v1/group_categories/?expand=1').then((data) => {
      let categories = _.zipObject(data.objects.map((x) => {return x.id}), data.objects);
      callback(null, {categories: categories});
    });
  },

  loadBalance(callback) {
    var curDate = new Date();
    API.get(`/API/v1/balance/${curDate.getFullYear()}/${curDate.getMonth() + 1}/`).then((data) => {
      callback(null, {balance: data});
    });
  },

  onLoad() {
    let loadFuncs = [
      this.loadCategories,
      this.loadBalance
    ];

    async.mapSeries(
      loadFuncs,
      this.callFunc,
      (err, results) => {
        if (err) {
          err.map((error) => {
            Error(error);
          });
          return;
        }

        let mergedResults = {};
        results.map((result) => {
          _.merge(mergedResults, result);
        });

        this.trigger(mergedResults);
        this.loaded = true;
        this.trigger({loaded: this.loaded});

      }
    );
  },

});

export default Store;
