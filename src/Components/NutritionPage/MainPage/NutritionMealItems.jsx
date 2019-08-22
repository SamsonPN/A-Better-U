import React, { Component } from 'react';

class NutritionMealItems extends Component {
  render() {
    return (
      <div id="NutritionMealItems">
        <p>{this.props.name}</p>
        <p>###</p>
      </div>
    );
  }
}

export default NutritionMealItems;
