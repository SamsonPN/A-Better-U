import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MacroCalculator extends Component {
  componentDidMount(){
    document.getElementById('header').style.display = 'none';
  }

  componentWillUnmount(){
    console.log('Unmounted')
    document.getElementById('header').style.display = 'flex';
  }
  render() {
    const text = 'Recommended percentage of total calories for each macronutrient:\n\nCarbs: 45-65%\nFat: 20-35%\nProtein: 10-35%'
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
            <textarea className="macroPercentBox" id="carbsPercent"></textarea>
            <p>Carbs</p>
            <p>###g</p>
          </div>

          <div id="macroFatWrapper">
            <textarea className="macroPercentBox" id="fatPercent"></textarea>
            <p>Fat</p>
            <p>###g</p>
          </div>

          <div id="macroProteinWrapper">
            <textarea className="macroPercentBox" id="proteinPercent"></textarea>
            <p>Protein</p>
            <p>###g</p>
          </div>


        </div>

        <div id="MacroButtonWrapper">
          <button className="macroButton">Calculate</button>
          <Link to="/nutrition"><button className="macroButton">Finish</button></Link>
        </div>


      </div>
    );
  }

}

export default MacroCalculator;
