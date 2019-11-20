import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {TopRow, MiddleRow, BottomRow} from './BMRRows';
import {CalculatorContext} from '../../../AppContext/ExportContexts';
import './BMR.css';

class BMRCalculator extends Component {
  state = {
    categories: [
      { name: "sex", defaultValue: "M/F", length: 1 },
      { name: "age", defaultValue: "Age", length: 2 },
      { name: "feet", defaultValue: "ft", length: 1 },
      { name: "inches", defaultValue: "in", length: 2 },
      { name: "weight", defaultValue: "lbs", length: 3 }
    ]
  }
  static contextType = CalculatorContext;

  render() {
    const {SaveUserInfo} = this.context;
    const textareas = this.state.categories.map( item =>
      <textarea
        key={item.name}
        id={item.name}
        className="userTraitsAnswer"
        placeholder={item.defaultValue}
        onKeyPress={(e) => e.key === 'Enter' ? e.preventDefault() : null}
        onChange={(e) => SaveUserInfo(e)}
        maxLength={item.length}>
      </textarea>
    )

    return (
      <CalculatorContext.Consumer>
        { ({ BMR, CalculateBMR, showModal, StoreBMR }) => (
          <div id="BMRCalculator">
            <BMRTitle />
            <div id="userInfoOuter">
              <TopRow
                textareas={textareas}/>
              <MiddleRow
                textareas={textareas}/>
              <BottomRow
                textareas={textareas}/>
            </div>
            <p
              id="BMRValue"
              className="userTraits">
              Calories: {BMR}
            </p>
            <div id="BMRButtonWrapper">
              <button
                className="BMRButton"
                id="BMRCalculateBtn"
                onClick={CalculateBMR}>
                Calculate
              </button>
              <Link
                to="/nutrition"
                className="BMRButton"
                id="BMRFinishBtn">
                Finish
              </Link>
            </div>
          </div>
        )}
      </CalculatorContext.Consumer>
    );
  }
}

export default BMRCalculator;

class BMRTitle extends Component {
  render() {
    return (
      <div id="BMRHeader">
        <h1>Calculate your BMR</h1>
        <p>
          Your basal metabolic rate (BMR) is the number
          of calories that you expend while at rest.
          Using this rate, we will be able to estimate your calorie
          needs and adjust them according to your fitness goals.
        </p>
        <p>
          <b>Please press Calculate first to register your BMR to our servers.</b>
        </p>
      </div>
    );
  }
}
