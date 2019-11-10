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
                <p>Calories: <span>{calories} / {Calories}</span></p>
                <div id="NutritionViewMacroWrapper">
                  <p id="protein">Protein: <span>{protein} / {CalculateMacros('Protein')}g</span></p>
                  <p id="fat">Fat: <span>{fat} / {CalculateMacros('Fat')}g</span></p>
                  <p id="carbs">Carbs: <span>{carbs} / {CalculateMacros('Carbs')}g</span></p>
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
