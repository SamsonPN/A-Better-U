import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class BMRCalculator extends Component {
  render() {
    return (
      <div id="BMRCalculator">
        <div id="BMRHeader">
          <h1 id="bmrTitle" className="bmrInfo">Calculate your BMR</h1>
          <p id="bmrDescription" className="bmrInfo">
            Your basal metabolic rate (BMR) is the number
            of calories that you expend while at rest.
            Using this rate, we will be able to estimate your calorie
            needs and adjust them according to your fitness goals.
          </p>
        </div>
        <hr/>
        <div id="userInfoOuter">
          <div className="userInfoWrapper">
            <p className="userTraits">Sex</p>
            <textarea className="userTraitsAnswer">M or F</textarea>
          </div>

          <div className="userInfoWrapper">
            <p className="userTraits">Age</p>
            <textarea className="userTraitsAnswer">Age</textarea>
          </div>

          <div className="userInfoWrapper">
            <p className="userTraits">Height</p>
            <div id="ftInWrapper">
              <textarea id="feet" className="userTraitsAnswer">feet</textarea>
              <textarea id="inches" className="userTraitsAnswer">inches</textarea>
            </div>
            <textarea id="cm" className="userTraitsAnswer">cm</textarea>
          </div>

          <div className="userInfoWrapper">
            <p className="userTraits">Weight</p>
            <textarea className="userTraitsAnswer">lbs</textarea>
          </div>

          <div className="userInfoWrapper">
            <p className="userTraits">Activity</p>

            <div id="ActivityDropdownWrapper">
              <div id="ActivityDiv">Levels</div>
              <ul id="ActivityDropdown">
                <a className="ActivityDropdownLi" href="#!">Sedentary</a>
                <a className="ActivityDropdownLi" href="#!">Light Activity</a>
                <a className="ActivityDropdownLi" href="#!">Moderate Activity</a>
                <a className="ActivityDropdownLi" href="#!">Vigorous Activity</a>
              </ul>
            </div>


          </div>
        </div>
        <div id="BMRButtonWrapper">
          <button className="bmrButton">Calculate</button>
          <Link to="/nutrition"><button className="bmrButton">Finish</button></Link>
        </div>
      </div>
    );
  }

}

export default BMRCalculator;
