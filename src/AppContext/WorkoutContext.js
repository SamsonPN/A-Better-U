import React, { Component } from 'react';
import {AddExerciseContext} from './AddExerciseContext';

export const WorkoutContext = React.createContext();

export class WorkoutProvider extends Component {
  AddExercise = (e, exercise) => {
    let {name, type, muscle} = exercise;
    let {currentRoutine} = this.state;
    let newState = {...currentRoutine};
    let checkBox = e.target.style;
    let checkBoxColor = checkBox.backgroundColor;
    if (checkBoxColor === "" || checkBoxColor === "white"){
      checkBox.backgroundColor = '#1F0CAD';
      let addExercise= {
        "name": name,
        "muscle": muscle,
        "type": type,
        "sets": [{
          'Type': '',
          'Weight': '',
          'Reps': ''
        }]
      };
      newState.exercises.push(addExercise);
    }
    else {
      checkBox.backgroundColor = "white";
      newState.exercises = newState.exercises.filter( exercise => {
        return exercise.name !== name || exercise.muscle !== muscle || exercise.type !== type
      })
    }
    this.setState({
      currentRoutine: newState
    })
  }

  AddSet = (exerciseIndex, workoutIndex) => {
    let newSet = {
      'Type': '',
      'Weight': '',
      'Reps': ''
    }
    let {currentRoutine, workouts} = this.state;
    let newState;
    let stateItem;
    if(workoutIndex !== ""){
      newState = workouts;
      stateItem = 'workouts';
      newState[workoutIndex].exercises[exerciseIndex].sets.push(newSet);
    }
    else{
      newState = {...currentRoutine};
      stateItem = 'currentRoutine';
      newState.exercises[exerciseIndex].sets.push(newSet);
    }
    this.setState(prevState => ({
      ...prevState,
      [stateItem]: newState
    }))
  }

  ChangeWorkoutDate = (tab, workoutDate) => {
    let newState = { tab };
    if(workoutDate){
      let options = {month: "2-digit", day: "2-digit", year: "numeric"};
      workoutDate = workoutDate.toLocaleDateString("en-US", options);
      newState = {...newState, workoutDate}
    }
    this.setState(newState, function(){
      if( !tab.includes('Routine') ){
        this.GetWorkoutsByDate()
      }
    })
  }

  ChangeRoutineName = (e) => {
    let {currentRoutine} = this.state;
    let newState = {...currentRoutine};
    newState.name = e.target.value;
    this.setState({
      currentRoutine: newState
    })
  }

  DeleteCurrentRoutine = (id) => {
    let {tab} = this.state;
    let collection = tab === 'Routine' ? 'routine' : 'workout';
    let confirm = window.confirm(`This ${collection} will no longer show up in the ${tab} tab. Continue?`);
    collection += 's';
    if(confirm){
      let uri = `/workout/deleteCurrentRoutine/${collection}/${id}`;
      fetch(uri, {
        method: 'DELETE',
      })
        .catch(err => console.error(err))
      this.setState(prevState => ({
        [collection]: prevState[collection].filter(item => {return item._id !== id}),
        currentRoutine: {}
      }))
    }
  }

  DeleteSet = (workoutIndex, exerciseIndex, setIndex) => {
    let {currentRoutine, workouts} = this.state;
    let newState;
    let stateItem;
    if(workoutIndex !== ""){
      newState = workouts;
      stateItem = 'workouts';
      newState[workoutIndex].exercises[exerciseIndex].sets.splice(setIndex, 1);
    }
    else{
      newState = {...currentRoutine};
      stateItem = 'currentRoutine';
      newState.exercises[exerciseIndex].sets.splice(setIndex,1);
    }
    this.setState(prevState => ({
      ...prevState,
      [stateItem]: newState
    }))
  }

  // fetches and puts all saved workouts into saved tab
  GetWorkouts = () => {
    fetch('/workout/getWorkouts')
      .then(res => res.json())
      .then(data => {
        if(!data.error){
          let savedWorkouts = [];
          data.forEach(workout => {
            savedWorkouts.push(new Date(workout.date));
          })
          this.setState({
            savedWorkouts
          })
        }
     })
  }

  GetRoutines = () => {
    fetch('/workout/getRoutines')
      .then(res => res.json())
      .then(data => {
        this.setState({
          routines: data
       })
    })
  }

  GetWorkoutsByDate = () => {
    let {workoutDate} = this.state;
    let uri = `/workout/getWorkoutsByDate/?date=${workoutDate}`;
    fetch(uri)
      .then(res => res.json())
      .then(data =>{
        this.setState({
          workouts: data,
          tab: 'Date',
          currentRoutine: {}
        })
     })
  }

  GetWorkoutByIndex = (workoutIndex) => {
    let {workouts} = this.state;
    this.setState({
      currentRoutine: workouts[workoutIndex],
      tab: 'Routine'
    })
  }

  InsertNewRoutine = () => {
    let currentRoutine = {
      name : "Routine",
      exercises: []
    }
    this.setState({
      currentRoutine
    })
  }

  RemoveExercise = (exercise) => {
    let newState = {...this.state.currentRoutine};
    let {muscle, name, type} = exercise;
    newState.exercises = newState.exercises.filter( item => {
      return item.name !== name || item.type !== type || item.muscle !== muscle;
    })
    this.setState({
      currentRoutine: newState
    })
  }

  SaveSetValues = (e, workoutIndex, exerciseIndex, setIndex) => {
    let {currentRoutine, workouts} = this.state;
    let newState;
    let stateItem;
    let {placeholder, value} = e.target;
    placeholder  = placeholder === "lbs" ? "Weight" : placeholder;
    placeholder = placeholder[0].toUpperCase() + placeholder.slice(1);
    if(workoutIndex !== ""){
      newState = workouts;
      stateItem = 'workouts';
      newState[workoutIndex].exercises[exerciseIndex].sets[setIndex][placeholder] = value;
    }
    else{
      newState = {...currentRoutine};
      stateItem = 'currentRoutine';
      newState.exercises[exerciseIndex].sets[setIndex][placeholder] = value;
    }
    this.setState(prevState => ({
      ...prevState,
      [stateItem]: newState
    }))
  }

  SaveWorkout = (workoutIndex) => {
    let {currentRoutine, workouts, workoutDate} = this.state;
    let requestObject = workoutIndex !== "" ? {...workouts[workoutIndex]} : {...currentRoutine, "date" : workoutDate}
    let confirm = window.confirm('Save this workout?')
    if(confirm){
      fetch('/workout/saveWorkout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
      alert(`Workout saved for ${workoutDate}`);
      this.GetWorkouts();
    }
  }

  ShowRoutine = (routineInfo, tab) => {
    let {name, exercises, _id} = routineInfo;
    let {workoutDate} = this.state;
    let currentRoutine = {
      name,
      exercises,
      _id,
      date : workoutDate
    }
    this.setState({
      currentRoutine,
      tab
    })
  }

/*
sets: [{
  Type: '',
  Weight: '',
  Reps: ''
}]
*/
  StoreExercises = (collectionName) => {
    let {currentRoutine} = this.state;
    let {exercises} = currentRoutine;
    if(collectionName === 'routines'){
      (exercises || []).forEach(exercise => {
        exercise.sets = [{
          Type: '',
          Weight: '',
          Reps: ''
        }]
      })
    }
    currentRoutine.exercises = exercises;
    if( (exercises || []).length !== 0 ){
      let requestObject = {...currentRoutine, collectionName};
      fetch('/workout/updateExercises', {
        method: 'POST',
        mode: 'same-origin',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
        .then(() => {
          this.GetRoutines()
        })
     }
     else{
       this.setState({
         currentRoutine: {}
       })
     }
  }

  componentDidMount(){
    // let date = new Date();
    // let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    // let today = date.toLocaleDateString("en-US", options);
    // this.setState({
    //   workoutDate: today
    // })
    this.GetRoutines();
    this.GetWorkouts();
  }

  state = {
    currentRoutine: {},
    routines: [],
    workoutDate: (new Date()).toLocaleDateString("en-US", {month: "2-digit", day: "2-digit", year: "numeric"}),
    workouts: [],
    savedWorkouts: [],
    tab: 'Routine'
  }

  render() {
    const {state, ...methods} = this;
    return (
      <AddExerciseContext.Consumer>
        { context => (
          <WorkoutContext.Provider value={{ ...context, ...state, ...methods }}>
            {this.props.children}
          </WorkoutContext.Provider>
        )}
      </AddExerciseContext.Consumer>
    );
  }
}
