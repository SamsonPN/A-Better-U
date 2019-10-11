import React, { Component } from 'react';
import BlueHeart from '../assets/filled-in-heart.svg';
import Heart from '../assets/heart.svg';

export const AddExerciseContext = React.createContext();

export class AddExerciseProvider extends Component {
  //create a function to clear out the selections for muscles and types!!!
  //search by category, getfavorites
  // replace ShowValue with a reference instead!
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
      let search = e.target.value;
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

  AddExercise = (e, exercise) => {
    console.log(this.state.currentRoutine)
    let {name, type, muscle} = exercise;
    let checkbox = e.target.style;
    let newState;

    if (checkbox.backgroundColor === "" || checkbox.backgroundColor === "white"){
      checkbox.backgroundColor = '#1F0CAD';
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
      checkbox.backgroundColor = "white";
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

  FavoriteExercise = (e, exercise) => {
    let {name, type, muscle} = exercise;
    let img = e.target;
    let newState;

    if(this.state.showFavorite){
      this.DeleteFromFavorite(exercise)
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
      }))
    }
    else{
      img.src = Heart;
      newState = this.state.favItems.filter( item => {
        return item.name !== name || item.muscle !== muscle || item.type !== type
      })
      this.setState({
        favItems: newState
      }, function(){
        if(this.state.favItems.length === 0){
          this.setState({
            favorite: false
          })
        }
      })
    }
  }

  DeleteFromFavorite = (exercise) => {
    let {name, type, muscle} = exercise;
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

  RemoveBar = (option, optionItems) => {
    this.setState( {
      [option.toLowerCase()]: false,
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

  state = {
    exercises: [],
    muscles: [],
    types: [],
    showFavorite: false,
    add : false,
    addItems: [],
    favorite: false,
    favItems: [],
    AddExercise: this.AddExercise,
    FavoriteExercise: this.FavoriteExercise,
    GetFavorites: this.GetFavorites,
    RemoveBar: this.RemoveBar,
    SearchExercise: this.SearchExercise,
    SearchByCategory: this.SearchByCategory,
  }

  render() {
    return (
      <AddExerciseContext.Provider value={this.state}>
        {this.props.children}
      </AddExerciseContext.Provider>
    );
  }
}
