import React, { Component } from 'react';
import {default as RI} from './CurrentRoutineItems.jsx';

class CurrentRoutine extends Component {
  render() {
    const {AddSet, currentRoutine, DeleteSet,routineDate, routineName, save, tab} = this.props;
    const exercises = currentRoutine.map( (item, i) =>
      <RI
        key={item.name + item.type + item.muscle}
        name={item.name}
        type={item.type}
        index={i}
        sets={item.sets}
        DeleteSet={DeleteSet}
        AddSet={AddSet}
        save={save}
        tab={tab}
      />
    )
    return (
      <div id="CurrentRoutine">
        {this.props.currentRoutine.length === 0 ?
          <p className="EmptyRoutineMsg">Please add a routine or choose one from the dropdown above</p>
          :
          <div id="CurrentRoutineTitle">
              {routineDate !== '' ? <p><span>Date:</span> {routineDate}</p> : null}
              <p><span>Routine:</span> {routineName}</p>
          </div>
        }
        {exercises}
      </div>
    );
  }

}

export default CurrentRoutine;
