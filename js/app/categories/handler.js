
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';

import Store from './store';
import Actions from './actions';
import Categories from './components';


var CategoriesHandler = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onStoreUpdate')
  ],

  componentDidMount() {
    Actions.load();
  },

  getInitialState() {
    var storeData = Store.getDefaultData();
    return {
      meta: storeData.meta,
      categories: storeData.categories
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.categories !== undefined) {
      this.setState({categories: storeData.categories});
    }
    if (storeData.meta !== undefined) {
      this.setState({meta: storeData.meta});
    }
  },

  render() {
    return (
      <div id="content">
        <section className="content-header">
          <h1>
            Categories
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li className="active"><i className="fa fa-tags"></i> Categories</li>
          </ol>
        </section>
        <section className="content">
          <Categories meta={this.state.meta} categories={this.state.categories} />
        </section>
      </div>
    );
  }
});

export default CategoriesHandler;
