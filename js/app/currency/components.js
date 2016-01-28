
'use strict';

import React from 'react';
import {Router, Route, Link, History} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';
import Select from 'react-select';
import Formsy from 'formsy-react';
import Moment from 'moment';

import Store from './store';
import Actions from './actions';
import InputField from '../../components/input_field';
import TextAreaField from '../../components/textarea';
import DateTimeField from '../../components/date_time';
import SelectField from '../../components/select';


var CurrencyForm = React.createClass({
  mixins: [History],

  componentWillMount() {
  },

  componentWillUnmount() {
    Actions.reset();
  },

  getInitialState: function () {
    if (this.props.currency.id) {
      return {
        canSubmit: false,
        name: this.props.currency.name,
        symbol: this.props.currency.symbol
      };
    }

    return {
      canSubmit: false,
      name: undefined,
      symbol: undefined
    }
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  handleSubmit: function (model) {
    if (this.props.currency.id) {
      Actions.save(model, this.history);
    } else {
      Actions.add(model, this.history);
    }
  },

  handleDelete() {
    Actions.delete(this.history);
  },

  renderCurrencyTypeLabel() {
    let label = 'Expense';
    if (this.state.currencyType === 'income') {
      label = 'Income';
    }
    return <label htmlFor="income-outcome">{label}</label>;
  },

  renderSubmitButton() {
    let buttonLabel = 'Add';
    if (this.props.currency.id) {
      buttonLabel = 'Update';
    }
    return (
      <button type="submit"
              className="btn btn-lg btn-success btn-flat"
              disabled={!this.state.canSubmit}>
        {buttonLabel}
      </button>
    )
  },

  renderDeleteButton() {
    if (!this.props.currency.id) {
      return '';
    }
    return (
      <button type="button"
              className="btn btn-lg btn-danger btn-flat pull-right"
              onClick={this.handleDelete}>
        Delete
      </button>
    )
  },

  render() {
    return (
      <div className="row">
        <div className="col-md-12">

          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Add Currency</h3>
            </div>

            <Formsy.Form onValidSubmit={this.handleSubmit}
                         onValid={this.enableButton}
                         onInvalid={this.disableButton}>

              <div className="box-body">
                <div className="form-group col-xs-3">
                  <label htmlFor="name-input">Name</label>
                  <InputField name="name"
                              type="text"
                              value={this.state.name}
                              onChange={(val) => {this.setState({name: val});}}
                              required />
                </div>

                <div className="form-group col-xs-3">
                  <label htmlFor="currency">Currency</label>
                  <SelectField
                    name="symbol"
                    options={this.props.currencies.map((currency) => {
                      return {value: currency.symbol, label: currency.name};
                    })}
                    value={this.state.symbol}
                    onChange={(val) => {this.setState({currency: val});}}
                    required />
                </div>
              </div>

              <div className="box-footer">
                {this.renderSubmitButton()}
                {this.renderDeleteButton()}
              </div>
            </Formsy.Form>
          </div>

        </div>
      </div>
    );
  }
});

export default CurrencyForm;
