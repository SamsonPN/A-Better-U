/*
Component for Add Exercise page where users can search for and select exercises for their routine
*/
import React, { Component } from 'react';
import RoutineFooter from '../RoutinePage/RoutineFooter';
import AddExerciseHeader from './AddExerciseHeader';
import {default as EList} from './AddExerciseList';
import BlueHeart from '../../../assets/filled-in-heart.svg';
import Heart from '../../../assets/heart.svg';

class AddExerciseView extends Component {
  state = {
    exercises: [],
    muscles: [],
    types: [],
    add: false,
    addItems: [],
    favorite: false,
    favItems: [],
    showFavorite: false
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

  GetFavorites = () => {
    let uri = '/getFavorites?favFoods=0';
    fetch(uri)
      .then(res => res.json())
      .then(data => {
        this.setState({
          exercises: data.favExercises,
          showFavorite: true
        }, function(){
          let AddExerciseFavorite = document.getElementsByClassName('AddExerciseFavorite');
          [...AddExerciseFavorite].forEach( item => {
            item.src = BlueHeart;
          })
        })
      })
      .catch(err => console.error(err))
  }

  DeleteFromFavorite = (name, type, muscle) => {
    let newState = this.state.exercises.filter( item => {
      return item.name !== name || item.muscle !== muscle || item.type !== type
    })
    let requestObject = {
      "user": "1",
      "name" : name,
      "type" : type
    }

    this.setState({
      exercises: newState
    })

    fetch('/deleteFavoriteExercises', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
      .catch(err => console.error(err))
  }

  SearchExercise = (e) => {
    if (e.key === "Enter"){
      e.preventDefault();
      let search = document.getElementById('ExerciseSearchBar').value;
      let uri = encodeURI(`/getExerciseBySearch/${search}`);

      fetch(uri)
        .then(res => res.json())
        .then(data => {
          let showFavorite;
          if(this.state.showFavorite){
            showFavorite = false;
            this.ClearSelections()
          }
          this.setState({
            exercises: data,
            showFavorite
          })
        })
    }
  }

  SearchByCategory = () => {
    let bodyPart = document.getElementsByClassName('AeViews')[0].textContent;
    let eType = document.getElementsByClassName('AeViews')[1].textContent;
    let muscles = bodyPart === 'Muscles' ? '' : `muscle=${bodyPart}&`
    let type = eType === 'Exercise Type' ? '' : `type=${eType}`
    let uri = encodeURI('/getExerciseByCategory?' + muscles + type);

    fetch(uri)
      .then(res => res.json())
      .then(data => {
        let showFavorite;
        if(this.state.showFavorite){
          showFavorite = false;
          this.ClearSelections()
        }
        this.setState( {
          exercises: data,
          showFavorite
        })
      })
  }

  RemoveBar = (option, optionItems) => {
    this.setState( {
      [option]: false,
      [optionItems]: [],
    })
    this.ClearSelections(option)
  }

  ClearSelections = (option) => {
    if(option === 'add'){
      let AddExerciseCheckBox = document.getElementsByClassName('AddExerciseCheckBox');
      [...AddExerciseCheckBox].forEach( item => {
        item.style.backgroundColor = 'white';
      })
    }
    else{
      let AddExerciseFavorite = document.getElementsByClassName('AddExerciseFavorite');
      [...AddExerciseFavorite].forEach( item => {
        item.src = Heart;
      })
    }
  }

  AddExercise = (name, type, muscle) => {
    let checkbox = document.getElementById(name + type + muscle + 'checkbox');
    let newState;

    if (checkbox.style.backgroundColor === "" || checkbox.style.backgroundColor === "white"){
      checkbox.style.backgroundColor = '#1F0CAD';

      newState = [{
        "name": name,
        "muscle": muscle,
        "type": type,
        "sets": [{
          'Type': '',
          'Weight': '',
          'Reps': ''
        }]
      }];

      this.setState(previousState => ( {
        addItems: previousState.addItems.concat(newState),
        add: true
      }))
    }

    else {
      checkbox.style.backgroundColor = "white";
      newState = this.state.addItems.filter( item => {
        return item.name !== name || item.muscle !== muscle || item.type !== type
      })

      this.setState({
        addItems: newState
      }, function(){
        if(this.state.addItems.length === 0){
          this.setState({
            add: false
          })
        }
      })
    }
  }

  FavoriteExercise = (name, type, muscle, e) => {
    let newState;
    let img = e.target;

    if(this.state.showFavorite){
      this.DeleteFromFavorite(name, type, muscle)
    }
    else if(img.src.indexOf('filled-in-heart') === -1){
      img.src = BlueHeart;
      newState = [{
        "name": name,
        "muscle": muscle,
        "type": type,
        "sets": [{
          'Type': '',
          'Weight': '',
          'Reps': ''
        }]
      }];
      this.setState(prevState => ({
        favItems: prevState.favItems.concat(newState),
        favorite: true
      }), function(){console.log(this.state.favItems)})
    }
    else{
      img.src = Heart;
      newState = this.state.favItems.filter( item => {
        return item.name !== name || item.muscle !== muscle || item.type !== type
      })
      this.setState({
        favItems: newState
      }, function(){
        console.log(this.state.favItems)
        if(this.state.favItems.length === 0){
          this.setState({
            favorite: false
          })
        }
      })
    }

  }

  StoreExercises = () => {
    let {date, routineName, tab} = this.props;
    let requestObject = {
      "name": routineName,
      "exercises": this.state.addItems
    }
    if(tab === 'Saved'){
      let options = {month: "2-digit", day: "2-digit", year: "numeric"}
      requestObject["date"] = date.toLocaleDateString("en-US", options);
      this.InsertWorkoutExercises(requestObject)
    }
    else{
      this.InsertRoutineExercises(requestObject)
    }
    this.RemoveBar('add', 'addItems');
  }

  InsertRoutineExercises = (requestObject) => {
    fetch('/insertRoutineExercises', {
      method: 'POST',
      mode: 'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
      .catch(err => console.log(err))
  }

  InsertWorkoutExercises = (requestObject) => {
    fetch('/insertWorkoutExercises', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
    .catch(err => console.log(err))
  }

  StoreFavorites = () => {
    let requestObject = {
      "user" : "1",
      "favExercises" : this.state.favItems
    }

    fetch('/insertFavoriteExercises', {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
    this.RemoveBar('favorite', 'favItems')
  }

  render() {
    const {add, addItems, exercises, favorite, favItems, muscles, types} = this.state;
    return (
      <div id="AddExerciseView">
        <AddExerciseHeader
          search={this.SearchExercise}
          muscles={muscles}
          types={types}
          searchCategory={this.SearchByCategory}
          getFavorites={this.GetFavorites}
          />

        <EList
          exercises={exercises}
          AddExercise={this.AddExercise}
          FavoriteExercise={this.FavoriteExercise}
          />

          {add ?
            <div id="AddExerciseConfirmation" className="UpdateDeleteBars">
              <p>Add {addItems.length} exercise(s)?</p>
              <p onClick={this.StoreExercises}className="BarOptns">Yes</p>
              <p>/</p>
              <p onClick={() => this.RemoveBar('add', addItems)} className="BarOptns">No</p>
            </div>
            : null
          }

          {favorite ?
            <div id="AddExerciseConfirmation" className="UpdateDeleteBars">
              <p>Favorite {favItems.length} exercise(s)?</p>
              <p onClick={this.StoreFavorites}className="BarOptns">Yes</p>
              <p>/</p>
              <p onClick={() => this.RemoveBar('favorite', favItems)} className="BarOptns">No</p>
            </div>
            : null
          }


        <RoutineFooter/>
      </div>
    );
  }

}

export default AddExerciseView;
