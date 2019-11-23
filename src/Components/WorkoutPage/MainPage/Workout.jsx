import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import WoWrapper from './WorkoutDropdownWrapper';
import CurrentRoutine from './CurrentRoutine';
import CurrentWorkouts from './CurrentWorkouts';
import {WorkoutContext} from '../../../AppContext/ExportContexts';
import './Workout.css';
import {Add} from '../../../assets/ExportWorkoutBtns';

class Workout extends Component {
  static contextType = WorkoutContext;
  render() {
    const {workouts, tab} = this.context;
    const MapWorkouts = workouts.map((workout, i) => <CurrentWorkouts key={workout._id} workout={workout} workoutIndex={i}/>);
    const emptyRoutineMsg = <p className="EmptyRoutineMsg">No workouts saved. Please choose or add a routine to get started!</p>;
    const WorkoutList = workouts.length !== 0 ? MapWorkouts : emptyRoutineMsg;

    return (
      <div id="WoContainer">
        <WoWrapper />
        { tab === 'Date' ? WorkoutList : <CurrentRoutine /> }
        <Link
          to="/workout/routineview/routines/new">
          <img
            id="AddRoutineBtn"
            className="WoBtns"
            src={Add}
            alt="Add Routine Button"
            title="Add a routine"
            />
        </Link>
      </div>
    );
  }

}

export default Workout;
