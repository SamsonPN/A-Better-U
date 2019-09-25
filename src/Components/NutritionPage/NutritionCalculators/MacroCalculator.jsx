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

  ShowMacros = () => {
    let textareas = document.getElementsByClassName('macroPercentBox');
    let ProteinGoal;
    let FatGoal;
    let CarbsGoal;

    [...textareas].forEach( item => {
      let value = parseInt(item.value,10)
      if(item.id === 'CarbsPercent'){
        CarbsGoal = value;
      }
      else if(item.id === 'FatPercent'){
        FatGoal = value;
      }
      else {
        ProteinGoal = value;
      }
    })

    if( isNaN(CarbsGoal) && isNaN(FatGoal) && isNaN(ProteinGoal) ){
      alert("Please enter valid numbers only (no % needed)!")
    }
    else if (CarbsGoal + FatGoal + ProteinGoal !== 100){
      alert("Please have entries total 100%!")
    }
    else{
      this.setState({
        ProteinGoal,//: this.CalculateMacros(ProteinGoal, 4),
        FatGoal, //this.CalculateMacros(FatGoal, 9),
        CarbsGoal//: this.CalculateMacros(CarbsGoal, 4)
      })
    }
  }

  CalculateMacros = (macro) => {
    let goal = this.state[macro + "Goal"]
    let multiplier = macro === 'Fat' ? 9 : 4;
    return Math.round( ( (goal / 100) * this.state.CalorieGoal ) / multiplier );
  }

  StoreMacros= () => {
    if( this.state.ProteinGoal !== '' && this.state.FatGoal !== '' && this.state.CarbsGoal !== '' ) {
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
  }

  render() {
    const text = `Recommended percentage of total calories for each macronutrient:
    Total Calories: ${this.state.CalorieGoal}\nCarbs: 45-65%\nFat: 20-35%\nProtein: 10-35%\n`;

    const macros = ["Carbs", "Fat", "Protein"].map( macro =>
      <div className="macroWrapper">
        <textarea className="macroPercentBox" id={macro + "Percent"} onKeyPress={this.PreventEnter} macro={macro}></textarea>
        <p>{macro}</p>
        <p>{this.CalculateMacros(macro)}g</p>
      </div>
    )

    return (
      <div id="MacroCalculator">

        <div id="macroTitleWrapper">
          <h1 id="MacroTitle">Determine your Macros</h1>
        </div>

        <div id="macroInfoDiv">
          {text}
          <p><b>Do remember to press Calculate before finishing to update your goals!</b></p>
        </div>

        <div id="macroBoxWrapper">
          <div id="macroValueSpecifier">
            <p>%</p>
            <p>Macro</p>
            <p>Grams</p>
          </div>

        {macros}
        </div>

        <div id="MacroButtonWrapper">
          <button className="macroButton" onClick={this.ShowMacros}>Calculate</button>
          <Link to="/nutrition"><button className="macroButton" onClick={this.StoreMacros}>Finish</button></Link>
        </div>


      </div>
    );
  }

}

export default MacroCalculator;
