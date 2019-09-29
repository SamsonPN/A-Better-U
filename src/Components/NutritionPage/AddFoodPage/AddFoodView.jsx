import React, { Component } from 'react';
import AddFoodHeader from './AddFoodHeader.jsx';
import AddFoodItemList from './AddFoodItemList.jsx';
import Heart from '../../../assets/heart.svg';
import BlueHeart from '../../../assets/filled-in-heart.svg';
import {Link} from 'react-router-dom';
import Key from '../../../API/API_Key'

class AddFoodView extends Component {
  state = {
    FoodSearch: [],
    FoodAdded: [],
    FavoriteFoods: []
  }
  componentDidMount(){
    console.log(Key)
  }
  onEnter = (e) => {
    let search = document.getElementById('AddFoodSearch').value;
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
            this.setState({ FoodSearch: data.list.item })
          }
        })
      }
    }

    AddFood = (name, offset,ndbno) => {
      let checkbox = document.getElementsByClassName('AddFoodCheckBox')[offset];

      if (checkbox.style.backgroundColor === "" || checkbox.style.backgroundColor === "white"){
        checkbox.style.backgroundColor = '#1F0CAD';

        let newState = [{"name": name, "ndbno": ndbno, "servings" : 1}];
        this.setState(previousState => ( {
          FoodAdded: previousState.FoodAdded.concat(newState)
        } ))
      }

      else {
        checkbox.style.backgroundColor = "white";
        let newState = this.state.FoodAdded.filter((item) => {
          return item.name !== name
        })

        this.setState(previousState => ( {
          FoodAdded: newState,
        } ))

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

    StoreData = () => {
      let {FoodAdded} = this.state;
      let {currentMeal} = this.props;
      let options = {month: "2-digit", day: "2-digit", year: "numeric"}
      let date = this.props.date.toLocaleDateString("en-US", options);

      let requestObject = {
        "date": date,
        "meal": currentMeal,
        "FoodAdded": FoodAdded
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
        <AddFoodHeader onEnter={this.onEnter} currentMeal={this.props.currentMeal}/>

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
