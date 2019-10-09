import React, { Component } from 'react';
import Key from './API/API_Key';
import Heart from './assets/heart.svg';
import BlueHeart from './assets/filled-in-heart.svg';

export const AddFoodContext = React.createContext();

export class AddFoodProvider extends Component {
  SetCurrentMeal = currentMeal => {
    this.setState( {
      currentMeal,
      FoodAdded: [],
      FoodSearch: [],
      showFavorite: false
     })
  }

  onEnter = e => {
    let search = e.target.value;
    if(e.key === 'Enter' && search !== ''){
      e.preventDefault();
      let uri = encodeURI(`https://api.nal.usda.gov/ndb/search/?format=json&q=${search}&sort=r&offset=0&api_key=${Key}`)
      fetch(uri)
        .then(response => response.json())
        .then(data => {
          if (data.list === undefined){
            alert("We are unable to find the food you were searching for. Please enter another item!")
          }
          else{
            this.setState({
              FoodSearch: data.list.item
            }, function(){
              this.HeartColor(false)
            })
          }
        })
      }
    }

  GetFavorites = () => {
    let uri = '/getFavorites?favExercises=0';
    fetch(uri)
      .then(res => res.json())
      .then(data => {
        this.setState({
          FoodSearch: data.favFoods,
          showFavorite: true
        },function(){
          this.HeartColor(true)
        })
      })
      .catch(err => console.error(err))
  }

  AddFood = (name, ndbno, e) => {
    let checkbox = e.target.style;
    let newState;

    if (checkbox.backgroundColor === "" || checkbox.backgroundColor === "white"){
      checkbox.backgroundColor = '#1F0CAD';
      newState = [{"name": name, "ndbno": ndbno, "servings" : 1}];

      this.setState(previousState => ( {
        FoodAdded: previousState.FoodAdded.concat(newState)
      } ))
    }
    else {
      checkbox.backgroundColor = "white";
      newState = this.state.FoodAdded.filter((item) => {
        return item.name !== name
      })

      this.setState(previousState => ( {
        FoodAdded: newState,
      } ))

    }
  }

  FavoriteFood = (name, ndbno, e) => {
    let img = e.target;
    let newState;

    if(this.state.showFavorite){
      this.DeleteFromFavorite(name, ndbno)
    }
    else if(img.src.indexOf('filled-in-heart') === -1){
      img.src = BlueHeart;
      newState = {
        "name" : name,
        "ndbno" : ndbno
      }
      this.setState(prevState => ({
        favItems: prevState.favItems.concat(newState),
        favorite: true
      }))
    }
    else {
      img.src = Heart;
      newState = this.state.favItems.filter( item => {
        return item.name !== name || item.ndbno !== ndbno
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

  StoreFavorites = () => {
    let {favItems} = this.state;
    alert(`${favItems.length} favorited!`);

    let requestObject = {
      "user" : "1",
      "favFoods" : favItems
    }

    fetch('/insertFavoriteFoods', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })

    this.setState({
      favorite: false,
      favItems: []
    })
    this.HeartColor(false)
  }

  DeleteFromFavorite = (name, ndbno) => {
    let newState = this.state.FoodSearch.filter( item => {
      return item.name !== name || item.ndbno !== ndbno
    })
    let requestObject = {
      "user": "1",
      "name" : name,
      "ndbno" : ndbno
    }

    this.setState({
      FoodSearch: newState
    })

    fetch('/deleteFavoriteFoods', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
      .catch(err => console.error(err))
  }

  StoreFood = () => {
    let {currentMeal, FoodAdded} = this.state;
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let today = new Date()
    let date = today.toLocaleDateString("en-US", options);

    let requestObject = {
      "date": date,
      "meal": currentMeal,
      "FoodAdded": FoodAdded
    }

    if(FoodAdded.length > 0 && currentMeal !== ""){
      fetch('/insertFood', {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
        .catch(err => console.log(err))
    }
  }

  HeartColor = (fill) => {
    let AddFoodFavorite = document.getElementsByClassName('AddFoodFavorite');
    [...AddFoodFavorite].forEach( item => {
      item.src = fill === true ? BlueHeart : Heart;
    })
  }

  state = {
    currentMeal: "",
    favItems: [],
    favorite: false,
    FoodAdded: [],
    FoodSearch: [],
    showFavorite: false,
    AddFood: this.AddFood,
    DeleteFromFavorite: this.DeleteFromFavorite,
    FavoriteFood: this.FavoriteFood,
    GetFavorites: this.GetFavorites,
    HeartColor: this.HeartColor,
    onEnter: this.onEnter,
    SetCurrentMeal: this.SetCurrentMeal,
    StoreFavorites: this.StoreFavorites,
    StoreFood: this.StoreFood
  }

  render() {
    return (
      <AddFoodContext.Provider value ={this.state}>
        {this.props.children}
      </AddFoodContext.Provider>
    );
  }

}
