
'use strict';

import React from 'react';
import Reflux from 'reflux';
import async from 'async';

import API from '../../api';
import Actions from './actions';


var Store = Reflux.createStore({
  listenables: [
    Actions
  ],

  init() {
    this.recordId = null;
    this.record = {};
    this.paymentMethod = [
      {value: 0, label: 'Cash'},
      {value: 1, label: 'Debit card'},
      {value: 2, label: 'Credit card'},
      {value: 3, label: 'Bank transaction'},
      {value: 4, label: 'Mobile payment'},
      {value: 5, label: 'Internet payment'}
    ];
    this.accounts = [];
    this.categories = [];
    this.currencies = [];
    this.loaded = false;
  },

  getDefaultData() {
    return {
      loaded: this.loaded,
      record: this.record,
      paymentMethod: this.paymentMethod,
      accounts: this.accounts,
      categories: this.categories,
      currencies: this.currencies
    };
  },

  _loadUrl(url) {
    API.get(url).then((data) => {

      this.record = data;
      this.trigger({record: this.record});
    });
  },

  onLoadUrl(url) {
    this._loadUrl(url);
  },

  loadRecord(callback) {
    if (this.recordId) {
      API.get(`/API/v1/records/${this.recordId}/`).then((data) => {
        this.record = data;
        callback(null, {record: data});
      });
    }
  },

  loadCategories(callback) {
    API.get('/API/v1/group_categories/?expand=1').then((data) => {
      callback(null, {categories: data.objects});
    });
  },

  loadAccounts(callback) {
    API.get('/API/v1/accounts/?expand=1').then((data) => {
      callback(null, {accounts: data.objects});
    });
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
      account: model.account,
      amount: parseFloat(model.amount),
      category: model.category,
      currency: model.currency,
      date: model.datetime,
      payment_method: model.paymentMethod,
      record_type: model.recordType === 'income' ? 0 : 1,
      description: model.description || ''
    };

    API.post('/API/v1/records/', postData).then((data) => {
      history.pushState(null, `/p/records/`, {});
    });
  },

  onSave(model, history) {
    let postData = {
      account: model.account,
      amount: parseFloat(model.amount),
      category: model.category,
      currency: model.currency,
      date: model.datetime,
      payment_method: model.paymentMethod,
      record_type: model.recordType === 'income' ? 0 : 1,
      description: model.description || ''
    };
    API.put(`/API/v1/records/${this.record.id}/`, postData).then((data) => {
      history.pushState(null, `/p/records/`, {});
    });
  },

  onDelete(history) {
    API.delete(`/API/v1/records/${this.record.id}/`).then((data) => {
      history.pushState(null, `/p/records/`, {});
    });
  },

  onAddTransaction(model, history) {
    let postData = {
      amount: parseFloat(model.amount),
      source_account: model.source_account,
      target_account: model.target_account,
      currency: model.currency,
      date: model.datetime,
      description: model.description || ''
    };

    API.post('/API/v1/transactions/', postData).then((data) => {
      history.pushState(null, `/p/records/`, {});
    });
  },

  onSaveTransaction(model, history) {
    let postData = {
      amount: parseFloat(model.amount),
      source_account: model.source_account,
      target_account: model.target_account,
      currency: model.currency,
      date: model.datetime,
      description: model.description || ''
    };

    API.put(`/API/v1/transactions/${this.record.transaction.id}/`, postData).then((data) => {
      history.pushState(null, `/p/records/`, {});
    });
  },
  onDeleteTransaction(history) {
    API.delete(`/API/v1/transactions/${this.record.transaction.id}/`).then((data) => {
      history.pushState(null, `/p/records/`, {});
    });
  },

  onReset() {
    this.init();
  },

  onLoad(id) {
    this.recordId = id;
    let loadFuncs = [
      this.loadAccounts,
      this.loadCategories,
      this.loadCurrencies
    ];

    if (id) {
      loadFuncs.push(this.loadRecord);
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
