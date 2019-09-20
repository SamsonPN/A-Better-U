import React, { Component } from 'react';
import NutritionView from './NutritionView.jsx';
import {default as NVBtns} from './NutritionViewButtons.jsx';
import {default as Meals} from './NutritionMealDividers.jsx';
import BlackDeleteBtn from '../../../assets/delete-food-button.svg';
import RedDeleteBtn from '../../../assets/red-delete-food-button.svg';

class Nutrition extends Component {
  state = {
    reports: {},
    ndbno_list: '',
    Breakfast : [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    delete: false,
    deleteItems: []
  }

  componentDidMount(){
    this.FetchFood()
  }

  // adds all food arrays into each meal slot. # of items = 4.
  FillFoodData = (data) => {
    data.forEach(item =>{
      this.setState( { [item.meal] : item.FoodAdded })
    })
  }

  GetNDBNO = (data) => {
    let ndbno_list = "";

    data.forEach(item => {
      item.FoodAdded.forEach( item => {
        let ndbno = "ndbno=" + item.ndbno + "&";
        if (ndbno_list.indexOf(ndbno) === -1){
        ndbno_list += ndbno
        }
      })
    })

    this.setState({
      ndbno_list
    })
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

      this.FillFoodData(data);
      this.GetNDBNO(data);

      if(this.state.ndbno_list !== ''){
        this.FetchReports()
      }
      else {
        //when deleting all items from routine
        //this will ensure that the values are updated properly
        this.setState({
          calories: 0,
          protein: 0,
          fat: 0,
          carbs: 0
        })
      }
    })
  }

  DetermineMeal = (servings, i) => {
    let meal;
    let BC = servings["Breakfast_Count"];
    let DC = servings["Dinner_Count"] + BC;
    let LC = servings["Lunch_Count"] + DC;

    if( i < BC ){
      meal = "Breakfast";
    }
    else if ( BC <= i && i < DC ) {
        meal = "Dinner";
      }
    else if ( DC <= i  && i < LC ) {
        meal="Lunch";
      }
    else {
      meal="Snacks";
    }
    return meal
  }

  FetchReports = () => {
    let uri = encodeURI(`https://api.nal.usda.gov/ndb/V2/reports?${this.state.ndbno_list}&type=b&format=json&api_key=oam5ywiHfTUD7jRzZoDtJj9Ei8bMu04nAx3D4mGT`);
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

        //calculate total calories/macronutrients
        this.setState({
          reports
        },function(){this.CalculateNutritionInfo()})
      })
  }

  CalculateNutritionInfo = () => {
    let meals = ["Breakfast", "Lunch", "Dinner", "Snacks"]
    let reports = this.state.reports;
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    meals.forEach(meal => {
      this.state[meal].forEach( item => {
        let nutrient_index = reports[item.ndbno].nutrients[0].nutrient_id === "208" ? 0 : 1;
        calories += item.servings * reports[item.ndbno].nutrients[nutrient_index].value;
        protein += item.servings * reports[item.ndbno].nutrients[nutrient_index + 1].value;
        fat += item.servings * reports[item.ndbno].nutrients[nutrient_index + 2].value;
        carbs += item.servings * reports[item.ndbno].nutrients[nutrient_index + 3].value;
      })
    })
    this.setState({
      calories: Math.round(calories),
      protein: Math.round(protein),
      fat: Math.round(fat),
      carbs: Math.round(carbs)
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
   }, function(){this.CalculateNutritionInfo()})
  }

  SaveServing = (meal, ndbno, id) => {
    let servings = document.getElementById('textarea' + id).value;

    if(servings !== ''){
      let requestObject = {
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

  ShowDeleteBar = (meal, ndbno, id) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + (dd) + '/' + yyyy;

    let item = [{
      "date": today,
      "meal": meal,
      "ndbno": ndbno
    }]

    let duplicate = false;
    let deleteBtn = document.getElementById('delete'+id);

    this.state.deleteItems.forEach(delItem => {
      if(delItem.ndbno === item[0].ndbno && delItem.meal === item[0].meal){
        duplicate = true;
      }
    })

    if(duplicate === false){
      this.setState(previousState => ({
        delete: true,
        deleteItems: previousState.deleteItems.concat(item)
      }));
      deleteBtn.src = RedDeleteBtn;
    }
    else {
      let newState = this.state.deleteItems.filter( item => {
        return item.ndbno !== ndbno
      })

      this.setState({
        deleteItems: newState
      }, () => {
        deleteBtn.src = BlackDeleteBtn;
        if(this.state.deleteItems.length === 0){
          this.setState({
            delete: false
          })
        }
      })
    }
  }

  DeleteItems = () => {
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
        delete: false,
        deleteItems: []
      },
      this.FetchFood()
     )
   })
 }

  RemoveDeleteBar = () => {
    this.setState( {
      delete: false,
      deleteItems: []
    })

    let deleteButtons = document.getElementsByClassName('NutritionDeleteBtn');
    [...deleteButtons].forEach(item => {
      item.src = BlackDeleteBtn;
   })
 }

  StoreFoodEntry = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + (dd) + '/' + yyyy;

    let requestObject = {
      "date": today,
      "calories": this.state.calories,
      "protein": this.state.protein,
      "fat": this.state.fat,
      "carbs": this.state.carbs
    }

    fetch('/storeFoodEntry', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
  }

  render() {
    const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"].map(meal =>
      <Meals
       key={meal}
       meal={meal}
       FoodAdded={this.state[meal]}
       currentMeal={this.props.currentMeal}
       report={this.state.reports}
       updateServings={this.UpdateServings}
       saveServing={this.SaveServing}
       showDelete={this.ShowDeleteBar}
      />
    )
    return (
          <div id="NutritionContainer">
            <NutritionView calories={this.state.calories} protein={this.state.protein} fat={this.state.fat} carbs={this.state.carbs}/>
            <NVBtns/>

            {meals}

            <div id="CompleteFoodEntryBtn" onClick={this.StoreFoodEntry}>
              <p>Complete Food Entry</p>
            </div>

            {this.state.delete ?
              <div id="DeleteBar" className="UpdateDeleteBars">
                <p>Delete {this.state.deleteItems.length} item(s)?</p>
                <p onClick={this.DeleteItems} className="BarOptns">Yes</p>
                <p>/</p>
                <p onClick={this.RemoveDeleteBar} className="BarOptns">No</p>
              </div>
              : null
            }
          </div>
    )
  }
}

export default Nutrition;
