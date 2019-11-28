import React, { Component } from 'react';
import NutritionView from './NutritionView';
import NVBtns from './NutritionViewButtons';
import Meals from './NutritionMealDividers';
import Totals from './NutritionTotalsModal';
import {NutritionContext} from '../../../AppContext/ExportContexts';
import './Nutrition.css';

class Nutrition extends Component {
  static contextType = NutritionContext;
  render() {
    const {showTotals} = this.context;
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
        {showTotals ? <Totals /> : null}
      </div>
    )
  }
}

export default Nutrition;
