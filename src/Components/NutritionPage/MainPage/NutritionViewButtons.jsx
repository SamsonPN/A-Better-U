import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {NutritionContext} from '../../../AppContext/ExportContexts';

class NutritionViewButtons extends Component {
  render() {
    return (
      <NutritionContext.Consumer>
        { ({ ChangeNutritionDate, nutritionDate }) => (
          <div id="NVButtonsWrapper">
            <div className="NVInnerWrapper">
              <DatePicker
                selected={nutritionDate}
                onSelect={(e) => ChangeNutritionDate(e)}
                onChange={(e) => ChangeNutritionDate(e)}
                className="NVButtons"
                withPortal
                utcOffset/>
              <Link to="/nutrition/totals"><button className="NVButtons">Nutrient Totals</button></Link>
            </div>
            <div className="NVInnerWrapper">
              <Link to="/nutrition/bmrcalculator"><button className="NVButtons">Determine Calorie Goal</button></Link>
              <Link to="/nutrition/macrocalculator"><button className="NVButtons">Determine Macro Goal</button></Link>
            </div>
          </div>
        )}
      </NutritionContext.Consumer>
    );
  }

}

export default NutritionViewButtons;
