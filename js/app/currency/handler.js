
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';

import Store from './store';
import Actions from './actions';
import CurrencyForm from './components';



var CurrencyHandler = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onStoreUpdate')
  ],

  componentDidMount() {
    Actions.load(this.props.params.id);
  },

  getInitialState() {
    var storeData = Store.getDefaultData();
    return {
      currency: storeData.currency,
      currencies: storeData.currencies,
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.loaded !== undefined) {
      this.setState({loaded: storeData.loaded});
    }

    if (storeData.currency !== undefined) {
      this.setState({currency: storeData.currency});
    }

    if (storeData.currencies !== undefined) {
      this.setState({currencies: storeData.currencies});
    }
  },

  renderForm() {
    if (this.props.params.id && !this.state.currency.id) {
      return <div></div>;
    }

    if (!this.state.loaded) {
      return <div></div>;
    }

    return <CurrencyForm currency={this.state.currency}
                        currencies={this.state.currencies} />
  },

  render() {
    return (
      <div id="content">
        <section className="content-header">
          <h1>
            Currency
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li>
              <Link to="/p/currencies"><i className="fa fa-money"></i> Currencies</Link>
            </li>
            <li className="active">Currency</li>
          </ol>
        </section>
        <section className="content">
          {this.renderForm()}
        </section>
      </div>
    );
  }
});

export default CurrencyHandler;
