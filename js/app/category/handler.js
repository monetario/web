
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';

import Store from './store';
import Actions from './actions';
import CategoriesForm from './components';



var CategoriesHandler = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onStoreUpdate')
  ],

  componentDidMount() {
    Actions.load(this.props.params.id);
  },

  getInitialState() {
    var storeData = Store.getDefaultData();
    return {
      category: storeData.category,
      categories: storeData.categories,
    };
  },

  onStoreUpdate(storeData) {
    if (storeData.loaded !== undefined) {
      this.setState({loaded: storeData.loaded});
    }

    if (storeData.category !== undefined) {
      this.setState({category: storeData.category});
    }

    if (storeData.categories !== undefined) {
      this.setState({categories: storeData.categories});
    }
  },

  renderForm() {
    if (this.props.params.id && !this.state.category.id) {
      return <div></div>;
    }

    if (!this.state.loaded) {
      return <div></div>;
    }

    return <CategoriesForm category={this.state.category}
                           categories={this.state.categories} />
  },

  render() {
    return (
      <div id="content" className="content">
        <section className="content-header">
          <h1>
            Categories
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li>
              <Link to="/p/categories"><i className="fa fa-tags"></i> Categories</Link>
            </li>
            <li className="active">Category</li>
          </ol>
        </section>
        <section className="content">
          {this.renderForm()}
        </section>
      </div>
    );
  }
});

export default CategoriesHandler;
