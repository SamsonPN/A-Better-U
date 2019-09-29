import React, { Component } from 'react';
import WoWrapper from './WorkoutDropdownWrapper.jsx';
import CurrentRoutine from './CurrentRoutine.jsx';
import AddRoutineBtn from '../../../assets/add-routine.svg';
import SaveBtn from '../../../assets/save-button.svg';
import EditBtn from '../../../assets/edit-button.svg';
import DeleteBtn from '../../../assets/delete-button.svg';
import {Link} from 'react-router-dom';

class Workout extends Component {
  state = {
    workouts: [],
    saved: [],
    routines: [],
    currentRoutine: {},
    tab: 'Routine'
  }

  componentDidMount(){
    fetch('/getRoutines')
      .then(res => res.json())
      .then(data => {
        this.setState({
          routines: data
       })
    })

    this.GetWorkouts("saved");
  }

  GetWorkouts = (stateItem, date) => {
    let dateParam = date === undefined ? '' : `?date=${'0'+date.toLocaleDateString()}`;

    fetch('/getWorkouts' + dateParam)
      .then(res => res.json())
      .then(data =>{
        this.setState({
          [stateItem]: data
        })
      })
  }

  AddSet = (index) => {
    let newSet = {
      'Type': '',
      'Weight': '',
      'Reps': ''
    }

    let currentRoutine = this.state.currentRoutine;
    currentRoutine.exercises[index].sets.push(newSet)

    this.setState({
      currentRoutine
    })
  }

  DeleteSet = (exercise, index, e) => {
    let currentRoutine = this.state.currentRoutine.exercises[exercise].sets;
    currentRoutine.splice(index, 1)

    this.setState({
      sets: currentRoutine
    })
  }

  SaveSetValues = (e, exercise, index) => {
    let currentRoutine = this.state.currentRoutine;
    let field = e.target.placeholder;

    currentRoutine.exercises[exercise].sets[index][field] = e.target.value;
    this.setState({
      currentRoutine
    })
  }

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

  SaveWorkout = () => {
    let {workoutDate} = this.props;
    let options = {month: "2-digit", day: "2-digit", year: "numeric"}
    let date = workoutDate.toLocaleDateString("en-US", options);
    let confirm = window.confirm('Save this workout?')
    let currentRoutine = this.state.currentRoutine;

    if(confirm){
      let requestObject = {
        "name": currentRoutine.name,
        "date": date,
        "exercises": currentRoutine.exercises
      }

      fetch('/saveWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
      alert(`Workout saved for ${date}`);
      this.GetWorkouts("saved");
    }
  }

  DeleteRoutine = () => {
    let {name} = this.state.currentRoutine;
    let confirm = window.confirm(`This routine will no longer show up in the Routine tab. Continue?`)

    if(confirm){
      let uri = encodeURI(`/deleteRoutine/${name}`);
      fetch(uri, {
        method: 'DELETE'
      })
      this.setState(prevState => ({
        routines: prevState.routines.filter(item => {return item.name !== name}),
        currentRoutine: {}
      }))
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
    const {currentRoutine, routines, saved, tab, workouts} = this.state;
    const {routineOption, workoutDate} = this.props;
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
        <WoWrapper
          routines={routines}
          showRoutine={this.ShowRoutine}
          workouts={saved}
          calendarDate={workoutDate}
          changeDate={this.ChangeDate}
          ToggleDatePicker={this.ToggleDatePicker}
          showDate={this.state.showDatePicker}
          />

        {this.state.tab === 'Date' ?
          workoutViews
          :
          <CurrentRoutine
            key={currentRoutine.date + currentRoutine.name}
            routineName={currentRoutine.name}
            routineDate={currentRoutine.date}
            currentRoutine={currentRoutine.exercises || []}
            AddSet={this.AddSet}
            DeleteSet={this.DeleteSet}
            save={this.SaveSetValues}
            tab={tab}
          />
        }

        <div id="WoIconWrapper">
          <Link to="/workout/routineview"
            onClick={() => routineOption("Routine Name", tab)}>
            <img
              className="WoBtns"
              src={AddRoutineBtn}
              alt="Add Routine Button"
              title="Add a routine"
              />
          </Link>

          {Object.keys(currentRoutine).length !== 0 && tab !== 'Date' ?
            <React.Fragment>
              <img
                className="WoBtns"
                src={SaveBtn}
                alt="Save Button"
                onClick={this.SaveWorkout}
                title="Save this workout"
              />
              <Link to ="/workout/routineview"
                onClick={() => routineOption(currentRoutine.name, tab)}>
                <img
                  className="WoBtns"
                  src={EditBtn}
                  alt="Edit Button"
                  title="Edit this routine"
                />
              </Link>
              <img
                className="WoBtns"
                src={DeleteBtn}
                alt="Delete Button"
                onClick={tab === 'Routine' ? this.DeleteRoutine : this.DeleteWorkout}
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
