import React, { Component } from 'react';
import {NutritionContext} from '../../../AppContext/ExportContexts';
import Chart from "chart.js";
Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontFamily = 'Nunito';

class NutritionChart extends Component {
  static contextType = NutritionContext;
  chartRef = React.createRef();

  componentDidMount(){
    const myChartRef = this.chartRef.current.getContext("2d");
    let {nutrientList, Calories, CalculateMacros} = this.context;
    let aliases = {
      "Energy": "Calories",
      "Protein": "Protein",
      "Total lipid (fat)": "Fat",
      "Carbohydrate, by difference": "Carbs"
    };
    let startIndex = nutrientList[0].name === 'Energy' ? 0 : 1;
    let nutrientSlice= nutrientList.slice(startIndex, startIndex + 4);
    let nutrientConsumed = [];
    nutrientSlice.forEach(nutrient => {
      let alias = aliases[nutrient.name];
      let goal = alias === 'Calories' ? Calories: CalculateMacros(alias);
      let value = Math.round( ( nutrient.value / goal ) * 100 )
      nutrientConsumed.push(value);
    })

    new Chart(myChartRef, {
      type: "radar",
      data: {
        labels: ["Calories", "Protein", "Fat", "Carbs"],
        datasets: [
          {
            label: "Consumed",
            data: nutrientConsumed,
            backgroundColor: "rgba(128,0,0,0.7)",
            borderColor: "#FFFFFF",
            borderWidth: '1'
          },
          {
            label: "Goals",
            data: [100,100,100,100],
            backgroundColor: "rgba(128,128,128,0.5)",
            borderColor: "#FFFFFF",
            borderWidth: '1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title : {
          display: true,
          text: 'Goals Reached (%)'
        },
        scale : {
          ticks: {
            beginAtZero: true,
            stepSize: 25,
            backdropColor: "rgba(31,12,173, 1)"
          },
          gridLines: {
            color: "#FFFFFF",
            backgroundColor: "rgba(31,12,173, 1)"
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ': ';
              }
              label += Math.round(tooltipItem.yLabel * 100) / 100;
              return label;
            }
          }
        }
      }
    })
  }

  render() {
    return (
      <div id="NutritionChart">
        <canvas
          id="myChart"
          ref={this.chartRef}
          />
      </div>
    );
  }

}

export default NutritionChart;
