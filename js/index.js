'use strict';

import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './app';
import SignInHandler from './app/signin/handler';
import DashboardHandler from './app/dashboard/handler';
import RecordsHandler from './app/records/handler';
import RecordHandler from './app/record/handler';
import AccountsHandler from './app/accounts/handler';
import AccountHandler from './app/account/handler';
import CurrenciesHandler from './app/currencies/handler';
import CurrencyHandler from './app/currency/handler';
import CategoriesHandler from './app/categories/handler';
import CategoryHandler from './app/category/handler';
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
            <Route path="/p/accounts" component={AccountsHandler} />
            <Route path="/p/account/(:id/)" component={AccountHandler} />
            <Route path="/p/currencies" component={CurrenciesHandler} />
            <Route path="/p/currency/(:id/)" component={CurrencyHandler} />
            <Route path="/p/categories" component={CategoriesHandler} />
            <Route path="/p/category/(:id/)" component={CategoryHandler} />
            <Route path="/p/test" component={TestMain}>
            </Route>
          </Route>
        </Route>
        <Route path="/signin" component={SignInHandler}>
        </Route>
      </Router>
    ), appNode)
  };
}
