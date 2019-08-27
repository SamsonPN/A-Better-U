import React, { Component } from 'react';

class NutritionView extends Component {
  state = {
    total: '#####'
  }
  render() {
    return (
      <div id="NutritionView">
        <p id="CaloriesToday">Calories Today:
          <span id="CaloriesConsumed"> {this.props.calories} </span>
          /
          <span id="TotalCalories"> {this.state.total}</span>
        </p>

        <div id="NutritionViewMacroWrapper">
          <p className="macros" id="carbs">Carbs: {this.props.carbs}g</p>
          <p className="macros" id="fat">Fat: {this.props.fat}g</p>
          <p className="macros" id="protein">Protein: {this.props.protein}g</p>
        </div>
      </div>
    );
  }

}

export default NutritionView;
