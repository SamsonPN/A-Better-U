import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {default as MealItems} from './NutritionMealItems.jsx';
import AddFood from '../../../assets/add-food.svg';
import DownArrow from '../../../assets/down-arrow.svg'


class NutritionMealDividers extends Component {

  render() {
    return (
      <div id="NutritionMealDividers">

        <div id="MealNameWrapper">
          <p>Meal Name</p>
          <img id="NutritionDownArrowImg"src={DownArrow} alt="Down arrow"/>
        </div>

        <div id="MealItemsWrapper">
          <MealItems/>
          <MealItems/>
          <MealItems/>
          <MealItems/>
          <MealItems/>
          <MealItems/>
        </div>

        <Link id="AddFoodImgWrapper" to="/nutrition/addfood">
          <div >
            <img id="AddFoodImg" src={AddFood} alt="Add Food" title="Add Food"/>
          </div>
        </Link>

     </div>
    );
  }

}

export default NutritionMealDividers;
