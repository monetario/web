
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
import RecordTypeSwitchField from '../../components/record_type_switch';


var CategoryForm = React.createClass({
  mixins: [History],

  componentWillMount() {
  },

  componentWillUnmount() {
    Actions.reset();
  },

  getInitialState: function () {
    if (this.props.category.id) {
      return {
        canSubmit: false,
        name: this.props.category.name,
        categoryType: this.props.category.category_type.value == 0 ? 'income' : 'outcome',
        parent: (this.props.category.parent) ? this.props.category.parent.id : undefined
      };
    }

    return {
      canSubmit: false,
      name: undefined,
      categoryType: undefined,
      parent: undefined
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
    if (this.props.category.id) {
      Actions.save(model, this.history);
    } else {
      Actions.add(model, this.history);
    }
  },

  handleDelete() {
    Actions.delete(this.history);
  },

  renderCategoryTypeLabel() {
    let label = 'Expense';
    if (this.state.categoryType === 'income') {
      label = 'Income';
    }
    return <label htmlFor="income-outcome">{label}</label>;
  },

  renderCategoryTypeLabel() {
    let label = 'Expense';
    if (this.state.categoryType === 'income') {
      label = 'Income';
    }
    return <label htmlFor="income-outcome">{label}</label>;
  },

  renderSubmitButton() {
    let buttonLabel = 'Add';
    if (this.props.category.id) {
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
    if (!this.props.category.id) {
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
              <h3 className="box-title">Add Category</h3>
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
                  <label htmlFor="category">Parent</label>
                  <SelectField
                    name="parent"
                    options={this.props.categories.map((category) => {
                      return {value: category.id, label: category.name};
                    })}
                    value={this.state.parent}
                    onChange={(val) => {this.setState({category: val});}} />
                </div>

                <div className="form-group col-xs-3">
                  {this.renderCategoryTypeLabel()}

                  <RecordTypeSwitchField
                    name="categoryType"
                    value={this.state.categoryType}
                    onChange={(val) => {
                      this.setState({categoryType: val});
                    }} />
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

export default CategoryForm;