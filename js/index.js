'use strict';

import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './app';
import DashboardHandler from './app/dashboard/handler';
import RecordsHandler from './app/records/handler';
import RecordHandler from './app/record/handler';
import TestMain from './app/test/components';


if (typeof window !== "undefined") {
  window.onload = function() {
    var appNode = document.getElementById('page-wrapper');

    render((
      <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
          <IndexRoute component={DashboardHandler} />
          <Route path="/p/">
            <IndexRoute component={DashboardHandler} />
            <Route path="/p/dashboard" component={DashboardHandler} />
            <Route path="/p/records" component={RecordsHandler} />
            <Route path="/p/record/(:id/)" component={RecordHandler} />
            <Route path="/p/test" component={TestMain}>
            </Route>
          </Route>
        </Route>
      </Router>
    ), appNode)
  };
}
