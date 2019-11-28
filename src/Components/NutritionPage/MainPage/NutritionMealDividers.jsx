import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MealItems from './NutritionMealItems.jsx';
import AddFood from '../../../assets/add-food.svg';
import UpArrow from '../../../assets/up-arrow.svg';
import DownArrow from '../../../assets/down-arrow.svg';

class NutritionMealDividers extends Component {
  CollapseMealDiv = (e) => {
    let img = e.target;
    let collapsible = this.Collapsible.style;
    let display = collapsible.display;
    if(display === '' || display === 'flex'){
      collapsible.display = 'none';
      img.src = DownArrow;
    }
    else{
      collapsible.display = 'flex';
      img.src = UpArrow;
    }
  }

  render() {
    const {FoodAdded, meal} = this.props;
    const meal_Items = (FoodAdded || []).map((item) =>
        <MealItems
          key={item.name}
          meal={meal}
          name={item.name}
          ndbno={item.ndbno}
          servings={item.servings}
        />
    );

    return (
      <div className="NutritionMealDividers">
        <div className="MealNameWrapper">
          <p className="MealName">{meal}</p>
          <img
            className="NutritionDownArrowImg"
            src={UpArrow}
            alt="Arrows"
            onClick={(e) => this.CollapseMealDiv(e)}
            />
        </div>
        <div
          className="MealItemCollapsible"
          ref={collapsible => this.Collapsible = collapsible}>
          <div className="MealItemsWrapper">
            {meal_Items}
          </div>
          <Link className="AddFoodImgWrapper" to={`/nutrition/addfood/${meal}`}>
              <img
                className="AddFoodImg"
                src={AddFood}
                alt="Add Food"
                title="Add Food"
                />
          </Link>
        </div>
     </div>
    );
  }

}

export default NutritionMealDividers;
