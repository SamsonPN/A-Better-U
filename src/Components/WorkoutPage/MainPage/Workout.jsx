import React, { Component } from 'react';
import WoWrapper from './WorkoutViewWrapper.jsx';
import CurrentRoutine from './CurrentRoutine.jsx';
import AddRoutineBtn from '../../../assets/add-routine.svg';
import SaveBtn from '../../../assets/save-button.svg';
import EditBtn from '../../../assets/edit-button.svg';
import DeleteBtn from '../../../assets/delete-button.svg';
import {Link} from 'react-router-dom';

class Workout extends Component {
  state = {
    routines: [],
    currentRoutine: {}
  }

  componentDidMount(){
    fetch('/getRoutines')
      .then(res => res.json())
      .then(data => {
        this.setState({
          routines: data
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

  SaveValue = (e, exercise, index) => {
    let currentRoutine = this.state.currentRoutine;
    let field = e.target.placeholder;
    currentRoutine.exercises[exercise].sets[index][field] = e.target.value;

    this.setState({
      currentRoutine
    })
  }

  ShowRoutine = (name, exercises) => {
    let currentRoutine = {
      "name": name,
      "exercises": exercises
    }

    this.setState({
      currentRoutine
    })
  }

  SaveWorkout = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let confirm = window.confirm('Save this workout?')
    let currentRoutine = this.state.currentRoutine;

    if(confirm){
      console.log(currentRoutine);

      let requestObject = {
        "name": currentRoutine.name,
        "date": today,
        "exercises": currentRoutine.exercises
      }

      fetch('/saveWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
    }
  }

  EditRoutine = () => {

  }

  DeleteRoutine = () => {
    let {name} = this.state.currentRoutine;
    let confirm = window.confirm('This routine will no longer show up in the Routine tab. Continue?')

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

  render() {
    return (
      <div id="WoContainer">
        <WoWrapper routines={this.state.routines} showRoutine={this.ShowRoutine}/>
        <CurrentRoutine
          currentRoutine={this.state.currentRoutine.exercises || []}
          AddSet={this.AddSet}
          DeleteSet={this.DeleteSet}
          save={this.SaveValue}
          />

        <div id="WoIconWrapper">
          <Link to="/workout/routineview"><img className="WoBtns" src={AddRoutineBtn} alt="No button uploaded" title="Add a routine"/></Link>

          {Object.keys(this.state.currentRoutine).length !== 0 ?
          <React.Fragment>
            <img className="WoBtns" src={SaveBtn} alt="Save Button" onClick={this.SaveWorkout} title="Save this workout"/>
            <img className="WoBtns" src={EditBtn} alt="Edit Button" title="Edit this routine"/>
            <img className="WoBtns" src={DeleteBtn} alt="Delete Button" onClick={this.DeleteRoutine} title="Delete this routine"/>
          </React.Fragment>
          : null
          }
        </div>
      </div>
    );
  }

}

export default Workout;
