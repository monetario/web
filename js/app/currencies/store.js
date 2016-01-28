
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
    this.currencies = [];
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
      currencies: this.currencies
    };
  },

  getAll() {
    return this.currencies;
  },

  _loadUrl(url) {
    API.get(url).then((data) => {
      this.currencies = data.objects;
      this.meta = data.meta;
      this.trigger({currencies: this.currencies, meta: this.meta});
    });
  },

  onLoadUrl(url) {
    this._loadUrl(url);
  },

  onLoad() {
    this._loadUrl(`/API/v1/group_currencies/?expand=1&per_page=5&page=1&sort=date,desc`)
  },

});

export default Store;
