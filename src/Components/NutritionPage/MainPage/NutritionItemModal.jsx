import React, { Component } from 'react';
import {default as ModalItems} from './NutritionModalItems.jsx';

class NutritionItemModal extends Component {
  PreventClick = (e) => {
    e.stopPropagation()
  }

  PreventInvalidInput = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
    else if (e.key === '-'){
      e.preventDefault()
      alert('No negatives allowed ;)')
    }
  }

  render() {

    const nutrition_info = this.props.report.nutrients.map(item =>
      <ModalItems key={item.nutrient_id} name={item.name} value={Math.round(item.value * this.props.servings)} unit={item.unit}/>
    )
    const {meal, name, ndbno, report, servings} = this.props;
    const id = meal + name;
    const nutrients = report.nutrients[0].measures[0];

    return (
      <div className="NutritionItemModal" id={id} onClick={() => this.props.showModal(this.props.saveServing(meal, ndbno, id))}>
        <div className="NutritionModalContent" onClick={this.PreventClick}>

          <div className="NutritionModalHeader">
            <div>
              <p>{name}</p>
              <p>
                Serving Size: {nutrients.qty + ' ' + nutrients.label + ' '}
                ({nutrients.eqv + nutrients.eunit})
              </p>

             <div className="ModalServingDiv">
                <p>Servings: </p>
                <textarea
                  id={'textarea' + id}
                  className="NutritionModalTextArea"
                  defaultValue={servings !== '' ? servings : 0}
                  onChange={(e) => this.props.updateServings(e, meal, ndbno)}
                  onKeyPress={this.PreventInvalidInput}>
                </textarea>
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
