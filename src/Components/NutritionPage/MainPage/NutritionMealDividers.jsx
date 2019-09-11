import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {default as MealItems} from './NutritionMealItems.jsx';
import AddFood from '../../../assets/add-food.svg';
import UpArrow from '../../../assets/up-arrow.svg';
import DownArrow from '../../../assets/down-arrow.svg';

class NutritionMealDividers extends Component {
  state = {
    collapseDiv: false
  }
  CollapseMealDiv = () => {
    let collapsible = document.getElementById('Collapse' + this.props.name);
    let arrowImg = document.getElementById(this.props.name + 'img')

    this.setState(prevState => ({
      collapseDiv: !prevState.collapseDiv
    }), () => {
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
          showUpdate={this.props.showUpdate}
          />
    );

    return (
        <div className="NutritionMealDividers">

          <div className="MealNameWrapper">
            <p className="MealName">{this.props.name}</p>
            <img className="NutritionDownArrowImg" src={UpArrow} alt="Down arrow" onClick={this.CollapseMealDiv} id={this.props.name+"img"}/>
          </div>

          <div className="MealItemCollapsible" id={"Collapse" + this.props.name}>
            <div className="MealItemsWrapper">
              {meal_Items}
            </div>
            <Link className="AddFoodImgWrapper" to="/nutrition/addfood">
              <div >
                <img className="AddFoodImg" src={AddFood} alt="Add Food" title="Add Food" onClick={this.props.currentMeal.bind(this, name )}/>
              </div>
            </Link>
          </div>

       </div>
    );
  }

}

export default NutritionMealDividers;
