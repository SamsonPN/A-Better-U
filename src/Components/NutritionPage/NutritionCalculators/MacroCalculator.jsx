import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {CalculatorContext} from '../../../AppContext/ExportContexts';

class MacroCalculator extends Component {
  static contextType = CalculatorContext;

  componentDidMount(){
    this.context.GetGoals();
  }
  
  render() {
    const macros = ["Protein", "Fat", "Carbs"].map( macro =>
      <MacroWrapper key={macro} macro={macro}/>
    )
    return (
      <CalculatorContext.Consumer>
        { ({ goals, Calories, StoreMacros, link }) => (
          <div id="MacroCalculator">
            <MacroTitle calories={Calories}/>
            <div id="macroBoxWrapper">
              <div id="macroValueSpecifier">
                <p>%</p>
                <p>Macro</p>
                <p>Grams</p>
              </div>
            {macros}
            </div>
            <Link
              to='/nutrition'
              id="MacroFinishButton"
              onClick={(e) => StoreMacros(e)}
              >
              Finish
            </Link>
          </div>
        )}
      </CalculatorContext.Consumer>
    );
  }
}

export default MacroCalculator;

class MacroWrapper extends Component {
  static contextType = CalculatorContext;
  render() {
    const {macro} = this.props;
    const {CalculateMacros, SavePercentages} = this.context;
    const value = CalculateMacros(macro);
    return (
      <div className="macroWrapper">
        <textarea
          className="macroPercentBox"
          onKeyPress={(e) => e.key === 'Enter' ? e.preventDefault() : null}
          onChange={(e) => SavePercentages(e, macro)}
          >
        </textarea>
        <p>{macro}</p>
        <p>{isNaN(value) ? 0 : value}g</p>
      </div>
    );
  }
}

class MacroTitle extends Component {
  render() {
    const text = `Recommended percentage of total calories for each macronutrient:
    Total Calories: ${this.props.calories}\nCarbs: 45-65%\nFat: 20-35%\nProtein: 10-35%\n`;
    return (
      <React.Fragment>
        <div id="macroTitleWrapper">
          <h1 id="MacroTitle">Determine your Macros</h1>
        </div>
        <div id="macroInfoDiv">
          {text}
          <p>
            <b>
              If total calories are 0,
              calculate your calories
              through our BMR calculator!
            </b>
          </p>
        </div>
      </React.Fragment>
    );
  }
}
