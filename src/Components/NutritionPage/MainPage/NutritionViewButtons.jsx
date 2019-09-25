import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class NutritionViewButtons extends Component {

  render() {
    const {changeNutritionDate, date, FetchFood} = this.props;
    return (
      <div id="NVButtonsWrapper">
        <div className="NVInnerWrapper">
          <DatePicker
            selected={date}
            onSelect={(e) => changeNutritionDate(e, FetchFood)}
            onChange={(e) => changeNutritionDate(e, FetchFood)}
            className="NVButtons"
            withPortal
            utcOffset/>
          <button className="NVButtons">Total Nutrients</button>
        </div>
        <div className="NVInnerWrapper">
          <Link to="/nutrition/bmrcalculator"><button className="NVButtons">Determine Calorie Goal</button></Link>
          <Link to="/nutrition/macrocalculator"><button className="NVButtons">Dermine Macro Goal</button></Link>
        </div>
      </div>
    );
  }

}

export default NutritionViewButtons;
