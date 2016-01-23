
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
    this.records = [];
    this.meta = {
      "first_url": null,
      "last_url": null,
      "next_url": null,
      "page": 1,
      "pages": 1,
      "per_page": 5,
      "prev_url": null,
      "total": 0
    };
  },

  getDefaultData() {
    return {
      meta: this.meta,
      records: this.records,
    };
  },

  getAll() {
    return this.records;
  },

  _loadUrl(url) {
    API.get(url).then((data) => {
      console.log('!!!!!!!', data);
      this.records = data.objects;
      this.meta = data.meta;
      this.trigger({records: this.records, meta: this.meta});
    });
  },

  onLoadUrl(url) {
    this._loadUrl(url);
  },

  onLoad() {
    this._loadUrl(`/API/v1/records/?expand=1&per_page=5&page=1&sort=date,desc`)
  },

});

module.exports = Store;
