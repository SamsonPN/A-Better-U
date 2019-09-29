import React, { Component } from 'react';
import {Dropdown, GoalDropdown} from './BMRDropdown.jsx';
import Modal from './BMRModal.jsx';
import {Link} from 'react-router-dom';

class BMRCalculator extends Component {
  state = {
    BMR: '',
    levels: [
      {level: "Sedentary", value: 1.53},
      {level: "Moderate", value: 1.76},
      {level: "Vigorous", value: 2.25}
    ],
    activity: 'Levels',
    categories: [
      { name: "sex", defaultValue: "M/F" },
      { name: "age",defaultValue: "Age" },
      { name: "feet",defaultValue: "ft" },
      { name: "inches", defaultValue: "in" },
      { name: "lbs", defaultValue: "lbs" }
    ],
    goals: [
      {goal: "-2 lbs / week", value: -1000},
      {goal: "-1 lb / week", value: -500},
      {goal: "Maintain", value: 0},
      {goal: "+1 lb / week", value: 500},
      {goal: "+2 lbs / week", value: 1000}
    ],
    goal: 'Maintain',
    showModal: false
  }

  ChangeActivity = (index) => {
    let activity = document.getElementsByClassName('ActivityDropdownLi')[index].textContent;
    this.setState( {
      activity
    })
  }

  ChangeGoal = (index) => {
    let goal = document.getElementsByClassName('GoalDropdownLi')[index].textContent;
    this.setState( {
      goal
    })
  }

  CalculateBMR = () => {
    let BMR;
    let weight = document.getElementById('lbs').value / 2.205;
    let height = ( (document.getElementById('feet').value * 12) + parseInt(document.getElementById('inches').value, 10)) * 2.54;
    let age = document.getElementById('age').value;
    let activity;
    let goal;

    this.state.levels.forEach(item => {
      if (this.state.activity === item.level){
        activity = item.value;
      }
    })

    this.state.goals.forEach(item => {
      if(this.state.goal === item.goal){
        goal = item.value;
      }
    })

    if(document.getElementById('sex').value.toUpperCase() === 'M'){
      BMR = ( ( ( 10 * weight ) + ( 6.25 * height) - (5  * age) + 5) * activity ) + goal;
    } else {
      BMR = ( ( ( 10 * weight ) + ( 6.25 * height) - (5 * age) - 161 ) * activity ) + goal;
    }

    if(isNaN(BMR)){
      alert("Please fill out all entries with appropriate data");
    }
    else {
      this.setState({
        showModal: true,
        BMR: Math.round(BMR)
      });
    }
  }

  ExitModal = () => {
    this.setState({
      showModal: false
    })
  }

  PreventEnter = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
    }
  }

  StoreBMR = () => {
    if(this.state.BMR !== ''){

      let requestObject = {
        "CalorieGoal": this.state.BMR
      };

      fetch('/updateGoals', {
        method: "PUT",
        mode: "same-origin",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
      .catch(err => console.error(err))
    }
  }

  render() {
    const textareas = this.state.categories.map( (item, i) =>
      <textarea
        key={item.name}
        id={item.name}
        className="userTraitsAnswer"
        placeholder={item.defaultValue}
        onKeyPress={this.PreventEnter}>
      </textarea>
    )
    return (
      <React.Fragment>
      <div id="BMRCalculator">
        <div id="BMRHeader">
          <h1 id="bmrTitle" className="bmrInfo">Calculate your BMR</h1>
          <p id="bmrDescription" className="bmrInfo">
            Your basal metabolic rate (BMR) is the number
            of calories that you expend while at rest.
            Using this rate, we will be able to estimate your calorie
            needs and adjust them according to your fitness goals.
            <b>Please press Calculate first to register your BMR to our servers.</b>
          </p>
        </div>
        <hr/>
        <div id="userInfoOuter">

          <div className="userInfoColumn">
            <div className="userInfoWrapper">
              <p className="userTraits">Sex</p>
              {textareas[0]}
            </div>

            <div className="userInfoWrapper">
              <p className="userTraits">Height</p>
              <div id="ftInWrapper">
                {textareas[2]}
                {textareas[3]}
              </div>
            </div>

            <div className="userInfoWrapper">
              <p className="userTraits">Activity</p>
              <Dropdown levels={this.state.levels} changeActivity={this.ChangeActivity} activity={this.state.activity}/>
            </div>
          </div>

          <div className="userInfoColumn">
            <div className="userInfoWrapper">
              <p className="userTraits">Age</p>
              {textareas[1]}
            </div>

            <div className="userInfoWrapper">
              <p className="userTraits">Weight</p>
              {textareas[4]}
            </div>

            <div className="userInfoWrapper">
              <p className="userTraits">Goal</p>
              <GoalDropdown goals={this.state.goals} goal={this.state.goal} changeGoal={this.ChangeGoal}/>
            </div>

          </div>
        </div>

          <button className="bmrButton" id="bmrCalculateBtn" onClick={this.CalculateBMR}>Calculate</button>
          <Link to="/nutrition"><button className="bmrButton" id="bmrFinishBtn" onClick={this.StoreBMR}>Finish</button></Link>

      </div>
      {this.state.showModal ?
        <Modal BMR={this.state.BMR} exitModal={this.ExitModal}/>
      :
      null
    }
  </React.Fragment>

    );
  }
}


export default BMRCalculator;
