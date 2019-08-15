import React, { Component } from 'react';

class NutritionView extends Component {
  state = {
    calories:{
      consumed: '####',
      total: '#####'
    },
    nutrition:{
      protein:'###',
      carbs:'###',
      fat:'###'
    }
  }
  render() {
    return (
      <div id="NutritionView">
        <p id="CaloriesToday">Calories Today:
          <span id="CaloriesConsumed"> {this.state.calories.consumed} </span>
          /
          <span id="TotalCalories"> {this.state.calories.total}</span>
        </p>

        <div id="NutritionViewMacroWrapper">
          <p className="macros" id="carbs">Carbs: {this.state.nutrition.carbs}</p>
          <p className="macros" id="fat">Fat: {this.state.nutrition.fat}</p>
          <p className="macros" id="protein">Protein: {this.state.nutrition.protein}</p>
        </div>
      </div>
    );
  }

}

export default NutritionView;
