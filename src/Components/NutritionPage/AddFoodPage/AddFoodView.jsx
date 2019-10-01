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
    favorite: false,
    favItems: [],
    showFavorite: false
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
      let checkbox = document.getElementById(name+ndbno);
      let newState;

      if (checkbox.style.backgroundColor === "" || checkbox.style.backgroundColor === "white"){
        checkbox.style.backgroundColor = '#1F0CAD';
        newState = [{"name": name, "ndbno": ndbno, "servings" : 1}];

        this.setState(previousState => ( {
          FoodAdded: previousState.FoodAdded.concat(newState)
        } ))
      }

      else {
        checkbox.style.backgroundColor = "white";
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
      else{
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

    HeartColor = (fill) => {
      let AddFoodFavorite = document.getElementsByClassName('AddFoodFavorite');
      [...AddFoodFavorite].forEach( item => {
        item.src = fill === true ? BlueHeart : Heart;
      })
    }

  render() {
    const {currentMeal} = this.props;
    const {favItems, favorite, FoodAdded, FoodSearch} = this.state;
    return (
      <div id="AddFoodView">
        <AddFoodHeader
          onEnter={this.onEnter}
          currentMeal={currentMeal}
          GetFavorites={this.GetFavorites}/>

        <AddFoodItemList search={FoodSearch}
          AddFood={this.AddFood}
          FavoriteFood={this.FavoriteFood}/>


        <div id="AddFoodCounter">
        {favorite ?
          <p id="FavoriteFoodMsg" onClick={this.StoreFavorites}>Favorite {favItems.length} items</p>
        :
        <Link to="/nutrition" onClick={this.StoreFood}>
          <p>Add {FoodAdded.length} items</p>
        </Link>}
        </div>
      </div>
    );
  }

}

export default AddFoodView;
