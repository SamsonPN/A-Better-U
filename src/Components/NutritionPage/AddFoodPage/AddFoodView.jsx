import React, { Component } from 'react';
import AddFoodHeader from './AddFoodHeader.jsx';
import AddFoodItemList from './AddFoodItemList.jsx';
import {Link} from 'react-router-dom';
import {AddFoodContext} from '../../../AddFoodContext';

class AddFoodView extends Component {
  static contextType = AddFoodContext;

  render() {
    return (
      <AddFoodContext.Consumer>
        {({ favItems, favorite, FoodAdded, StoreFavorites, StoreFood }) => (
          <div id="AddFoodView">
            <AddFoodHeader/>
            <AddFoodItemList/>

            <div id="AddFoodCounter">
            {favorite ?
              <p id="FavoriteFoodMsg" onClick={StoreFavorites}>Favorite {favItems.length} items</p>
            :
            <Link to="/nutrition" onClick={StoreFood}>
              <p>Add {FoodAdded.length} items</p>
            </Link>}
            </div>
          </div>
        )}
      </AddFoodContext.Consumer>
    );
  }

}

export default AddFoodView;
