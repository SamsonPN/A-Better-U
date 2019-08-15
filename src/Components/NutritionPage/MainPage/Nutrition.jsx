import React, { Component } from 'react';
import NutritionView from './NutritionView.jsx';
import {default as NVBtns} from './NutritionViewButtons.jsx';
import {default as Meals} from './NutritionMealDividers.jsx';

class Nutrition extends Component {

  render() {
    return (
      <div id="NutritionContainer">
          <NutritionView/>
          <NVBtns/>
          <Meals/>
          <Meals/>
          <Meals/>
      </div>
    );
  }

}

export default Nutrition;
