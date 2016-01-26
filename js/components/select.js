import React from 'react';
import Formsy from 'formsy-react';
import Select from 'react-select';

const SelectField = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue(value) {
    if (value) {
      this.setValue(value.value, value.label);
    } else {
      this.setValue(undefined, undefined);
    }
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
          value={this.getValue()} />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});

export default SelectField;
