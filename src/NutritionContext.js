import React, { Component } from 'react';
import Key from './API/API_Key';
import BlackDeleteBtn from './assets/delete-food-button.svg';
import RedDeleteBtn from './assets/red-delete-food-button.svg';

export const NutritionContext = React.createContext();

export class NutritionProvider extends Component {

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
    let today = new Date();
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let date = today.toLocaleDateString("en-US", options);
    let regex = /\//g;
    date = date.replace(regex, '%2F');

    let uri = `/getFood/${date}`;
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
        fetch('/createNutritionDocument', {
          method: 'POST',
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
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let today = new Date();
    let date = today.toLocaleDateString('en-US', options);
    let servings = inputElement.value;

    if(servings !== ''){
      let requestObject = {
        "date" : date,
        "meal": meal,
        "ndbno" : ndbno,
        "servings" : servings
      }

      fetch('/updateServings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
      .catch(err => console.error(err))
    }
  }

  ShowDeleteBar = (e, meal, ndbno) => {
    let {deleteItems} = this.state;
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let today = new Date();
    let date = today.toLocaleDateString("en-US", options);
    let duplicate = false;
    let deleteBtn = e.target;

    let item = [{
      "date": date,
      "meal": meal,
      "ndbno": ndbno
    }]

    deleteItems.forEach(delItem => {
      if(delItem.ndbno === item[0].ndbno && delItem.meal === item[0].meal){
        duplicate = true;
      }
    })

    if(duplicate === false){
      this.setState(previousState => ({
        showDelete: true,
        deleteItems: previousState.deleteItems.concat(item)
      }));
      deleteBtn.src = RedDeleteBtn;
    }
    else {
      let newState = deleteItems.filter( item => {
        return item.ndbno !== ndbno
      })

      this.setState({
        deleteItems: newState
      }, function(){
        deleteBtn.src = BlackDeleteBtn;
        if(this.state.deleteItems.length === 0){
          this.setState({
            showDelete: false
          })
        }
      })
    }
  }

    DeleteFood = () => {
      let requestObject = {
        delete: this.state.deleteItems
      }

      fetch('/deleteFood', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
      .then(res => {
        this.setState({
          showDelete: false,
          deleteItems: []
        },
        this.FetchFood()
       )
     })
   }

   RemoveDeleteBar = () => {
     this.setState( {
       showDelete: false,
       deleteItems: []
     })

     let deleteButtons = document.getElementsByClassName('NutritionDeleteBtn');
     [...deleteButtons].forEach(item => {
       item.src = BlackDeleteBtn;
    })
  }

  state = {
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
    deleteItems: [],
    showDelete: false,
    CalculateNutritionInfo: this.CalculateNutritionInfo,
    DeleteFood: this.DeleteFood,
    FetchFood: this.FetchFood,
    SaveServing: this.SaveServing,
    ShowDeleteBar: this.ShowDeleteBar,
    UpdateServings: this.UpdateServings
  }

  render() {
    return (
      <NutritionContext.Provider value={this.state}>
        {this.props.children}
      </NutritionContext.Provider>
    );
  }
}
