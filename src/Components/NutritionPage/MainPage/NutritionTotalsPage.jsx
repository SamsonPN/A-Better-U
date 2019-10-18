import React, { Component } from 'react';
import Chart from './NutritionTotalsChart'
import {Key} from '../../../API/API_Key'

class NutritionTotalsPage extends Component {
  state = {
    reports : {},
    FoodAdded: [],
    nutrientList : [],
    goals: {}
  }

  componentDidMount(){
    this.FetchFood()
    this.GetGoals()
  }

  GetGoals = () => {
    fetch('/getGoals')
      .then(res => res.json())
      .then(data => {
        this.setState({
          goals: data
        })
      })
  }

  // adds all food arrays into each meal slot. # of items = 4.
  FillFoodData = (data) => {
    data.forEach(item =>{
      this.setState(prevState => ({
        FoodAdded : prevState.FoodAdded.concat(item.FoodAdded)
      }))
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
    let options = {month: "2-digit", day: "2-digit", year: "numeric"}
    let date = this.props.date.toLocaleDateString("en-US", options);
    let regex = /\//g;
    date = date.replace(regex, '%2F');

    let uri = `/getFood/${date}`;
    fetch(uri)
    .then(response => response.json())
    .then(data => {
      this.FillFoodData(data);
      this.GetNDBNO(data);

      if(this.state.ndbno_list !== ''){
        this.FetchReports()
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

        //calculate total calories/macronutrients
        this.setState({
          reports
        },function(){ this.CalculateNutritionInfo();})
     })
  }

  CalculateNutritionInfo = () => {
    let {FoodAdded, reports} = this.state;
    let nutrientList = [];
    let nutrientObject = {};
    let nutrientUnits = {}

    //might just use .indexOf and update within an array instead of
    // putting into object --> then converting into an array!
    FoodAdded.forEach( food => {
      reports[food.ndbno].nutrients.forEach(nutrient => {
        let nutrientField = nutrientObject[nutrient.name];
        let nutrientValue = parseFloat(nutrient.value, 10) * food.servings;

        nutrientObject[nutrient.name] = (nutrientField === undefined) ? 0 : nutrientField;
        nutrientObject[nutrient.name]+= Math.round(nutrientValue);
        nutrientUnits[nutrient.name] = nutrient.unit;
      })
    })

    for(let item in nutrientObject){
      let newItem = {
        "name" : item,
        "value": nutrientObject[item],
        "unit": nutrientUnits[item]
      };
      nutrientList.push(newItem);
    }

    this.setState({
      nutrientList
    })
  }

  render() {
    const rows = this.state.nutrientList.map(item =>
      <TotalRows
        key={item.name}
        name={item.name}
        value={item.value}
        unit={item.unit}
      />
    )
    return (
      <div id="NutritionTotals">
        <h1>Nutrient Totals</h1>
        <div id="NutritionTotalsContentWrapper">
          <div id="NutritionTotalsList">
            {rows}
          </div>
          <Chart
            data={this.state.nutrientList}
            goals={this.state.goals}
            />
       </div>
      </div>
    );
  }
}

export default NutritionTotalsPage;

class TotalRows extends Component {
  render() {
    const {name, unit, value} = this.props;
    return (
      <div className="NutritionTotalRows">
        <p>{name} </p>
        <p>{value} {unit}</p>
      </div>
    );
  }
}
