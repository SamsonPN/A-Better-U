import React, { Component } from 'react';
import NutritionView from './NutritionView.jsx';
import NVBtns from './NutritionViewButtons.jsx';
import Meals from './NutritionMealDividers.jsx';
import {NutritionContext} from '../../../AppContext/ExportContexts';

class Nutrition extends Component {
  static contextType = NutritionContext;

  componentDidMount(){
    this.context.FetchFood();
  }
  
  render() {
    const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"].map(meal =>
      <Meals
       key={meal}
       meal={meal}
       FoodAdded={this.context[meal]}
      />
    )
    return (
      <div id="NutritionContainer">
        <NutritionView />
        <NVBtns />
        {meals}
      </div>
    )
  }
}

export default Nutrition;
