
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
    this.widgetData = {};
  },

  getDefaultData(name) {
    if (!this.widgetData[name]) {
      this.widgetData[name] = {data: [], loading: false};
    }
    return {
      widgetData: this.widgetData,
    };
  },


  loadData(name, baseUrl) {
    API.get(baseUrl).then((data) => {
      if (!this.widgetData[name]) {
        this.widgetData[name] = {};
      }
      this.widgetData[name]['data'] = data.objects;

      this.trigger({widgetData: this.widgetData});
    });
  },

  onLoad(name, baseUrl) {
    this.loadData(name, baseUrl);
  }
});

export default Store;
