import React, { Component } from 'react';
import DeleteBtn from '../../../assets/delete-food-button.svg';

class AdditionalSetsReps extends Component {

  InputValidation = (e) => {
    let input = parseInt(e.key);
    let placeholder = e.target.placeholder;
    let code = e.charCode;

    if( (code === 13) ||
        (placeholder !== 'Type' && isNaN(input)) ||
        (placeholder === 'Type' &&
              !(code > 64 && code < 91) &&
              !(code > 96 && code < 123) &&
                code !== 32)){
      e.preventDefault()
    }
  }

  render() {
    let { index, sets, exercise}  = this.props;
    let setValues = [
      { "placeholder" : "Type", "value": sets.Type},
      { "placeholder": "Weight", "value": sets.Weight},
      { "placeholder": "Reps", "value": sets.Reps}
    ]
    let setCategories = setValues.map( item =>
      <textarea
        key={item.placeholder}
        className="CurrentRoutineValues"
        placeholder={item.placeholder}
        value={item.value}
        onChange={ (e) => this.props.save(e, exercise , index)}
        onKeyPress={this.InputValidation}
        disabled={this.props.tab === 'Date' ? true : false}
        maxLength="10"/>
    )
    return (
        <div className="CurrentRoutineSetsReps">
          <p>{index + 1}</p>
          {setCategories}
          <img className="SetDeleteBtn" onClick={this.props.delete.bind(this, exercise, index)} src={DeleteBtn} alt='Delete button'/>
        </div>
    );
  }
}

export default AdditionalSetsReps;
