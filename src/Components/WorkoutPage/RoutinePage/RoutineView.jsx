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
    let name = this.props.routineName;
    fetch(`/getRoutineExercises/${name}`)
      .then(res => res.json())
      .then(data => {
        if (data){
          this.setState({
            exercises: data.exercises
          }, function(){
            let finished = this.state.exercises.length === 0 || this.props.routineName !== 'Routine Name' ? true : false;
            this.setState({
              finished
            })
          })
        }
     })
  }

  AllowRedirect = (e) => {
    if(e.target.value !== 'Routine Name' && e.target.value !== ''){
      this.setState({
        finished: true
      })
    }
    else if (e.target.value === 'Routine Name'){
      this.setState({
        finished: false
      })
    }
  }

  DeleteExercise = (name, type) => {
    let exercises = this.state.exercises;
    exercises = exercises.filter( item => {
      return item.name !== name || item.type !== type;
    })

    this.setState({
      exercises
    }, function(){
      let requestObject = {
        "name" : this.props.routineName,
        "exercise": name,
        "type" : type
      }
      fetch('/removeRoutineExercise', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
    })

  }

  StoreRoutineName = () => {
    let name = document.getElementById('RoutineName').value;

    if (name === 'Routine Name' && this.state.exercises.length !== 0){
      alert("Please enter a name for your routine!")
    }
    else {
      let requestObject = {
        "oldName": this.props.routineName,
        "newName": name,
        "exercises": this.state.exercises
      }

      fetch('/updateRoutine', {
        method: 'PUT',
        mode: 'same-origin',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
    }
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
