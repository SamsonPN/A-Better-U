import React, { Component } from 'react';
import NutritionView from './NutritionView.jsx';
import {default as NVBtns} from './NutritionViewButtons.jsx';
import {default as Meals} from './NutritionMealDividers.jsx';

class Nutrition extends Component {
  state = {
    Breakfast : [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
  }

  FillFoodData = (data) => {
    data.forEach(item =>(
      this.setState( { [item.meal] : item.FoodAdded })
      )
    )
  }

  FetchFood = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '%2F' + (dd) + '%2F' + yyyy;

    let uri = `/getFood/${today}`;
    fetch(uri)
    .then(response => response.json())
    .then(data => {
      let ndbno_list = "";
      let servings = {};

      this.FillFoodData(data);

      data.forEach(item => {
        //these 2 fill the servings object with nested meal objects
        servings[item.meal] = item.servings;
        servings[item.meal + "_Count"] = item.FoodAdded.length;

        for(var x in item.servings){
          ndbno_list += "ndbno=" + x + "&";
        }
       })

      if(ndbno_list !== ''){
        this.FetchServings(ndbno_list, servings);
      }
      else {
        this.setState({
          calories: 0,
          protein: 0,
          fat: 0,
          carbs: 0
        })
      }
    })
  }


  FetchServings = (ndbno, servings) => {

    let uri = encodeURI(`https://api.nal.usda.gov/ndb/V2/reports?${ndbno}&type=b&format=json&api_key=`);
    fetch(uri,{
      mode: 'cors'
    })
      .then(res => res.json())
      .then(data => {
        let calories = 0;
        let protein = 0;
        let fat = 0;
        let carbs = 0;
        let meal;

        data.foods.forEach((item, i) => {
          let ndbno = item.food.desc.ndbno;
          let nutrient = item.food.nutrients;

          if( i < servings["Breakfast_Count"]){
            meal = "Breakfast";
          }
          else if (servings["Breakfast_Count"] <= i && i < (servings["Breakfast_Count"] + servings["Dinner_Count"]) ) {
              meal = "Dinner";
            }
          else if ( (servings["Breakfast_Count"] + servings["Dinner_Count"] <= i) && i < (servings["Breakfast_Count"] + servings["Dinner_Count"] + servings["Lunch_Count"]) ) {
              meal="Lunch";
            }
          else{
            meal="Snacks";
          }

          if (nutrient[0].name !== "Water"){
            calories += nutrient[0].value * servings[meal][ndbno];
            protein += nutrient[1].value * servings[meal][ndbno];
            fat += nutrient[2].value * servings[meal][ndbno];
            carbs += nutrient[3].value *servings[meal][ndbno];
          } else {
            calories += nutrient[1].value * servings[meal][ndbno];
            protein += nutrient[2].value * servings[meal][ndbno];
            fat += nutrient[3].value * servings[meal][ndbno];
            carbs += nutrient[4].value * servings[meal][ndbno];
          }
        })

        this.setState({
          calories: Math.round(calories),
          protein: Math.round(protein),
          fat: Math.round(fat),
          carbs: Math.round(carbs)
        })

      })

  }

  componentDidMount(){
    this.FetchFood()
  }

  render() {
    return (
          <div id="NutritionContainer">
            <NutritionView calories={this.state.calories} protein={this.state.protein} fat={this.state.fat} carbs={this.state.carbs}/>
            <NVBtns/>

            <Meals name="Breakfast"
              displayFood={this.FetchFood}
              FoodAdded={this.state.Breakfast}
              currentMeal={this.props.currentMeal}
              updateCalories={this.FetchFood}
              />

            <Meals name="Lunch"
              displayFood={this.FetchFood}
              FoodAdded={this.state.Lunch}
              currentMeal={this.props.currentMeal}
              updateCalories={this.FetchFood}
              />

            <Meals name="Dinner"
              displayFood={this.FetchFood}
              FoodAdded={this.state.Dinner}
              currentMeal={this.props.currentMeal}
              updateCalories={this.FetchFood}
              />

            <Meals name="Snacks"
              displayFood={this.FetchFood}
              FoodAdded={this.state.Snacks}
              currentMeal={this.props.currentMeal}
              updateCalories={this.FetchFood}
              />
          </div>
    )
  }
}

export default Nutrition;
