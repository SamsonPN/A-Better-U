import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Add, Save, Edit, Delete} from '../../../assets/ExportWorkoutBtns';
import WoWrapper from './WorkoutDropdownWrapper.jsx';
import CurrentRoutine from './CurrentRoutine.jsx';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class Workout extends Component {
  state = {
    // workouts: []
  }
  static contextType = WorkoutContext;

  // GetWorkouts = (stateItem, date) => {
  //   let options = {month: "2-digit", day: "2-digit", year: "numeric"};
  //   let dateParam = date === undefined ? '' : `?date=${date.toLocaleDateString("en-US", options)}`;
  //
  //   fetch('/getWorkouts' + dateParam)
  //     .then(res => res.json())
  //     .then(data =>{
  //       this.setState({
  //         [stateItem]: data
  //       })
  //     })
  // }

  ShowRoutine = (name, exercises, date, tab) => {
    let currentRoutine = {
      "name": name,
      "date" : date,
      "exercises": exercises
    }
    this.setState({
      currentRoutine,
      tab
   })
   if(tab !== 'Routine'){
     this.props.ChangeWorkoutDate(new Date(date));
   }
   }

  DeleteWorkout = () => {
    let { name, date } = this.state.currentRoutine;
    let regex = /\//g
    date = date.replace(regex, '%2F');
    let confirm = window.confirm(`This workout will no longer show up in the Saved tab. Continue?`)
    if(confirm){
      let uri = `/deleteWorkout/${name}/${date}`;
      fetch(uri , {
        method: 'DELETE'
      })
      this.setState(prevState => ({
        currentRoutine: {},
        workouts: []
      }), function(){
        this.GetWorkouts();
      })
    }
  }

  ChangeDate = (e) => {
    let {ChangeWorkoutDate} = this.props;
    let date = e;
    ChangeWorkoutDate(date, this.GetWorkouts)
    this.setState({
      tab: 'Date'
    })
  }

  render() {
    const {routineOption} = this.props;
    const {currentRoutine, DeleteRoutine, SaveWorkout, tab, workouts} = this.context;

    const workoutViews = workouts.length !== 0 ? workouts.map( workout =>
      <CurrentRoutine
        key={workout.date+ workout.name}
        routineName={workout.name}
        routineDate={workout.date}
        currentRoutine={workout.exercises || []}
        AddSet={this.AddSet}
        DeleteSet={this.DeleteSet}
        save={this.SaveSetValues}
        tab={tab}
      />
    )
    : <p className="EmptyRoutineMsg">No workouts saved. Please choose or add a routine to get started!</p>

    return (
      <div id="WoContainer">
        <WoWrapper showRoutine={this.ShowRoutine} />

        {tab === 'Date' ?
          workoutViews
          :
          <CurrentRoutine />
        }


        <div id="WoIconWrapper">
          <Link to="/workout/routineview"
            onClick={() => routineOption("Routine Name", tab)}>
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
                onClick={tab === 'Routine' ? DeleteRoutine : this.DeleteWorkout}
                title="Delete this routine"
              />
            </React.Fragment>
            :
            null
          }
        </div>
      </div>
    );
  }

}

export default Workout;
