import React, { Component } from 'react';
import {default as Modal} from './NutritionItemModal.jsx';
import DeleteBtn from '../../../assets/delete-food-button.svg';

class NutritionMealItems extends Component {
  state = {
    calories: '',
    nutrition_report: '',
    showModal: false,
    servings: ''

  }

  FetchReport = (today) => {
    let usda_uri = encodeURI(`https://api.nal.usda.gov/ndb/reports/?ndbno=${this.props.ndbno}&type=b&format=json&api_key=`);
    fetch(usda_uri)
      .then(response => response.json())
      .then(data => {
        let nutrient_index = 0;
        if(data.report.food.nutrients[nutrient_index].nutrient_id !== "208"){
          nutrient_index = 1;
        }
        this.setState({
          calories: Math.trunc(data.report.food.nutrients[nutrient_index].value),
          nutrition_report: data.report.food
        })
      })
  }

  FetchServings = (today) => {
    let servings_uri = `/getServings/${today}/${this.props.meal}`
    fetch(servings_uri)
      .then(res => res.json())
      .then(data => {
        this.setState( { servings: data.servings[this.props.ndbno]})
      })
  }

  componentDidMount(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '%2F' + (dd) + '%2F' + yyyy;

    this.FetchReport(today);
    this.FetchServings(today);
  }

  ShowModal = (e) => {
    this.setState(prevState =>(
      { showModal: !prevState.showModal }
    ))
  }

  UpdateServings = (new_serving) => {
    this.setState( {servings: new_serving})
  }

  // DeleteItem = () => {
  //   let today = new Date();
  //   let dd = String(today.getDate()).padStart(2, '0');
  //   let mm = String(today.getMonth() + 1).padStart(2, '0');
  //   let yyyy = today.getFullYear();
  //   today = mm + '/' + (dd) + '/' + yyyy;
  //
  //   let requestObject = {
  //     "date" : today,
  //     "meal" : this.props.meal,
  //     "ndbno" : this.props.ndbno,
  //     "servings" : this.state.servings
  //   }
  //
  //   fetch('/deleteFood', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(requestObject)
  //   })
  //
  //   this.props.updateCalories();
  //   this.props.displayFood();
  // }

  render() {
    const id = this.props.meal + this.props.name;
    return (
      <React.Fragment>

      <div className="NutritionMealItems">
        <p onClick={this.ShowModal}>{this.props.name}</p>
        <div>
          <p>{Math.round(this.state.calories * this.state.servings)}</p>
          <img id={"delete"+id}
            className="NutritionDeleteBtn"
            src={DeleteBtn}
            alt="Delete Button"
            onClick={this.props.showDelete.bind(this, this.props.meal, this.props.ndbno, this.state.servings)}/>
        </div>
      </div>

      {this.state.showModal ?
        <Modal
        name={this.props.name}
        meal={this.props.meal}
        calories={this.state.calories}
        report={this.state.nutrition_report}
        showModal={this.ShowModal}
        servings={this.state.servings}
        updateServings={this.UpdateServings}
        updateCalories={this.props.updateCalories}
        />
        : null
      }

      </React.Fragment>
    );
  }
}

export default NutritionMealItems;
