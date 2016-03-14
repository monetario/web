
'use strict';

import React from 'react';
import {Router, Route, Link, History} from 'react-router'
import Reflux from 'reflux';
import classNames from 'classnames';
import Select from 'react-select';
import Formsy from 'formsy-react';
import Moment from 'moment';
import _ from 'lodash';

import Store from './store';
import Actions from './actions';
import InputField from '../../components/input_field';
import TextAreaField from '../../components/textarea';
import DateTimeField from '../../components/date_time';
import SelectField from '../../components/select';
import CategorySelectField from '../../components/category_select';
import RecordTypeSwitchField from '../../components/record_type_switch';


var RecordForm = React.createClass({
  mixins: [History],

  componentWillMount() {
  },

  componentWillUnmount() {
    Actions.reset();
  },

  getInitialState: function () {
    if (this.props.record.record_type) {
      return {
        canSubmit: false,
        account: this.props.record.account.id,
        amount: this.props.record.amount,
        category: this.props.record.category.id,
        currency: this.props.record.currency.id,
        paymentMethod: this.props.record.payment_method.value,
        recordType: this.props.record.record_type.value == 0 ? 'income' : 'outcome',
        description: this.props.record.description,
        datetime: this.props.record.date
      };
    }

    return {
      canSubmit: false,
      account: undefined,
      amount: undefined,
      category: undefined,
      currency: undefined,
      paymentMethod: undefined,
      recordType: 'outcome',
      description: undefined,
      datetime: Moment().format("YYYY-MM-DDTHH:mm:ss")
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
    if (this.props.record.id) {
      Actions.save(model, this.history);
    } else {
      Actions.add(model, this.history);
    }
  },

  handleDelete() {
    Actions.delete(this.history);
  },

  renderRecordTypeLabel() {
    let label = 'Expense';
    if (this.state.recordType === 'income') {
      label = 'Income';
    }
    return <label htmlFor="income-outcome">{label}</label>;
  },

  renderSubmitButton() {
    let buttonLabel = 'Add';
    if (this.props.record.id) {
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
    if (!this.props.record.id) {
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
              <h3 className="box-title">Add Record</h3>
            </div>

            <Formsy.Form onValidSubmit={this.handleSubmit}
                         onValid={this.enableButton}
                         onInvalid={this.disableButton}>

              <div className="box-body">
                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="category">Category</label>
                    <CategorySelectField
                      name="category"
                      options={this.props.categories.map((category) => {
                        return {
                          value: category.id,
                          label: category.name,
                          logo: category.logo,
                          colour: category.colour
                        };
                      })}
                      value={this.state.category}
                      onChange={(val) => {
                        if (val) {
                          let valObj = _.find(this.props.categories, (o) => {return o.id === val});
                          this.setState({
                            category: val,
                            recordType: valObj.category_type.title.toLowerCase()
                          });
                        } else {
                          this.setState({category: val});
                        }
                      }}
                      required />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <SelectField
                      name="paymentMethod"
                      options={this.props.paymentMethod}
                      value={this.state.paymentMethod}
                      onChange={(val) => {this.setState({paymentMethod: val});}}
                      required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="account">Account</label>
                    <SelectField
                      name="account"
                      options={this.props.accounts.map((account) => {
                        return {value: account.id, label: account.name};
                      })}
                      style={{margin: 0, padding: 0}}
                      onChange={(val) => {this.setState({account: val});}}
                      value={this.state.account}
                      required />
                  </div>

                  <div className="col-lg-6">
                    <label htmlFor="currency">Currency</label>
                    <SelectField
                      name="currency"
                      options={this.props.currencies.map((currency) => {
                        return {value: currency.id, label: currency.name};
                      })}
                      value={this.state.currency}
                      onChange={(val) => {this.setState({currency: val});}}
                      required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="amount-input">Amount</label>
                    <InputField name="amount"
                                type="number"
                                step="0.01"
                                value={this.state.amount}
                                onChange={(val) => {this.setState({amount: val});}}
                                validations="isFloat"
                                validationError="This is not a valid email"
                                required />
                  </div>

                  <div className="col-lg-4">
                    <label htmlFor="date-time">Date and Time</label>
                    <DateTimeField
                      name="datetime"
                      value={this.state.datetime}
                      onChange={(val) => {this.setState({datetime: val});}} required />
                  </div>

                  <div className="col-lg-4">
                    {this.renderRecordTypeLabel()}

                    <RecordTypeSwitchField
                      name="recordType"
                      value={this.state.recordType}
                      onChange={(val) => {
                        this.setState({recordType: val});
                      }} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <label>Note</label>
                    <TextAreaField
                      name="description"
                      value={this.state.description}
                      onChange={(val) => {
                        this.setState({description: val});
                      }} />
                  </div>
                </div>

                <div className="box-footer">
                  {this.renderSubmitButton()}
                  {this.renderDeleteButton()}
                </div>
              </div>
            </Formsy.Form>
          </div>

        </div>
      </div>
    );
  }
});

export default RecordForm;
