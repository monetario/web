
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';

import Store from './store';
import Actions from './actions';
import Accounts from './components';


var AccountsHandler = React.createClass({
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
      accounts: storeData.accounts
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.accounts !== undefined) {
      this.setState({accounts: storeData.accounts});
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
            Accounts
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li className="active"><i className="fa fa-briefcase"></i> Accounts</li>
          </ol>
        </section>
        <section className="content">
          <Accounts meta={this.state.meta} accounts={this.state.accounts} />
        </section>
      </div>
    );
  }
});

export default AccountsHandler;
