import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NutritionViewButtons extends Component {

  render() {
    return (
      <div id="NVButtonsWrapper">
        <div className="NVInnerWrapper">
          <Link to="/nutrition/bmrcalculator"><button className="NVButtons">Calculate Calories</button></Link>
          <Link to="/nutrition/macrocalculator"><button className="NVButtons">Calculate Macros</button></Link>
        </div>
        <div className="NVInnerWrapper">
          <button className="NVButtons">Total Nutrients</button>
          <button className="NVButtons">Analytics</button>
        </div>
      </div>
    );
  }

}

export default NutritionViewButtons;
