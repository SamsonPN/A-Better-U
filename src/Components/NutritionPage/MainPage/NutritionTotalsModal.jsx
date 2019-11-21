import React, { Component } from 'react';
import Chart from './NutritionTotalsChart';
import {NutritionContext} from '../../../AppContext/ExportContexts';
import './NutritionModal.css';

class NutritionTotals extends Component {
  static contextType = NutritionContext;
  Escape = (e) => {
    if(e.key === 'Escape'){
      this.context.ToggleTotals();
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.Escape, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.Escape, false);
  }
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
    return (
      <div id="TotalsModal" onClick={(e) => ToggleTotals(e)}>
        <div id="TotalsModalContent" onClick={(e) => e.stopPropagation()}>
          { nutrientList.length === 0 ?
            <p className="EmptyNutrientMsg">Please add foods to see total nutrients!</p>
            : <React.Fragment>
                <Chart />
                <div id="TotalsList">
                  <div id="TotalsListHeader">Nutrient Totals</div>
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
