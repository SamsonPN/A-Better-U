import React, { Component } from 'react';
import Heart from '../../../assets/heart.svg';
import BlueHeart from '../../../assets/filled-in-heart.svg';


class AddFoodItem extends Component {
  state = {
    AddFood : 'white',
    FavoriteFood: Heart
  }
  //able to access the names of these items so use that to display data for adding meals to the list
  Add = (e) => {
    let newState;
    newState = this.state.AddFood === "white" ? "#1F0CAD":"white";
    this.setState({AddFood: newState}, function(){
    document.getElementsByClassName('AddFoodCheckBox')[this.props.offset].style.backgroundColor = this.state.AddFood;})
  }

  Favorite = (e) => {
    let newState;
    newState = this.state.FavoriteFood === Heart ? BlueHeart:Heart;
    this.setState({FavoriteFood: newState}, function(){
      document.getElementsByClassName('AddFoodFavorite')[this.props.offset].src = this.state.FavoriteFood;
    })
  }

  render() {
    return (
      <div className="AddFoodItem">
        <p>{this.props.name}</p>
        <div id="AddFoodCheckboxWrapper">
          <div className="AddFoodCheckBox" title="Click to add food" onClick={this.Add}></div>
          <img className="AddFoodFavorite" src={this.state.FavoriteFood} alt="Favorites Icon" title="Click to add to favorites" onClick={this.Favorite}/>
        </div>
      </div>
    );
  }

}

export default AddFoodItem;
