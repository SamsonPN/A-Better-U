import React, { Component } from 'react';
import {Key} from '../API/API_Key';

export const NutritionContext = React.createContext();

export class NutritionProvider extends Component {

  ChangeNutritionDate = nutritionDate => {
    this.setState({
      nutritionDate
    }, function(){
      this.FetchFood()
    })
  }

  // creates an ndbno list to for usda api
  GetNDBNO = (meal, ndbno_list) => {
    meal.forEach( item => {
      let ndbno = "ndbno=" + item.ndbno + "&";
      if (ndbno_list.indexOf(ndbno) === -1){
      ndbno_list += ndbno
      }
    })
    return ndbno_list
  }

  FetchFood = () => {
    let {nutritionDate} = this.state;
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let date = nutritionDate.toLocaleDateString("en-US", options);
    let regex = /\//g;
    let dateParam = date.replace(regex, '%2F');

    let uri = `/nutrition/getFood/${dateParam}`;
    fetch(uri)
    .then(response => response.json())
    .then(data => {
      if(data){
        let ndbno_list = "";
        for(let meal in data){
          ndbno_list = this.GetNDBNO(data[meal], ndbno_list);
        }

        this.setState({
          "Breakfast": data.Breakfast,
          "Lunch": data.Lunch,
          "Dinner": data.Dinner,
          "Snacks": data.Snacks,
          ndbno_list
        })

        if(this.state.ndbno_list !== ''){
          this.FetchReports()
        } else {
          //when deleting all items from nutrition
          //this will ensure that the values are updated properly
          this.setState({
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0
          })
        }
      } else{
        //if there is no document in db, initialize it
        fetch('/nutrition/createNutritionDocument', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( { date } )
        })
      }
    })
  }

  FetchReports = () => {
    let uri = encodeURI(`https://api.nal.usda.gov/ndb/V2/reports?${this.state.ndbno_list}&type=b&format=json&api_key=${Key}`);
    fetch(uri,{
      mode: 'cors'
    })
      .then(res => res.json())
      .then(data => {
        let reports = {}

        //initialize nutrition report for each item
        data.foods.forEach(item => {
          reports[item.food.desc.ndbno] = item.food;
        })

        //grab reports, then use reports to calculate calories/macros
        this.setState({
          reports
        },function(){
          this.CalculateNutritionInfo();
        })
     })
  }

  CalculateNutritionInfo = () => {
    let meals = ["Breakfast", "Lunch", "Dinner", "Snacks"]
    let {reports} = this.state;
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    meals.forEach(meal => {
      this.state[meal].forEach( item => {
        let nutrient_index = reports[item.ndbno].nutrients[0].nutrient_id === "208" ? 0 : 1;
        calories += Math.round(item.servings * reports[item.ndbno].nutrients[nutrient_index].value);
        protein += Math.round(item.servings * reports[item.ndbno].nutrients[nutrient_index + 1].value);
        fat += Math.round(item.servings * reports[item.ndbno].nutrients[nutrient_index + 2].value);
        carbs += Math.round(item.servings * reports[item.ndbno].nutrients[nutrient_index + 3].value);
      })
    })
    this.setState({
      calories,
      protein,
      fat,
      carbs
    })
  }

  UpdateServings = (e, meal, ndbno) => {
    let serving = e.target.value;
    let currentMeal = this.state[meal];

    if (isNaN(serving)) {
      e.target.value = 1;
      serving = 1;
      alert('Please enter valid numbers only!')
    }
    for(let i = 0; i < currentMeal.length; i++){
      if(currentMeal[i].ndbno === ndbno){
        currentMeal[i].servings = serving;
        break;
      }
    }
   this.setState({
     currentMeal
   }, function(){
     this.CalculateNutritionInfo();
   })
  }

  SaveServing = (meal, ndbno, inputElement) => {
    let servings = inputElement.value;
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let date = this.state.nutritionDate.toLocaleDateString("en-US", options);
    if(servings !== ''){
      let requestObject = {
        date,
        meal,
        ndbno,
        servings
      }
      fetch('/nutrition/updateServings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
      .catch(err => console.error(err))
    }
  }

   DeleteFood = (meal, ndbno) => {
     let options = {month: "2-digit", day: "2-digit", year: "numeric"};
     let date = this.state.nutritionDate.toLocaleDateString("en-US", options);
     let requestObject = {
       date,
       meal,
       ndbno
     }
     let confirm = window.confirm('Delete this item?');
     if(confirm){
       this.setState(prevState => ({
         [meal]: prevState[meal].filter (food => {return food.ndbno !== ndbno})
       }))
       fetch('/nutrition/deleteFood', {
         method: 'DELETE',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(requestObject)
       })
     }
  }

  GetGoals = () => {
    fetch('/user/getGoals')
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

  componentDidMount(){
  }

  state = {
    nutritionDate: new Date(),
    Breakfast : [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
    reports: {},
    ndbno_list: '',
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    CalorieGoal: '0',
    ProteinGoal: '0',
    FatGoal: '0',
    CarbsGoal: '0'
  }

  render() {
    const {state, ...methods} = this;
    return (
      <NutritionContext.Provider value={{...methods, ...state}}>
        {this.props.children}
      </NutritionContext.Provider>
    );
  }
}
