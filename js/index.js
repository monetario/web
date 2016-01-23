import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

//import routes from './routes';
import AdminApp from './app';
import DashboardMain from './app/dashboard/components';
import RecordsMain from './app/records/components';
import TestMain from './app/test/components';
//import DashboardMain from './app/dashboard/components';


if (typeof window !== "undefined") {
  window.onload = function() {
    var appNode = document.getElementById('page-wrapper');

    render((
      <Router history={createBrowserHistory()}>
        <Route path="/" component={AdminApp}>
          <IndexRoute component={DashboardMain} />
          <Route path="/p/">
            <IndexRoute component={DashboardMain} />
            <Route path="/p/dashboard" component={DashboardMain} />
            <Route path="/p/records" component={RecordsMain} />
            <Route path="/p/test" component={TestMain}>
            </Route>
          </Route>
        </Route>
      </Router>
    ), appNode)
  };
}
