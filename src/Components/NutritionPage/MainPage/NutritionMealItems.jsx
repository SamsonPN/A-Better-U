import React, { Component } from 'react';
import {default as Modal} from './NutritionItemModal.jsx';
import DeleteBtn from '../../../assets/delete-food-button.svg';

class NutritionMealItems extends Component {
  state = {
    showModal: false
  }

  ShowModal = (e) => {
    this.setState(prevState =>(
      { showModal: !prevState.showModal }
    ))
  }

  PreventEnter = (e) => {
    if (e.key === 'Enter'){
      e.preventDefault()
    }
  }

  render() {
    const id = this.props.meal + this.props.name;
    const {name, meal, ndbno, report, servings} = this.props;
    const calories =  ( (( (report || {})[ndbno] || {}).nutrients || [] )[0] || {}).value;

    return (
      <React.Fragment>

      <div className="NutritionMealItems">
        <p onClick={this.ShowModal}>{name}</p>
        <div>
          <p>{Math.round((calories || 0) * servings)}</p>
          <img id={"delete"+id}
            className="NutritionDeleteBtn"
            src={DeleteBtn}
            alt="Delete Button"
            onClick={this.props.showDelete.bind(this, meal, ndbno, id)}
           />
        </div>
      </div>

      {this.state.showModal ?
        <Modal
        name={name}
        meal={meal}
        report={report[ndbno]}
        ndbno={ndbno}
        showModal={this.ShowModal}
        servings={servings}
        updateServings={this.props.updateServings}
        saveServing={this.props.saveServing}
        />
        : null
      }

      </React.Fragment>
    );
  }
}

export default NutritionMealItems;
