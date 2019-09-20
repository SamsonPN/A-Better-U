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
    workouts: [],
    routines: [],
    currentRoutine: {},
    tab: 'Routine'
  }

  componentDidMount(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    fetch('/getRoutines')
      .then(res => res.json())
      .then(data => {
        this.setState({
          routines: data,
          today: today
       })
    })

    this.GetWorkouts();
  }

  GetWorkouts = () => {
    fetch('/getWorkouts')
      .then(res => res.json())
      .then(data =>{
        this.setState({
          workouts: data
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
      alert(`Workout saved on ${today}`);
      this.GetWorkouts();
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
        routines: prevState.routines.filter(item => {return item.name !== name}),
        currentRoutine: {}
      }), function(){
        this.GetWorkouts();
      })
    }
  }

  render() {
    const {currentRoutine, routines, tab, workouts} = this.state;
    const RoutineOption = this.props.routineOption;

    return (
      <div id="WoContainer">
        <WoWrapper
          routines={routines}
          showRoutine={this.ShowRoutine}
          workouts={workouts}
          />
        <CurrentRoutine
          routineName={currentRoutine.name}
          routineDate={currentRoutine.date || this.state.today}
          currentRoutine={currentRoutine.exercises || []}
          AddSet={this.AddSet}
          DeleteSet={this.DeleteSet}
          save={this.SaveValue}
          />

        <div id="WoIconWrapper">
          <Link to="/workout/routineview"
            onClick={() => RoutineOption("Routine Name")}>
            <img
              className="WoBtns"
              src={AddRoutineBtn}
              alt="No button uploaded"
              title="Add a routine"
              />
          </Link>

          {Object.keys(currentRoutine).length !== 0 ?
          <React.Fragment>
            <img
              className="WoBtns"
              src={SaveBtn}
              alt="Save Button"
              onClick={this.SaveWorkout}
              title="Save this workout"
            />
            <Link to ="/workout/routineview"
              onClick={() => RoutineOption(currentRoutine)}>
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
          : null
          }
        </div>
      </div>
    );
  }

}

export default Workout;
