import React, { Component } from 'react';
import Modal from './NutritionMealModal.jsx';
import DeleteBtn from '../../../assets/delete-food-button.svg';
import {NutritionContext} from '../../../AppContext/ExportContexts';

class NutritionMealItems extends Component {
  state = {
    showModal: false
  }
  static contextType = NutritionContext;

  ShowModal = (e) => {
    this.setState(prevState =>(
      { showModal: !prevState.showModal }
    ), function(){
      let {showModal} = this.state;
      document.body.style.overflow = showModal ? 'hidden' : 'auto';
    })
  }

  render() {
    const {name, meal, ndbno, servings} = this.props;
    const {showModal} = this.state;
    const {reports} = this.context || {};
    let report_index = ( ((reports[ndbno] || {}).nutrients || [] )[0] || {}).name !== 'Water' ? 0 : 1;
    const calories =  ( ((reports[ndbno] || {}).nutrients || [] )[report_index] || {}).value || 0;

    return (
      <NutritionContext.Consumer>
        { ({ DeleteFood }) => (
          <React.Fragment>
          <div className="NutritionMealItems">
            <p onClick={this.ShowModal}>{name}</p>
            <div>
              <p>{Math.round(calories * servings)}</p>
              <img
                className="NutritionDeleteBtn"
                src={DeleteBtn}
                alt="Delete Button"
                onClick={(e) => DeleteFood(meal, ndbno)}
               />
            </div>
          </div>
          {showModal ?
            <Modal
            {...this.props}
            showModal={this.ShowModal}
            />
            : null
          }
          </React.Fragment>
        )}
      </NutritionContext.Consumer>
    );
  }
}

export default NutritionMealItems;
