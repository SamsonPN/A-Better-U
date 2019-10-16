import React, { Component } from 'react';
import WoWrapper from './WorkoutDropdownWrapper';
import CurrentRoutine from './CurrentRoutine';
import CurrentWorkouts from './CurrentWorkouts';
import WorkoutButtons from './WorkoutButtons';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class Workout extends Component {
  static contextType = WorkoutContext;
  render() {
    const {workouts, tab} = this.context;
    const MapWorkouts = workouts.map( workout => <CurrentWorkouts key={workout._id} workout={workout}/>);
    const emptyRoutineMsg = <p className="EmptyRoutineMsg">No workouts saved. Please choose or add a routine to get started!</p>;
    const WorkoutList = workouts.length !== 0 ? MapWorkouts : emptyRoutineMsg;

    return (
      <div id="WoContainer">
        <WoWrapper />
        { tab === 'Date' ? WorkoutList : <CurrentRoutine /> }
        <WorkoutButtons />
      </div>
    );
  }

}

export default Workout;
