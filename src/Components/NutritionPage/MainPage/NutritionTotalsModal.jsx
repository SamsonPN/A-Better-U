import React, { Component } from 'react';
import Chart from './NutritionTotalsChart';
import {NutritionContext} from '../../../AppContext/ExportContexts';

class NutritionTotals extends Component {
  static contextType = NutritionContext;
  render() {
    const {nutrientList, ToggleTotals} = this.context;
    const nutrientItems = nutrientList.map(nutrient =>
      <TotalRows
        key={nutrient.name}
        name={nutrient.name}
        value={nutrient.value}
        unit={nutrient.unit}
      />
    )
    const EmptyNutrientMsg = "Please add foods to see total nutrients!";
    return (
      <div id="TotalsModal" onClick={() => ToggleTotals()}>
        <div id="TotalsModalContent" onClick={(e) => e.stopPropagation()}>
          { nutrientList.length === 0 ?
            EmptyNutrientMsg
            :
            <React.Fragment>
              <Chart />
              <div id="TotalsList">
                <div id="TotalsModalHeader">Nutrient Totals</div>
                {nutrientItems}
              </div>
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

export default NutritionTotals;

class TotalRows extends Component {
  render() {
    const {name, unit, value} = this.props;
    return (
      <div className="NutritionTotalRows">
        <p>{name} </p>
        <p>{value} {unit}</p>
      </div>
    );
  }
}
