import React, { Component } from 'react';
import BlueHeart from '../assets/filled-in-heart.svg';
import Heart from '../assets/heart.svg';

export const AddExerciseContext = React.createContext();

export class AddExerciseProvider extends Component {

  FavoriteExercise = (e, exercise) => {
    let {name, type, muscle} = exercise;
    let {exercises, showFavorite} = this.state;
    let img = e.target;
    let operation;

    if(img.src.indexOf('filled-in-heart') === -1){
      img.src = BlueHeart;
      operation = 'insert';
    }
    else{
      if(showFavorite){
        let newState = exercises.filter( item => {
          return item.name !== name || item.muscle !== muscle || item.type !== type;
        });
        this.setState({
          exercises: newState
        })
      }
      img.src = Heart;
      operation = 'delete';
    }

    let uri = `/user/${operation}Favorites`;
    let requestObject = {
      user: "1",
      item: {
        name,
        type,
        muscle,
        sets: [{
          Type: '',
          Weight: '',
          Reps: ''
        }]
      },
      field: 'favExercises'
    };
    fetch(uri, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
  }

  GetFavorites = () => {
    let uri = '/user/getFavorites?favFoods=0';
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

  ResetCategories = () => {
    document.getElementsByClassName('AeViews')[0].textContent = 'Muscles';
    document.getElementsByClassName('AeViews')[1].textContent = 'Exercise Type';
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
          }
          this.setState({
            exercises: data,
            showFavorite
          })
       })
       document.getElementsByClassName('AeViews')[0].textContent = 'Muscles';
       document.getElementsByClassName('AeViews')[1].textContent = 'Exercise Types';
    }
  }

  ShowValue = (e, ref) => {
    ref.textContent = e.target.textContent;
    this.SearchByCategory()
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
    showFavorite: false
  }

  render() {
    const {state, ...methods} = this;
    return (
      <AddExerciseContext.Provider value={{...methods, ...state }}>
        {this.props.children}
      </AddExerciseContext.Provider>
    );
  }
}
