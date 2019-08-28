import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MacroCalculator extends Component {
  state={
    CalorieGoal: '',
    ProteinGoal: '',
    FatGoal: '',
    CarbsGoal: ''
  }

  componentDidMount(){
    fetch('/getGoals')
      .then(res => res.json())
      .then(data => {
        this.setState({
          CalorieGoal: data.CalorieGoal
        })
      })
  }

  PreventEnter = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  CalculateMacros = () => {
    let textareas = document.getElementsByClassName('macroPercentBox');
    let ProteinGoal;
    let FatGoal;
    let CarbsGoal;

    [...textareas].forEach( item => {
      let value = parseInt(item.value,10)
      if(item.id === 'carbsPercent'){
        CarbsGoal = value;
      }
      else if(item.id === 'fatPercent'){
        FatGoal = value;
      }
      else {
        ProteinGoal = value;
      }
    })

    console.log(CarbsGoal)


    if(isNaN(CarbsGoal) && isNaN(FatGoal) && isNaN(ProteinGoal)){
      alert("Please enter valid numbers only (no % needed)!")
    }
    else if (CarbsGoal + FatGoal + ProteinGoal !== 100){
      alert("Please have entries total 100%!")
    }
    else{
      this.setState({
        ProteinGoal: Math.round( ( (ProteinGoal / 100) * this.state.CalorieGoal ) / 4 ),
        FatGoal: Math.round( ( (FatGoal / 100) * this.state.CalorieGoal) / 9 ),
        CarbsGoal: Math.round( ((CarbsGoal / 100) * this.state.CalorieGoal) / 4)
      })
    }
  }

  StoreMacros= () => {
    if(this.state.BMR !== ''){

      let requestObject = {
        "ProteinGoal": this.state.ProteinGoal,
        "FatGoal": this.state.FatGoal,
        "CarbsGoal": this.state.CarbsGoal
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
    else{
      alert("Data not stored!")
    }
  }

  render() {
    const text = `Recommended percentage of total calories for each macronutrient:\n\nTotal Calories: ${this.state.CalorieGoal}\nCarbs: 45-65%\nFat: 20-35%\nProtein: 10-35%`

    return (
      <div id="MacroCalculator">

        <div id="macroTitleWrapper">
          <h1 id="MacroTitle">Determine your Macros</h1>
        </div>

        <div id="macroInfoDiv">
          {text}
        </div>

        <div id="macroBoxWrapper">
          <div id="macroValueSpecifier">
            <p>%</p>
            <p>Macro</p>
            <p>Grams</p>
          </div>

          <div id="macroCarbsWrapper">
            <textarea className="macroPercentBox" id="carbsPercent" onKeyPress={this.PreventEnter}></textarea>
            <p>Carbs</p>
            <p>{this.state.CarbsGoal}g</p>
          </div>

          <div id="macroFatWrapper">
            <textarea className="macroPercentBox" id="fatPercent" onKeyPress={this.PreventEnter}></textarea>
            <p>Fat</p>
            <p>{this.state.FatGoal}g</p>
          </div>

          <div id="macroProteinWrapper">
            <textarea className="macroPercentBox" id="proteinPercent" onKeyPress={this.PreventEnter}></textarea>
            <p>Protein</p>
            <p>{this.state.ProteinGoal}g</p>
          </div>


        </div>

        <div id="MacroButtonWrapper">
          <button className="macroButton" onClick={this.CalculateMacros}>Calculate</button>
          <Link to="/nutrition"><button className="macroButton" onClick={this.StoreMacros}>Finish</button></Link>
        </div>


      </div>
    );
  }

}

export default MacroCalculator;
