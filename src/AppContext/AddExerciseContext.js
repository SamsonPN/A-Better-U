import React, { Component } from 'react';
import BlueHeart from '../assets/filled-in-heart.svg';
import Heart from '../assets/heart.svg';

export const AddExerciseContext = React.createContext();

export class AddExerciseProvider extends Component {

  ClearSelections = () => {
    let AddExerciseFavorite = document.getElementsByClassName('AddExerciseFavorite');
    [...AddExerciseFavorite].forEach( item => {
      item.src = Heart;
    })
  }

  DeleteFromFavorite = (exercise) => {
    let {name, type, muscle} = exercise;
    let newState = this.state.exercises.filter( item => {
      return item.name !== name || item.muscle !== muscle || item.type !== type;
    });
    let requestObject = {
      "user": "1",
      "item": {
        "name" : name,
        "type" : type
      },
      "field": 'favExercises'
    };

    this.setState({
      exercises: newState
    });

    fetch('/deleteFavorites', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
      .catch(err => console.error(err))
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

  SearchByCategory = () => {
    let bodyPart = document.getElementsByClassName('AeViews')[0].textContent;
    let eType = document.getElementsByClassName('AeViews')[1].textContent;
    let muscles = bodyPart === 'Muscles' ? '' : `muscle=${bodyPart}&`
    let type = eType === 'Exercise Type' ? '' : `type=${eType}`
    let uri = encodeURI('/workout/getExerciseByCategory?' + muscles + type);

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

  SearchExercise = (e) => {
    if (e.key === "Enter"){
      e.preventDefault();
      let search = e.target.value;
      let uri = encodeURI(`/workout/getExerciseBySearch/${search}`);

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

  StoreFavorites = () => {
    let {favItems} = this.state;
    let requestObject = {
      user : "1",
      favItems,
      field: "favExercises"
    }

    fetch('/insertFavorites', {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
    this.setState({
      favorite: false,
      favItems: []
    })

    this.ClearSelections()

  }

  componentDidMount(){
    fetch('/workout/getExerciseTypes')
      .then(res => res.json())
      .then(data => {
        this.setState({
          muscles: data.Muscles,
          types: data.EType
        })
     })
  }

  state = {
    exercises: [],
    muscles: [],
    types: [],
    showFavorite: false,
    favorite: false,
    favItems: []
  }

  render() {
    return (
      <AddExerciseContext.Provider value={{...this, ...this.state }}>
        {this.props.children}
      </AddExerciseContext.Provider>
    );
  }
}
