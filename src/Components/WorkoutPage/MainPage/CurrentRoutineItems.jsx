import React, { Component } from 'react';
import {default as SetsReps} from './AdditionalSetsReps.jsx';
import {WorkoutContext} from '../../../AppContext/ExportContexts';


class CurrentRoutineItems extends Component {
  static contextType = WorkoutContext;

  render() {
    const {index, name, sets, type} = this.props;
    const {AddSet, tab} = this.context;
    const AddSets = sets.map( (item,i) =>
      <SetsReps
        key={item + i}
        index={i}
        sets={item}
        exercise={index}
        tab={tab}
      />
    )
    return (
      <div className="CurrentRoutineItems">
        <div className="CurrentRoutineItemHeader">
          <p>{name} ({type})</p>
        </div>
        {AddSets}
        {tab !== 'Date' ?
          <div className="CurrentRoutineAddSet">
            <p onClick={() => AddSet(index)}>Add Set</p>
          </div>
          : null
        }
      </div>
    );
  }

}

export default CurrentRoutineItems;
