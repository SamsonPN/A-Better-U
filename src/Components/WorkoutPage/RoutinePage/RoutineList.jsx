import React, { Component } from 'react';
import Li from './RoutineListItems';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class RoutineList extends Component {
  static contextType = WorkoutContext;
  render() {
    const {currentRoutine} = this.context;
    const exercises = currentRoutine.exercises || [];
    const exerciseItems = exercises.map( item =>
      <Li
        key={item.name + item.type + item.muscle}
        name={item.name}
        type={item.type}
        muscle={item.muscle}
      />
    )
    return (
      <div id="RoutineList">
        { exercises.length === 0 ?
          <p className="EmptyRoutineMsg">
            Please click on the Exercise tab
            to add exercises to your routine
          </p>
          : null
        }
        {exerciseItems}
      </div>
    );
  }

}

export default RoutineList;
