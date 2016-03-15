'use strict';

import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import API from './api';
import App from './app';
import SignInHandler from './app/signin/handler';
import SignUpHandler from './app/signup/handler';
import LogOutHandler from './app/log_out/handler';
import DashboardHandler from './app/dashboard/handler';
import RecordsHandler from './app/records/handler';
import RecordHandler from './app/record/handler';
import AccountsHandler from './app/accounts/handler';
import AccountHandler from './app/account/handler';
import CurrenciesHandler from './app/currencies/handler';
import CurrencyHandler from './app/currency/handler';
import CategoriesHandler from './app/categories/handler';
import CategoryHandler from './app/category/handler';


function requireAuth(nextState, replace) {
  if (!API.loggedIn()) {
    replace({ nextPathname: nextState.location.pathname }, '/signin', {});
  }
}

if (typeof window !== "undefined") {
  window.onload = function() {
    var appNode = document.getElementById('page-wrapper');

    render((
      <Router history={createBrowserHistory()}>
        <Route path="/" component={App} onEnter={requireAuth}>
          <IndexRoute component={DashboardHandler} onEnter={requireAuth} />
          <Route path="/p/">
            <IndexRoute component={DashboardHandler} onEnter={requireAuth} />
            <Route path="/p/dashboard" component={DashboardHandler} onEnter={requireAuth} />
            <Route path="/p/records" component={RecordsHandler} onEnter={requireAuth} />
            <Route path="/p/record/(:id/)" component={RecordHandler} onEnter={requireAuth} />
            <Route path="/p/accounts" component={AccountsHandler} onEnter={requireAuth} />
            <Route path="/p/account/(:id/)" component={AccountHandler} onEnter={requireAuth} />
            <Route path="/p/currencies" component={CurrenciesHandler} onEnter={requireAuth} />
            <Route path="/p/currency/(:id/)" component={CurrencyHandler} onEnter={requireAuth} />
            <Route path="/p/categories" component={CategoriesHandler} onEnter={requireAuth} />
            <Route path="/p/category/(:id/)" component={CategoryHandler} onEnter={requireAuth} />
          </Route>
        </Route>
        <Route path="/signup" component={SignUpHandler} />
        <Route path="/signin" component={SignInHandler} />
        <Route path="/logout" component={LogOutHandler} />
      </Router>
    ), appNode)
  };
}
