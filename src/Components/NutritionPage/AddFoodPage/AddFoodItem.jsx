import React, { Component } from 'react';
import Heart from '../../../assets/heart.svg';

class AddFoodItem extends Component {
  componentDidMount(){
  }
  render() {
    const {AddFood, FavoriteFood, name, ndbno} = this.props;
    return (
      <div className="AddFoodItem">
        <p>{name}</p>
        <div id="AddFoodCheckboxWrapper">
          <div
            id={name+ndbno}
            className="AddFoodCheckBox"
            title="Click to add food"
            onClick={(e) => AddFood(name, ndbno, e)}>
          </div>
          <img
            className="AddFoodFavorite"
            src={Heart}
            alt="Favorites Icon"
            title="Click to add to favorites"
            onClick={(e) => FavoriteFood(name, ndbno, e)}/>
        </div>
      </div>
    );
  }

}

export default AddFoodItem;
