import React, { Component } from 'react';
import NutritionView from './NutritionView.jsx';
import {default as NVBtns} from './NutritionViewButtons.jsx';
import {default as Meals} from './NutritionMealDividers.jsx';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AddFoodView from '../AddFoodPage/AddFoodView.jsx';
import BMRCalculator from '../BMRCalculator.jsx';
import MacroCalculator from '../MacroCalculator.jsx';

class Nutrition extends Component {
  state = {
    currentMeal:'',
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: []
  }

  currentMeal = (name) => {
    this.setState({ currentMeal: name})
  }

  componentWillMount(){
    console.log("Nutrition Mounted")
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '%2F' + (dd) + '%2F' + yyyy;

    let uri = `/getFood/${today}`;

    fetch(uri)
    .then(response => response.json())
    .then(data => {
      for(var i = 0; i < data.length; i++){
        if(data[i].meal === "Breakfast"){
          this.setState( {
            Breakfast: this.state.Breakfast.concat(data[i].FoodAdded) } )
        }
        else if(data[i].meal === "Lunch"){
          this.setState( { Lunch: this.state.Lunch.concat(data[i].FoodAdded) } )
        }
        else if(data[i].meal === "Dinner"){
          this.setState( { Dinner: this.state.Dinner.concat(data[i].FoodAdded) } )
        }
        else {
          this.setState( { Snacks: this.state.Snacks.concat(data[i].FoodAdded) } )
        }
      }
    })
  }

  render() {
    return (
      <Router>
        <Route exact path={`${this.props.match.path}`} render={props => (
          <div id="NutritionContainer">
            <NutritionView/>
            <NVBtns/>
            <Meals name="Breakfast" FoodAdded={this.state.Breakfast} currentMeal={this.currentMeal}/>
            <Meals name="Lunch" FoodAdded={this.state.Lunch} currentMeal={this.currentMeal} />
            <Meals name="Dinner" FoodAdded={this.state.Dinner} currentMeal={this.currentMeal} />
            <Meals name="Snacks" FoodAdded={this.state.Snacks} currentMeal={this.currentMeal} />
          </div>
        )}/>

          <Route exact path={`${this.props.match.path}/addfood`} render={props =>(
              <AddFoodView ForceUpdate={this.ForceUpdate} currentMeal={this.state.currentMeal}/>
            )}/>

          <Route exact path="/nutrition/bmrcalculator" component={BMRCalculator}/>
          <Route exact path="/nutrition/macrocalculator" component={MacroCalculator}/>
      </Router>
    )
  }

}

export default Nutrition;
