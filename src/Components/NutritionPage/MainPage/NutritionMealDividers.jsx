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

  CollapseMealDiv = () => {
    let collapsible = document.getElementById('Collapse' + this.props.meal);
    let arrowImg = document.getElementById(this.props.meal + 'img');

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
    const meal_Items = this.props.FoodAdded.map((item) =>
        <MealItems
          key={item.name}
          name={item.name}
          ndbno={item.ndbno}
          meal={this.props.meal}
          report={this.props.report}
          servings={item.servings}
          updateServings={this.props.updateServings}
          saveServing={this.props.saveServing}
          showDelete={this.props.showDelete}
          />
    );

    return (
        <div className="NutritionMealDividers">

          <div className="MealNameWrapper">
            <p className="MealName">{this.props.meal}</p>
            <img className="NutritionDownArrowImg" src={UpArrow} alt="Down arrow" onClick={this.CollapseMealDiv} id={this.props.meal+"img"}/>
          </div>

          <div className="MealItemCollapsible" id={"Collapse" + this.props.meal}>
            <div className="MealItemsWrapper">
              {meal_Items}
            </div>
            <Link className="AddFoodImgWrapper" to="/nutrition/addfood">
              <div >
                <img className="AddFoodImg" src={AddFood} alt="Add Food" title="Add Food" onClick={this.props.currentMeal.bind(this, this.props.meal )}/>
              </div>
            </Link>
          </div>

       </div>
    );
  }

}

export default NutritionMealDividers;
