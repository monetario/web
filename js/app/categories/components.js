
'use strict';

import React from 'react';
import {Router, Route, Link, History} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';
import Moment from 'moment';

import Store from './store';
import Actions from './actions';
import CategoryIcon from '../../components/category_icon';



var Category = React.createClass({
  mixins: [History],

  handleCategoryClick(e) {
    e.preventDefault();

    this.history.pushState(null, `/p/category/${this.props.category.id}/`, {});
  },

  render() {
    let category = this.props.category;

    return (
      <tr onClick={this.handleCategoryClick}>
        <td><CategoryIcon category={category} /> {category.name}</td>
        <td>
          {category.category_type.title}
        </td>
      </tr>
    );
  }
});


var Categories = React.createClass({
  mixins: [History],

  handleNextPage(e) {
    e.preventDefault();

    if (this.props.meta.next_url) {
      //this.history.pushState(null, `/p/categories/`, {page: 2});
      Actions.loadUrl(this.props.meta.next_url);
    }
  },

  handlePrevPage(e) {
    e.preventDefault();

    if (this.props.meta.prev_url) {
      //this.history.pushState(null, `/p/categories/`, {page: 2});
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
      'btn btn-default btn-flat': true,
      'disabled': this.props.meta.next_url === null
    });
    let prevPageClassName = classNames({
      'btn btn-default btn-flat': true,
      'disabled': this.props.meta.prev_url === null
    });

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Categories</h3>
              <div className="box-tools">
                <div className="input-group" style={{width: "75px"}}>
                  <div className="input-group-btn">
                    <Link to="/p/category/" className="btn btn-success btn-flat">
                      <i className="fa fa-plus"></i> New Category
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-body no-padding">
              <div className="mailbox-controls">

                <div className="btn-group"></div>
                
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
                      <th className="mailbox-star">Name</th>
                      <th className="mailbox-name">Category type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.categories.map((category) => {
                      return <Category key={`category_${category.id}`} category={category}/>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="box-footer no-padding">
              <div className="mailbox-controls">

                <div className="btn-group"></div>

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

export default Categories;
