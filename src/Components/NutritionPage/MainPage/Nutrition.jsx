import React, { Component } from 'react';
import NutritionView from './NutritionView.jsx';
import {default as NVBtns} from './NutritionViewButtons.jsx';
import {default as Meals} from './NutritionMealDividers.jsx';

class Nutrition extends Component {
  state = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: []
  }

  componentWillMount(){
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
          <div id="NutritionContainer">
            <NutritionView/>
            <NVBtns/>
            <Meals name="Breakfast" FoodAdded={this.state.Breakfast} currentMeal={this.props.currentMeal}/>
            <Meals name="Lunch" FoodAdded={this.state.Lunch} currentMeal={this.props.currentMeal} />
            <Meals name="Dinner" FoodAdded={this.state.Dinner} currentMeal={this.props.currentMeal} />
            <Meals name="Snacks" FoodAdded={this.state.Snacks} currentMeal={this.props.currentMeal} />
          </div>
    )
  }
}

export default Nutrition;
