import React, { Component } from 'react';
import {default as SetsReps} from './AdditionalSetsReps.jsx';
import {WorkoutContext} from '../../../AppContext/ExportContexts';


class CurrentRoutineItems extends Component {
  static contextType = WorkoutContext;

  render() {
    const {index, muscle, name, sets, type, workoutIndex} = this.props;
    const {AddSet, tab} = this.context;
    const AddSets = sets.map( (item,i) =>
      <SetsReps
        key={item + i}
        setIndex={i}
        sets={item}
        exerciseIndex={index}
        tab={tab}
        workoutIndex={workoutIndex}
      />
    )
    return (
      <div className="CurrentRoutineItems">
        <div className="CurrentRoutineItemHeader">
          <p>{type} {name} ({muscle})</p>
        </div>
        {AddSets}
        <div className="CurrentRoutineAddSet">
          <p onClick={() => AddSet(index, workoutIndex)}>Add Set</p>
        </div>
      </div>
    );
  }

}

export default CurrentRoutineItems;
