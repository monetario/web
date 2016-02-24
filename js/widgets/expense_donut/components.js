
import React from 'react';
import Reflux from 'reflux';

import Donut from '../../components/donut';

import Store from './store';
import Actions from './actions';

const ExpenseDonutWidget = React.createClass({
  mixins: [
    Reflux.connectFilter(Store, "store", function(storeData) {
      return storeData.widgetData[this.props.name];
    })
  ],

  getInitialState() {
    var storeData = Store.getDefaultData(this.props.name);

    return {
      store: storeData.widgetData[this.props.name]
    };
  },

  componentDidMount() {
    Actions.load(this.props.name, this.props.url);
  },

  renderChart() {
    if (this.state.store.data.length === 0) {
      return '';
    }

    let data = this.state.store.data.map((item) => {
      return {label: this.props.categories[item.category_id].name, value: item.amount}
    });

    return <Donut name={this.props.name}
                  data={data} />;
  },

  render() {
    return (
      <section className="col-lg-6 connectedSortable ui-sortable">
        <div className="box box-solid bg-green-gradient">
          <div className="box-header">
            <i className="fa fa-calendar"></i>
            <h3 className="box-title">{this.props.title}</h3>
            <div className="pull-right box-tools">
              <div className="btn-group">
                <button className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-bars"></i>
                </button>
                <ul className="dropdown-menu pull-right" role="menu">
                  <li><a href="#">Add new event</a></li>
                  <li><a href="#">Clear events</a></li>
                  <li className="divider"></li>
                  <li><a href="#">View calendar</a></li>
                </ul>
              </div>
              <button className="btn btn-success btn-sm" data-widget="collapse">
                <i className="fa fa-minus"></i>
              </button>
              <button className="btn btn-success btn-sm" data-widget="remove">
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
          <div className="box-body no-padding">
            <div id="calendar"></div>
          </div>
          <div className="box-footer text-black">
            <div className="row">
              {this.renderChart()}
            </div>
          </div>
        </div>
      </section>
    );
  }
});

export default ExpenseDonutWidget;


