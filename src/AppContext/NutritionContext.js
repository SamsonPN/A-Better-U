import React, { Component } from 'react';
import {CalculatorContext} from './CalculatorContext';
import {Key} from '../API/API_Key';

export const NutritionContext = React.createContext();

export class NutritionProvider extends Component {

  CalculateNutritionInfo = () => {
    let meals = ["Breakfast", "Lunch", "Dinner", "Snacks"]
    let {reports} = this.state;
    let nutrients = {};
    meals.forEach(meal => {
      this.state[meal].forEach(item => {
        nutrients = this.FillNutrients(nutrients, reports[item.ndbno].nutrients, item.servings);
      })
    })
    let nutrientList = Object.keys(nutrients).map(item => nutrients[item]);
    let empty = nutrientList.length === 0 ? true : false;
    this.setState({
      calories: empty ? 0: nutrients['Energy'].value,
      protein: empty ? 0: nutrients['Protein'].value,
      fat: empty ? 0: nutrients['Total lipid (fat)'].value,
      carbs: empty? 0: nutrients['Carbohydrate, by difference'].value,
      nutrientList
    })
  }

  ChangeNutritionDate = nutritionDate => {
    this.setState({
      nutritionDate
    }, function(){
      this.FetchFood()
    })
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
      }), function(){
        this.CalculateNutritionInfo();
      })
      fetch('/nutrition/deleteFood', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
    }
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
          Breakfast: data.Breakfast,
          Lunch: data.Lunch,
          Dinner: data.Dinner,
          Snacks: data.Snacks,
          ndbno_list
        })
        if(ndbno_list !== ''){
          this.FetchReports()
        }
        else{
          this.ResetState()
        }
      }
      //if there is no document in the database with that date, create one!
      else{
        fetch('/nutrition/createNutritionDocument', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( { date } )
        })
        this.ResetState()
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
        let reports = {};
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

  FillNutrients = (nutrients, food, servings) => {
    food.forEach(nutrient => {
      let {name, value, unit} = nutrient;
      servings = parseFloat(servings);
      servings = isNaN(servings) ? 0 : servings;
      let newValue = Math.round( parseFloat(value) * servings );
      if(nutrients[name]){
        nutrients[name].name = name;
        nutrients[name].value += newValue;
        nutrients[name].unit = unit;
      }
      else{
        nutrients[name] = {
          name,
          value: newValue,
          unit
        }
      }
    })
    return nutrients
  }

  // creates an ndbno list to for usda api
  GetNDBNO = (meal, ndbno_list) => {
    meal.forEach(item => {
      let ndbno = "ndbno=" + item.ndbno + "&";
      if (ndbno_list.indexOf(ndbno) === -1){
      ndbno_list += ndbno
      }
    })
    return ndbno_list
  }

  ResetState = () => {
    this.setState({
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Snacks: [],
      ndbno_list: "",
      reports: {}
    }, function(){
      this.CalculateNutritionInfo()
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
      .catch(err => console.error(err))
    }
  }

  ToggleTotals = () => {
    this.setState(prevState => ({
      showTotals: !prevState.showTotals
    }), function(){
      let {showTotals} = this.state;
      document.body.style.overflow = showTotals ? 'hidden' : 'auto';
    })
  }

  UpdateServings = (e, meal, ndbno) => {
    let serving = e.target.value;
    let currentMeal = this.state[meal];
    if(isNaN(serving)) {
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

  componentDidMount(){
    if(window.location.pathname !== '/'){
      this.FetchFood()
    }
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
    showTotals: false,
    nutrientList: []
  }

  render() {
    const {state, ...methods} = this;
    return (
      <CalculatorContext.Consumer>
        { context => (
          <NutritionContext.Provider value={{...context, ...methods, ...state}}>
            {this.props.children}
          </NutritionContext.Provider>
        )}
      </CalculatorContext.Consumer>
    );
  }
}
