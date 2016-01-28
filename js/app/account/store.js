
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
    this.accountId = null;
    this.account = {};
    this.currencies = [];
    this.loaded = false;
  },

  getDefaultData() {
    return {
      loaded: this.loaded,
      account: this.account,
      currencies: this.currencies
    };
  },

  _loadUrl(url) {
    API.get(url).then((data) => {

      this.account = data;
      this.trigger({account: this.account});
    });
  },

  onLoadUrl(url) {
    this._loadUrl(url);
  },

  loadAccount(callback) {
    if (this.accountId) {
      API.get(`/API/v1/accounts/${this.accountId}/`).then((data) => {
        this.account = data;
        callback(null, {account: data});
      });
    }
  },

  loadCurrencies(callback) {
    API.get('/API/v1/group_currencies/?expand=1').then((data) => {
      callback(null, {currencies: data.objects});
    });
  },

  callFunc(func, callback) {
    func(callback);
  },

  onAdd(model, history) {
    let postData = {
      name: model.name,
      currency: model.currency
    };

    API.post('/API/v1/accounts/', postData).then((data) => {
      history.pushState(null, `/p/accounts/`, {});
    });
  },

  onSave(model, history) {
    let postData = {
      name: model.name,
      currency: model.currency
    };
    API.put(`/API/v1/accounts/${this.account.id}/`, postData).then((data) => {
      history.pushState(null, `/p/accounts/`, {});
    });
  },

  onDelete(history) {
    API.delete(`/API/v1/accounts/${this.account.id}/`).then((data) => {
      history.pushState(null, `/p/accounts/`, {});
    });
  },

  onReset() {
    this.init();
  },

  onLoad(id) {
    this.accountId = id;
    let loadFuncs = [
      this.loadCurrencies
    ];

    if (id) {
      loadFuncs.push(this.loadAccount);
    }

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
