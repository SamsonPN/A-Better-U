import React, { Component } from 'react';

class NutritionView extends Component {
  state = {
    CalorieGoal: '0',
    ProteinGoal: '0',
    FatGoal: '0',
    CarbsGoal: '0'
  }

  componentDidMount(){
    fetch('/getGoals')
      .then(res => res.json())
      .then(data =>
        this.setState({
          CalorieGoal: data.CalorieGoal,
          ProteinGoal: this.CalculateMacros('Protein',data.ProteinGoal, data.CalorieGoal),
          FatGoal: this.CalculateMacros('Fat',data.FatGoal, data.CalorieGoal),
          CarbsGoal: this.CalculateMacros('Carbs', data.CarbsGoal, data.CalorieGoal)
        })
      )
  }

  CalculateMacros = (macro, goal, calories) => {
    let multiplier = macro === 'Fat' ? 9 : 4;
    return Math.round( ( (goal / 100) * calories ) / multiplier );
  }

  render() {
    return (
      <div id="NutritionView">
        <p id="CaloriesToday">Calories Today:
          <span id="CaloriesConsumed"> {this.props.calories} </span>
          /
          <span id="TotalCalories"> {this.state.CalorieGoal}</span>
        </p>

        <div id="NutritionViewMacroWrapper">
          <p className="macros" id="protein">Protein: {this.props.protein} / {this.state.ProteinGoal}g</p>
          <p className="macros" id="fat">Fat: {this.props.fat} / {this.state.FatGoal}g</p>
          <p className="macros" id="carbs">Carbs: {this.props.carbs} / {this.state.CarbsGoal}g</p>
        </div>
      </div>
    );
  }

}

export default NutritionView;
