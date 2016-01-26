import React from 'react';
import Formsy from 'formsy-react';

const InputField = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const errorMessage = this.getErrorMessage();

    return (
      <div>
        <input
          type={this.props.type || 'text'}
          step={this.props.step || undefined}
          name={this.props.name}
          className="form-control input-lg"
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null} />

        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default InputField;