/*
Full component for the routine viewer where people can add/edit/delete routines from their full exercise
*/
import React, { Component } from 'react';
import RoutineHeader from './RoutineHeader.jsx';
import RoutineList from './RoutineList.jsx';
import RoutineFooter from './RoutineFooter.jsx';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class RoutineView extends Component {
  state = {
    exercises: [],
    finished: true
  }
  static contextType = WorkoutContext;
  componentDidMount(){
    console.log(this.context)
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

  StoreRoutineName = () => {
    let {date, tab} = this.context;
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
        requestObject["date"] = date;
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
          <RoutineList />
          <RoutineFooter/>
      </div>
    );
  }
}

export default RoutineView;
