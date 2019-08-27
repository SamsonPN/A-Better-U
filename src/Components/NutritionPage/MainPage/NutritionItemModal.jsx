import React, { Component } from 'react';
import {default as ModalItems} from './NutritionModalItems.jsx';

class NutritionItemModal extends Component {

  PreventClick = (e) => {
    e.stopPropagation()
  }

  SaveServing = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + (dd) + '/' + yyyy;

    let id = this.props.meal + this.props.name;
    let servings = document.getElementById(`textarea${id}`).value;

    let requestObject = {
      "date": today,
      "meal": this.props.meal,
      "ndbno": this.props.report.ndbno,
      "servings": servings
    }
    if(servings !== ''){
      fetch('/updateServings', {
        method: "PUT",
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
      .catch(err => console.error(err))

      this.props.updateServings(servings)
    }
    else{
      alert("Please enter a valid serving")
    }
    this.props.updateCalories()
  }

  PreventEnter = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  render() {

    const nutrition_info = this.props.report.nutrients.map(item =>
      <ModalItems key={item.nutrient_id} name={item.name} value={Math.round(item.value * this.props.servings)} unit={item.unit}/>
    )

    const id = this.props.meal + this.props.name;
    const nutrients = this.props.report.nutrients[0].measures[0];

    return (
      <div className="NutritionItemModal" id={id} onClick={this.props.showModal}>
        <div className="NutritionModalContent" onClick={this.PreventClick}>

          <div className="NutritionModalHeader">
            <div>
              <p>{this.props.name}</p>
              <p>
                Serving Size: {nutrients.qty + ' ' + nutrients.label + ' '}
                ({nutrients.eqv + nutrients.eunit})
              </p>
              <div className="ModalServingDiv">
                <p>Servings: </p>
                <textarea id={'textarea' + id} className="NutritionModalTextArea" defaultValue={this.props.servings} onKeyPress={this.PreventEnter}></textarea>
                <button className="SaveServingBtn" onClick={this.SaveServing}>Save</button>
              </div>
            </div>

          </div>

          <div className="NutritionModalBody">
            {nutrition_info}
          </div>
        </div>
      </div>
    );
  }

}

export default NutritionItemModal;
