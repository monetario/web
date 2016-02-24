
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';
import _ from 'lodash';

import Store from './store';
import Actions from './actions';
import Dashboard from './components';


var DashboardHandler = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onStoreUpdate')
  ],

  componentDidMount() {
    Actions.load();
  },

  getInitialState() {
    var storeData = Store.getDefaultData();
    return {
      balance: storeData.balance,
      categories: storeData.categories
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.balance !== undefined) {
      this.setState({balance: storeData.balance});
    }
    if (storeData.categories !== undefined) {
      this.setState({categories: storeData.categories});
    }
  },

  render() {
    return <Dashboard balance={this.state.balance}
                      categories={this.state.categories} />;
  }
});

export default DashboardHandler;
