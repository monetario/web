
import React from 'react';
import Datetime from 'react-datetime';
import Formsy from 'formsy-react';
import Moment from 'moment';

const BarChart = React.createClass({

  getDefaultProps() {
    return {
    };
  },

  componentDidMount() {
    Morris.Bar({
      element: this.props.name,
      data: this.props.data,
      hideHover: this.props.hideHover,
      xkey: this.props.xkey,
      ykeys: this.props.ykeys,
      labels: this.props.labels,
      barColors: this.props.barColors,
      xLabels: this.props.xLabels,
      goals: this.props.goals
    });
  },

  render() {
    return (
      <div id={this.props.name} className="tab-content no-padding"></div>
    );
  }
});

export default BarChart;


