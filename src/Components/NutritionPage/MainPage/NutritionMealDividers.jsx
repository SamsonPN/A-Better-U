import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MealItems from './NutritionMealItems.jsx';
import AddFood from '../../../assets/add-food.svg';
import UpArrow from '../../../assets/up-arrow.svg';
import DownArrow from '../../../assets/down-arrow.svg';

class NutritionMealDividers extends Component {
  state = {
    collapseDiv: false
  }

  CollapseMealDiv = (e) => {
    let arrowImg = e.target;
    let collapsible = document.getElementById('Collapse' + this.props.meal);

    this.setState(prevState => ({
      collapseDiv: !prevState.collapseDiv
    }), function(){
      if(this.state.collapseDiv){
        collapsible.style.display = 'none';
        arrowImg.src = DownArrow;
      }
      else {
        collapsible.style.display = 'flex';
        arrowImg.src = UpArrow;
      }
    })
  }

  render() {
    const {FoodAdded, meal} = this.props;
    const meal_Items = FoodAdded.map((item) =>
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
        <div className="MealItemCollapsible" id={"Collapse" + meal}>
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
