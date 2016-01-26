import React from 'react';
import Formsy from 'formsy-react';


var RecordTypeSwitchField = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue(value) {
    this.setValue(value);
  },

  componentDidMount() {
    let value = this.getValue();
    let marginLeft = (value == 'income') ? '0px' : '-50px';
    this.setState({marginLeft: marginLeft});
  },

  toggleSwitch() {
    let value = this.getValue();
    if (value == 'income') {
      value = 'outcome';
      this.setValue(value);
      this.setState({marginLeft: '-50px'}, () => {
        this.props.onChange(value);
      });
    } else {
      value = 'income';
      this.setValue(value);
      this.setState({marginLeft: '0px'}, () => {
        this.props.onChange(value);
      });
    }
  },

  render() {
    return (
      <div>
        <div className="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-id-switch-state bootstrap-switch-animate bootstrap-switch-on"
             style={{width: "102px"}}
             onClick={this.toggleSwitch}>

          <div className="bootstrap-switch-container" style={{width: "150px", marginLeft: this.state.marginLeft}}>
            <span className="bootstrap-switch-handle-on bootstrap-switch-success" style={{width: "50px"}}>
              <i className="fa fa-plus"></i>
            </span>
            <span className="bootstrap-switch-label" style={{width: "50px"}}>&nbsp;</span>
            <span className="bootstrap-switch-handle-off bootstrap-switch-danger" style={{width: "50px"}}>
              <i className="fa fa-minus"></i>
            </span>
            <input id="switch-state" type="checkbox" checked="" />
          </div>
        </div>
      </div>
    );
  }
});


export default RecordTypeSwitchField;