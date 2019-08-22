import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {default as MealItems} from './NutritionMealItems.jsx';
import AddFood from '../../../assets/add-food.svg';
import UpArrow from '../../../assets/up-arrow.svg';

class NutritionMealDividers extends Component {
  state = {
    mealItems:'',
    FoodAdded: this.props.FoodAdded
  }

  componentDidMount(){
    const meal_Items = this.state.FoodAdded.map((item) =>
        <MealItems name={item.name} />
    );
    this.setState( { mealItems: meal_Items } )
  }

  render() {
    const { name } = this.props;

    return (
        <div className="NutritionMealDividers">

          <div className="MealNameWrapper">
            <p className="MealName">{this.props.name}</p>
            <img className="NutritionDownArrowImg" src={UpArrow} alt="Down arrow"/>
          </div>

          <div className="MealItemsWrapper">
            {this.state.mealItems}
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
