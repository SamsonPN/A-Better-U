import React, { Component } from 'react';
import Chart from "chart.js";

Chart.defaults.global.defaultFontColor = '#1F0CAD';
Chart.defaults.global.defaultFontFamily = 'Nunito';


class NutritionChart extends Component {
  chartRef = React.createRef();

  CalculateMacroGoals = (goal) => {
    let macroGoals = []
    for(let macro in goal){
      if(macro === 'ProteinGoal' ||
         macro === 'FatGoal' ||
         macro === 'CarbsGoal') {
           let multiplier = macro === 'FatGoal' ? 9 : 4;
           macroGoals.push(Math.round( ( (goal[macro] / 100) * goal['CalorieGoal'] ) / multiplier ))
         }
    }
    return macroGoals
  }

  CalculateMacrosConsumed = (data) => {
    let macroConsumed = [];
    if((data[0] || {}).name === 'Water'){
      data = data.slice(2,5)
    }
    else {
      data = data.slice(1,4)
    }
    data.forEach(item => {
      macroConsumed.push(item.value)
    })
    return macroConsumed
  }

  componentDidUpdate(){
    const myChartRef = this.chartRef.current.getContext("2d");
    let {goals, data} = this.props;
    let macrosConsumed = this.CalculateMacrosConsumed(data);
    let macroGoals = this.CalculateMacroGoals(goals);

    new Chart(myChartRef, {
      type: "radar",
      data: {
        //labels should be dynamically taken nutrient
        labels: ["Protein", "Fat", "Carbs"],
        datasets: [
          {
            label: "Consumed",
            data: macrosConsumed,
            backgroundColor: "rgba(128,0,0,0.7)"
          },
          {
            label: "Goals",
            data: macroGoals,
            backgroundColor: "rgba(0,0,128,0.3)"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title : {
          display: true,
          text: 'Macronutrient splits'
        },
        scale : {
          ticks: {
            beginAtZero: true,
            stepSize: 50
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
      <div className="NutritionChart">
        <canvas
          id="myChart"
          ref={this.chartRef}
          />
      </div>
    );
  }

}

export default NutritionChart;
