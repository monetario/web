
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
    this.categoryId = null;
    this.category = {};
    this.categories = [];
    this.loaded = false;
  },

  getDefaultData() {
    return {
      loaded: this.loaded,
      category: this.category,
      categories: this.categories
    };
  },

  _loadUrl(url) {
    API.get(url).then((data) => {

      this.category = data;
      this.trigger({category: this.category});
    });
  },

  onLoadUrl(url) {
    this._loadUrl(url);
  },

  loadCategory(callback) {
    if (this.categoryId) {
      API.get(`/API/v1/group_categories/${this.categoryId}/`).then((data) => {
        this.category = data;
        callback(null, {category: data});
      });
    }
  },

  loadCurrencies(callback) {
    API.get('/API/v1/group_categories/?expand=1').then((data) => {
      callback(null, {categories: data.objects});
    });
  },

  callFunc(func, callback) {
    func(callback);
  },

  onAdd(model, history) {
    let postData = {
      name: model.name,
      parent: model.parent,
      category_type: model.categoryType === 'income' ? 0 : 1
    };

    API.post('/API/v1/group_categories/', postData).then((data) => {
      history.pushState(null, `/p/categories/`, {});
    });
  },

  onSave(model, history) {
    let postData = {
      name: model.name,
      parent: model.parent,
      category_type: model.categoryType === 'income' ? 0 : 1
    };
    API.put(`/API/v1/group_categories/${this.category.id}/`, postData).then((data) => {
      history.pushState(null, `/p/categories/`, {});
    });
  },

  onDelete(history) {
    API.delete(`/API/v1/group_categories/${this.category.id}/`).then((data) => {
      history.pushState(null, `/p/categories/`, {});
    });
  },

  onReset() {
    this.init();
  },

  onLoad(id) {
    this.categoryId = id;
    let loadFuncs = [
      this.loadCurrencies
    ];

    if (id) {
      loadFuncs.push(this.loadCategory);
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
