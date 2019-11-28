import React, { Component } from 'react';
import {Key} from '../API/API_Key';
import Heart from '../assets/heart.svg';
import BlueHeart from '../assets/filled-in-heart.svg';
import {NutritionContext} from './ExportContexts';

export const AddFoodContext = React.createContext();

export class AddFoodProvider extends Component {
  static contextType = NutritionContext;

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

  GetFavorites = () => {
    let uri = '/user/getFavorites?favExercises=0';
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

  GetRecents = () => {
    fetch('/nutrition/getRecents')
      .then(res => res.json())
      .then(data => {
        let results = {};
        for (let meal in data[0]){
          let mealName = data[0][meal];
          if(mealName.length !== 0){
            for(let i = 0; i < mealName.length; i++){
              results[mealName[i].name] = mealName[i]
            }
          }
        }
        let FoodSearch = Object.keys(results).map(item => {
          return results[item]
        });
        this.setState({
          FoodSearch,
          FoodAdded: [],
          showFavorite: false
        }, function(){
          this.HeartColor(false);
        })
      })
  }

  HeartColor = (fill) => {
    let AddFoodFavorite = document.getElementsByClassName('AddFoodFavorite');
    [...AddFoodFavorite].forEach( item => {
      item.src = fill === true ? BlueHeart : Heart;
    })
  }

  FavoriteFood = (name, ndbno, e) => {
    let {FoodSearch, showFavorite} = this.state;
    let img = e.target;
    let operation;
    if(img.src.indexOf('filled-in-heart') === -1){
      img.src = BlueHeart;
      operation = 'insert';
    }
    else {
      if(showFavorite){
        let newState = FoodSearch.filter( item => {
          return item.name !== name || item.ndbno !== ndbno
        })
        this.setState({
          FoodSearch: newState
        })
      }
      img.src = Heart;
      operation = 'delete';
    }

    let uri = `/user/${operation}Favorites`;
    let requestObject = {
      item: { name, ndbno },
      field: "favFoods"
    }
    fetch(uri, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
      .catch(err => console.error(err))
  }

  SearchFood = e => {
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

  StoreFood = (nutritionDate, currentMeal) => {
    let {FoodAdded} = this.state;
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let date = nutritionDate.toLocaleDateString("en-US", options);
    let requestObject = {
      "date": date,
      "meal": currentMeal,
      "FoodAdded": FoodAdded
    }

    if(FoodAdded.length > 0 && currentMeal !== ""){
      fetch('/nutrition/insertFood', {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
        .then(res => res.json())
        .then(data => {
          this.context.FetchFood();
        })
        .catch(err => console.log(err))
    }
  }

  state = {
    FoodAdded: [],
    FoodSearch: [],
    showFavorite: false
  }

  render() {
    const {state, ...methods} = this;
    return (
      <NutritionContext.Consumer>
        {({ FetchFood  }) => (
          <AddFoodContext.Provider value ={{...methods, ...state, FetchFood}}>
            {this.props.children}
          </AddFoodContext.Provider>
        )}
      </NutritionContext.Consumer>
    );
  }

}
