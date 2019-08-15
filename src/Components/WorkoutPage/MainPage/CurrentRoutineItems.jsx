import React, { Component } from 'react';
import UpArrow from '../../../assets/up-arrow-blue.svg';
import {default as SetsReps} from './AdditionalSetsReps.jsx';

class CurrentRoutineItems extends Component {

  render() {
    return (
      <div className="CurrentRoutineItems">
        <div className="CurrentRoutineItemHeader">
          <p>Exercise</p>
          <img src={UpArrow} alt="down arrow"/>
        </div>

        <div className="CollapsibleCurrentRoutine">
          <div className="CurrentRoutineSetsReps">
            <p>SET</p>
            <p>SET TYPE</p>
            <p>WEIGHT</p>
            <p>REPS</p>
          </div>

          <SetsReps/>
          <SetsReps/>
          <SetsReps/>

          <div className="CurrentRoutineAddSet">
            <p>Add Set</p>
          </div>
        </div>

      </div>
    );
  }

}

export default CurrentRoutineItems;
