import React, { Component } from 'react';

export const CalculatorContext = React.createContext();

export class CalculatorProvider extends Component {

  CalculateBMR = () => {
    let {activity, age, feet, inches, goal, sex, weight} = this.state.user;
    let height = ( ( ( parseInt(feet) * 12 ) + parseInt(inches) ) * 2.54 ) * 6.25;
    weight = ( parseInt(weight) / 2.205) * 10;
    age = parseInt(age) * 5;
    let BMR = weight + height - age;
    sex.toUpperCase() === 'M' ? BMR += 5 : BMR -= 161;
    BMR = Math.round( ( BMR * activity.value ) + goal.value );
    if(isNaN(BMR)){
      alert("Please fill out all entries with appropriate data");
    }
    else {
      this.setState({
        BMR: Math.round(BMR)
      });
      fetch('/user/updateUserStats', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Calories: BMR, ...this.state.user })
      })
      .catch(err => console.error(err))
    }
  }

  CalculateMacros = (macro) => {
    let {Calories, percentages} = this.state;
    let percentage = percentages[macro];
    let multiplier = macro === 'Fat' ? 9 : 4;
    return Math.round( ( ( percentage / 100 ) * parseInt(Calories) ) / multiplier );
  }

  GetGoals = () => {
    fetch('/user/getGoals')
      .then(res => res.json())
      .then(data => {
        if(data.macros){
          this.setState({
            percentages: data.macros,
          })
        }
        if(data.Calories){
          this.setState({
            Calories: data.Calories
          })
        }
      })
  }

  HandleDropdownChange = (dropdown, item) => {
    let userInfo = {...this.state.user};
    userInfo[dropdown] = item;
    this.setState({
      user: userInfo
    })
  }

  SavePercentages = (e, macro) => {
    let input = parseInt(e.target.value, 10);
    let percentages = {...this.state.percentages};
    percentages[macro] = isNaN(input) ? 0 : input;
    this.setState({ percentages });
  }

  SaveUserInfo = (e) => {
    let id = e.target.getAttribute('id');
    let newState = {...this.state.user};
    newState[id] = e.target.value;
    this.setState({
      user: newState
    })
  }

  StoreMacros = (e) => {
    let {Protein, Fat, Carbs} = this.state.percentages;
    let total = Protein + Fat + Carbs;
    if (total !== 100 && total > 0){
      e.preventDefault();
      alert("Please have entries total 100%!");
    }
    else if (!isNaN(total) && total !== 0){
      fetch('/user/updateMacroGoals', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Protein, Fat, Carbs })
      })
      .catch(err => console.error(err))
    }
  }

  state = {
    percentages: {
      Protein: 0,
      Fat: 0,
      Carbs: 0,
    },
    Calories: 0,
    user: {
      age: 0,
      sex: '',
      feet: 0,
      inches: 0,
      weight: 0,
      activity: {name: 'Levels', value: 0},
      goal: {name: 'Maintain', value: 0}
    },
    goals: [
      {name: "-2 lbs / week", value: -1000},
      {name: "-1 lb / week", value: -500},
      {name: "Maintain", value: 0},
      {name: "+1 lb / week", value: 500},
      {name: "+2 lbs / week", value: 1000}
    ],
    levels: [
      {name: "Sedentary", value: 1.53},
      {name: "Moderate", value: 1.76},
      {name: "Vigorous", value: 2.25}
    ],
    BMR: 0
  }

  render() {
    const {state, ...methods} = this;
    return (
      <CalculatorContext.Provider value={{...methods, ...state}}>
        {this.props.children}
      </CalculatorContext.Provider>
    );
  }

}
