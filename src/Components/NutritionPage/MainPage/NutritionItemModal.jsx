import React, { Component } from 'react';
import {NutritionContext} from '../../../AppContext/ExportContexts';

class NutritionItemModal extends Component {
  static contextType = NutritionContext;

  PreventInvalidInput = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  render() {
    const {meal, name, ndbno, servings, showModal} = this.props;
    const {reports} = this.context;
    const nutrition_info = reports[ndbno].nutrients.map(item =>
      <NutritionModalItems
        key={item.nutrient_id}
        name={item.name}
        value={Math.round(item.value * this.props.servings)}
        unit={item.unit}
      />
    )
    const nutrients = reports[ndbno].nutrients[0].measures[0];

    return (
      <NutritionContext.Consumer>
        { ({ SaveServing, UpdateServings }) => (
          <div className="NutritionItemModal" onClick={() => showModal(SaveServing(meal, ndbno, this.inputElement))}>
            <div className="NutritionModalContent" onClick={(e) => e.stopPropagation()}>
              <div className="NutritionModalHeader">
                <div>
                  <p>{name}</p>
                  {nutrients !== undefined ?
                    <p>
                      Serving Size: {nutrients.qty + ' ' + nutrients.label + ' '}
                      ({nutrients.eqv + nutrients.eunit})
                    </p>
                    : null
                  }
                  <div className="ModalServingDiv">
                     <p>Servings: </p>
                     <textarea
                       className="NutritionModalTextArea"
                       defaultValue={servings !== '' ? servings : 0}
                       onChange={(e) => UpdateServings(e, meal, ndbno)}
                       onKeyPress={this.PreventInvalidInput}
                       ref={element => this.inputElement = element}
                     >
                     </textarea>
                  </div>
                </div>
              </div>
              <div className="NutritionModalBody">
                {nutrition_info}
              </div>
            </div>
          </div>
        )}
      </NutritionContext.Consumer>
    );
  }
}

export default NutritionItemModal;


class NutritionModalItems extends Component {
  render() {
    const {name, value, unit} = this.props;
    return (
      <div className="NutritionModalItems">
        <p>{name}</p>
        <p>{value} {unit}</p>
      </div>
    );
  }
}
