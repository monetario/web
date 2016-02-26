
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import numeral from 'numeral';

import ExpenseDonutWidget from '../../widgets/expense_donut/components';
import BarChartWidget from '../../widgets/bar_chart/components';

import {NUMBER_FORMAT} from '../../constants';
import {PieChart} from 'react-d3-components';


var Dashboard = React.createClass({
  componentDidMount() {

  },

  componentWillReceiveProps(nextProps) {
  },

  renderExpensesDonutWidget() {
    if (Object.keys(this.props.categories).length === 0) {
      return '';
    }

    return <ExpenseDonutWidget name="expenses-donut-chart"
                               title="Expenses"
                               categories={this.props.categories}
                               url="/API/v1/expenses/" />
  },

  renderIncomesDonutWidget() {
    if (Object.keys(this.props.categories).length === 0) {
      return '';
    }

    return <ExpenseDonutWidget name="incomes-donut-chart"
                               title="Incomes"
                               categories={this.props.categories}
                               url="/API/v1/incomes/" />
  },

  renderCashFlowWidget() {
    return <BarChartWidget name="cash-flows-chart"
                           title="Cash flows"
                           categories={this.props.categories}
                           url="/API/v1/cash_flows/" />
  },

  renderExpensesChart() {
    if (this.props.expenses.length === 0) {
      return '';
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
                  <h3>{numeral(this.props.balance.end_balance).format(NUMBER_FORMAT)}</h3>
                  <p>TOTAL BALANCE</p>
                </div>
                <div className="icon">
                  <i className="fa fa-bar-chart"></i>
                </div>
                <span className="small-box-footer">SEK</span>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-green">
                <div className="inner">
                  <h3>{numeral(this.props.balance.income).format(NUMBER_FORMAT)}</h3>
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
                  <h3>{numeral(this.props.balance.expense).format(NUMBER_FORMAT)}</h3>
                  <p>Expense</p>
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
                  <h3>{numeral(this.props.balance.cash_flow).format(NUMBER_FORMAT)}</h3>
                  <p>Cashflow</p>
                </div>
                <div className="icon">
                  <i className="fa fa-line-chart"></i>
                </div>
                <span className="small-box-footer">SEK</span>
              </div>
            </div>
          </div>
          <div className="row">
            {this.renderCashFlowWidget()}
          </div>
          <div className="row">
            {this.renderExpensesDonutWidget()}
            {this.renderIncomesDonutWidget()}
          </div>
        </section>
      </div>
    );
  }
});

export default Dashboard;
