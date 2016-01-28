
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
    this.currencyId = null;
    this.currency = {};
    this.currencies = [];
    this.loaded = false;
  },

  getDefaultData() {
    return {
      loaded: this.loaded,
      currency: this.currency,
      currencies: this.currencies
    };
  },

  _loadUrl(url) {
    API.get(url).then((data) => {

      this.currency = data;
      this.trigger({currency: this.currency});
    });
  },

  onLoadUrl(url) {
    this._loadUrl(url);
  },

  loadCurrency(callback) {
    if (this.currencyId) {
      API.get(`/API/v1/group_currencies/${this.currencyId}/`).then((data) => {
        this.currency = data;
        callback(null, {currency: data});
      });
    }
  },

  loadCurrencies(callback) {
    API.get('/API/v1/currencies/?expand=1').then((data) => {
      callback(null, {currencies: data.currencies});
    });
  },

  callFunc(func, callback) {
    func(callback);
  },

  onAdd(model, history) {
    let postData = {
      name: model.name,
      symbol: model.symbol
    };

    API.post('/API/v1/group_currencies/', postData).then((data) => {
      history.pushState(null, `/p/currencies/`, {});
    });
  },

  onSave(model, history) {
    let postData = {
      name: model.name,
      symbol: model.symbol
    };
    API.put(`/API/v1/group_currencies/${this.currency.id}/`, postData).then((data) => {
      history.pushState(null, `/p/currencies/`, {});
    });
  },

  onDelete(history) {
    API.delete(`/API/v1/group_currencies/${this.currency.id}/`).then((data) => {
      history.pushState(null, `/p/currencies/`, {});
    });
  },

  onReset() {
    this.init();
  },

  onLoad(id) {
    this.currencyId = id;
    let loadFuncs = [
      this.loadCurrencies
    ];

    if (id) {
      loadFuncs.push(this.loadCurrency);
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
