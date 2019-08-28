import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {default as MealItems} from './NutritionMealItems.jsx';
import AddFood from '../../../assets/add-food.svg';
import UpArrow from '../../../assets/up-arrow.svg';

class NutritionMealDividers extends Component {
  render() {
    const { name } = this.props;

    const meal_Items = this.props.FoodAdded.map((item) =>
        <MealItems
          key={item.name}
          name={item.name}
          ndbno={item.ndbno}
          meal={this.props.name}
          updateCalories={this.props.updateCalories}
          displayFood={this.props.displayFood}
          showDelete={this.props.showDelete}
          />
    );

    return (
        <div className="NutritionMealDividers">

          <div className="MealNameWrapper">
            <p className="MealName">{this.props.name}</p>
            <img className="NutritionDownArrowImg" src={UpArrow} alt="Down arrow"/>
          </div>

          <div className="MealItemsWrapper">
            {meal_Items}
          </div>

          <Link className="AddFoodImgWrapper" to="/nutrition/addfood">
            <div >
              <img className="AddFoodImg" src={AddFood} alt="Add Food" title="Add Food" onClick={this.props.currentMeal.bind(this, name )}/>
            </div>
          </Link>

       </div>
    );
  }

}

export default NutritionMealDividers;
