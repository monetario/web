
import React from 'react';
import Datetime from 'react-datetime';
import Formsy from 'formsy-react';
import Moment from 'moment';

const Donut = React.createClass({

  getDefaultProps() {
    return {
    };
  },

  componentDidMount() {
    Morris.Donut({
      element: this.props.name,
      data: this.props.data,
      colors: this.props.colors
    });
  },

  render() {
    return (
      <div id={this.props.name} className="tab-content no-padding"></div>
    );
  }
});

export default Donut;


