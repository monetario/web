
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';
import _ from 'lodash';

import Store from './store';
import Actions from './actions';


var Dashboard = React.createClass({
  render() {
    return (
      <div className="content">
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
                  <h3>{this.props.balance.end_balance}</h3>
                  <p>TOTAL BALANCE</p>
                </div>
                <div className="icon">
                  <i className="fa ion-stats-bars"></i>
                </div>
                <span className="small-box-footer">SEK</span>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-green">
                <div className="inner">
                  <h3>{this.props.balance.income}</h3>
                  <p>Income</p>
                </div>
                <div className="icon">
                  <i className="fa fa-arrow-circle-up"></i>
                </div>
                <span className="small-box-footer">SEK</span>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-red">
                <div className="inner">
                  <h3>{this.props.balance.outcome}</h3>
                  <p>Outcome</p>
                </div>
                <div className="icon">
                  <i className="fa fa-arrow-circle-down"></i>
                </div>
                <span className="small-box-footer">SEK</span>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>{this.props.balance.cash_flow}</h3>
                  <p>Cashflow</p>
                </div>
                <div className="icon">
                  <i className="fa fa-line-chart"></i>
                </div>
                <span className="small-box-footer">SEK</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
});

export default Dashboard;
