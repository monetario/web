
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';

import Store from './store';
import Actions from './actions';

var Records = React.createClass({
  handleNextPage(e) {
    e.preventDefault();

    if (this.props.meta.next_url) {
      Actions.loadUrl(this.props.meta.next_url);
    }
  },

  handlePrevPage(e) {
    e.preventDefault();

    if (this.props.meta.prev_url) {
      Actions.loadUrl(this.props.meta.prev_url);
    }
  },

  renderPageCounters() {
    let total = this.props.meta.total;
    let per_page = this.props.meta.per_page;
    let page = this.props.meta.page;

    if (total === 0) {
      return <span></span>;
    }

    let first_item = page * per_page - per_page + 1;
    let last_item = (page * per_page <= total) ? page * per_page : total;

    return (
      <span> {first_item} - {last_item} / {total} </span>
    );
  },

  render() {
    let nextPageClassName = classNames({
      'btn btn-default btn-sm btn-flat': true,
      'disabled': this.props.meta.next_url === null
    });
    let prevPageClassName = classNames({
      'btn btn-default btn-sm btn-flat': true,
      'disabled': this.props.meta.prev_url === null
    });

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Records</h3>
              <div className="box-tools">
                <div className="input-group" style={{width: "75px"}}>
                  <div className="input-group-btn">
                    <Link to="/p/dashboard" className="btn btn-sm btn-default btn-flat">
                      <i className="fa fa-plus"></i> New Record
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-body no-padding">
              <div className="mailbox-controls">

                <div className="btn-group">
                  <button type="button" className="btn btn-default btn-flat">Action</button>
                  <button type="button" className="btn btn-default btn-flat dropdown-toggle" data-toggle="dropdown">
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </div>
                
                <div className="pull-right">
                  {this.renderPageCounters()}
                  <div className="btn-group">
                    <button className={prevPageClassName} onClick={this.handlePrevPage}>
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    <button className={nextPageClassName} onClick={this.handleNextPage}>
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="table-responsive mailbox-messages">
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th className="mailbox-star">Amount</th>
                      <th className="mailbox-name">Account</th>
                      <th className="mailbox-attachment">Payment method</th>
                      <th className="mailbox-date">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.records.map((record) => {
                      return (
                        <tr key={`record_${record.id}`}>
                          <td>{record.category.name}</td>
                          <td className="mailbox-star">
                            {record.currency.name} {record.amount}
                          </td>
                          <td className="mailbox-name">{record.account.name}</td>
                          <td className="mailbox-attachment">{record.payment_method.title}</td>
                          <td className="mailbox-date">{record.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="box-footer no-padding">
              <div className="mailbox-controls">

                <div className="btn-group">
                  <button type="button" className="btn btn-default btn-flat">Action</button>
                  <button type="button" className="btn btn-default btn-flat dropdown-toggle" data-toggle="dropdown">
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </div>

                <div className="pull-right">
                  {this.renderPageCounters()}
                  <div className="btn-group">
                    <button className={prevPageClassName} onClick={this.handlePrevPage}>
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    <button className={nextPageClassName} onClick={this.handleNextPage}>
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


var RecordsMain = React.createClass({
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
      <div id="content" className="content">
        <section className="content-header">
          <h1>
            Records COMPONENT
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li className="active">Records COMPONENT</li>
          </ol>
        </section>
        <section className="content">
          <Records meta={this.state.meta} records={this.state.records} />
        </section>
      </div>
    );
  }
});

module.exports = RecordsMain;
