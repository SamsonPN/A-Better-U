import React, { Component } from 'react';
import DeleteBtn from '../../../assets/delete-food-button.svg';

class AdditionalSetsReps extends Component {
  PreventEnter = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }
  render() {
    let { index, sets, exercise}  = this.props;
    return (
        <div className="CurrentRoutineSetsReps">
          <p>{index + 1}</p>
          <textarea
            className='CurrentRoutineValues'
            placeholder="Type"
            value={sets.Type}
            onChange={ (e) => this.props.save(e, exercise, index) }
            onKeyPress={this.PreventEnter}>
          </textarea>
          <textarea
            className='CurrentRoutineValues'
            placeholder="Weight"
            value={sets.Weight}
            onChange={(e) => this.props.save(e, exercise, index)}
            onKeyPress={this.PreventEnter}>
          </textarea>
          <textarea
            className='CurrentRoutineValues'
            placeholder="Reps"
            value={sets.Reps}
            onChange={(e) => this.props.save(e, exercise,index)}
            onKeyPress={this.PreventEnter}>
          </textarea>
          <img className="SetDeleteBtn" onClick={this.props.delete.bind(this, exercise, index)} src={DeleteBtn} alt='Delete button'/>
        </div>
    );
  }
}

export default AdditionalSetsReps;
