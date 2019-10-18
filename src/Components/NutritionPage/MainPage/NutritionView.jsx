import React, { Component } from 'react';
import {NutritionContext, CalculatorContext} from '../../../AppContext/ExportContexts';

class NutritionView extends Component {
  static contextType = CalculatorContext;
  componentDidMount(){
    this.context.GetGoals();
  }
  render() {
    return (
      <NutritionContext.Consumer>
        { ({ calories, protein, fat, carbs }) => (
          <CalculatorContext.Consumer>
            { ({ CalculateMacros, Calories }) => (
              <div id="NutritionView">
                <p id="CaloriesToday">Calories Today:
                  <span id="CaloriesConsumed"> {calories} </span>
                  /
                  <span id="TotalCalories"> {Calories}</span>
                </p>

                <div id="NutritionViewMacroWrapper">
                  <p className="macros" id="protein">Protein: {protein} / {CalculateMacros('Protein')}g</p>
                  <p className="macros" id="fat">Fat: {fat} / {CalculateMacros('Fat')}g</p>
                  <p className="macros" id="carbs">Carbs: {carbs} / {CalculateMacros('Carbs')}g</p>
                </div>
              </div>
            )}
          </CalculatorContext.Consumer>
        )}
      </NutritionContext.Consumer>
    );
  }

}

export default NutritionView;
