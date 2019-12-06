import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {NutritionContext} from '../../../AppContext/ExportContexts';

class NutritionViewButtons extends Component {
  componentDidMount() {
    const datePickers = document.getElementsByClassName("react-datepicker__input-container");
    Array.from(datePickers).forEach((el => el.childNodes[0].setAttribute("readOnly", true)))
  }
  render() {
    return (
      <NutritionContext.Consumer>
        { ({ ChangeNutritionDate, nutritionDate, ToggleTotals }) => (
          <div id="NVButtonsWrapper">

            <div className="NVInnerWrapper">
              <DatePicker
                selected={nutritionDate}
                onSelect={(e) => ChangeNutritionDate(e)}
                onChange={(e) => ChangeNutritionDate(e)}
                className="NVButtons"
                withPortal
                utcOffset
                todayButton="Refresh"
                />
              <button
                className="NVButtons"
                onClick={() => ToggleTotals()}>
                Nutrient Totals
              </button>
            </div>

            <div className="NVInnerWrapper">
              <Link
                to="/nutrition/bmrcalculator"
                className="NVButtons">
                Determine Calorie Goal
              </Link>
              <Link
                to="/nutrition/macrocalculator"
                className="NVButtons">
                Determine Macro Goal
              </Link>
            </div>

          </div>
        )}
      </NutritionContext.Consumer>
    );
  }

}

export default NutritionViewButtons;
