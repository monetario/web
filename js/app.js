
'use strict';

import React from 'react';
import {Router, Route, Link, History} from 'react-router'
import classNames from 'classnames';
import Cookies from 'js-cookie';

import API from './api';


var App = React.createClass({
  mixins: [History],

  getInitialState() {
    return {
      windowMinHeight: undefined,
      current_user: undefined
    };
  },

  updateAuth(loggedIn) {
    if (!loggedIn) {
      this.history.pushState(null, '/signin', {});
    }
  },

  componentWillMount() {
    API.onChange = this.updateAuth;
    API.login();
    API.get('/API/v1/users/current/').then((data) => {
      this.setState({current_user: data});
    });
  },

  componentDidMount() {
    if (Cookies.get('sidebar-collapse') === 'true') {
      document.body.classList.add('sidebar-collapse');
    } else {
      document.body.classList.remove('sidebar-collapse');
    }
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.setState({
      windowMinHeight: `${height}px`
    });
  },

  triggerSidebarCollapse(e) {
    e.preventDefault();

    if (document.body.classList.contains('sidebar-collapse')) {
      Cookies.set('sidebar-collapse', false);
      document.body.classList.remove('sidebar-collapse');
      document.body.classList.remove('sidebar-open');
    } else {
      document.body.classList.add('sidebar-collapse');
      document.body.classList.add('sidebar-open');
      Cookies.set('sidebar-collapse', true);
    }
  },

  renderUser() {
    if (!this.state.current_user) {
      return '';
    }
    return (
      <span>{this.state.current_user.first_name} {this.state.current_user.last_name}</span>
    );
  },

  render: function() {
    let pathname = this.props.location.pathname;
    let dashboardMenuClassName = classNames({
      'active': pathname === '/p/dashboard'
    });
    let recordsMenuClassName = classNames({
      'active': pathname === '/p/records' || pathname.startsWith('/p/record/')
    });
    let accountsdMenuClassName = classNames({
      'active': pathname === '/p/accounts' || pathname.startsWith('/p/account/')
    });
    let currenciesMenuClassName = classNames({
      'active': pathname === '/p/currencies' || pathname.startsWith('/p/currency/')
    });
    let categoriesMenuClassName = classNames({
      'active': pathname === '/p/categories' || pathname.startsWith('/p/category/')
    });

    return (
      <div className="wrapper">
        <header className="main-header">
          <Link to="/p/dashboard" className="logo">
            <span className="logo-mini"><b>M</b>IO</span>
            <span className="logo-lg"><b>Monetar</b>IO</span>
          </Link>
          <nav className="navbar navbar-static-top" role="navigation">
            <a href="#"
               onClick={this.triggerSidebarCollapse}
               className="sidebar-toggle"
               data-toggle="offcanvas"
               role="button">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown user user-menu">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <img src="/static/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                    <span className="hidden-xs">{this.renderUser()}</span>
                  </a>
                  <ul className="dropdown-menu">

                    <li className="user-header">
                      <img src="/static/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                      <p>
                        {this.renderUser()}
                        <small>Member since Nov. 2012</small>
                      </p>
                    </li>

                    <li className="user-body">
                      <div className="col-xs-4 text-center">
                        <a href="#">Followers</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="#">Sales</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="#">Friends</a>
                      </div>
                    </li>
                    <li className="user-footer">
                      <div className="pull-left">
                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                      </div>
                      <div className="pull-right">
                        <a href="#" className="btn btn-default btn-flat">Sign out</a>
                      </div>
                    </li>
                  </ul>
                </li>

                <li>
                  <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <aside className="main-sidebar">

          <section className="sidebar">

            <div className="user-panel">
              <div className="pull-left image">
                <img src="/static/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
              </div>
              <div className="pull-left info">
                <p>{this.renderUser()}</p>
                <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
              </div>
            </div>

            <ul className="sidebar-menu">
              <li className="header">MAIN NAVIGATION</li>
              <li className={dashboardMenuClassName}>
                <Link to="/p/dashboard"><i className="fa fa-dashboard"></i> Dashboard</Link>
              </li>
              <li className={recordsMenuClassName}>
                <Link to="/p/records"><i className="fa fa-table"></i> Records</Link>
              </li>
              <li className={accountsdMenuClassName}>
                <Link to="/p/accounts"><i className="fa fa-briefcase"></i> Accounts</Link>
              </li>
              <li className={currenciesMenuClassName}>
                <Link to="/p/currencies"><i className="fa fa-money"></i> Currencies</Link>
              </li>
              <li className={categoriesMenuClassName}>
                <Link to="/p/categories"><i className="fa fa-tags"></i> Categories</Link>
              </li>
            </ul>
          </section>

        </aside>

        <div className="content-wrapper" style={{minHeight: this.state.windowMinHeight}}>
          {this.props.children}
        </div>

        <footer className="main-footer">
          <div className="pull-right hidden-xs">
            <b>Version</b> 0.0.1
          </div>
          <strong>Copyright &copy; 2015-2016 <a href="http://monetar.io/">MonetarIO</a>.</strong> All rights reserved.
        </footer>


        <aside className="control-sidebar control-sidebar-dark">

          <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
            <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home"></i></a></li>
            <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears"></i></a></li>
          </ul>

          <div className="tab-content">

            <div className="tab-pane" id="control-sidebar-home-tab">
              <h3 className="control-sidebar-heading">Recent Activity</h3>
              <ul className="control-sidebar-menu">
                <li>
                  <a>
                    <i className="menu-icon fa fa-birthday-cake bg-red"></i>
                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Langdon's Birthday</h4>
                      <p>Will be 23 on April 24th</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <i className="menu-icon fa fa-user bg-yellow"></i>
                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Frodo Updated His Profile</h4>
                      <p>New phone +1(800)555-1234</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <i className="menu-icon fa fa-envelope-o bg-light-blue"></i>
                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Nora Joined Mailing List</h4>
                      <p>nora@example.com</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <i className="menu-icon fa fa-file-code-o bg-green"></i>
                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Cron Job 254 Executed</h4>
                      <p>Execution time 5 seconds</p>
                    </div>
                  </a>
                </li>
              </ul>

              <h3 className="control-sidebar-heading">Tasks Progress</h3>
              <ul className="control-sidebar-menu">
                <li>
                  <a>
                    <h4 className="control-sidebar-subheading">
                      Custom Template Design
                      <span className="label label-danger pull-right">70%</span>
                    </h4>
                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-danger" style={{ width: '70%'}}></div>
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <h4 className="control-sidebar-subheading">
                      Update Resume
                      <span className="label label-success pull-right">95%</span>
                    </h4>
                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-success" style={{width: '95%'}}></div>
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <h4 className="control-sidebar-subheading">
                      Laravel Integration
                      <span className="label label-warning pull-right">50%</span>
                    </h4>
                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-warning" style={{ width: '50%' }}></div>
                    </div>
                  </a>
                </li>
                <li>
                  <a>
                    <h4 className="control-sidebar-subheading">
                      Back End Framework
                      <span className="label label-primary pull-right">68%</span>
                    </h4>
                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-primary" style={{ width: '68%' }}></div>
                    </div>
                  </a>
                </li>
              </ul>

            </div>

            <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>

            <div className="tab-pane" id="control-sidebar-settings-tab">
              <form method="post">
                <h3 className="control-sidebar-heading">General Settings</h3>
                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Report panel usage
                    <input type="checkbox" className="pull-right"/>
                  </label>
                  <p>
                    Some information about this general settings option
                  </p>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Allow mail redirect
                    <input type="checkbox" className="pull-right" />
                  </label>
                  <p>
                    Other sets of options are available
                  </p>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Expose author name in posts
                    <input type="checkbox" className="pull-right" />
                  </label>
                  <p>
                    Allow the user to show his name in blog posts
                  </p>
                </div>

                <h3 className="control-sidebar-heading">Chat Settings</h3>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Show me as online
                    <input type="checkbox" className="pull-right" />
                  </label>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Turn off notifications
                    <input type="checkbox" className="pull-right" />
                  </label>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Delete chat history
                    <a className="text-red pull-right"><i className="fa fa-trash-o"></i></a>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </aside>
        <div className="control-sidebar-bg"></div>
      </div>
    );
  }
});

export default App;

