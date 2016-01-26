
import React from 'react';
import Datetime from 'react-datetime';
import Formsy from 'formsy-react';
import Moment from 'moment';

const DateTimeField = React.createClass({
  mixins: [Formsy.Mixin],

  getDefaultProps() {
    return {
      timeFormat: "HH:mm:ss",
      displayFormat: 'L',
      dateFormat: "YYYY-MM-DD",
      outputFormat: "YYYY-MM-DDTHH:mm:ss",
      component: "ul",
      contentComponent: "li",
      help: {helptext: undefined},
      onChange: function() {}
    };
  },
  onDateChange(moment) {
    let date;
    if (Moment.isMoment(moment)) {
      date = moment.format(this.props.outputFormat);
      this.setValue(date);
    } else {
      date = undefined;
      this.setValue(date);
    }
    this.props.onChange(date, this.props.name, this.isValid());
  },
  onBlur(moment) {
    let isMoment = Moment.isMoment(moment);
    if (!isMoment) {
      this.props.onChange(undefined, this.props.name, this.isValid());
    }
    this.setState({open: false});
  },

  render() {
    const errorMessage = this.getErrorMessage();
    let moment = (this.getValue()) ? Moment(this.getValue()) : undefined;

    return (
      <div className = {this.props.className}>
            <Datetime timeFormat={this.props.timeFormat}
                      dateFormat={this.props.dateFormat}
                      value={moment}
                      onBlur={this.onBlur}
                      onChange={this.onDateChange}/>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default DateTimeField;
