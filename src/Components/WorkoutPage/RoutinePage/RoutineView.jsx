/*
Full component for the routine viewer where people can add/edit/delete routines from their full exercise
*/
import React, { Component } from 'react';
import RoutineHeader from './RoutineHeader.jsx';
import RoutineList from './RoutineList.jsx';
import RoutineFooter from './RoutineFooter.jsx';


class RoutineView extends Component {
  state = {
    exercises: [],
    finished: true
  }

  componentDidMount(){
    let {date, routineName, tab} = this.props;
    if(tab === 'Saved'){
      this.GetWorkout(date, routineName)
    }
    else {
      this.GetRoutine()
    }
  }

  GetRoutine = () => {
    let {routineName} = this.props;
    let {exercises} = this.state;
    fetch(`/getRoutineExercises/${routineName}`)
      .then(res => res.json())
      .then(data => {
        if (data){
          this.setState({
            exercises: data.exercises
          }, function(){
            let finished = exercises.length === 0 || routineName !== 'Routine Name' ? true : false;
            this.setState({
              finished
            })
          })
        }
     })
  }

  GetWorkout = (date, routineName) => {
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let dateParam = `?date=${date.toLocaleDateString("en-US", options)}`;
    let nameParam = `&name=${routineName}`;

    fetch('/getWorkouts' + dateParam + nameParam)
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        this.setState({
          exercises: data[0].exercises
        })
      })
  }

  AllowRedirect = (e) => {
    let finished;
    //when the user clicks on Add Routine but doesn't add anything
    if(this.state.exercises.length === 0){
      finished = true;
    }
    //when the user adds exercises and actually changes the name
    else if(e.target.value !== 'Routine Name' && e.target.value !== ''){
        finished = true;
    }
    //when the user adds exercises but name is still 'Routine Name'
    else if (e.target.value === 'Routine Name'){
      finished = false;
    }
    this.setState({
      finished
    })
  }

  DeleteExercise = (name, type) => {
    let {exercises} = this.state;
    let {date, routineName, tab} = this.props;

    exercises = exercises.filter( item => {
      return item.name !== name || item.type !== type;
    })

    this.setState({
      exercises
    }, function(){
      if(exercises.length === 0){
        this.setState({ finished : true })
      }
      let requestObject = {
        "name" : routineName,
        "exercise": name,
        "type" : type
      }
      if(tab === 'Saved'){
        let options = {month: "2-digit", day: "2-digit", year: "numeric"}
        requestObject["date"] = date.toLocaleDateString('en-US', options);
        this.RemoveWorkoutExercise(requestObject);
      }
      else {
        this.RemoveRoutineExercise(requestObject);
      }
    })
  }

  RemoveRoutineExercise = (requestObject) => {
    fetch('/removeRoutineExercise', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
  }

  RemoveWorkoutExercise = (requestObject) => {
    fetch('/removeWorkoutExercise', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
  }

  StoreRoutineName = () => {
    let {date, tab} = this.props;
    let name = document.getElementById('RoutineName').value;

    //if user added exercises but no name, alert and disable redirect
    if (name === 'Routine Name' && this.state.exercises.length !== 0){
      alert("Please enter a name for your routine!")
    }
    // if user has entered exercises and name, store values and allow redirect
    else if (this.state.exercises.length !== 0){
      let requestObject = {
        "oldName": this.props.routineName,
        "newName": name,
        "exercises": this.state.exercises
      }

      if(tab === 'Saved'){
        let options = {month: "2-digit", day: "2-digit", year: "numeric"}
        requestObject["date"] = date.toLocaleDateString('en-US', options);
        this.UpdateWorkout(requestObject);
      }
      else{
        this.UpdateRoutine(requestObject);
      }

    }
    // if user deleted all exercises and made no changes to name, delete previous made routine
    // and allow redirect
    else if (this.state.exercises.length === 0 && name === 'Routine Name' && tab !== 'Saved'){
      fetch(`/deleteRoutine/${name}`,{
        method: 'DELETE',
        mode: 'same-origin'
      })
    }
  }

  UpdateRoutine = (requestObject) => {
    fetch('/updateRoutine', {
      method: 'PUT',
      mode: 'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
  }

  UpdateWorkout = (requestObject) => {
    fetch('/updateWorkouts', {
      method: 'PUT',
      mode: 'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
  }

  render() {
    return (
      <div id="RoutineView">
          <RoutineHeader
            RoutineName={this.props.routineName || 'Routine Name'}
            store={this.StoreRoutineName}
            redirect={this.AllowRedirect}
            finished={this.state.finished}
          />
        <RoutineList exercises={this.state.exercises} delete={this.DeleteExercise}/>
          <RoutineFooter/>
      </div>
    );
  }
}

export default RoutineView;
