import React, { Component } from 'react';

class NutritionMealItems extends Component {
  state = {
    calories: ''
  }
  componentWillMount(){
  let uri = encodeURI(`https://api.nal.usda.gov/ndb/reports/?ndbno=${this.props.ndbno}&type=b&format=json&api_key=DEMO_KEY`);
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      this.setState( {calories: Math.trunc(data.report.food.nutrients[0].value) } )
    })
  }

  render() {
    return (
      <div className="NutritionMealItems">
        <p>{this.props.name}</p>
        <p>{this.state.calories}</p>
      </div>
    );
  }
}

export default NutritionMealItems;
