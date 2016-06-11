
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
      let recordType;
      let sourceAccountId;
      let targetAccountId;

      if (this.props.record.transaction) {
        recordType = 'transaction';
        sourceAccountId = this.props.record.transaction.source_account.id;
        targetAccountId = this.props.record.transaction.target_account.id;
      } else {
        recordType = this.props.record.record_type.value == 0 ? 'income' : 'expense';
      }

      return {
        canSubmit: false,
        account: this.props.record.account.id,
        amount: this.props.record.amount,
        source_account: sourceAccountId,
        target_account: targetAccountId,
        category: (this.props.record.category) ? this.props.record.category.id : undefined,
        currency: this.props.record.currency.id,
        paymentMethod: this.props.record.payment_method.value,
        recordType: recordType,
        description: this.props.record.description,
        datetime: this.props.record.date
      };
    }

    return {
      canSubmit: false,
      account: undefined,
      source_account: undefined,
      target_account: undefined,
      amount: undefined,
      category: undefined,
      currency: undefined,
      paymentMethod: undefined,
      recordType: 'expense',
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
    if (this.state.recordType === 'transaction') {
      if (this.props.record.id) {
        Actions.saveTransaction(model, this.history);
      } else {
        Actions.addTransaction(model, this.history);
      }
    } else {
      if (this.props.record.id) {
        Actions.save(model, this.history);
      } else {
        Actions.add(model, this.history);
      }
    }
  },

  handleDelete() {
    if (this.state.recordType === 'transaction') {
      Actions.deleteTransaction(this.history);
    } else {
      Actions.delete(this.history);
    }
  },

  renderRecordTypeLabel() {
    let label;
    switch (this.state.recordType) {
      case "expense":
        label = 'Expense';
      case "income":
        label = "Income";
      case "transaction":
        label = "Transaction";
      default:
        label = "Expense";
    }
    return <label htmlFor="income-expense">{label}</label>;
  },

  renderRecordTypeIncomeButton() {
    let incomeButtonClassName = classNames({
      'btn btn-default btn-lg btn-flat': true,
      'active': this.state.recordType === 'income'
    });

    return (
      <button type="button"
              className={incomeButtonClassName}
              onClick={() => this.setState({recordType: 'income'})}>
        Income
      </button>
    );
  },

  renderRecordTypeExpenseButton() {
    let expenseButtonClassName = classNames({
      'btn btn-default btn-lg btn-flat': true,
      'active': this.state.recordType === 'expense'
    });

    return (
      <button type="button"
              className={expenseButtonClassName}
              onClick={() => this.setState({recordType: 'expense'})}>
        Expense
      </button>
    );
  },

  renderRecordTypeTransactionButton() {
    let transactionButtonClassName = classNames({
      'btn btn-default btn-lg btn-flat': true,
      'active': this.state.recordType === 'transaction'
    });

    return (
      <button type="button"
              className={transactionButtonClassName}
              onClick={() => this.setState({recordType: 'transaction'})}>
        Transaction
      </button>
    );
  },

  renderRecordTypeSwitcher() {
    if (this.props.record.id) {
      return (
        <div className="row">
          <div className="col-lg-12">
              {(() => {
                if (this.state.recordType === 'transaction') {
                  return (
                    <div className="btn-group">
                      {this.renderRecordTypeTransactionButton()}
                    </div>
                  );
                } else {
                  return (
                    <div className="btn-group">
                      {this.renderRecordTypeIncomeButton()}
                      {this.renderRecordTypeExpenseButton()}
                    </div>
                  );
                }
              })()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-lg-12">
            <div className="btn-group">
              {this.renderRecordTypeIncomeButton()}
              {this.renderRecordTypeExpenseButton()}
              {this.renderRecordTypeTransactionButton()}
            </div>
          </div>
        </div>
      );
    }
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

  renderIncomeExpenseForm() {
    return (
      <Formsy.Form onValidSubmit={this.handleSubmit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}>

        <div className="box-body">
          {this.renderRecordTypeSwitcher()}

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
        </div>

        <div className="row">
          <div className="col-lg-6">
            <label htmlFor="paymentMethod">Payment Method</label>
            <SelectField
              name="paymentMethod"
              options={this.props.paymentMethod}
              value={this.state.paymentMethod}
              onChange={(val) => {this.setState({paymentMethod: val});}}
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
          <div className="col-lg-6">
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

          <div className="col-lg-6">
            <label htmlFor="date-time">Date and Time</label>
            <DateTimeField
              name="datetime"
              value={this.state.datetime}
              onChange={(val) => {this.setState({datetime: val});}} required />
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
        </div>
        <div className="box-footer">
          {this.renderSubmitButton()}
          {this.renderDeleteButton()}
        </div>
      </Formsy.Form>
    );
  },

  renderTransactionForm() {
    return (
      <div>
        <Formsy.Form onValidSubmit={this.handleSubmit}
                     onValid={this.enableButton}
                     onInvalid={this.disableButton}>

          <div className="box-body">
            {this.renderRecordTypeSwitcher()}

            <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="source_account">From account</label>
                    <SelectField
                      name="source_account"
                      options={this.props.accounts.map((account) => {
                        return {value: account.id, label: account.name};
                      })}
                      style={{margin: 0, padding: 0}}
                      onChange={(val) => {this.setState({source_account: val});}}
                      value={this.state.source_account}
                      required />
                  </div>

                  <div className="col-lg-6">
                    <label htmlFor="target_account">To account</label>
                    <SelectField
                      name="target_account"
                      options={this.props.accounts.map((account) => {
                        return {value: account.id, label: account.name};
                      })}
                      value={this.state.target_account}
                      onChange={(val) => {this.setState({target_account: val});}}
                      required />
                  </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="paymentMethod">Payment Method</label>
              <SelectField
                name="paymentMethod"
                options={this.props.paymentMethod}
                value={this.state.paymentMethod}
                onChange={(val) => {this.setState({paymentMethod: val});}}
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
            <div className="col-lg-6">
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

            <div className="col-lg-6">
              <label htmlFor="date-time">Date and Time</label>
              <DateTimeField
                name="datetime"
                value={this.state.datetime}
                onChange={(val) => {this.setState({datetime: val});}} required />
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
          </div>
          <div className="box-footer">
            {this.renderSubmitButton()}
            {this.renderDeleteButton()}
          </div>
        </Formsy.Form>
      </div>
    );
  },


  render() {
    return (
      <div className="row">
        <div className="col-md-12">

          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Add Record</h3>
            </div>

            {(() => {
              if (this.state.recordType === 'transaction') {
                return this.renderTransactionForm();
              } else {
                return this.renderIncomeExpenseForm();
              }
            })()}
          </div>

        </div>
      </div>
    );
  }
});

export default RecordForm;
