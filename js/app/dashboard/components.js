
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';
import _ from 'lodash';

import Store from './store';
import Actions from './actions';


var DashboardMain = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onStoreUpdate'),
  ],

  componentDidMount() {
    Actions.load();
  },

  getInitialState() {
    var storeData = Store.getDefaultData();
    return {
      balance: storeData.balance
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.balance !== undefined) {
      this.setState({balance: storeData.balance});
    }
  },

  render() {
    return (
      <div>
        <section className="content-header">
          <h1>
            Dashboard
            <small>Control panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li className="active">Dashboard</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-aqua">
                <div className="inner">
                  <h3><sub style={{fontSize: "20px"}}>SEK</sub> {this.state.balance.end_balance}</h3>
                  <p>TOTAL BALANCE</p>
                </div>
                <div className="icon">
                  <i className="fa ion-stats-bars"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-green">
                <div className="inner">
                  <h3><sub style={{fontSize: "20px"}}>SEK</sub> {this.state.balance.income}</h3>
                  <p>Income</p>
                </div>
                <div className="icon">
                  <i className="fa fa-arrow-circle-up"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-red">
                <div className="inner">
                  <h3><sub style={{fontSize: "20px"}}>SEK</sub> {this.state.balance.outcome}</h3>
                  <p>Outcome</p>
                </div>
                <div className="icon">
                  <i className="fa fa-arrow-circle-down"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3><sub style={{fontSize: "20px"}}>SEK</sub> {this.state.balance.cash_flow}</h3>
                  <p>Cashflow</p>
                </div>
                <div className="icon">
                  <i className="fa fa-line-chart"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
});

export default DashboardMain;
