import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Add, Save, Edit, Delete} from '../../../assets/ExportWorkoutBtns';
import WoWrapper from './WorkoutDropdownWrapper';
import CurrentRoutine from './CurrentRoutine';
import CurrentWorkouts from './CurrentWorkouts';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class Workout extends Component {
  static contextType = WorkoutContext;

  render() {
    const {routineOption} = this.props;
    const {workouts} = this.context;
    const WorkoutList = workouts.length !== 0 ? workouts.map( workout =>
      <CurrentWorkouts key={workout._id} workout={workout}/>
    )
    : <p className="EmptyRoutineMsg">No workouts saved. Please choose or add a routine to get started!</p>

    return (
      <WorkoutContext.Consumer>
        { ({ currentRoutine, ChangeWorkoutDate, DeleteRoutine, DeleteWorkout, SaveWorkout, tab }) => (
          <div id="WoContainer">
            <WoWrapper />

            { tab === 'Date' ? WorkoutList : <CurrentRoutine /> }

            <div id="WoIconWrapper">
              <Link to="/workout/routineview"
                onClick={() => ChangeWorkoutDate(new Date(), 'Routine')}>
                <img
                  className="WoBtns"
                  src={Add}
                  alt="Add Routine Button"
                  title="Add a routine"
                  />
              </Link>

              {Object.keys(currentRoutine).length !== 0 && tab !== 'Date' ?
                <React.Fragment>
                  <img
                    className="WoBtns"
                    src={Save}
                    alt="Save Button"
                    onClick={() => SaveWorkout()}
                    title="Save this workout"
                  />
                  <Link to ="/workout/routineview"
                    onClick={() => routineOption(currentRoutine.name, tab)}>
                    <img
                      className="WoBtns"
                      src={Edit}
                      alt="Edit Button"
                      title="Edit this routine"
                    />
                  </Link>
                  <img
                    className="WoBtns"
                    src={Delete}
                    alt="Delete Button"
                    onClick={tab === 'Routine' ? DeleteRoutine : DeleteWorkout}
                    title="Delete this routine"
                  />
                </React.Fragment>
                : null
              }
            </div>
          </div>
        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default Workout;
