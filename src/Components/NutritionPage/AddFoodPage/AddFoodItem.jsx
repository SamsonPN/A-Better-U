import React, { Component } from 'react';
import Heart from '../../../assets/heart.svg';


class AddFoodItem extends Component {

  render() {
    return (
      <div className="AddFoodItem">
        <p>{this.props.name}</p>
        <div id="AddFoodCheckboxWrapper">
          <div id="AddFoodCheckBox" title="Click to add food"></div>
          <img id="AddFoodFavorite" src={Heart} alt="Favorites Icon" title="Click to add to favorites"/>
        </div>
      </div>
    );
  }

}

export default AddFoodItem;
