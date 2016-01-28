
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';

import Store from './store';
import Actions from './actions';
import AccountForm from './components';



var AccountHandler = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onStoreUpdate')
  ],

  componentDidMount() {
    Actions.load(this.props.params.id);
  },

  getInitialState() {
    var storeData = Store.getDefaultData();
    return {
      account: storeData.account,
      currencies: storeData.currencies,
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.loaded !== undefined) {
      this.setState({loaded: storeData.loaded});
    }

    if (storeData.account !== undefined) {
      this.setState({account: storeData.account});
    }

    if (storeData.currencies !== undefined) {
      this.setState({currencies: storeData.currencies});
    }
  },

  renderForm() {
    if (this.props.params.id && !this.state.account.id) {
      return <div></div>;
    }

    if (!this.state.loaded) {
      return <div></div>;
    }

    return <AccountForm account={this.state.account}
                        currencies={this.state.currencies} />
  },

  render() {
    return (
      <div id="content" className="content">
        <section className="content-header">
          <h1>
            Account
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard/"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li>
              <Link to="/p/accounts/"><i className="fa fa-table"></i> Accounts</Link>
            </li>
            <li className="active">Account</li>
          </ol>
        </section>
        <section className="content">
          {this.renderForm()}
        </section>
      </div>
    );
  }
});

export default AccountHandler;
