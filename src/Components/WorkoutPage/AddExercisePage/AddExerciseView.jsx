/*
Component for Add Exercise page where users can search for and select exercises for their routine
*/
import React, { Component } from 'react';
import RoutineFooter from '../RoutinePage/RoutineFooter.jsx';
import AddExerciseHeader from './AddExerciseHeader.jsx';
import {default as EList} from './AddExerciseList.jsx';

class AddExerciseView extends Component {
  state = {
    exercises: [],
    muscles: [],
    types: [],
    add: false,
    addItems: []
  }

  componentDidMount(){
    fetch('/getExerciseTypes')
      .then(res => res.json())
      .then(data => {
        this.setState({
          muscles: data.Muscles,
          types: data.EType
        })
      })
  }

  SearchExercise = (e) => {
    if (e.key === "Enter"){
      e.preventDefault();
      let search = document.getElementById('ExerciseSearchBar').value;
      let uri = encodeURI(`/getExerciseBySearch/${search}`);

      fetch(uri)
        .then(res => res.json())
        .then(data => {
          this.setState({
            exercises: data
          })
        })
    }
  }

  SearchByCategory = () => {
    let muscle = document.getElementsByClassName('AeViews')[0].textContent;
    let type = document.getElementsByClassName('AeViews')[1].textContent;
    let uri = encodeURI(`/getExerciseByCategory/${muscle}/${type}`);

    fetch(uri)
      .then(res => res.json())
      .then(data => {
        this.setState( {
          exercises: data
        })
      })
  }

  RemoveBar = () => {
    this.setState( {
      add: false,
      addItems: []
    })

    let AddExerciseCheckBox = document.getElementsByClassName('AddExerciseCheckBox');
    [...AddExerciseCheckBox].forEach( item => {
      item.style.backgroundColor = 'white';
    })
  }

  AddExercise = (name, type, muscle) => {
    let checkbox = document.getElementById(name + type + muscle + 'checkbox');

    if (checkbox.style.backgroundColor === "" || checkbox.style.backgroundColor === "white"){
      checkbox.style.backgroundColor = '#1F0CAD';

      let newState = [{"name": name, "muscle": muscle, "type": type}];
      this.setState(previousState => ( {
        addItems: previousState.addItems.concat(newState),
        add: true
      }), function() {
        console.log(this.state.addItems);
      })
    }

    else {
      checkbox.style.backgroundColor = "white";
      let newState = this.state.addItems.filter( item => {
        return item.name !== name || item.muscle !== muscle || item.type !== type
      })

      this.setState({
        addItems: newState
      }, function() {
        console.log(this.state.addItems);
      })
    }
  }

  ApproveExerciseAdditon = () => {
    this.props.AddToRoutine(this.state.addItems);
    this.RemoveBar();
  }

  render() {
    return (
      <div id="AddExerciseView">
        <AddExerciseHeader
          search={this.SearchExercise}
          muscles={this.state.muscles}
          types={this.state.types}
          searchCategory={this.SearchByCategory}
          />

        <EList
          exercises={this.state.exercises}
          AddExercise={this.AddExercise}
          />

          {this.state.add ?
            <div id="AddExerciseConfirmation" className="UpdateDeleteBars">
              <p>Add {this.state.addItems.length} exercise(s)?</p>
              <p onClick={this.ApproveExerciseAdditon} className="BarOptns">Yes</p>
              <p>/</p>
              <p onClick={this.RemoveBar} className="BarOptns">No</p>
            </div>
            : null
          }
        <RoutineFooter/>
      </div>
    );
  }

}

export default AddExerciseView;
