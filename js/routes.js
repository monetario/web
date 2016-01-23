
'use strict';

import React from 'react';
import Router from 'react-router';
import AdminApp from './app';
import DashboardMain from './app/dashboard/components';
import TestMain from './app/test/components';

var routes = (
  <Router.Route component={AdminApp}>
    <Router.Route name="dashboard" path="/" component={DashboardMain} />
    <Router.Route name="test" path="/test/" component={TestMain} />
  </Router.Route>
);

module.exports = routes;
