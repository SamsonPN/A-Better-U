import React, { Component } from 'react';
import {NutritionContext} from '../../../AppContext/ExportContexts';

class NutritionView extends Component {
  state = {
    CalorieGoal: '0',
    ProteinGoal: '0',
    FatGoal: '0',
    CarbsGoal: '0'
  }
  static contextType = NutritionContext;

  componentDidMount(){
    fetch('/getGoals')
      .then(res => res.json())
      .then(data => {
        let Goals = {};
        for(let macro in data){
          if( !macro.includes("Calorie") ) {
            let goal = macro.replace("Goal", "");
            Goals[macro] = this.CalculateMacros(goal, data[macro], data.CalorieGoal);
          }
        }
        this.setState({
          CalorieGoal: data.CalorieGoal,
          ProteinGoal: Goals.ProteinGoal,
          FatGoal: Goals.CalorieGoal,
          CarbsGoal: Goals.CarbsGoal
        })
      })
  }

  CalculateMacros = (macro, goal, calories) => {
    let multiplier = macro === 'Fat' ? 9 : 4;
    return Math.round( ( (goal / 100) * calories ) / multiplier );
  }

  render() {
    const {calories, protein, fat, carbs} = this.context;
    const {CalorieGoal, ProteinGoal, FatGoal, CarbsGoal} = this.state;
    return (
      <div id="NutritionView">
        <p id="CaloriesToday">Calories Today:
          <span id="CaloriesConsumed"> {calories} </span>
          /
          <span id="TotalCalories"> {CalorieGoal}</span>
        </p>

        <div id="NutritionViewMacroWrapper">
          <p className="macros" id="protein">Protein: {protein} / {ProteinGoal}g</p>
          <p className="macros" id="fat">Fat: {fat} / {FatGoal}g</p>
          <p className="macros" id="carbs">Carbs: {carbs} / {CarbsGoal}g</p>
        </div>
      </div>
    );
  }

}

export default NutritionView;
