
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';

import Store from './store';
import Actions from './actions';
import Records from './components';


var RecordsHandler = React.createClass({
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
      records: storeData.records
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.records !== undefined) {
      this.setState({records: storeData.records});
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
            Records
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li className="active"><i className="fa fa-table"></i> Records</li>
          </ol>
        </section>
        <section className="content">
          <Records meta={this.state.meta} records={this.state.records} />
        </section>
      </div>
    );
  }
});

export default RecordsHandler;
