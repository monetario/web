import React from 'react';
import Formsy from 'formsy-react';
import Select from 'react-select';

const SelectField = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue(value) {
    if (value) {
      this.setValue(value.value, value.label);
      this.props.onChange(value.value, value.label);
    } else {
      this.setValue(undefined, undefined);
      this.props.onChange(undefined, undefined);
    }
  },

  renderOption(option) {
    if (option.colour) {
      return (
        <span className="color-option">
          <span className="color-box" style={{backgroundColor: option.colour}}>
          </span> <span className="color-label">{option.label}</span>
        </span>
      );
    }

    if (option.logo) {
      return (
        <i className={"fa fa-fw " + option.logo}></i>
      );
    }

    return <span>{option.label}</span>;
  },

  renderValue(option) {
    if (option.colour) {
      return (
        <span className="color-option">
          <span className="color-box" style={{backgroundColor: option.colour}}>
          </span> <span className="color-label">{option.label}</span>
        </span>
      );
    }
    
    if (option.logo) {
      return (
        <i className={"fa fa-fw " + option.logo}></i>
      );
    }

    return <span>{option.label}</span>;
  },

  render() {
    const errorMessage = this.getErrorMessage();

    return (
      <div>
        <Select
          name="form-field-name"
          className="form-control input-lg"
          options={this.props.options}
          style={{margin: 0, padding: 0}}
          onChange={this.changeValue}
          optionRenderer={this.renderOption}
          valueRenderer={this.renderValue}
          value={this.getValue()} />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});

export default SelectField;
