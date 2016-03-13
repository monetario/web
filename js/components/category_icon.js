import React from 'react';

var CategoryIcon = React.createClass({
  render() {
    let { category } = this.props;
    return (
      <span className="category-icon btn btn-default btn-flat"
            style={{backgroundColor: category.colour}}>
        <i className={"fa fa-fw " + category.logo}></i>
      </span>
    );
  }
});

export default CategoryIcon;
