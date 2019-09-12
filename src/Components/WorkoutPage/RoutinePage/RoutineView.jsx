/*
Full component for the routine viewer where people can add/edit/delete routines from their full exercise
*/
import React, { Component } from 'react';
import RoutineHeader from './RoutineHeader.jsx';
import RoutineList from './RoutineList.jsx';
import RoutineFooter from './RoutineFooter.jsx';


class RoutineView extends Component {
  state = {
    exercises: []
  }

  componentDidMount(){
    let name = this.props.name || 'Routine Name';
    fetch(`/getRoutineExercises/${name}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          exercises: data.exercises
        })
      })
  }

  StoreRoutineName = () => {
    let name = document.getElementById('RoutineName').value;

    if (name === 'Routine Name'){
      alert("Please enter a name for your routine!")
    }
    else {
      let requestObject = {
        "oldName": 'Routine Name',
        "newName": name
      }

      fetch('/changeRoutineName', {
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
      <div>
          <RoutineHeader RoutineName={this.props.name || 'Routine Name'} store={this.StoreRoutineName}/>
          <RoutineList exercises={this.state.exercises}/>
          <RoutineFooter/>
      </div>
    );
  }
}

export default RoutineView;
