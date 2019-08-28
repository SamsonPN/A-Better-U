import React, { Component } from 'react';

class NutritionView extends Component {
  state = {
    CalorieGoal: '####',
    ProteinGoal: '###',
    FatGoal: '###',
    CarbsGoal: '###'
  }

  componentDidMount(){
    fetch('/getGoals')
      .then(res => res.json())
      .then(data =>
        this.setState({
          CalorieGoal: data.CalorieGoal,
          ProteinGoal: data.ProteinGoal,
          FatGoal: data.FatGoal,
          CarbsGoal: data.CarbsGoal
        })
      )
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
