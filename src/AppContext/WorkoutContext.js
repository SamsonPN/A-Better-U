import React, { Component } from 'react';

export const WorkoutContext = React.createContext();

export class WorkoutProvider extends Component {

  AddSet = (index) => {
    let newSet = {
      'Type': '',
      'Weight': '',
      'Reps': ''
    }
    let {currentRoutine} = this.state;
    let newState = {...currentRoutine};
    newState.exercises[index].sets.push(newSet)
    this.setState(prevState => ({
      ...prevState,
      currentRoutine: newState
    }))
  }

  ChangeWorkoutDate = workoutDate => {
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    workoutDate = workoutDate.toLocaleDateString("en-US", options);
    this.setState({
      workoutDate
    }, function(){
      let uri = `getWorkouts/?date=${workoutDate}`;
      fetch(uri)
        .then(res => res.json())
        .then(data =>{
          this.setState({
            workouts: data
          })
       })
    })
  }

  DeleteRoutine = () => {
    let {objectID} = this.state.currentRoutine;
    let confirm = window.confirm(`This routine will no longer show up in the Routine tab. Continue?`)
    if(confirm){
      let uri = encodeURI(`/deleteRoutine/${objectID}`);
      fetch(uri, {
        method: 'DELETE'
      })
      this.setState(prevState => ({
        routines: prevState.routines.filter(item => {return item._id !== objectID}),
        currentRoutine: {}
      }))
    }
  }

  DeleteSet = (exercise, index, e) => {
    let {currentRoutine} = this.state;
    let newState = {...currentRoutine};
    newState.exercises[exercise].sets.splice(index,1);
    this.setState(prevState => ({
      ...prevState,
      currentRoutine
    }))
  }

  // fetches and puts all saved workouts into saved tab
  FillSavedTab = () => {
    fetch('/getWorkouts')
      .then(res => res.json())
      .then(data => {
        this.setState({
          savedWorkouts: data
        })
      })
  }

  GetWorkoutById = (id) => {
    let uri = `getWorkoutById?_id=${id}`;
    fetch(uri)
      .then(res => res.json())
      .then(data =>{
        this.setState({
          currentRoutine: data
        })
     })
  }

  SaveSetValues = (e, exercise, index) => {
    let {currentRoutine} = this.state;
    let newState = {...currentRoutine};
    let field = e.target.placeholder;
    newState.exercises[exercise].sets[index][field] = e.target.value;
    this.setState({
      currentRoutine: newState
    })
  }

  SaveWorkout = () => {
    let {currentRoutine, workoutDate} = this.state;
    let confirm = window.confirm('Save this workout?')
    if(confirm){
      let requestObject = {
        "name": currentRoutine.name,
        "date": workoutDate,
        "exercises": currentRoutine.exercises
      }

      fetch('/saveWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
      alert(`Workout saved for ${workoutDate}`);
      this.FillSavedTab();
    }
  }

  ShowRoutine = (routineInfo, tab) => {
    let {name, exercises, objectID} = routineInfo;
    let {workoutDate} = this.state;
    let currentRoutine = {
      name,
      exercises,
      objectID,
      date : workoutDate
    }
    this.setState({
      currentRoutine,
      tab
    })
  }

  componentDidMount(){
    let date = new Date();
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let today = date.toLocaleDateString("en-US", options);
    fetch('/getRoutines')
      .then(res => res.json())
      .then(data => {
        this.setState({
          routines: data,
          workoutDate: today
       })
    })
    this.FillSavedTab();
  }

  state = {
    routines: [],
    currentRoutine: {},
    workoutDate: new Date(),
    workouts: [],
    routineName: 'Routine Name',
    savedWorkouts: [],
    tab: 'Routine',
    AddSet: this.AddSet,
    ChangeWorkoutDate: this.ChangeWorkoutDate,
    DeleteRoutine: this.DeleteRoutine,
    DeleteSet: this.DeleteSet,
    FillSavedTab: this.FillSavedTab,
    GetWorkoutById: this.GetWorkoutById,
    SaveSetValues: this.SaveSetValues,
    SaveWorkout: this.SaveWorkout,
    ShowRoutine: this.ShowRoutine,
  }
  render() {
    return (
      <WorkoutContext.Provider value={this.state}>
        {this.props.children}
      </WorkoutContext.Provider>
    );
  }
}
