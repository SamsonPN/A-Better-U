import React, { Component } from 'react';
import NutritionContext from '../../../ReactContext.js';
import AddFoodHeader from './AddFoodHeader.jsx';
import AddFoodItemList from './AddFoodItemList.jsx';
import Heart from '../../../assets/heart.svg';
import BlueHeart from '../../../assets/filled-in-heart.svg';
import {Link} from 'react-router-dom';

class AddFoodView extends Component {
  state = {
    FoodSearch: [],
    FoodAdded: [],
    FavoriteFoods: [],
    servings: {}
  }

  static contextType = NutritionContext;

  onEnter = (e) => {
    let search = document.getElementById('AddFoodSearch').value;
    if(e.key === 'Enter' && search !== ''){
      e.preventDefault();
      let uri = encodeURI(`https://api.nal.usda.gov/ndb/search/?format=json&q=${search}&sort=r&offset=0&api_key=oam5ywiHfTUD7jRzZoDtJj9Ei8bMu04nAx3D4mGT`)
      fetch(uri)
        .then(response => response.json())
        .then(data => {
          if (data.list === undefined){
            alert("We are unable to find the food you were searching for. Please enter another item!")
          }
          else{
            this.setState({ FoodSearch: data.list.item })
          }
        })
      }
    }

    AddFood = (name, offset,ndbno) => {
      let checkbox = document.getElementsByClassName('AddFoodCheckBox')[offset];

      if (checkbox.style.backgroundColor === "" || checkbox.style.backgroundColor === "white"){
        checkbox.style.backgroundColor = '#1F0CAD';

        let newState = [{"name": name, "ndbno": ndbno}];
        this.setState(previousState => ( {
          FoodAdded: previousState.FoodAdded.concat(newState),
          servings: {...previousState.servings, [ndbno]: '1'}
        } ))

      }

      else {
        checkbox.style.backgroundColor = "white";
        let newState = this.state.FoodAdded.filter((item) => {
          return item.name !== name
        })

        let {[ndbno]: value, ...withoutObject} = this.state.servings;
        this.setState(previousState => ( {
          FoodAdded: newState,
          servings: withoutObject
        } ), function(){console.log(this.state.servings)})

      }
    }

    FavoriteFood = (name, offset, ndbno) => {
      let favoriteBox = document.getElementsByClassName('AddFoodFavorite')[offset];
      if(favoriteBox.src === `http://localhost:3000${Heart}`){
        favoriteBox.src = BlueHeart;
      }
      else{
        favoriteBox.src = Heart;
      }
    }

    StoreData = () =>{
      let FoodAdded = this.state.FoodAdded;
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;

      let requestObject = {
        "date": today,
        "meal": this.props.currentMeal,
        "FoodAdded": this.state.FoodAdded,
        "servings": this.state.servings
      }

      if(FoodAdded.length > 0 && this.props.currentMeal !== ""){
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

  render() {
    return (
      <div id="AddFoodView">
        <AddFoodHeader onEnter={this.onEnter} currentMeal={this.context.currentMeal}/>

        <AddFoodItemList search={this.state.FoodSearch}
          AddFood={this.AddFood}
          FavoriteFood={this.FavoriteFood}/>

        <Link to="/nutrition">
          <div id="AddFoodCounter" onClick={this.StoreData}>
            <p onClick={this.props.update} >Add {this.state.FoodAdded.length} items</p>
          </div>
        </Link>
      </div>
    );
  }

}

export default AddFoodView;
