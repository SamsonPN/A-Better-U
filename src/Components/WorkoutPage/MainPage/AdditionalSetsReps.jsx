import React, { Component } from 'react';
import DeleteBtn from '../../../assets/delete-food-button.svg';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class AdditionalSetsReps extends Component {
  static contextType = WorkoutContext;

  InputValidation = (e) => {
    let placeholder = e.target.placeholder;
    let input = parseInt(e.key);
    if(placeholder !== "Type" && e.key !== '.' && isNaN(input)){
      e.preventDefault()
      alert("Numbers only please!")
    }
  }

  render() {
    const {index, sets, exercise}  = this.props;
    const {DeleteSet, SaveSetValues, tab} = this.context;
    const setValues = [
      { "placeholder" : "Type", "value": sets.Type},
      { "placeholder": "Weight", "value": sets.Weight},
      { "placeholder": "Reps", "value": sets.Reps}
    ]
    const setCategories = setValues.map( item =>
      <textarea
        key={item.placeholder}
        className="CurrentRoutineValues"
        placeholder={item.placeholder}
        value={item.value}
        onChange={ (e) => SaveSetValues(e, exercise , index)}
        onKeyPress={this.InputValidation}
        disabled={tab === 'Date' ? true : false}
        maxLength="10"
       />
    )
    return (
        <div className="CurrentRoutineSetsReps">
          <p>{index + 1}</p>

          {setCategories}

          <img
            className="SetDeleteBtn"
            onClick={() => DeleteSet(exercise, index)}
            src={DeleteBtn} alt='Delete button'
          />
        </div>
    );
  }
}

export default AdditionalSetsReps;
