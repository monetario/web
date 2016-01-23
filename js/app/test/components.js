
'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router'
import Reflux from 'reflux';

var TrainMain = React.createClass({
  mixins: [Router.State],

  componentDidMount() {
  },

  render() {
    return (
      <div id="content" className="content">
        <section className="content-header">
          <h1>
            TEST COMPONENT
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Home</Link>
            </li>
            <li className="active">TEST COMPONENT</li>
          </ol>
        </section>
        <section className="content">
          TEST COMPONENT
        </section>
      </div>
    );
  }
});

export default TrainMain;

