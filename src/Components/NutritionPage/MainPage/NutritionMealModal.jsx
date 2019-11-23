import React, { Component } from 'react';
import {NutritionContext} from '../../../AppContext/ExportContexts';

class NutritionItemModal extends Component {
  static contextType = NutritionContext;
  Escape = (e) => {
    if(e.key === 'Escape'){
      let {meal, ndbno, showModal} = this.props;
      let serving = document.getElementById(meal + ndbno);
      showModal();
      this.context.SaveServing(meal, ndbno, serving);
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.Escape, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.Escape, false);
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
          <div className="NutritionMealModal" onClick={() => showModal(SaveServing(meal, ndbno, this.inputElement))}>
            <div className="NutritionModalContent" onClick={(e) => e.stopPropagation()}>
              <div className="NutritionModalHeader">
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
                       id={meal + ndbno}
                       className="NutritionModalTextArea"
                       defaultValue={servings !== '' ? servings : 0}
                       onChange={(e) => UpdateServings(e, meal, ndbno)}
                       onKeyPress={(e) => e.key === 'Enter' ? e.preventDefault() : null}
                       ref={element => this.inputElement = element}
                       maxLength="4">
                     </textarea>
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
