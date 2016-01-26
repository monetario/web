
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';

import Store from './store';
import Actions from './actions';
import RecordForm from './components';



var RecordHandler = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onStoreUpdate')
  ],

  componentDidMount() {
    Actions.load(this.props.params.id);
  },

  getInitialState() {
    var storeData = Store.getDefaultData();
    return {
      record: storeData.record,
      paymentMethod: storeData.paymentMethod,
      accounts: storeData.accounts,
      categories: storeData.categories,
      currencies: storeData.currencies,
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.loaded !== undefined) {
      this.setState({loaded: storeData.loaded});
    }

    if (storeData.record !== undefined) {
      this.setState({record: storeData.record});
    }

    if (storeData.paymentMethod !== undefined) {
      this.setState({paymentMethod: storeData.paymentMethod});
    }

    if (storeData.accounts !== undefined) {
      this.setState({accounts: storeData.accounts});
    }

    if (storeData.categories !== undefined) {
      this.setState({categories: storeData.categories});
    }

    if (storeData.currencies !== undefined) {
      this.setState({currencies: storeData.currencies});
    }
  },

  renderForm() {
    if (this.props.params.id && !this.state.record.id) {
      return <div></div>;
    }

    if (!this.state.loaded) {
      return <div></div>;
    }

    return <RecordForm record={this.state.record}
                       paymentMethod={this.state.paymentMethod}
                       accounts={this.state.accounts}
                       categories={this.state.categories}
                       currencies={this.state.currencies} />
  },

  render() {
    return (
      <div id="content" className="content">
        <section className="content-header">
          <h1>
            Record
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard/"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li>
              <Link to="/p/records/"><i className="fa fa-table"></i> Records</Link>
            </li>
            <li className="active">Record</li>
          </ol>
        </section>
        <section className="content">
          {this.renderForm()}
        </section>
      </div>
    );
  }
});

export default RecordHandler;
