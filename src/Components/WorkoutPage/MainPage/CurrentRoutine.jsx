import React, { Component } from 'react';
import RI from './CurrentRoutineItems.jsx';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class CurrentRoutine extends Component {
  static contextType = WorkoutContext;
  render() {
    const {currentRoutine, workoutDate} = this.context;
    const exercises = currentRoutine.exercises || [];
    const exerciseItems = exercises.map( (exercise, i) =>
      <RI
        key={exercise.name + exercise.type + exercise.muscle}
        name={exercise.name}
        type={exercise.type}
        index={i}
        sets={exercise.sets}
      />
    )
    return (
      <div id="CurrentRoutine">
        { exercises.length === 0 ?
          <p className="EmptyRoutineMsg">Please add a routine or choose one from the dropdown above</p>
          :
          <div id="CurrentRoutineTitle">
              <p><span>Routine:</span> {currentRoutine.name}</p>
              <p><span>Date:</span> {workoutDate}</p>
          </div>
        }
        {exerciseItems}
      </div>
    );
  }

}

export default CurrentRoutine;
