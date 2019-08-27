import React, { Component } from 'react';

class NutritionModalItems extends Component {

  render() {
    return (
      <div className="NutritionModalItems">
        <p>{this.props.name}</p>
        <p>{this.props.value} {this.props.unit}</p>
      </div>
    );
  }

}

export default NutritionModalItems;
