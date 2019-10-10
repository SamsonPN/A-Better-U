import React, { Component } from 'react';
import Heart from '../../../assets/heart.svg';
import {AddFoodContext} from '../../../AppContext/ExportContexts';

class AddFoodItem extends Component {
  render() {
    const {name, ndbno} = this.props;
    return (
      <AddFoodContext.Consumer>
        { ({ AddFood, FavoriteFood }) => (
          <div className="AddFoodItem">
            <p>{name}</p>
            <div id="AddFoodCheckboxWrapper">
              <div
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
        )}
      </AddFoodContext.Consumer>
    );
  }

}

export default AddFoodItem;
