import React, { Component } from 'react';
import NutritionView from './NutritionView.jsx';
import NVBtns from './NutritionViewButtons.jsx';
import Meals from './NutritionMealDividers.jsx';
import {NutritionContext} from '../../../NutritionContext';

class Nutrition extends Component {
  static contextType = NutritionContext;

  componentDidMount(){
    this.context.FetchFood()
  }

  render() {
    const {changeNutritionDate, date} = this.props;
    const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"].map(meal =>
      <Meals
       key={meal}
       meal={meal}
       FoodAdded={this.context[meal]}
      />
    )
    return (
      <NutritionContext.Consumer>
        { ({ deleteItems, DeleteFood, RemoveDeleteBar, showDelete }) => (
          <div id="NutritionContainer">
            <NutritionView />

            <NVBtns
              date={date}
              changeNutritionDate={changeNutritionDate}
              FetchFood={this.context.FetchFood}
            />

            {meals}

            {showDelete ?
              <div id="DeleteBar" className="UpdateDeleteBars">
                <p>Delete {deleteItems.length} item(s)?</p>
                <p onClick={DeleteFood} className="BarOptns">Yes</p>
                <p>/</p>
                <p onClick={RemoveDeleteBar} className="BarOptns">No</p>
              </div>
              : null
            }
          </div>
        )}
      </NutritionContext.Consumer>
    )
  }
}

export default Nutrition;
