
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';

import Store from './store';
import Actions from './actions';
import Currencies from './components';


var CurrenciesHandler = React.createClass({
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
      currencies: storeData.currencies
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.currencies !== undefined) {
      this.setState({currencies: storeData.currencies});
    }
    if (storeData.meta !== undefined) {
      this.setState({meta: storeData.meta});
    }
  },

  render() {
    return (
      <div id="content" className="content">
        <section className="content-header">
          <h1>
            Currencies
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li className="active">Currencies</li>
          </ol>
        </section>
        <section className="content">
          <Currencies meta={this.state.meta} currencies={this.state.currencies} />
        </section>
      </div>
    );
  }
});

export default CurrenciesHandler;
